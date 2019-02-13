import React, {Component} from "react";
import {View, Text, StyleSheet, Alert} from "react-native";
import { connect } from "react-redux";
import TextButton from "../../Components/Widgets/TextButton";

import {acceptSessionInvite, declineSessionInvite} from "../../Ducks/CurrentSessionReducer";
import I18n, { translateApiError } from "../../I18n/I18n";

export class LinguistIncomingCallView extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };

    this.abortTimers = false;
    this.responding = false;
    this.pollIntervalID = null;
    this.countdownIntervalID = null;
  }

  componentDidMount () {
    this.pollIntervalID = setInterval(this.handlePollInterval, 2000);
    this.countdownIntervalID = setInterval(this.handleCountdownInterval, 250);
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

    // TODO: handle cancel/assigned
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