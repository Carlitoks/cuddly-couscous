import React, { Component, Ref } from "react";
import { connect } from "react-redux";
import OpenTok, { Publisher, Subscriber } from "react-native-opentok";
import KeepAwake from "react-native-keep-awake";
import Permissions from "react-native-permissions";
import {
  updateSettings,
  AsyncCreateSession,
  AsyncCreateInvitation,
  incrementTimer,
  resetTimerAsync,
  clearSettings,
  EndCall
} from "../../../Ducks/CallCustomerSettings";
import { GetSessionInfoLinguist } from "../../../Ducks/SessionInfoReducer";
import { tokConnect, tokDisConnect } from "../../../Ducks/tokboxReducer";
import { clearSettings as clearCallSettings } from "../../../Ducks/ContactLinguistReducer";
import { AppRegistry, Button, View, Text, Image, Switch } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { CallButton } from "../../../Components/CallButton/CallButton";
import TopViewIOS from "../../../Components/TopViewIOS/TopViewIOS";
import { Colors, Images } from "../../../Themes";
import { fmtMSS } from "../../../Util/Helpers";
import styles from "./styles";
import {
  setPermission,
  displayOpenSettingsAlert
} from "../../..//Util/Permission";
import I18n from "../../../I18n/I18n";
import ContactingLinguistView from "../ContactingLinguist/ContactingLinguistView";

import {
  BackgroundInterval,
  BackgroundCleanInterval,
  BackgroundStart
} from "../../../Util/Background";

const STATUS_TOKBOX = {
  DISCONECTED: 0,
  CONECTED: 1,
  ERROR: 2,
  STREAM: 3
};

class CustomerView extends Component {
  ref: Ref<Publisher>;

  componentWillMount() {
    BackgroundStart();
  }

  async componentDidMount() {
    const {
      customerTokboxSessionToken,
      customerTokboxSessionID,
      tokConnect,
      sessionID,
      selectedLanguageCode,
      selectedTime,
      selectedScenarioId,
      token,
      AsyncCreateSession,
      updateSettings
    } = this.props;

    // Generate calling notification

    try {
      const res = await AsyncCreateSession({
        type: "immediate_virtual",
        matchMethod: "manual",
        primaryLangCode: "eng",
        secundaryLangCode: selectedLanguageCode,
        estimatedMinutes: selectedTime,
        scenarioID: selectedScenarioId,
        token: token
      });

      if (res) {
        const tokboxSessionId = res.payload.tokboxSessionID;
        const tokboxToken = res.payload.tokboxSessionToken;

        await updateSettings({
          customerTokboxSessionID: tokboxSessionId,
          customerTokboxSessionToken: tokboxToken,
          sessionID: res.payload.sessionID
        });

        const linguistID = "11111111-1111-1111-1111-111111111111";
        const role = "linguist";

        await this.props.AsyncCreateInvitation(
          res.payload.sessionID,
          linguistID,
          role,
          this.props.token
        );

        await tokConnect(tokboxSessionId, tokboxToken);
      }
    } catch (e) {
      console.log("The session could not be created", e);
    }
  }

  handleSessionInfoName() {
    if (this.props.linguist) {
      return `${this.props.linguist.firstName} ${
        this.props.linguist.lastInitial
      }`;
    } else if (this.props.customer) {
      return `${this.props.customer.firstName} ${
        this.props.customer.lastInitial
      }`;
    } else {
      return `User`;
    }
  }

  componentWillUnmount() {
    BackgroundCleanInterval(this.props.timer);
    this.props.resetTimerAsync();
    this.props.clearCallSettings();
  }

  startTimer = () => {
    const { sessionID, token, selectedCallTime } = this.props;
    const callTime = selectedCallTime * 60;
    this.props.GetSessionInfoLinguist(sessionID, token);
    this.props.updateSettings({
      timer: BackgroundInterval(() => {
        if (
          this.props.elapsedTime > callTime &&
          !this.props.customerExtraTime
        ) {
          OpenTok.disconnect(this.props.customerTokboxSessionID);
          this.props.tokDisConnect(this.props.customerTokboxSessionID);
          this.props.EndCall(sessionID, "done", token);
        } else {
          this.props.incrementTimer();
        }
      }, 1000)
    });
  };

  render() {
    return (
      <View style={styles.containerT}>
        <View
          style={
            this.props.tokboxStatus === STATUS_TOKBOX.STREAM
              ? styles.containerCall
              : styles.containerHiddenCall
          }>
          <View style={styles.backgroundContainer}>
            {this.props.customerTokboxSessionID && (
              <Subscriber
                sessionId={this.props.customerTokboxSessionID}
                style={styles.background}
                mute={!this.props.speaker}
                onSubscribeStart={() => {
                  this.startTimer();
                  console.log("SubscriberStart");
                }}
                onSubscribeError={() => {
                  console.log("SubscriberError");
                }}
                onSubscribeStop={() => {
                  console.log("SubscriberStop");
                }}
              />
            )}
          </View>
          <View style={styles.publisherBox}>
            {this.props.customerTokboxSessionID && (
              <Publisher
                sessionId={this.props.customerTokboxSessionID}
                style={styles.publisher}
                mute={this.props.mute}
                video={this.props.video}
                ref={ref => {
                  this.ref = ref;
                }}
                onPublishStart={() => {
                  console.log("Publisher started");
                }}
                onPublishError={() => {
                  console.log("Publisher started error");
                }}
              />
            )}
          </View>
          <View style={styles.topContainer}>
            <TopViewIOS />
            <View style={styles.inlineContainer}>
              <Image style={styles.smallAvatar} source={Images.avatarCall} />
            </View>
            <Text style={styles.callerNameText}>
              {this.handleSessionInfoName()}
            </Text>

            {/*<View style={styles.inlineContainer}>
              <Icon style={styles.icon} size={25} name="room" />
              <Text style={styles.locationText}>San Diego, CA</Text>
            </View>*/}

            <View style={styles.inlineContainer}>
              <Text style={styles.incomingCallText}>
                {" "}
                {fmtMSS(this.props.elapsedTime)}
              </Text>
            </View>
          </View>
          <View style={styles.containerSwitch}>
            <Switch
              onValueChange={customerExtraTime =>
                this.props.updateSettings({
                  customerExtraTime: customerExtraTime
                })
              }
              value={this.props.customerExtraTime}
              onTintColor={Colors.onTintColor}
              thumbTintColor={Colors.thumbTintColor}
              tintColor={Colors.tintColor}
            />
            <Text style={styles.extraTime}> {I18n.t("allowExtraTime")}</Text>
          </View>
          <View style={styles.containerButtons}>
            <CallButton
              onPress={() => {
                if (typeof this.ref !== "string") this.ref.switchCamera();
              }}
              toggle={true}
              icon="camera-front"
              iconToggled="camera-rear"
              opacity={0.7}
              buttonSize={65}
              iconSize={30}
            />
            <CallButton
              onPress={() => {
                this.props.updateSettings({ speaker: !this.props.speaker });
              }}
              toggle={true}
              active={!this.props.speaker}
              icon="volume-up"
              iconToggled="volume-off"
              opacity={0.7}
              buttonSize={65}
              iconSize={30}
            />
            <CallButton
              onPress={() => {
                OpenTok.disconnect(this.props.customerTokboxSessionID);
                this.props.tokDisConnect(this.props.customerTokboxSessionID);
                this.props.EndCall(
                  this.props.sessionID,
                  "done",
                  this.props.token
                );
              }}
              buttonColor="red"
              toggle={false}
              icon="call-end"
              buttonSize={65}
              iconSize={30}
            />
            <CallButton
              onPress={() => {
                setPermission("microphone").then(response => {
                  if (response == "denied" || response == "restricted") {
                    displayOpenSettingsAlert();
                  }
                  this.props.updateSettings({
                    video: !this.props.mute
                  });
                });
              }}
              toggle={true}
              active={this.props.mute}
              icon="mic"
              iconToggled="mic-off"
              opacity={0.7}
              buttonSize={65}
              iconSize={30}
            />
            <CallButton
              onPress={() => {
                setPermission("camera").then(response => {
                  if (response == "denied" || response == "restricted") {
                    displayOpenSettingsAlert();
                  }
                  this.props.updateSettings({
                    video: !this.props.video
                  });
                });
              }}
              toggle={true}
              active={!this.props.video}
              icon="videocam"
              iconToggled="videocam-off"
              opacity={0.7}
              buttonSize={65}
              iconSize={30}
            />
          </View>
        </View>
        <KeepAwake />

        {this.props.tokboxStatus !== STATUS_TOKBOX.STREAM &&
          this.props.elapsedTime < 1 && (
            <View style={styles.containerContacting}>
              <ContactingLinguistView navigation={this.props.navigation} />
            </View>
          )}
      </View>
    );
  }
}

const mS = state => ({
  mute: state.callCustomerSettings.mute,
  video: state.callCustomerSettings.video,
  speaker: state.callCustomerSettings.speaker,
  timer: state.callCustomerSettings.timer,
  elapsedTime: state.callCustomerSettings.elapsedTime,
  sessionID: state.callCustomerSettings.sessionID,
  customerTokboxSessionID: state.callCustomerSettings.customerTokboxSessionID,
  customerTokboxSessionToken:
    state.callCustomerSettings.customerTokboxSessionToken,
  token: state.auth.token,
  tokboxStatus: state.tokbox.status,
  selectedScenarioId: state.contactLinguist.selectedScenarioId,
  selectedLanguageCode: state.contactLinguist.selectedLanguageCode,
  selectedCallTime: state.callCustomerSettings.selectedTime,
  customerExtraTime: state.callCustomerSettings.customerExtraTime,
  linguist: state.sessionInfo.linguist
});

const mD = {
  AsyncCreateSession,
  incrementTimer,
  updateSettings,
  resetTimerAsync,
  clearSettings,
  tokConnect,
  tokDisConnect,
  EndCall,
  clearCallSettings,
  AsyncCreateInvitation,
  GetSessionInfoLinguist
};

export default connect(mS, mD)(CustomerView);
