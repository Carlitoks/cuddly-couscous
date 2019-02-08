import React, {Component} from "react";
import {OTPublisher} from "opentok-react-native";

export class Publisher extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.eventHandlers = {
      audioLevel: (event) => {
      },
      error: (event) => {
      },
      streamCreated: (event) => {
      },
      streamDestroyed: (event) => {
      }
    };
  }

  render () {
    return (
      <OTPublisher
        style={{ width: 100, height: 100 }}
        eventHandlers = { this.eventHandlers }
      />
    );
  }
};