import React, { Component } from "react";
import { Text, Modal, View, ActivityIndicator } from "react-native";
import { connect } from "react-redux";

import I18n from "../../I18n/I18n";
import { styles } from "./styles";
import { Colors } from "../../Themes";
import { TIME, REASON } from "../../Util/Constants";

import ReconnectOptions from "../ReconnectOptions/ReconnectOptions";

import {
  updateSettings,
  startReconnect,
  resetReconnectAsync
} from "../../Ducks/CallCustomerSettings";

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

  renderDisconnectedMessage() {
    const { isLinguist, customerName } = this.props;

    /*const username = !!isLinguist
      ? `${linguist.firstName} ${linguist.lastInitial}`
      : customerName;*/

    const modalTitle = `${I18n.t("hasDisconnected")}.`;

    const listItems = isLinguist
      ? [
          {
            title: I18n.t("keepWaiting"),
            onPress: () => this.props.resetReconnectAsync()
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
            onPress: () => this.props.resetReconnectAsync()
          },
          {
            title: I18n.t("tryAnother"),
            onPress: async () => {
              this.props.resetReconnectAsync();
              await this.props.closeCall(REASON.RETRY);
              await this.props.reconnectCall();
              this.props.callTimeOut();
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
  visibility: state.callCustomerSettings.modalReconnect,
  counter: state.callCustomerSettings.counter,
  modalReconnectCounter: state.callCustomerSettings.modalReconnectCounter,
  isLinguist: !!state.userProfile.linguistProfile,
  reconnectMessage: state.callCustomerSettings.reconnectMessage,
  linguist: state.sessionInfo.linguist,
  customerName: state.callLinguistSettings.customerName
});

const mD = {
  updateSettings,
  startReconnect,
  resetReconnectAsync
};

export default connect(
  mS,
  mD
)(ModalReconnect);
