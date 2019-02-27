import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Alert, NetInfo } from "react-native";
import { OTSession } from "opentok-react-native";
import timer from "react-native-timer";

import NoVideoScreen from "../../NoVideoScreen/NoVideoScreen";
import CallAvatarName from "../../CallAvatarName/CallAvatarName";
import { Publisher, Subscriber } from "../../";
import SoundManager from "../../../Util/SoundManager";
import {
  connectionConnectedEvent,
  connectionDisconnectEvent,
  signalEvent,
  streamCreatedEvent,
  streamDestroyedEvent,
  errorEvent,
  subscriberStart,
  update as updateSettings,
  videoState
} from "../../../Ducks/ActiveSessionReducer";
import {
  updateSettings as updateContactLinguistSettings,
  resetCounter
} from "../../../Ducks/ContactLinguistReducer";
import { Platform } from "react-native";

import { TOKBOX_APIKEY } from "../../../Config/env";

import styles from "./styles";
import { recordSessionTokboxEvent, recordSessionEvent } from "../../../Util/Forensics";
import Sound from "react-native-sound";
import {SOUNDS} from "../../../Util/Constants";

class SessionBox extends Component {
  constructor(props) {
    super(props);
    this.sessionEvents = {
      archiveStarted: event => {
        console.log("ARCHIVE STARTED EVENT", event);
      },
      archiveStopped: event => {
        console.log(`ARCHIVE STOPPED EVENT ${event}`);
      },
      connectionCreated: event => {
        recordSessionTokboxEvent('session.connectionCreated', {
          sessionID: this.props.sessionID,
          event
        });
        console.log("CONNECTION CREATED EVENT", event);
        timer.clearInterval("counterId");
        this.props.subscriberStart();
        this.props.updateContactLinguistSettings({
          modalContact: false
        });
        this.props.resetCounter();
      },
      connectionDestroyed: event => {
        recordSessionTokboxEvent('session.connectionDestroyed', {
          sessionID: this.props.sessionID,
          event
        });
        console.log("CONNECTION DESTROYED EVENT", event);
        this.props.updateSettings({
          modalReconnect: true
        });
      },
      error: event => {
        recordSessionTokboxEvent('session.error', {
          sessionID: this.props.sessionID,
          event
        });
        console.log("SESSION ERROR EVENT", event);
        this.remountSessionOnError();
        this.props.errorEvent(event);
      },
      sessionConnected: () => {
        recordSessionTokboxEvent('session.sessionConnected', {sessionID: this.props.sessionID});
        console.log("SESSION CONNECTED EVENT");
        this.props.connectionConnectedEvent();
        this.props.updateSettings({
          modalReconnect: false
        });
      },
      sessionReconnected: () => {
        recordSessionTokboxEvent('session.sessionReconnected', {sessionID: this.props.sessionID});
        console.log("SESSION RECONNECTED EVENT");
        //this.props.videoState(true);
        const Reconnected = new Sound(SOUNDS.RECONNECTED, Sound.MAIN_BUNDLE, error => {
          if (error) {
            console.log("error loading sound", error);
            return;
          }
          Reconnected.play();
        });
        this.props.updateSettings({
          modalReconnect: false
        });
      },
      sessionDisconnected: () => {
        recordSessionTokboxEvent('session.sessionDisconnected', {sessionID: this.props.sessionID});
        console.log("SESSION DISCONNECTED EVENT");
        this.props.connectionDisconnectEvent();
      },
      sessionReconnecting: () => {
        recordSessionTokboxEvent('session.sessionReconnecting', {sessionID: this.props.sessionID});
        console.log("SESSION RECONNECTING EVENT");
      },
      signal: event => {
        console.log("SIGNAL EVENT", event);
        recordSessionTokboxEvent('session.signal', {
          sessionID: this.props.sessionID,
          event
        });
        this.props.signalEvent(event);
        if (event.type == "WARNING") {
          this.props.updateSettings({
            signalVideoWarning: event.data
          });
        }
      },
      streamCreated: event => {
        recordSessionTokboxEvent('session.streamCreated', {
          sessionID: this.props.sessionID,
          event
        });
        console.log("STREAM CREATED EVENT", event);
        this.props.streamCreatedEvent(event);
      },
      streamDestroyed: event => {
        recordSessionTokboxEvent('session.streamDestroyed', {
          sessionID: this.props.sessionID,
          event
        });
        console.log("STREAM DESTROYED EVENT", event);
        this.props.streamDestroyedEvent(event);
      }
    };
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  componentWillMount() {
    recordSessionEvent('componentWillMount', {sessionID: this.props.sessionID});
  }

  componentWillUnmount() {
    recordSessionEvent('componentWillUnmount', {sessionID: this.props.sessionID});
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectivityChange
    );
  }

  handleConnectivityChange = isConnected => {
    const { updateSettings } = this.props;
    console.log("Session is: ", isConnected);
    if (isConnected) {
      updateSettings({
        isConnectedToInternet: isConnected,
        modalReconnect: false
      });
    } else {
      updateSettings({
        isConnectedToInternet: isConnected,
        modalReconnect: true
      });
    }
  };

  remountSessionOnError = () => {
    const { updateSettings } = this.props;
    updateSettings({
      isConnectedToInternet: false
    });
    setTimeout(() => {
      updateSettings({
        isConnectedToInternet: true
      });
    }, 1000);
  };

  render() {
    const {
      tokboxSessionID,
      tokboxSessionToken,
      disabledSubscriber,
      sessionInfoName,
      image,
      children,
      signal,
      isConnectedToInternet,
      publisherSubscriberError,
      video,
      avModePreference
    } = this.props;

    return (
      <View style={styles.sessionContainer}>
        {tokboxSessionID && tokboxSessionToken && isConnectedToInternet && (

          <OTSession
            apiKey={TOKBOX_APIKEY}
            sessionId={tokboxSessionID}
            token={tokboxSessionToken}
            signal={signal}
            eventHandlers={this.sessionEvents}
          >
            {publisherSubscriberError ? (
              <View />
            ) : (
              <Publisher
                sessionID={this.sessionID}
                remountComponent={this.remountPublisherAndSubscriber}
              />
            )}
            {publisherSubscriberError ? (
              <View />
            ) : (
              <Subscriber
                sessionID={this.sessionID}
                remountComponent={this.remountPublisherAndSubscriber}
              />
            )}
            <NoVideoScreen
              image={image}
              sessionInfoName={sessionInfoName}
              disabledSubscriber={disabledSubscriber}
              video={video}
              avModePreference={avModePreference}
            />
          </OTSession>
        )}
        <View style={styles.containerCall}>
          <CallAvatarName
            imageSource={image}
            sessionInfoName={sessionInfoName}
            disabledSubscriber={disabledSubscriber}
          />
          {children}
        </View>
      </View>
    );
  }
}

const mS = state => ({
  sessionID: state.activeSessionReducer.sessionID,
  tokboxSessionID: state.activeSessionReducer.tokboxID,
  tokboxSessionToken: state.activeSessionReducer.tokboxToken,
  signal: state.activeSessionReducer.signal,
  disabledSubscriber: state.activeSessionReducer.disabledSubscriber,
  visibility: state.contactLinguist.modalReconnect,
  counterId: state.contactLinguist.counterId,
  isConnectedToInternet: state.activeSessionReducer.isConnectedToInternet,
  publisherSubscriberError: state.activeSessionReducer.publisherSubscriberError,
  video: state.activeSessionReducer.video, 
  avModePreference: state.newSessionReducer.session.avModePreference
});

const mD = {
  errorEvent,
  videoState,
  connectionConnectedEvent,
  connectionDisconnectEvent,
  signalEvent,
  streamCreatedEvent,
  streamDestroyedEvent,
  subscriberStart,
  updateSettings,
  updateContactLinguistSettings,
  resetCounter
};

const SessionHandler = connect(
  mS,
  mD
)(SessionBox);

export { SessionHandler };
