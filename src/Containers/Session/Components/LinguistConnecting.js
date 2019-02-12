import React, {Component} from "react";
import {View, Text, StyleSheet} from "react-native";

export class LinguistConnecting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: props.secondsUntilTimeout
    };
    this.abortTimers = false;
  }

  componentDidMount () {

  }

  componentWillUnmount () {
    console.log("LinguistConnecting.componentWillUnmount");
    this.cleanup();
  }

  cleanup() {
    this.unmounting = true;
    console.log("LinguistConnecting.cleanup");
    this.abortTimers = true;
    clearInterval(this.countdownIntervalID);
    clearInterval(this.pollIntervalID);
  }

  handlePollInterval () {
    if (this.abortTimers) {

    }

  }

  handleCountdownInterval () {
    if (this.abortTimers) {

    }

  }

  render () {
    return (
      <View style = {styles.container}>
        <Text>LinguistConnecting</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    paddingTop: "33%",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  buttonContainer: {}
});
