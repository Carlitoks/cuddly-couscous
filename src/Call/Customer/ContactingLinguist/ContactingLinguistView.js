import React, { Component } from "react";
import { connect } from "react-redux";

//COMPONENTS
import { Text, View, ScrollView, ActivityIndicator, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";
import SessionControls from "../../../Components/SessionControls/SessionControls";
import ModalRetry from "../../../Components/ModalRerty/ModalRetry";
import CallTimer from "../../../Components/CallTimer/CallTimer";
// STYLE AND THEMES
import styles from "./styles";
import { Images, Colors } from "../../../Themes";
// REDUCERS
import { closeCall } from "../../../Ducks/ActiveSessionReducer";
import I18n from "../../../I18n/I18n";
import {
  setPermission,
  displayOpenSettingsAlert
} from "../../../Util/Permission";
import { REASON, STATUS_TOKBOX } from "../../../Util/Constants";
import InCallManager from "react-native-incall-manager";

class ContactingLinguist extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //this.props.callTimeOut();
    if (InCallManager.recordPermission !== "granted") {
      InCallManager.requestRecordPermission()
        .then(requestedRecordPermissionResult => {
          console.log(
            "InCallManager.requestRecordPermission() requestedRecordPermissionResult: ",
            requestedRecordPermissionResult
          );
        })
        .catch(err => {
          console.log("InCallManager.requestRecordPermission() catch: ", err);
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tokboxStatus === STATUS_TOKBOX.STREAM) {
      clearInterval(this.props.counterId);
    }
  }

  render() {
    const { closeCall, connect, callTimeOut } = this.props;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainerStyle}
        alwaysBounceVertical={false}
      >
        <ModalRetry
          closeCall={closeCall}
          callTimeOut={callTimeOut}
          reconnectCall={connect}
        />
        {!this.props.modalReconnect && (
          <ActivityIndicator
            size="large"
            color="white"
            style={styles.spinner}
          />
        )}
        <View style={styles.connectingMessageContainer}>
          {!this.props.modalReconnect && (
            <CallTimer
              time={this.props.counter}
              withOut
              changeVisible={() => console.log("change")}
              red={false}
              showButton={false}
              buttonPress={() => console.log("click")}
            />
          )}
          <Text style={styles.connectingMessage}>
            {this.props.connectingMessage}
          </Text>
        </View>
        {/* Call Buttons */}
        <View style={styles.controlsContainer}>
          <SessionControls
            closeCall={closeCall}
            reason={REASON.CANCEL}
            switch={() => {}}
            contacting
          />
        </View>
      </ScrollView>
    );
  }
}

const mS = state => ({
  counterId: state.contactLinguist.counterId,
  tokboxStatus: state.activeSessionReducer.status,
  modalReconnect: state.contactLinguist.modalReconnect,
  modalContact: state.contactLinguist.modalContact,
  connectingMessage: state.contactLinguist.connectingMessage,
  counter: state.contactLinguist.counter
});

const mD = {
  closeCall
};

export default connect(
  mS,
  mD
)(ContactingLinguist);
