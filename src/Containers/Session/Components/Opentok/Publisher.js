import React, {Component} from "react";
import {View} from "react-native";
import {OTPublisher} from "opentok-react-native";
import styles from "./styles";

import { recordSessionOpentokEvent, createRecorder } from "../../../../Util/Forensics";

let recordComponentEvent = () => {};

export class Publisher extends Component {
  constructor(props) {
    super(props);
    recordComponentEvent = createRecorder(`session.Opentok.Publisher.`, {sessionID: this.props.session.id});
    recordComponentEvent('constructor');

    this.mounted = true;

    // tokbox event handlers: https://github.com/opentok/opentok-react-native/blob/master/docs/OTPublisher.md#events
    this.eventHandlers = {
      audioLevel: (event) => { this.onAudioLevel(event); },
      error: (event) => { this.onError(event); },
      streamCreated: (event) => { this.onStreamCreated(event); },
      streamDestroyed: (event) => { this.onStreamDestroyed(event); },
    };
  }

  componentWillUnmount () {
    recordComponentEvent('componentWillUnmount');
    this.mounted = false;
  }

  onAudioLevel (event) {
    // NOTE: not recording in forensics, because called to frequently
    // console.log("publisher.audioLevel", event);
  }

  onError (event) {
    recordSessionOpentokEvent('publisher.error', {
      event,
      sessionID: this.props.session.id
    });

    if (!this.mounted) {
      return;
    }

    this.props.onError(event);
  }

  onStreamCreated (event) {
    recordSessionOpentokEvent('publisher.streamCreated', {
      event,
      sessionID: this.props.session.id
    });

    if (!this.mounted) {
      return;
    }

    this.props.onStreamCreated(event);
  }

  onStreamDestroyed (event) {
    recordSessionOpentokEvent('publisher.streamDestroyed', {
      event,
      sessionID: this.props.session.id
    });

    if (!this.mounted) {
      return;
    }

    this.props.onStreamDestroyed(event);
  }

  render () {
    const {status, session} = this.props;
    const {controls} = this.props.localUserState;
    const enabled = (controls.videoEnabled || controls.cameraFlipEnabled) && status.began;
    const containerStyles = enabled ? styles.publisherContainerEnabled : styles.publisherContainerDisabled;
    const publisherStyles = enabled ? styles.publisherEnabled : styles.publisherDisabled;

    return (
      <View style={containerStyles}>
      {!status.ending && (
        <OTPublisher
          style={publisherStyles}
          eventHandlers = { this.eventHandlers }
          properties= {{
            audioFallbackEnabled: true,
            publishAudio: controls.micEnabled,
            publishVideo: controls.videoEnabled || controls.cameraFlipEnabled,
            videoSource: 'camera',
            cameraPosition: controls.cameraFlipEnabled ? 'back' : 'front'
          }}
        />
      )}
      </View>
    );
  }
};