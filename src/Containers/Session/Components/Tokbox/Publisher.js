import React, {Component} from "react";
import {View} from "react-native";
import {OTPublisher} from "opentok-react-native";
import styles from "./styles";

import { recordSessionTokboxEvent } from "../../../../Util/Forensics";

export class Publisher extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.eventHandlers = {
      audioLevel: (event) => {
        // NOTE: not recording in forensics, because called to frequently
        // console.log("publisher.audioLevel", event);
      },
      error: (event) => {
        recordSessionTokboxEvent('publisher.error', {
          event,
          sessionID: this.props.session.id
        });
        this.props.onError();
      },
      streamCreated: (event) => {
        recordSessionTokboxEvent('publisher.streamCreated', {
          event,
          sessionID: this.props.session.id
        });

        this.props.onStreamCreated(event);
      },
      streamDestroyed: (event) => {
        recordSessionTokboxEvent('publisher.streamDestroyed', {
          event,
          sessionID: this.props.session.id
        });
        this.props.onStreamDestroyed();
      }
    };

    console.log("publisher.constructor");
  }

  componentWillUnmount () {
    console.log("publisher.componentWillUnmount");
  }

  render () {
    const {status} = this.props;

    return (
      <View style={styles.publisherContainer}>
      {!status.ending && (
        <OTPublisher
          style={styles.publisher}
          eventHandlers = { this.eventHandlers }
        />
      )}
      </View>
    );
  }
};