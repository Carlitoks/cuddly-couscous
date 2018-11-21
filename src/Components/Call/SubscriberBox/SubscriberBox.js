import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Alert } from "react-native";
import { OTSubscriber as SubscriberTokbox } from "opentok-react-native";
import SoundManager from "../../../Util/SoundManager";
import I18n from "../../../I18n/I18n";
import { SETTINGS, VIDEO_WARNING } from "../../../Util/Constants";
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
        console.log("CONNECTED EVENT");
        this.props.update({
          modalReconnect: false
        });
        this.setState({ subscriberError: false });
      },
      disconnected: () => {
        console.log("DISCONNECTED EVENT");
        SoundManager["Disconnected"].play();
        this.props.update({
          modalReconnect: true
        });
      },
      error: event => {
        console.log("SUBSCRIBER ERROR EVENT", event);
        this.props.errorEvent(event);
        this.props.remountPublisherAndSubscriber();
      },
      videoDataReceived: () => {
        if (this.props.visibility) {
          this.props.update({
            modalReconnect: false
          });
        }
      },
      videoDisabled: event => {
        console.log(`VIDEO DISABLED EVENT ${event}`);
        this.props.videoState(true);
        this.props.update({
          modalReconnect: false
        });
      },
      videoDisableWarning: () => {
        console.log("VIDEO DISABLED WARNING EVENT");
        this.props.updateVideoWarningEvent(
          VIDEO_WARNING.TYPE,
          VIDEO_WARNING.ENABLED
        );
        this.props.videoState(true);
      },
      videoDisableWarningLifted: () => {
        console.log("VIDEO DISABLED WARNING LIFTED EVENT");
        this.props.updateVideoWarningEvent(
          VIDEO_WARNING.TYPE,
          VIDEO_WARNING.DISABLED
        );
        this.props.videoState(false);
      },
      videoEnabled: event => {
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
