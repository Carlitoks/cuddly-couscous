import React, { Component } from "react";
import { connect } from "react-redux";

//COMPONENTS
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
  NativeModules,
  NativeEventEmitter
} from "react-native";
import timer from "react-native-timer";
import SessionControls from "../../../Components/SessionControls/SessionControls";
import ModalRetry from "../../../Components/ModalRerty/ModalRetry";
// STYLE AND THEMES
import styles from "./styles";
// REDUCERS
import {
  closeCall,
  update,
  verifyLinguistConnection
} from "../../../Ducks/ActiveSessionReducer";
import {
  incrementCounter,
  resetCounter,
  updateSettings
} from "../../../Ducks/ContactLinguistReducer";
import I18n from "../../../I18n/I18n";
import { displayEndCall } from "../../../Util/Alerts";
import { REASON, STATUS_TOKBOX, SOUNDS } from "../../../Util/Constants";
import SoundManager, {playSound} from "../../../Util/SoundManager";
import { Col, Row, Grid } from "react-native-easy-grid";
import DeviceInfo from "react-native-device-info";
import InCallManager from "react-native-incall-manager";
import Sound from "react-native-sound";
class ConnectingView extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //SoundManager["IncomingCall"].stop();
    InCallManager.start({ media: "audio" });
    this.conectingTimer();
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
  handleWiredHeadSetState = deviceState => {
    if (deviceState.isPlugged) {
      this.props.update({ speaker: false });
      InCallManager.setForceSpeakerphoneOn(false);
    } else {
      this.props.update({ speaker: true });
      InCallManager.setForceSpeakerphoneOn(true);
    }
  };
  componentWillUnmount() {
    timer.clearInterval("counterId");
    this.props.resetCounter();
    const systemName = DeviceInfo.getSystemName();
    if (systemName == "Android") {
      this.wiredHeadsetListener.remove();
    }
  }

  conectingTimer = () => {
    const { incrementCounter } = this.props;
    this.props.updateSettings({
      counterId: timer.setInterval(
        "counterId",
        () => {
          incrementCounter();
          this.props.verifyLinguistConnection();
        },
        1000
      )
    });
  };

  closeCallLinguist = reason => {
    displayEndCall(() => {
      playSound(SOUNDS.END_CALL);
      this.props.closeCall(REASON.CANCEL);
    });
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
        <Grid>
          <Col>
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
              <Text style={styles.connectingMessage}>
                {I18n.t("connecting")}
              </Text>
            </View>
            {/* Call Buttons */}

            <SessionControls
              closeCall={this.closeCallLinguist}
              reason={REASON.CANCEL}
              switch={() => {}}
              contacting
              linguist
            />
          </Col>
        </Grid>
      </ScrollView>
    );
  }
}

const mS = state => ({
  counterId: state.contactLinguist.counterId,
  tokboxStatus: state.activeSessionReducer.status,
  modalReconnect: state.contactLinguist.modalReconnect,
  modalContact: state.contactLinguist.modalContact
});

const mD = {
  closeCall,
  update,
  verifyLinguistConnection,
  incrementCounter,
  resetCounter,
  updateSettings
};

export default connect(
  mS,
  mD
)(ConnectingView);
