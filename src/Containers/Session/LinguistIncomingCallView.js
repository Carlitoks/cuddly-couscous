import React, {Component} from "react";
import {View, Text, StyleSheet, Alert} from "react-native";
import { connect } from "react-redux";
import I18n, { translateApiError } from "../../I18n/I18n";

import TextButton from "../../Components/Widgets/TextButton";

import {acceptSessionInvite, declineSessionInvite} from "../../Ducks/CurrentSessionReducer";
import api from "../../Config/AxiosConfig";


export class LinguistIncomingCallView extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };

    this.abortTimers = false;
    this.responding = false;
    this.pollFailures = 0;
    this.pollIntervalID = null;
    this.countdownIntervalID = null;
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
    if (!this || this.responding || this.abortTimers) {
      return;
    }


  }

  render () {
    const {session, remoteUser} = this.props;
    return (
      <View style = {styles.container}>
        <Text style = {styles.text}>Incoming Call, from {remoteUser.firstName}</Text>
        <Text style = {styles.text}>{session.primaryLangCode} - {session.secondaryLangCode}</Text>
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
    height: "100%",
    width: "100%",
    paddingTop: "33%"
  },
  text: {
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