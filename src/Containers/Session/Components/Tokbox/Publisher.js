import React, {Component} from "react";
import {View} from "react-native";
import {OTPublisher} from "opentok-react-native";
import styles from "./styles";

import { recordSessionTokboxEvent } from "../../../Util/Forensics";

export class Publisher extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.eventHandlers = {
      audioLevel: (event) => {
        recordSessionTokboxEvent('publisher.audioLevel', {
          event,
          sessionID: this.props.session.id
        });
      },
      error: (event) => {
        recordSessionTokboxEvent('publisher.error', {
          event,
          sessionID: this.props.session.id
        });
      },
      streamCreated: (event) => {
        recordSessionTokboxEvent('publisher.streamCreated', {
          event,
          sessionID: this.props.session.id
        });
      },
      streamDestroyed: (event) => {
        recordSessionTokboxEvent('publisher.streamDestroyed', {
          event,
          sessionID: this.props.session.id
        });
      }
    };
  }

  render () {
    return (
      <View style={styles.publisherContainer}>
        <OTPublisher
          style={styles.publisher}
          eventHandlers = { this.eventHandlers }
        />
      </View>
    );
  }
};