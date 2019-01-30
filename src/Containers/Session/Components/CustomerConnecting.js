import React, {Component} from "react";
import {Text, View} from "react-native";
import api from "../../../Config/AxiosConfig";

export class CustomerConnecting extends Component {
  constructor (props) {
    super(props);
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

    console.log("MOUNTING");
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
    if (!prevProps.remoteParticipant.connecting && this.props.remoteParticipant.connecting) {
      this.setState({seconds: this.props.secondsUntilTimeout});
    }
  }

  // cleanup countdowns
  componentWillUnmount () {
    this.abortTimers = true;
    clearInterval(this.countdownIntervalID);
    clearInterval(this.pollIntervalID);
    console.log("Will unmount");
  }

  handleCountdownInterval () {
    if (this.abortTimers) {
      clearInterval(this.countdownIntervalID);
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

      if (this.pollFailures >= 5) {
        console.log("failed", this.pollFailures);
        this.error();
      }
    });
  }

  cleanup() {
    this.abortTimers = true;
    clearInterval(this.countdownIntervalID);
    clearInterval(this.pollIntervalID);
  }

  error () {
    this.cleanup();
    this.props.onError();
  }

  timeout () {
    this.cleanup();
    this.props.onTimeout();
  }

  render () {
    return (
      <View>
        { !this.props.remoteParticipant.connecting && (
          <Text>Connecting to linguist...: { this.state.seconds }</Text>
        )}
        { this.props.remoteParticipant.connecting && (
          <Text>{this.props.remoteParticipant.firstName} connecting...: { this.state.seconds }</Text>
        )}
      </View>
    );
  }
}
