import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Alert } from "react-native";
import { OTSubscriber as SubscriberTokbox } from "opentok-react-native";
import SoundManager from "../../../Util/SoundManager";
import { videoState } from "../../../Ducks/tokboxReducer";
import I18n from "../../../I18n/I18n";
import { SETTINGS } from "../../../Util/Constants";
import {
  updateSettings,
  clearSettings,
  resetReconnectCounter
} from "../../../Ducks/ContactLinguistReducer";

import styles from "./styles";

class SubscriberBox extends Component {
  constructor(props) {
    super(props);
    this.subscriberEvents = {
      audioLevel: event => {
        //console.log(`AUDIO LEVEL EVENT ${event}`);
      },
      audioNetworkStats: event => {
        //console.log("AUDIO STATS EVENT", event);
      },
      connected: () => {
        console.log("CONNECTED EVENT");
      },
      disconnected: () => {
        console.log("DISCONNECTED EVENT");
        SoundManager["Disconnected"].play();
        Alert.alert(I18n.t("waitingYourConnection"));
      },
      error: event => {
        console.log("ERROR EVENT", event);
      },
      videoDataReceived: () => {
        console.log("VIDEO RECEIVED EVENT");
      },
      videoDisabled: event => {
        console.log(`VIDEO DISABLED EVENT ${event}`);
        this.props.videoState(true);
      },
      videoDisableWarning: () => {
        console.log("VIDEO DISABLED WARNING EVENT");
        this.props.videoState(true);
      },
      videoDisableWarningLifted: () => {
        console.log("VIDEO DISABLED WARNING LIFTED EVENT");
        this.props.videoState(false);
      },
      videoEnabled: event => {
        console.log(`VIDEO ENABLED EVENT ${event}`);
        this.props.videoState(false);
      },
      videoNetworkStats: event => {
        //console.log("VIDEO STATS EVENT", event);
      }
    };
  }

  render() {
    const { speaker } = this.props;
    return (
      <View style={styles.backgroundContainer}>
        <SubscriberTokbox
          style={styles.background}
          eventHandlers={this.subscriberEvents}
          properties={{ subscribeToAudio: false, subscribeToVideo: true }}
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
    speaker: state[settings].speaker
  };
};

const mD = {
  videoState,
  updateSettings
};

const Subscriber = connect(
  mS,
  mD
)(SubscriberBox);

export { Subscriber };
