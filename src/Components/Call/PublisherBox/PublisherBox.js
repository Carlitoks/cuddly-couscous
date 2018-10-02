import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Alert, Platform } from "react-native";
import { OTPublisher as PublisherTokbox } from "opentok-react-native";

import {
  errorEvent,
  publisherStart
} from "../../../Ducks/ActiveSessionReducer";

import { SETTINGS, CAMERA } from "../../../Util/Constants";

import styles from "./styles";

class PublisherBox extends Component {
  constructor(props) {
    super(props);
    this.publisherEvents = {
      audioLevel: event => {
        //console.log(`AUDIO LEVEL EVENT  publisher ${event}`);
      },
      error: event => {
        console.log("ERROR EVENT", event);
        this.props.errorEvent(event);
      },
      streamCreated: event => {
        console.log("STREAM CREATED EVENT", event);
        this.props.publisherStart();
      },
      streamDestroyed: event => {
        console.log("STREAM DESTROYED EVENT", event);
      }
    };
  }

  render() {
    const { mic, video, tokboxSessionID, rotate } = this.props;
    return (
      <View style={video ? styles.publisherBox : styles.hidePublisherBox}>
        <PublisherTokbox
          style={(Platform.OS === 'android' && Platform.Version > 25 ) ? {} : styles.publisher}
          properties={{
            publishAudio: mic,
            publishVideo: video,
            cameraPosition: rotate ? CAMERA.FRONT : CAMERA.BACK
          }}
          eventHandlers={this.publisherEvents}
        />
      </View>
    );
  }
}

const mS = state => ({
  mic: state.activeSessionReducer.mic,
  video: state.activeSessionReducer.video,
  rotate: state.activeSessionReducer.rotate,
  tokboxSessionID: state.activeSessionReducer.tokboxID,
  tokboxStatus: state.activeSessionReducer.status
});

const mD = {
  publisherStart
};

const Publisher = connect(
  mS,
  mD
)(PublisherBox);

export { Publisher };
