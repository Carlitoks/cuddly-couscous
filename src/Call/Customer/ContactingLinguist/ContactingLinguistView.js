import React, { Component } from "react";
import { connect } from "react-redux";
import timer from "react-native-timer";
//COMPONENTS
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  NativeModules,
  NativeEventEmitter
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";
import SessionControls from "../../../Components/SessionControls/SessionControls";
import ModalRetry from "../../../Components/ModalRerty/ModalRetry";
import CallTimer from "../../../Components/CallTimer/CallTimer";
// STYLE AND THEMES
import styles from "./styles";
import { Images, Colors } from "../../../Themes";
// REDUCERS
import { closeCall, update } from "../../../Ducks/ActiveSessionReducer";
import { updateSettings } from "../../../Ducks/ContactLinguistReducer";
import I18n from "../../../I18n/I18n";
import {
  setPermission,
  displayOpenSettingsAlert
} from "../../../Util/Permission";
import { REASON, STATUS_TOKBOX } from "../../../Util/Constants";
import InCallManager from "react-native-incall-manager";
import DeviceInfo from "react-native-device-info";

class ContactingLinguist extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //this.props.callTimeOut();
    InCallManager.start({ media: "audio" });
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
    const systemName = DeviceInfo.getSystemName();
    if (systemName == "Android") {
      const nativeBridge = NativeModules.InCallManager;
      const NativeModule = new NativeEventEmitter(nativeBridge);
      this.wiredHeadsetListener = NativeModule.addListener(
        "WiredHeadset",
        this.handleWiredHeadSetState
      );
    } else {
      InCallManager.getIsWiredHeadsetPluggedIn()
        .then(res => {
          let isWiredHeadsetPluggedIn = res.isWiredHeadsetPluggedIn;
          if (isWiredHeadsetPluggedIn) {
            this.props.update({ speaker: false });
            InCallManager.setForceSpeakerphoneOn(false);
          } else {
            this.props.update({ speaker: true });
            InCallManager.setForceSpeakerphoneOn(true);
          }
        })
        .catch(err => {
          console.log(
            "InCallManager.getIsWiredHeadsetPluggedIn() catch: ",
            err
          );
        });
    }
  }
  componentWillUnmount() {
    timer.clearInterval("verifyCallId");
    const systemName = DeviceInfo.getSystemName();
    if (systemName == "Android") {
      this.wiredHeadsetListener.remove();
    }
  }

  sixtySecondsCounter(counter) {
    return 60 - counter;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tokboxStatus === STATUS_TOKBOX.STREAM) {
      timer.clearInterval("counterId");
    }
  }
  handleWiredHeadSetState = deviceState => {
    if (deviceState.isPlugged) {
      this.props.update({ speaker: false });
      InCallManager.setForceSpeakerphoneOn(false);
    } else {
      this.props.update({ speaker: true });
      InCallManager.setForceSpeakerphoneOn(true);
    }
  };
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
          {!this.props.modalReconnect &&
            this.props.counter > 0 &&
            this.props.counter < 60 && (
              <CallTimer
                time={this.sixtySecondsCounter(this.props.counter)}
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
  closeCall,
  updateSettings,
  update
};

export default connect(
  mS,
  mD
)(ContactingLinguist);
