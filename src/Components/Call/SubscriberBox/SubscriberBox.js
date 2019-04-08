import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Alert } from "react-native";
import { OTSubscriber as SubscriberTokbox } from "opentok-react-native";
import SoundManager, {playSound} from "../../../Util/SoundManager";
import I18n from "../../../I18n/I18n";
import {SETTINGS, SOUNDS, VIDEO_WARNING} from "../../../Util/Constants";
import {
  updateSettings as updateCustomerSettings,
  resetReconnectCounter
} from "../../../Ducks/ContactLinguistReducer";

import {
  videoState,
  update,
  updateVideoWarningEvent,
  errorEvent,
  remountPublisherAndSubscriber
} from "../../../Ducks/ActiveSessionReducer";

import styles from "./styles";
import { recordSessionOpentokEvent } from "../../../Util/Forensics";
import Sound from "react-native-sound";

class SubscriberBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriberError: false
    };
    this.subscriberEvents = {
      audioLevel: event => {
        //console.log(`AUDIO LEVEL EVENT ${event}`);
      },
      audioNetworkStats: event => {
        //console.log("AUDIO STATS EVENT", event);
      },
      connected: () => {
        recordSessionOpentokEvent('subscriber.connected', {sessionID: this.props.sessionID});
        console.log("CONNECTED EVENT");
        this.props.update({
          modalReconnect: false
        });
        this.setState({ subscriberError: false });
      },
      disconnected: () => {
        recordSessionOpentokEvent('subscriber.disconnected', {sessionID: this.props.sessionID});
        console.log("DISCONNECTED EVENT");
        //playSound(SOUNDS.DISCONNECTED);
        this.props.update({
          modalReconnect: true
        });
      },
      error: event => {
        recordSessionOpentokEvent('subscriber.error', {
          sessionID: this.props.sessionID,
          event
        });
        console.log("SUBSCRIBER ERROR EVENT", event);
        this.props.errorEvent(event);
        this.props.remountPublisherAndSubscriber();
      },
      videoDataReceived: () => {
        // NOTE: not recording this in forensics due to frequency of calls
        if (this.props.visibility) {
          this.props.update({
            modalReconnect: false
          });
        }
      },
      videoDisabled: event => {
        recordSessionOpentokEvent('subscriber.videoDisabled', {
          sessionID: this.props.sessionID,
          event
        });
        console.log(`VIDEO DISABLED EVENT ${event}`);
        this.props.videoState(true);
        this.props.update({
          modalReconnect: false
        });
      },
      videoDisableWarning: () => {
        recordSessionOpentokEvent('subscriber.videoDisableWarning', {sessionID: this.props.sessionID});
        console.log("VIDEO DISABLED WARNING EVENT");
        this.props.updateVideoWarningEvent(
          VIDEO_WARNING.TYPE,
          VIDEO_WARNING.ENABLED
        );
        this.props.videoState(true);
      },
      videoDisableWarningLifted: () => {
        recordSessionOpentokEvent('subscriber.videoDisableWarningLifted', {sessionID: this.props.sessionID});
        console.log("VIDEO DISABLED WARNING LIFTED EVENT");
        this.props.updateVideoWarningEvent(
          VIDEO_WARNING.TYPE,
          VIDEO_WARNING.DISABLED
        );
        this.props.videoState(false);
      },
      videoEnabled: event => {
        recordSessionOpentokEvent('subscriber.videoEnabled', {
          sessionID: this.props.sessionID,
          event
        });
        console.log(`VIDEO ENABLED EVENT ${event}`);
        this.props.videoState(false);
        this.props.update({
          modalReconnect: false
        });
      },
      videoNetworkStats: event => {
        //console.log("VIDEO STATS EVENT", event);
      }
    };
  }

  render() {
    const { speaker, publisherSubscriberError } = this.props;
    return (
      <View style={styles.backgroundContainer}>
        {!publisherSubscriberError && (
          <SubscriberTokbox
            style={styles.background}
            eventHandlers={this.subscriberEvents}
            properties={{ subscribeToAudio: false, subscribeToVideo: true }}
          />
        )}
      </View>
    );
  }
}

const mS = state => ({
  speaker: state.activeSessionReducer.speaker,
  visibility: state.activeSessionReducer.modalReconnect,
  publisherSubscriberError: state.activeSessionReducer.publisherSubscriberError
});

const mD = {
  videoState,
  update,
  updateVideoWarningEvent,
  remountPublisherAndSubscriber,
  errorEvent
};

const Subscriber = connect(
  mS,
  mD
)(SubscriberBox);

export { Subscriber };
