import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Alert } from "react-native";
import { OTPublisher as PublisherTokbox } from "opentok-react-native";

import { errorEvent, publisherStart } from "../../../Ducks/tokboxReducer";

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
          style={styles.publisher}
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

const mS = state => {
  const settings = state.userProfile.linguistProfile
    ? SETTINGS.LINGUIST
    : SETTINGS.CUSTOMER;
  return {
    mic: state[settings].mic,
    video: state[settings].video,
    rotate: state[settings].rotate,
    tokboxSessionID: state.tokbox.tokboxID,
    tokboxStatus: state.tokbox.status
  };
};

const mD = {
  publisherStart
};

const Publisher = connect(
  mS,
  mD
)(PublisherBox);

export { Publisher };
