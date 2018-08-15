import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Alert } from "react-native";
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

import { TOKBOX_APIKEY } from "../../../Config/env";

import styles from "./styles";

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
        console.log("CONNECTION CREATED EVENT", event);
        timer.clearInterval("counterId");
        this.props.subscriberStart();
        this.props.updateContactLinguistSettings({
          modalContact: false
        });
        this.props.resetCounter();
      },
      connectionDestroyed: event => {
        console.log("CONNECTION DESTROYED EVENT", event);
      },
      error: event => {
        console.log("ERROR EVENT", event);
        this.props.errorEvent(event);
      },
      sessionConnected: () => {
        console.log("SESSION CONNECTED EVENT");
        this.props.connectionConnectedEvent();
      },
      sessionDisconnected: () => {
        console.log("SESSION DISCONNECTED EVENT");
        this.props.connectionDisconnectEvent();
      },
      sessionReconnected: () => {
        console.log("SESSION RECONNECTED EVENT");
        //this.props.videoState(true);
        SoundManager["Reconnected"].play();
        this.props.updateSettings({
          modalReconnect: false
        });
      },
      sessionReconnecting: () => {
        console.log("SESSION RECONNECTING EVENT");
      },
      signal: event => {
        console.log("SIGNAL EVENT", event);
        this.props.signalEvent(event);
        if (event.type == "WARNING") {
          this.props.updateSettings({
            signalVideoWarning: event.data
          });
        }
      },
      streamCreated: event => {
        console.log("STREAM CREATED EVENT", event);
        this.props.streamCreatedEvent(event);
      },
      streamDestroyed: event => {
        console.log("STREAM DESTROYED EVENT", event);
        this.props.streamDestroyedEvent(event);
      }
    };
  }

  render() {
    const {
      tokboxSessionID,
      tokboxSessionToken,
      disabledSubscriber,
      sessionInfoName,
      image,
      children,
      signal
    } = this.props;

    return (
      <View style={styles.sessionContainer}>
        {tokboxSessionID &&
          tokboxSessionToken && (
            <OTSession
              apiKey={TOKBOX_APIKEY}
              sessionId={tokboxSessionID}
              token={tokboxSessionToken}
              signal={signal}
              eventHandlers={this.sessionEvents}
            >
              <Publisher />
              <Subscriber />
              <NoVideoScreen
                image={image}
                sessionInfoName={sessionInfoName}
                disabledSubscriber={disabledSubscriber}
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

const mS = state => {
  return {
    tokboxSessionID: state.activeSessionReducer.tokboxID,
    tokboxSessionToken: state.activeSessionReducer.tokboxToken,
    signal: state.activeSessionReducer.signal,
    disabledSubscriber: state.activeSessionReducer.disabledSubscriber,
    visibility: state.contactLinguist.modalReconnect,
    counterId: state.contactLinguist.counterId
  };
};

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
