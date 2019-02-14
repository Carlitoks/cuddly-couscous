import React, {Component} from "react";
import {View, Text, StyleSheet, Alert} from "react-native";
import { connect } from "react-redux";
import I18n, { translateApiError } from "../../I18n/I18n";
import moment from "moment";

import TextButton from "../../Components/Widgets/TextButton";

import {acceptSessionInvite, declineSessionInvite} from "../../Ducks/CurrentSessionReducer";
import api from "../../Config/AxiosConfig";


export class LinguistIncomingCallView extends Component {

  constructor(props) {
    super(props);
    
    const now = new Date();

    this.abortTimers = false;
    this.responding = false;
    this.pollFailures = 0;
    this.pollIntervalID = null;
    this.callTimeoutAt = moment(props.session.createdAt).add(55, "s"); // taking 5 seconds off to encourage pickup before call actually times out on customer side.
    this.countdownIntervalID = null;
    
    this.state = {
      linguists: null,
      seconds: this.getSecondsRemaining(),
    };
  }

  componentDidMount () {
    this.pollIntervalID = setInterval(() => { this.handlePollInterval() }, 2000);
    this.countdownIntervalID = setInterval(() => { this.handleCountdownInterval() }, 250);
  }

  componentWillUnmount () {
    this.cleanup();
  }

  cleanup () {
    this.abortTimers = true;
    clearInterval(this.pollIntervalID);
    clearInterval(this.countdownIntervalID);
  }

  getSecondsRemaining () {
    const now = new Date();
    const nowSeconds = now.getTime() / 1000;
    const timeoutSeconds = this.callTimeoutAt.unix() - nowSeconds;
    const s = parseInt(timeoutSeconds, 10);
    return s >= 0 ? s : 0;
  }

  handleAccept () {
    if (this.responding) {
      return;
    }
    this.responding = true;
    this.cleanup();

    this.props.acceptSessionInvite()
    .then(() => {
      this.props.navigation.dispatch({type: "SessionView"});
    })
    .catch((e) => {
      Alert.alert(I18n.t("notification"), translateApiError(e, "api.errUnexpected"));
      this.props.navigation.dispatch({type: "Home"});
    })
    .finally(() => {
      this.responding = false;
    });
  }

  handleDecline () {
    if (this.responding) {
      return;
    }
    this.responding = true;
    this.cleanup();

    this.props.declineSessionInvite()
    .finally(() => {
      this.responding = false;
      this.props.navigation.dispatch({type: "Home"});
    });
  }

  handlePollInterval () {
    if (!this || this.responding || this.abortTimers) {
      return;
    }

    api.get(`/sessions/${this.props.sessionID}/linguist`)
    .then((res) => {
      this.pollFailures = 0;
      this.setState({linguists: res.data.queue.sent});
      switch (res.data.status) {
        case "assigned": {
          this.handleUnavailable("assigned");
          break;
        }
        case "cancelled": {
          this.handleUnavailable("cancel");
          break;
        }
      }
    })
    .catch((e) => {
      this.pollFailures++;
      if (this.pollFailures >= 3) {
        this.handleUnavailable("lostConnection");
      }
    });
  }

  handleUnavailable (reason) {
    let title = I18n.t("notification");
    let body = "Call no longer available";
    switch (reason) {
      case "assigned": {
        body = translateApiErrorString("api.errSessionAssigned");
        break;
      }
      case "cancelled": {
        body = translateApiErrorString("api.errSessionUnavailable");
        break;
      }
      case "lostConnection": {
        title = I18n.t("error");
        body = I18n.t("api.errUnknown");
      }
    }
    this.cleanup();
    Alert.alert(title, body);
    this.props.navigation.dispatch({type: "Home"});
  }

  handleCountdownInterval () {
    if (!this || this.abortTimers) {
      return;
    }
    this.setState({
      seconds: this.getSecondsRemaining()
    });
  }

  render () {
    const {session, remoteUser} = this.props;
    const {seconds, linguists} = this.state;
    return (
      <View style = {styles.container}>
        <Text style = {styles.text}>Incoming Call, from {remoteUser.firstName}</Text>
        <Text style = {styles.text}>{session.primaryLangCode} - {session.secondaryLangCode}</Text>
        <Text style = {styles.text}>Call available for: { seconds }</Text>
        {!!linguists && linguists > 1 && (<Text style = {styles.text}>Other linguists notified: { linguists-1 }</Text>)}
        <View style = {styles.buttonContainer}>
          <TextButton
            text = "Decline"
            style = {styles.declineButton}
            textStyle = {{color: "#ffffff"}}
            onPress = {() => { this.handleDecline() }}
          />
          <TextButton
            text = "Accept"
            style = {styles.acceptButton}
            textStyle = {{color: "#ffffff"}}
            onPress = {() => { this.handleAccept() }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "33%",
    backgroundColor: "#518"
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  acceptButton: {
    flex: 1,
    height: 50,
    backgroundColor: "#44aa44"
  },
  declineButton: {
    flex: 1,
    height: 50,
    backgroundColor: "#aa4444"
  }
});

const mS = (state) => {
  return {
    ...state.currentSessionReducer
  }
};

const mD = {
  acceptSessionInvite,
  declineSessionInvite
};

export default connect(mS, mD)(LinguistIncomingCallView)