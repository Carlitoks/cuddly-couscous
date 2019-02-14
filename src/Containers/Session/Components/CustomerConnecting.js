import React, {Component} from "react";
import {Button, Text, View, StyleSheet} from "react-native";
import api from "../../../Config/AxiosConfig";

export class CustomerConnecting extends Component {
  constructor (props) {
    super(props);
    console.log("CustomerConnecting.constructor");

    // sentinel for callbacks
    this.abortTimers = false;

    // timeout countdown state
    this.countdownIntervalID = null;
    this.countdownUpdatedAt = new Date();
    this.countdown = props.secondsUntilTimeout;

    // status poll state
    this.pollIntervalID = null;
    this.pollFailures = 0;

    // visual component state
    this.state = {
      seconds: props.secondsUntilTimeout
    }
  }

  // start timeout and status polling intervals
  componentDidMount () {
    // updating this fairly frequently so that it doesn't look
    // like the time skips
    this.countdownIntervalID = setInterval(() => {
      this.handleCountdownInterval();
    }, 250);

    this.pollIntervalID = setInterval(() => {
      this.handleStatusPollInterval();
    }, 3000);
  }

  componentDidUpdate (prevProps) {
    // reset the timer if someone is connecting
    if (!prevProps.remoteUserState.connection.connecting && this.props.remoteUserState.connection.connecting) {
      this.setState({seconds: this.props.secondsUntilTimeout});
    }
  }

  // cleanup countdowns
  componentWillUnmount () {
    console.log("CustomerConnecting.componentWillUnmount");
    this.cleanup();
  }

  handleCountdownInterval () {
    if (!this || this.abortTimers) {
      // clearInterval(this.countdownIntervalID);
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
      this.timeout();
    }
  }

  handleStatusPollInterval () {
    if (!this || this.abortTimers) {
      // clearInterval(this.pollIntervalID);
      return;
    }

    api.get(`/sessions/${this.props.session.id}/linguist`).then((res) => {
      this.pollFailures = 0;
      if (this.abortTimers) {
        return;
      }

      // check if no match
      if (!!res.data && !!res.data.queue) {
        const q = res.data.queue;
        if (q.total == 0 || (q.total == q.declined)) {
          this.timeout();
        }
      }

    }).catch((e) => {
      if (this.abortTimers) {
        return;
      }
      this.pollFailures++;

      if (this.pollFailures >= 3) {
        console.log("failed", this.pollFailures);
        this.error("disconnect_local");
      }
    });
  }

  cleanup() {
    console.log("CustomerConnecting.cleanup");
    this.abortTimers = true;
    clearInterval(this.countdownIntervalID);
    clearInterval(this.pollIntervalID);
  }

  error (reason) {
    this.cleanup();
    this.props.onError(reason);
  }

  timeout () {
    this.cleanup();
    this.props.onTimeout();
  }

  cancel () {
    this.cleanup();
    this.props.onCancel();
  }

  getConnectionText () {
    const rc = this.props.remoteUserState.connection;
    const mc = this.props.connection;
    if (!rc.connected && !rc.connecting) {
      return `Connecting to linguist... ${this.state.seconds}`;
    }
    if (rc.connecting) {
      return `${this.props.remoteUser.firstName} is connecting...: ${this.state.seconds}`;
    }
    if (mc.connecting) {
      return `You are still connecting...: ${ this.state.seconds }`;
    }
  }

  render () {
    return (
      <View style = {styles.container}>
        <View style = {styles.content}>
          <Text style = {styles.text}>{ this.getConnectionText() }</Text>
          <Button
            title = "Cancel"
            onPress = {()=> { this.cancel() }}
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