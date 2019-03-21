import React, {Component} from "react";
import {View} from "react-native";
import {OTSubscriber} from "opentok-react-native";
import styles from "./styles";

import { recordSessionTokboxEvent } from "../../../../Util/Forensics";

export class Subscriber extends Component {
  constructor(props) {
    super(props);
    this.mounted = true;

    this.subscriberProperties = {
      subscribeToAudio: false,
      subscribeToVideo: true,
    };

    // have we initially received any video?
    this.receiving = false;

    // tokbox event handlers: https://github.com/opentok/opentok-react-native/blob/master/docs/OTSubscriber.md#events
    this.eventHandlers = {
      audioLevel: (event) => { this.onAudioLevel(event); },
      audioNetworkStats: (event) => { this.onAudioNetworkStats(event); },
      videoNetworkStats: (event) => { this.onVideoNetworkStats(event); },
      connected: () => { this.onConnected(); },
      disconnected: () => { this.onDisconnected(); },
      error: (event) => { this.onError(event); },
      videoDataReceived: () => { this.onVideoDataReceived(); },
      videoDisabled: (event) => { this.onVideoDisabled(event); },
      videoDisableWarning: () => { this.onVideoDisableWarning(); },
      videoDisableWarningLifted: () => { this.onVideoDisableWarningLifted(); },
      videoEnabled: (event) => { this.onVideoEnabled(event); },
    };

    console.log("subscriber.constructor");
  }

  componentWillUnmount () {
    this.mounted = false;
    console.log("subscriber.componentWillUnmount");
  }

  onAudioLevel (event) {

  }

  onAudioNetworkStats (event) {

  }

  onVideoNetworkStats (event) {

  }

  onConnected () {
    recordSessionTokboxEvent('subscriber.connected', {
      sessionID: this.props.session.id
    });
  }

  onDisconnected () {
    recordSessionTokboxEvent('subscriber.disconnected', {
      sessionID: this.props.session.id
    });
  }

  onError (event) {
    recordSessionTokboxEvent('subscriber.error', {
      event,
      sessionID: this.props.session.id
    });
    this.props.onError(event);
  }

  onVideoDataReceived () {
    // NOTE: not recording forensics for this on every call on purpose, it gets called on every frame

    // NOTE: also tried to using this as the trigger for props.onReceiving - that led to major instability

    if (this.receiving) {
      return;
    }
    this.receiving = true;
    recordSessionTokboxEvent('subscriber.videoDataReceived', {
      sessionID: this.props.session.id
    });
    this.props.onReceiving();
  }

  onVideoDisabled (event) {
    recordSessionTokboxEvent('subscriber.videoDisabled', {
      event,
      sessionID: this.props.session.id
    });
    this.props.onVideoDisabled(event);
  }

  onVideoDisableWarning () {
    recordSessionTokboxEvent('subscriber.videoDisableWarning', {
      sessionID: this.props.session.id
    });
    this.props.onVideoDisableWarning();
  }

  onVideoDisableWarningLifted () {
    recordSessionTokboxEvent('subscriber.videoDisableWarningLifted', {
      sessionID: this.props.session.id
    });
    this.props.onVideoDisableWarningLifted();    
  }

  onVideoEnabled (event) {
    recordSessionTokboxEvent('subscriber.videoEnabled', {
      event,
      sessionID: this.props.session.id
    });
    this.props.onVideoEnabled(event);
  }

  render () {
    const {status} = this.props;

    return (
      <View style={styles.subscriberContainer}>
      {!status.ending && (
        <OTSubscriber
          style = { styles.subscriber }
          properties = { this.subscriberProperties }
          eventHandlers = { this.eventHandlers }
          streamProperties = { this.props.streamProperties }
        />
      )}
      </View>
    );
  }
};
