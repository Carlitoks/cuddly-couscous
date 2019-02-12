import React, {Component} from "react";
import {View, Text, Button, StyleSheet} from "react-native";
import { connect } from "react-redux";

import {acceptSessionInvite, declineSessionInvite} from "../../Ducks/CurrentSessionReducer";

export class LinguistIncomingCallView extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };

    this.abortTimers = false;
    this.responding = false;
  }

  componentDidMount () {

  }

  componentWillUnmount () {
    this.cleanup();
  }

  cleanup () {
    this.abortTimers = true;
    // clear intervals
  }

  handleAccept () {
    if (this.responding) {
      return;
    }
    this.responding = true;

    this.props.acceptSessionInvite()
    .then((res) => {

    })
    .catch((e) => {

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

    this.props.declineSessionInvite()
    .error((e) => {
      // TODO: log
    })
    .finally(() => {
      // TODO: navigate
    });
  }

  handlePollInterval () {
    if (this.responding || this.abortTimers) {
      return;
    }

    // TODO: handle cancel/assigned
  }

  render () {
    return (
      <View style = {styles.container}>
        <Text style = {styles.text}>Incoming Call!</Text>
        <View style = {styles.buttonContainer}>
          <Button
            style={styles.declineButton}
            title = "Decline"
            onPress = {() => { this.retry() }}
          />
          <Button
            style ={styles.acceptButton}
            title = "Accept"
            onPress = {() => { this.cancel() }}
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
    backgroundColor: "#44aa44"
  },
  declineButton: {
    flex: 1,
    backgroundColor: "#aa4444"
  }
});

const mS = (state) => {
  return {
    session: state.newSessionReducer.session
  }
};

const mD = {
  acceptSessionInvite,
  declineSessionInvite
};

export default connect(mS, mD)(LinguistIncomingCallView)