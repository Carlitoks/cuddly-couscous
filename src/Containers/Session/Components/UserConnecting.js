import React, {Component} from "react";
import {Button, View, Text, StyleSheet} from "react-native";
import api from "../../../Config/AxiosConfig";

export class UserConnecting extends Component {
  constructor(props) {
    super(props);

    // sentinel for callbacks
    this.abortTimers = false;

    // timeout countdown state
    this.countdownIntervalID = null;
    this.countdownUpdatedAt = new Date();
    this.countdown = props.secondsUntilError;

    // status poll state
    this.pollIntervalID = null;
    this.pollFailures = 0;

    // visual component state
    this.state = {
      seconds: props.secondsUntilError,
      cancelling: false,
    };
  }

  componentDidMount () {
    // updating this fairly frequently so that it doesn't look
    // like the time skips
    this.countdownIntervalID = setInterval(() => {
      this.handleCountdownInterval();
    }, 250);

    this.pollIntervalID = setInterval(() => {
      this.handleStatusPollInterval();
    }, 3000);
    
    console.log("UserConnecting.componentDidMount");
  }

  componentWillUnmount () {
    console.log("UserConnecting.componentWillUnmount");
    this.cleanup();
  }

  cleanup() {
    console.log("UserConnecting.cleanup");
    this.abortTimers = true;
    clearInterval(this.countdownIntervalID);
    clearInterval(this.pollIntervalID);
  }

  handleStatusPollInterval () {
    if (!this || this.abortTimers) {
      return;
    }
    const {session} = this.props;

    api.get(`/sessions/${session.id}/status`)
    .then((res) => {
      if (this.abortTimers) {
        return;
      }
      this.pollFailures = 0;
      // check if session was ended by remote party
      if (res.data.session.ended) {
        this.remoteCancel();
        return;
      }
    })
    .catch((e) => {
      this.pollFailures++;
      if (this.pollFailures >= 3) {
        this.error("failure_local");
      }
    })
  }

  handleCountdownInterval () {
    if (!this || this.abortTimers) {
      return;
    }

    const now = new Date();
    const nowSeconds = now.getTime() / 1000;
    const lastSeconds = this.countdownUpdatedAt.getTime() / 1000;
    this.countdown -= nowSeconds - lastSeconds;
    this.countdownUpdatedAt = now;
    this.setState({
      seconds: parseInt(this.countdown, 10)
    });

    // did we timeout?
    if (this.countdown <= 0) {
      const ru = this.props.remoteUser;
      const mc = this.props.connection;
  
      const {connection, remoteUserState} = this.props;

      // have we still not connected?
      if (!mc.connected || mc.connecting) {
        this.error("failure_local");
        return;
      }

      // is there another person, and are they not connected yet?
      if (!rc.connected || rc.connecting) {
        this.error("failure_remote");
        return;
      }

      // default case - assume failure on our side
      this.error("failure_local");
    }
  }

  remoteCancel () {
    this.cleanup();
    this.props.onRemoteCancel();
  }

  cancel () {
    this.cleanup();
    this.props.onCancel();
  }

  error (reason) {
    this.cleanup();
    this.props.onError(reason);
  }

  getConnectionText () {
    const ru = this.props.remoteUser;
    const mc = this.props.connection;

    // we are in the process of connecting
    if (!mc.connected && mc.connecting) {
      return `Connecting to ${ru.firstName}...`;
    }
    
    // other person is connecting
    return `${ru.firstName} is connecting...`;
  }

  render () {
    return (
      <View style = {styles.container}>
        <View style = {styles.content}>
          <Text style = {styles.text}>{ this.getConnectionText() } ({this.state.seconds})</Text>
          <Button
            title = "Cancel"
            onPress = {()=> { this.cancel() }}
            disabled = { this.props.status.ending }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingTop: "33%"
  },
  content: {
    color: "#ffffff"
  },
  text: {
    fontSize: 20,
    color: "#fff",
    padding: 30
  }
});