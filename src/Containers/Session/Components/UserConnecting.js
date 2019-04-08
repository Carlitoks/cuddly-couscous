import React, {Component} from "react";
import {Button, View, Text, StyleSheet} from "react-native";
import api from "../../../Config/AxiosConfig";
import colors from "../../../Themes/Colors";
import { moderateScale } from "../../../Util/Scaling";
import I18n from "../../../I18n/I18n";

import sharedStyles from "../styles";

import TextButton from "../../../Components/Widgets/TextButton";
import { SESSION } from "../../../Util/Constants";

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
        this.remoteEnded(res.data.session.endReason);
        return;
      }
    })
    .catch((e) => {
      this.pollFailures++;
      if (this.pollFailures >= 3) {
        this.error(SESSION.END.FAILURE_LOCAL);
      }
    });
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
      const {localUserState, remoteUserState} = this.props;
      const lc = localUserState.connection;
      const rc = remoteUserState.connection

      // have we still not connected?
      if (!lc.connected || lc.connecting) {
        this.error(SESSION.END.FAILURE_LOCAL);
        return;
      }

      // is there another person, and are they not connected yet?
      if (!rc.connected || rc.connecting) {
        this.error(SESSION.END.FAILURE_REMOTE);
        return;
      }

      // TODO: maybe we connected, but aren't receiving data yet, need to track the initial receipt of a/v
      console.log("TODO: handle more cases");

      // default case - assume failure on our side
      this.error(SESSION.END.FAILURE_LOCAL);
    }
  }

  remoteEnded (reason) {
    this.cleanup();
    this.props.onRemoteEnded(reason);
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
    const mc = this.props.localUserState.connection;

    // we are in the process of connecting
    if (!mc.connected && mc.connecting) {
      return I18n.t("session.connecting.self", {name: ru.firstName});
    }
    
    // other person is connecting
    return I18n.t("session.connecting.user", {name: ru.firstName});
  }

  render () {
    return (
      <View style = {styles.container}>
        <View style = {styles.content}>
          <Text style = {styles.text}>{ this.getConnectionText() }</Text>
          <View style={styles.buttonContainer}>
            <TextButton
              text = {I18n.t("cancel")}
              style = {styles.button}
              textStyle = { sharedStyles.prominentButtonText }
              disabled = {this.props.status.ending }
              onPress = {() => { this.cancel() }}
            />
          </View>
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
    right: 0,
    bottom: 0,
    backgroundColor: colors.backgroundBlue,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    marginTop: "60%",
    fontSize: moderateScale(20, 0),
    color: colors.white,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
    marginBottom: moderateScale(30, 0)
  },
  button: {
    ...sharedStyles.prominentButtonBase,
    ...sharedStyles.prominentButtonBlue
  }
});
