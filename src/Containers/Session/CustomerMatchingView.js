import React, {Component} from "react";
import {Alert, ActivityIndicator, Text, View, StyleSheet} from "react-native";
import TextButton from "../../Components/Widgets/TextButton";
import { connect } from "react-redux";
import api from "../../Config/AxiosConfig";
import KeepAwake from "react-native-keep-awake";

import {createNewSession, endSession, handleEndedSession, setRemoteUser} from "../../Ducks/CurrentSessionReducer";
import I18n, { translateApiError } from "../../I18n/I18n";
import { moderateScale } from "../../Util/Scaling";
import { formatTimerSeconds } from "../../Util/Format";
import colors from "../../Themes/Colors";

import sharedStyles from "./styles";
import { SESSION, DURATION } from "../../Util/Constants";

export class CustomerMatchingView extends Component {
  constructor (props) {
    super(props);

    // sentinel for callbacks
    this.abortTimers = false;

    // timeout countdown state
    const now = new Date();
    this.countdownIntervalID = null;
    this.countdownStartedAt = now;
    this.countdownUpdatedAt = now;
    this.elapsed = 0;
    this.countdown = SESSION.TIME.MATCH;

    // status poll state
    this.pollIntervalID = null;
    this.pollFailures = 0;

    // visual component state
    this.state = {
      remaining: SESSION.TIME.MATCH / DURATION.SECONDS,
      elapsed: 0,
      cancelling: false,
    };
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
    const nowMillis = now.getTime();
    const lastMillis = this.countdownUpdatedAt.getTime();
    const elapsedMillis = nowMillis - this.countdownStartedAt.getTime();
    this.countdown -= nowMillis - lastMillis;
    this.countdownUpdatedAt = now;
    this.setState({
      remaining: parseInt(this.countdown / DURATION.SECONDS, 10),
      elapsed: parseInt(elapsedMillis / DURATION.SECONDS, 10)
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
    this.abortTimers = true;
    clearInterval(this.countdownIntervalID);
    clearInterval(this.pollIntervalID);
  }

  lostConnection () {
    this.cleanup();
    this.props.endSession(SESSION.END.FAILURE_LOCAL)
    .catch((e) => {
      Alert.alert(I18n.t("status.error"), translateApiError(e));
    }).finally(() => {
      this.props.navigation.dispatch({type: "Home"});
    });
  }

  remoteCancel () {
    this.cleanup();
    this.props.handleEndedSession().finally(() => {
      Alert.alert(I18n.t("status.cancelled"), I18n.t("session.matching.remoteCancel"));
      this.props.navigation.dispatch({type: "Home"});
    });
  }

  timeout () {
    if (this.props.status.ending) {
      return;
    }
    this.cleanup();
    this.props.endSession(SESSION.END.TIMEOUT)
    .catch((e) => {
      Alert.alert(I18n.t("status.error"), translateApiError(e));
    }).finally(() => {
      this.props.navigation.dispatch({type: "CustomerRetryView"});
    });
  }

  cancel () {
    if (this.props.status.ending) {
      return;
    }

    Alert.alert(I18n.t("actions.confirm"), I18n.t('session.confirmEnd'), [
      {text: I18n.t('actions.yes'), onPress: () => {
          this.cleanup();
          this.props.endSession(SESSION.END.CANCEL)
            .catch((e) => {
              Alert.alert(I18n.t("status.error"), translateApiError(e));
            }).finally(() => {
            this.props.navigation.dispatch({type: "Home"});
          });
        }},
      {text: I18n.t('actions.no')}
    ]);
  }

  render () {
    const {remaining, elapsed} = this.state;
    return (
      <View style = {styles.container}>
        <KeepAwake />
        <ActivityIndicator
          size="large"
          color="white"
          style={styles.spinner}
        />
        <View style={styles.textContainer}>
          {elapsed >= 10 && (
            <Text style={styles.text}>{ formatTimerSeconds(remaining) }</Text>
          )}

          <Text style = {styles.text}>{ I18n.t("session.matching.description") }</Text>
        </View>
        <View style={styles.buttonContainer}>
          {elapsed >= 2 && (
            <TextButton
              text = {I18n.t("actions.cancel")}
              style = {styles.button}
              textStyle = {sharedStyles.prominentButtonText}
              disabled = {this.props.status.ending }
              onPress = {() => { this.cancel() }}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.backgroundBlue,
  },
  spinner: {
    marginTop: "33%",
    marginBottom: moderateScale(30, 0)
  },
  textContainer: {
    width: "100%",
    alignItems: "center",
    paddingLeft: "20%",
    paddingRight: "20%"
  },
  text: {
    fontSize: moderateScale(20, 0),
    color: colors.white,
    marginBottom: moderateScale(30, 0),
    textAlign: "center"
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: moderateScale(30, 0)
  },
  button: {
    ...sharedStyles.prominentButtonBase,
    ...sharedStyles.prominentButtonBlue,
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
