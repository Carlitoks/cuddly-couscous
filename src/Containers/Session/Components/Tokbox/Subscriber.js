import React, {Component} from "react";
import {View} from "react-native";
import {OTSubscriber} from "opentok-react-native";
import styles from "./styles";

import { recordSessionTokboxEvent } from "../../../Util/Forensics";

export class Subscriber extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.eventHandlers = {
      audioLevel: (event) => {
      },
      audioNetworkStats: (event) => {
      },
      videoNetworkStats: (event) => {
      },
      connected: () => {
        recordSessionTokboxEvent('subscriber.connected', {
          sessionID: this.props.session.id
        });
      },
      disconnected: () => {
        recordSessionTokboxEvent('subscriber.disconnected', {
          sessionID: this.props.session.id
        });
      },
      error: (event) => {
        recordSessionTokboxEvent('subscriber.error', {
          event,
          sessionID: this.props.session.id
        });
      },
      videoDataReceived: () => {
        recordSessionTokboxEvent('subscriber.videoDataReceived', {
          sessionID: this.props.session.id
        });
      },
      videoDisabled: (event) => {
        recordSessionTokboxEvent('subscriber.videoDisabled', {
          event,
          sessionID: this.props.session.id
        });
      },
      videoDisableWarning: () => {
        recordSessionTokboxEvent('subscriber.videoDisableWarning', {
          sessionID: this.props.session.id
        });
      },
      videoDisableWarningLifted: () => {
        recordSessionTokboxEvent('subscriber.videoDisableWarningLifted', {
          sessionID: this.props.session.id
        });
      },
      videoEnabled: (event) => {
        recordSessionTokboxEvent('subscriber.videoEnabled', {
          event,
          sessionID: this.props.session.id
        });
      },
    };
  }

  render () {
    return (
      <View style={styles.subscriberContainer}>
        <OTSubscriber
          style={styles.subscriber}
          eventHandlers = { this.eventHandlers }
        />
      </View>
    );
  }
};