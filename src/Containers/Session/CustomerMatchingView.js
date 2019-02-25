import React, {Component} from "react";
import {Alert, Button, Text, View, StyleSheet} from "react-native";
import { connect } from "react-redux";
import api from "../../Config/AxiosConfig";

import {createNewSession, endSession, handleEndedSession, setRemoteUser} from "../../Ducks/CurrentSessionReducer";
import { translateApiError } from "../../I18n/I18n";

// TODO: actually define some constants somewhere
const secondsUntilTimeout = 70;

export class CustomerMatchingView extends Component {
  constructor (props) {
    super(props);
    console.log("CustomerMatching.constructor");

    // sentinel for callbacks
    this.abortTimers = false;

    // timeout countdown state
    this.countdownIntervalID = null;
    this.countdownUpdatedAt = new Date();
    this.countdown = secondsUntilTimeout;

    // status poll state
    this.pollIntervalID = null;
    this.pollFailures = 0;

    // visual component state
    this.state = {
      seconds: secondsUntilTimeout,
      cancelling: false,
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

  // cleanup countdowns
  componentWillUnmount () {
    console.log("CustomerMatching.componentWillUnmount");
    this.cleanup();
  }

  componentDidUpdate(prevProps) {
    // was a remote user identified? Could have been identified via Push notification
    if (!prevProps.remoteUser && !prevProps.remoteUser.id && !!this.props.remoteUser && this.props.remoteUser.id) {
      this.linguistIdentified()
    }
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
      this.timeout();
    }
  }

  handleStatusPollInterval () {
    if (!this || this.abortTimers) {
      return;
    }

    api.get(`/sessions/${this.props.session.id}/status`).then((res) => {
      if (this.abortTimers) {
        return;
      }
      this.pollFailures = 0;

      // check if no match
      if (!!res.data && !!res.data.queue) {
        const q = res.data.queue;
        if (q.total == 0 || (q.total == q.declined)) {
          this.timeout();
          return;
        }
      }

      // check if a linguist was just assigned - update the session remote user if so
      if (res.data.linguist && res.data.linguist.id) {
        this.linguistIdentified(res.data.linguist);
        return;
      }

      // check if session was ended - this shouldn't be possible at this stage, but check anyway
      if (res.data.session.ended) {
        this.remoteCancel();
        return;
      }
    }).catch((e) => {
      if (this.abortTimers) {
        return;
      }
      this.pollFailures++;

      if (this.pollFailures >= 3) {
        this.lostConnection();
        return;
      }
    });
  }

  linguistIdentified (user = null) {
    this.cleanup();
    if (!!user) {
      this.props.setRemoteUser(user);  
    }
    this.props.navigation.dispatch({type: "SessionView"});
  }

  cleanup() {
    console.log("CustomerMatching.cleanup");
    this.abortTimers = true;
    clearInterval(this.countdownIntervalID);
    clearInterval(this.pollIntervalID);
  }

  lostConnection () {
    this.cleanup();
    this.props.endSession("failure_local")
    .catch((e) => {
      Alert.alert("Error", translateApiError(e));
    }).finally(() => {
      this.props.navigation.dispatch({type: "Home"});
    });
  }

  remoteCancel () {
    this.cleanup();
    this.props.handleEndedSession().finally(() => {
      Alert.alert("Canceled", "Call canceled by remote party");
      this.props.navigation.dispatch({type: "Home"});
    });
  }

  timeout () {
    if (this.props.status.ending) {
      return;
    }
    this.cleanup();
    this.props.endSession("timeout")
    .catch((e) => {
      Alert.alert("Error", translateApiError(e));
    }).finally(() => {
      this.props.navigation.dispatch({type: "Home"});
    });
  }

  cancel () {
    if (this.props.status.ending) {
      return;
    }
    this.cleanup();
    this.props.endSession("cancel")
    .catch((e) => {
      Alert.alert("Error", translateApiError(e));
    }).finally(() => {
      this.props.navigation.dispatch({type: "Home"});
    });
  }

  getConnectionText () {
    return `Searching for linguist... ${ this.state.seconds }`
  }

  render () {
    return (
      <View style = {styles.container}>
        <View style = {styles.content}>
          <Text style = {styles.text}>{ this.getConnectionText() }</Text>
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
    flex: 1,
    backgroundColor: "#5d4cb6",
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

const mS = (state) => {
  return {
    ...state.currentSessionReducer
  }
};

const mD = {
  createNewSession,
  setRemoteUser,
  endSession,
  handleEndedSession
};

export default connect(mS, mD)(CustomerMatchingView)