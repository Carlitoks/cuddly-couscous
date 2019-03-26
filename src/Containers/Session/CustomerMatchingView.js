import React, {Component} from "react";
import {Alert, ActivityIndicator, Button, Text, View, StyleSheet} from "react-native";
import TextButton from "../../Components/Widgets/TextButton";
import { connect } from "react-redux";
import api from "../../Config/AxiosConfig";

import {createNewSession, endSession, handleEndedSession, setRemoteUser} from "../../Ducks/CurrentSessionReducer";
import I18n, { translateApiError } from "../../I18n/I18n";
import { moderateScale } from "../../Util/Scaling";
import { formatTimerSeconds } from "../../Util/Format";
import colors from "../../Themes/Colors";

import sharedStyles from "./styles";

// TODO: actually define some constants somewhere
const secondsUntilTimeout = 5;

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
    if ( (!prevProps.remoteUser || !prevProps.remoteUser.id) && !!this.props.remoteUser && !!this.props.remoteUser.id) {
      this.linguistIdentified();
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

      // check if all linguists declined
      if (!!res.data && !!res.data.queue) {
        const q = res.data.queue;
        if (q.total != 0 && (q.total == q.declined)) {
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
      this.props.navigation.dispatch({type: "CustomerRetryView"});
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

  render () {
    return (
      <View style = {styles.container}>
        <ActivityIndicator
          size="large"
          color="white"
          style={styles.spinner}
        />
        <Text style={styles.text}>{ formatTimerSeconds(this.state.seconds) }</Text>
        <Text style = {styles.text}>{ I18n.t("session.matching.description") }</Text>
        <View style={styles.buttonContainer}>
          <TextButton
            text = {I18n.t("cancel")}
            style = {sharedStyles.cancelButton}
            textStyle = { sharedStyles.cancelButtonText }
            disabled = {this.props.status.ending }
            onPress = {() => { this.cancel() }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundBlue,
    alignItems: "center",
  },
  spinner: {
    marginTop: "33%",
    marginBottom: moderateScale(30, 0)
  },
  text: {
    fontSize: moderateScale(20, 0),
    color: colors.white,
    marginBottom: moderateScale(30, 0),
    textAlign: "center"
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
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