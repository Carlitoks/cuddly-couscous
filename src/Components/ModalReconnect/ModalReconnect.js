import React, { Component } from "react";
import { Text, Modal, View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import I18n from "../../I18n/I18n";
import { styles } from "./styles";
import { Colors } from "../../Themes";
import { TIME, REASON } from "../../Util/Constants";

import ReconnectOptions from "../ReconnectOptions/ReconnectOptions";
import {
  resetConnectingMessage,
  updateSettings as updateContactLinguistSettings
} from "../../Ducks/ContactLinguistReducer";

import {
  update as updateSettings,
  startReconnect,
  resetReconnectAsync,
  resetReconnectCounterAsync,
  closeCall,
  cleanCall,
  tryAgainCall
} from "../../Ducks/ActiveSessionReducer";

import DisconnectedMessage from "./DisconnectedMessage/DisconnectedMessage";
import ReconnectingMessage from "./ReconnectingMessage/ReconnectingMessage";

class ModalReconnect extends Component {
  componentWillReceiveProps(nextProps) {
    const {
      visibility: oldVisibility,
      incrementReconnectCounter,
      updateContactLinguistSettings
    } = this.props;

    const { visibility: newVisibility } = nextProps;

    if (oldVisibility !== newVisibility && !!newVisibility) {
      console.log("Start Reconnect");
      this.props.startReconnect();
    } else {
      if (!!!newVisibility) {
        console.log("Clear Reconnect");
        this.props.resetReconnectAsync();
      }
    }
  }

  renderReconnectingMessage() {
    const { isLinguist } = this.props;

    const message = I18n.t("weAreWorking");

    return <ReconnectingMessage message={message} />;
  }

  async tryAnotherCall() {
    const {
      token,
      sessionID,
      tryAgainCall,
      reconnectCall,
      updateSettings,
      resetConnectingMessage
    } = this.props;

    resetConnectingMessage();
    await tryAgainCall(sessionID, REASON.RETRY, token);
    await updateSettings({
      verifyCallId: null,
      sessionID: null,
      tokboxID: null,
      tokboxToken: null,
      status: 0,
      error: null,
      tokevent: null
    });
    await reconnectCall();
  }

  renderDisconnectedMessage() {
    const { isLinguist, customerName, isConnectedToInternet } = this.props;

    /*const username = !!isLinguist
      ? `${linguist.firstName} ${linguist.lastInitial}`
      : customerName;*/

    const modalTitle = `${I18n.t("hasDisconnected")}.`;

    const listItems = isLinguist
      ? [
          {
            title: I18n.t("keepWaiting"),
            onPress: () => this.props.resetReconnectCounterAsync()
          },
          {
            title: I18n.t("endCall"),
            onPress: () => {
              this.props.resetReconnectAsync();
              this.props.closeCall(REASON.DONE);
            }
          }
        ]
      : !isConnectedToInternet
      ? [
          {
            title: I18n.t("tryToReconnect"),
            onPress: () => this.props.resetReconnectCounterAsync()
          },
          {
            title: I18n.t("endCall"),
            onPress: () => {
              this.props.resetReconnectAsync();
              this.props.closeCall(REASON.CANCEL);
            }
          }
        ]
      : [
          {
            title: I18n.t("tryToReconnect"),
            onPress: () => this.props.resetReconnectCounterAsync()
          },
          {
            title: I18n.t("tryAnother"),
            onPress: async () => {
              const {
                sessionID,
                token,
                updateSettings,
                tryAgainCall,
                resetConnectingMessage,
                processing
              } = this.props;
              resetConnectingMessage();
              if (!processing) {
                await updateSettings({
                  processing: true
                });
                await tryAgainCall(sessionID, REASON.RETRY, token);
                await updateSettings({
                  verifyCallId: null,
                  sessionID: null,
                  tokboxID: null,
                  tokboxToken: null,
                  status: 0,
                  error: null,
                  tokevent: null,
                  modalReconnect: false
                });
                await this.props.reconnectCall();
                await updateSettings({
                  processing: false
                });
              }
            }
          },
          {
            title: I18n.t("endCall"),
            onPress: () => {
              this.props.resetReconnectAsync();
              this.props.closeCall(REASON.CANCEL);
            }
          }
        ];

    return (
      <DisconnectedMessage
        title={modalTitle}
        subtitle={I18n.t("whatWouldYouLike")}
        listItems={listItems}
      />
    );
  }

  render() {
    const { visibility, modalReconnectCounter } = this.props;

    return (
      <Modal
        visible={visibility}
        animationType={"fade"}
        onRequestClose={() => false}
        transparent={true}
      >
        {!!visibility &&
          (modalReconnectCounter < 10
            ? this.renderReconnectingMessage()
            : this.renderDisconnectedMessage())}
      </Modal>
    );
  }
}

const mS = state => ({
  visibility: state.activeSessionReducer.modalReconnect,
  counter: state.activeSessionReducer.counter,
  modalReconnectCounter: state.activeSessionReducer.modalReconnectCounter,
  isLinguist: !!state.userProfile.linguistProfile,
  reconnectMessage: state.activeSessionReducer.reconnectMessage,
  linguist: state.sessionInfo.linguist,
  isConnectedToInternet: state.activeSessionReducer.isConnectedToInternet,
  customerName: state.activeSessionReducer.customerName,
  token: state.auth.token,
  sessionID: state.activeSessionReducer.sessionID,
  processing: state.activeSessionReducer.processing
});

const mD = {
  updateSettings,
  startReconnect,
  resetReconnectAsync,
  resetReconnectCounterAsync,
  updateContactLinguistSettings,
  resetConnectingMessage,
  cleanCall,
  closeCall,
  tryAgainCall
};

export default connect(
  mS,
  mD
)(ModalReconnect);
