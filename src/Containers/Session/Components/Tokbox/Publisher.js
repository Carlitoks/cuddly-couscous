import React, {Component} from "react";
import {View} from "react-native";
import {OTPublisher} from "opentok-react-native";
import styles from "./styles";

import { recordSessionTokboxEvent } from "../../../../Util/Forensics";

export class Publisher extends Component {
  constructor(props) {
    super(props);

    this.mounted = true;

    // tokbox event handlers: https://github.com/opentok/opentok-react-native/blob/master/docs/OTPublisher.md#events
    this.eventHandlers = {
      audioLevel: (event) => { this.onAudioLevel(event); },
      error: (event) => { this.onError(event); },
      streamCreated: (event) => { this.onStreamCreated(event); },
      streamDestroyed: (event) => { this.onStreamDestroyed(event); },
    };

    console.log("publisher.constructor");
  }

  componentWillUnmount () {
    this.mounted = false;
    console.log("publisher.componentWillUnmount");
  }

  onAudioLevel (event) {
    // NOTE: not recording in forensics, because called to frequently
    // console.log("publisher.audioLevel", event);
  }

  onError (event) {
    recordSessionTokboxEvent('publisher.error', {
      event,
      sessionID: this.props.session.id
    });

    if (!this.mounted) {
      return;
    }

    this.props.onError(event);
  }

  onStreamCreated (event) {
    recordSessionTokboxEvent('publisher.streamCreated', {
      event,
      sessionID: this.props.session.id
    });

    if (!this.mounted) {
      return;
    }

    this.props.onStreamCreated(event);
  }

  onStreamDestroyed (event) {
    recordSessionTokboxEvent('publisher.streamDestroyed', {
      event,
      sessionID: this.props.session.id
    });

    if (!this.mounted) {
      return;
    }

    this.props.onStreamDestroyed(event);
  }

  render () {
    const {status, localUserState} = this.props;
    const enabled = localUserState.controls.videoEnabled && status.began;
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
            publishAudio: localUserState.controls.micEnabled,
            publishVideo: localUserState.controls.videoEnabled,
            videoSource: 'camera',
            cameraPosition: localUserState.controls.cameraFlipEnabled ? 'back' : 'front'
          }}
        />
      )}
      </View>
    );
  }
};