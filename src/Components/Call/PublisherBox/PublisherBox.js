import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Alert, Platform } from "react-native";
import { OTPublisher as PublisherTokbox } from "opentok-react-native";

import {
  errorEvent,
  publisherStart,
  remountPublisherAndSubscriber
} from "../../../Ducks/ActiveSessionReducer";

import { SETTINGS, CAMERA } from "../../../Util/Constants";

import styles from "./styles";
import { recordSessionOpentokEvent, recordSessionEvent } from "../../../Util/Forensics";

class PublisherBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publisherError: false
    };
    this.publisherEvents = {
      audioLevel: event => {
        //console.log(`AUDIO LEVEL EVENT  publisher ${event}`);
      },
      error: event => {
        recordSessionOpentokEvent('publisher.error', {
          sessionID: this.props.sessionID,
          event
        });
        console.log("PUBLISHER ERROR EVENT", event);
        this.props.errorEvent(event);
        this.props.remountPublisherAndSubscriber();
      },
      streamCreated: event => {
        recordSessionOpentokEvent('publisher.streamCreated', {
          sessionID: this.props.sessionID,
          event
        });
        console.log("STREAM CREATED EVENT", event);
        this.props.publisherStart();
      },
      streamDestroyed: event => {
        recordSessionOpentokEvent('publisher.streamDestroyed', {
          sessionID: this.props.sessionID,
          event
        });
        console.log("STREAM DESTROYED EVENT", event);
      }
    };

    recordSessionEvent("publisherBox.constructor", {
      mic: props.mic,
      video: props.video
    });
  }

  componentDidUpdate (prevProps) {
    if (
      this.props.mic != prevProps.mic ||
      this.props.video != prevProps.video
    ) {
      recordSessionEvent("publisherBox.componentDidUpdate", {
        mic: this.props.mic,
        video: this.props.video
      });
    }
  }

  render() {
    const {
      mic,
      video,
      tokboxSessionID,
      rotate,
      publisherSubscriberError
    } = this.props;
    return (
      <View style={video ? styles.publisherBox : styles.hidePublisherBox}>
        {!publisherSubscriberError && (
          <PublisherTokbox
            style={styles.publisher}
            properties={{
              publishAudio: mic,
              publishVideo: video,
              cameraPosition: rotate ? CAMERA.FRONT : CAMERA.BACK
            }}
            eventHandlers={this.publisherEvents}
          />
        )}
      </View>
    );
  }
}

const mS = state => ({
  mic: state.activeSessionReducer.mic,
  video: state.activeSessionReducer.video,
  rotate: state.activeSessionReducer.rotate,
  tokboxSessionID: state.activeSessionReducer.tokboxID,
  tokboxStatus: state.activeSessionReducer.status,
  publisherSubscriberError: state.activeSessionReducer.publisherSubscriberError
});

const mD = {
  publisherStart,
  errorEvent,
  remountPublisherAndSubscriber
};

const Publisher = connect(
  mS,
  mD
)(PublisherBox);

export { Publisher };
