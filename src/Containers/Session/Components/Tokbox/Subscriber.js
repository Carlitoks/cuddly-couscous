import React, {Component} from "react";
import {OTSubscriber} from "opentok-react-native";

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
      connected: () => {
      },
      disconnected: () => {
      },
      error: (event) => {
      },
      videoDataReceived: () => {
      },
      videoDisabled: (event) => {
      },
      videoDisableWarning: () => {
      },
      videoDisableWarningLifted: () => {
      },
      videoEnabled: (event) => {
      },
      videoNetworkStats: (event) => {
      }
    };
  }

  render () {
    return (
      <OTSubscriber
        style={{ width: 100, height: 100 }}
        eventHandlers = { this.eventHandlers }
      />
    );
  }
};