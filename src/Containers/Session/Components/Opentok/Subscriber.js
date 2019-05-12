import React, {Component} from "react";
import {View} from "react-native";
import {OTSubscriber} from "opentok-react-native";
import styles from "./styles";

import { recordSessionOpentokEvent, createRecorder } from "../../../../Util/Forensics";

let recordComponentEvent = () => {};

export class Subscriber extends Component {
  constructor(props) {
    super(props);
    recordComponentEvent = createRecorder(`session.Opentok.Subscriber.`, {sessionID: this.props.session.id});
    recordComponentEvent('constructor');

    this.mounted = true;

    // sort of a hack for https://github.com/opentok/opentok-react-native/issues/271
    this.disableListeners = false;

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
      otrnError: (e) => { this.onOtrnError(e); },
      videoDataReceived: () => { this.onVideoDataReceived(); },
      videoDisabled: (event) => { this.onVideoDisabled(event); },
      videoDisableWarning: () => { this.onVideoDisableWarning(); },
      videoDisableWarningLifted: () => { this.onVideoDisableWarningLifted(); },
      videoEnabled: (event) => { this.onVideoEnabled(event); },
    };
  }

  componentWillUnmount () {
    recordComponentEvent('componentWillUnmount');
    this.mounted = false;
    this.disableListeners = true;
  }

  onAudioLevel (event) {

  }

  onAudioNetworkStats (event) {

  }

  onVideoNetworkStats (event) {

  }

  onConnected () {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('subscriber.connected', {
      sessionID: this.props.session.id
    });

    // check if it's an audio-only call initially
    if ("audio" === this.props.session.avModePreference) {
      this.receiving = true;
      this.props.onReceiving();
    }
  }

  onDisconnected () {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('subscriber.disconnected', {
      sessionID: this.props.session.id
    });
    this.receiving = false;
  }

  onError (event) {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('subscriber.error', {
      event,
      sessionID: this.props.session.id
    });
    this.props.onError(event);
  }

  onOtrnError (e) {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('subscriber.otrnError', {
      error: e,
      sessionID: this.props.session.id
    });
  }  

  onVideoDataReceived () {
    if (this.disableListeners) {
      return;
    }
    // NOTE: not recording forensics for this on every call on purpose, it gets called on every frame

    // NOTE: also tried to using this as the trigger for props.onReceiving - that led to major instability

    if (this.receiving) {
      return;
    }
    this.receiving = true;
    recordSessionOpentokEvent('subscriber.videoDataReceived', {
      sessionID: this.props.session.id
    });
    this.props.onReceiving();
  }

  onVideoDisabled (event) {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('subscriber.videoDisabled', {
      event,
      sessionID: this.props.session.id
    });
    this.props.onVideoDisabled(event);
  }

  onVideoDisableWarning () {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('subscriber.videoDisableWarning', {
      sessionID: this.props.session.id
    });
    this.props.onVideoDisableWarning();
  }

  onVideoDisableWarningLifted () {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('subscriber.videoDisableWarningLifted', {
      sessionID: this.props.session.id
    });
    this.props.onVideoDisableWarningLifted();    
  }

  onVideoEnabled (event) {
    if (this.disableListeners) {
      return;
    }
    recordSessionOpentokEvent('subscriber.videoEnabled', {
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
