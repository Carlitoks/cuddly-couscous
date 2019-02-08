import React, {Component} from "react";
import {Text, View} from "react-native";
import {Publisher} from "./Publisher";
import {Subscriber} from "./Subscriber";

import { OTSession } from 'opentok-react-native';

import {TOKBOX_APIKEY} from  "../../../../Config/env";

export class Session extends Component {
  constructor (props) {
    super(props);

    this.state = {

    };

    this.eventHandlers = {
      archiveStarted: (event) => {
      },
      archiveStopped: (event) => {
      },
      connectionCreated: (event) => {
      },
      connectionDestroyed: (event) => {
      },
      error: (event) => {
      },
      sessionConnected: () => {
      },
      sessionReconnected: () => {
      },
      sessionDisconnected: () => {
      },
      sessionReconnecting: () => {
      },
      signal: (event) => {
      },
      streamCreated: (event) => {
      },
      streamDestroyed: (event) => {
      }
    };
  }

  render () {
    const {credentials} = this.props;

    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <OTSession 
          apiKey = {TOKBOX_APIKEY}
          sessionId = {credentials.tokboxSessionID}
          token = {credentials.tokboxSessionToken}
          eventHandlers = { this.eventHandlers }
        >
          <Publisher />
          <Subscriber />
        </OTSession>
        { this.props.children }
      </View>
    );
  }
}
