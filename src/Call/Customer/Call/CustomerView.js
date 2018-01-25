import React, { Component, Ref } from "react";
import { connect } from "react-redux";
import OpenTok, { Publisher, Subscriber } from "react-native-opentok";
import KeepAwake from "react-native-keep-awake";

import {
  updateSettings,
  AsyncCreateSession,
  AsyncCreateInvitation,
  incrementTimer,
  resetTimerAsync,
  clearSettings,
  EndCall
} from "../../../Ducks/CallCustomerSettings";
import { tokConnect, tokDisConnect } from "../../../Ducks/tokboxReducer";
import { clearSettings as clearCallSettings } from "../../../Ducks/ContactLinguistReducer";

import { AppRegistry, Button, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { CallButton } from "../../../Components/CallButton/CallButton";

import { Colors, Images } from "../../../Themes";
import { fmtMSS } from "../../../Util/Helpers";
import styles from "./styles";

import EN from "../../../I18n/en";
import ContactingLinguistView from "../ContactingLinguist/ContactingLinguistView";
import { 
  EmitLocalCallNotification,
  CleanCallNotifications
} from '../../../Util/Notifications';
import {
  BackgroundInterval,
  BackgroundCleanInterval,
  BackgroundStart
} from "../../../Util/Background"


const STATUS_TOKBOX = {
  DISCONECTED: 0,
  CONECTED: 1,
  ERROR: 2,
  STREAM: 3
};

class CustomerView extends Component {
  ref: Ref<Publisher>;

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

     /*if (InCallManager.recordPermission !== "granted") {
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
    }*/

    // Generate calling notification
    EmitLocalCallNotification({
      title: "Call", 
      message: EN["contacting"]+" ..."
    });
    
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

  componentWillMount(){
    BackgroundStart()
  }

  componentWillUnmount() {
    BackgroundCleanInterval(this.props.timer);
    this.props.resetTimerAsync();
    this.props.clearCallSettings();
   // InCallManager.stop();
   console.log("componentWillUnmount");
  }

  startTimer = () => {
    const {
      sessionID, 
      token,
      selectedCallTime
    } = this.props;
    const callTime = selectedCallTime * 60

    this.props.updateSettings({
      timer: BackgroundInterval(() => {
        console.log("Backgorund Interval");
        if (this.props.elapsedTime > callTime) {
          OpenTok.disconnect(this.props.customerTokboxSessionID);
          this.props.tokDisConnect(this.props.customerTokboxSessionID);
          this.props.EndCall(sessionID, "done", token);
        } else {
          this.props.incrementTimer();
          const min = (this.props.elapsedTime/60).toFixed(0)
          const sec = this.props.elapsedTime%60

          EmitLocalCallNotification({
            title: EN["call"], 
            message: EN["callInProgress"] + " " + (min < 10 ? "0" : "") + min +":"+ (sec < 10 ? "0" : "") + sec 
          });
        }
      }, 1000)
    });
  };

  render() {
    return (
      <View 
        style={
            styles.containerT 
        }
      >
        <View  
          style={ 
            this.props.tokboxStatus === STATUS_TOKBOX.STREAM ? 
              styles.containerCall : styles.containerHiddenCall 
          }
        >
          <View style={styles.backgroundContainer}>
            {this.props.customerTokboxSessionID && (
              <Subscriber
                sessionId={this.props.customerTokboxSessionID}
                style={styles.background}
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
            <View style={styles.inlineContainer}>
              <Image
                style={styles.smallAvatar}
                source={require("../../../Images/smallAvatar.png")}
              />
            </View>
            <Text style={styles.callerNameText}> Caroline C. </Text>

            <View style={styles.inlineContainer}>
              <Icon style={styles.icon} size={25} name="room" />
              <Text style={styles.locationText}>San Diego, CA</Text>
            </View>

            <View style={styles.inlineContainer}>
              <Text style={styles.incomingCallText}>
                {" "}
                {fmtMSS(this.props.elapsedTime)}
              </Text>
            </View>
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
                // InCallManager.setForceSpeakerphoneOn(!this.props.speaker);
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
                this.props.updateSettings({ mute: !this.props.mute });
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
                this.props.updateSettings({ video: !this.props.video });
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
        
        {((this.props.tokboxStatus !== STATUS_TOKBOX.STREAM) && (this.props.elapsedTime < 1)) && (
        <View style={styles.containerContacting}>
          <ContactingLinguistView navigation={this.props.navigation}/>
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
  selectedCallTime: state.contactLinguist.selectedTime
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
  AsyncCreateInvitation
};

export default connect(mS, mD)(CustomerView);
