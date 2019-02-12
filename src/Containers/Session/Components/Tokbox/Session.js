import React, {Component} from "react";
import {Text, View} from "react-native";
import {Publisher} from "./Publisher";
import {Subscriber} from "./Subscriber";
import styles from "./styles";

import { OTSession } from 'opentok-react-native';

import {TOKBOX_APIKEY} from  "../../../../Config/env";

import { recordSessionTokboxEvent } from "../../../Util/Forensics";

export class Session extends Component {
  constructor (props) {
    super(props);

    this.state = {
      mounted: true
    };

    this.eventHandlers = {
      archiveStarted: (event) => {
      },
      archiveStopped: (event) => {
      },
      connectionCreated: (event) => {
        recordSessionTokboxEvent('session.connectionCreated', {
          event,
          sessionID: this.props.session.id
        });
      },
      connectionDestroyed: (event) => {
        recordSessionTokboxEvent('session.connectionDestroyed', {
          event,
          sessionID: this.props.session.id
        });
      },
      error: (event) => {
        recordSessionTokboxEvent('session.error', {
          event,
          sessionID: this.props.session.id
        });
      },
      sessionConnected: () => {
        recordSessionTokboxEvent('session.sessionConnected', {
          sessionID: this.props.session.id
        });
      },
      sessionReconnected: () => {
        recordSessionTokboxEvent('session.sessionReconnected', {
          sessionID: this.props.session.id
        });
      },
      sessionDisconnected: () => {
        recordSessionTokboxEvent('session.sessionDisconnected', {
          sessionID: this.props.session.id
        });
      },
      sessionReconnecting: () => {
        recordSessionTokboxEvent('session.sessionReconnecting', {
          sessionID: this.props.session.id
        });
      },
      signal: (event) => {
        recordSessionTokboxEvent('session.signal', {
          event,
          sessionID: this.props.session.id
        });
      },
      streamCreated: (event) => {
        recordSessionTokboxEvent('session.streamCreated', {
          event,
          sessionID: this.props.session.id
        });
      },
      streamDestroyed: (event) => {
        recordSessionTokboxEvent('session.streamDestroyed', {
          event,
          sessionID: this.props.session.id
        });
      }
    };
  }

  componentDidMount () {
    // app state listener
    // netinfo listener
  }

  componentWillUnmount () {

  }

  _handleAppStateChange () {

  }

  _handleNetInfoChange () {

  }

  remount () {
    this.setState({mounted: false});
    setTimeout(() => {
      this.setState({mounted: true});
    }, 500);
  }

  render () {
    const {mounted, credentials} = this.props;

    return (
      <View style={styles.sessionContainer}>
        {mounted && (
          <OTSession 
            style = {styles.session}
            apiKey = {TOKBOX_APIKEY}
            sessionId = {credentials.tokboxSessionID}
            token = {credentials.tokboxSessionToken}
            eventHandlers = { this.eventHandlers }
          >
            <Publisher
              session = {this.props.session}
              onError = {() => { this.remount() }}
            />
            <Subscriber
              session = {this.props.session}
              onError = {() => { this.remount() }}
            />
          </OTSession>
        )}
        { this.props.children }
      </View>
    );
  }
}
