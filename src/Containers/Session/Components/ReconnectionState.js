import React, {Component} from "react";
import {Alert, View, Text} from "react-native";

export class ReconnectionState extends Component {
  constructor (props) {
    super(props);
    this.timeoutID = null;
  }

  componentDidMount () {
    this.resetTimeout();
  }

  componentWillUnmount () {
    this.cleanup();
  }

  resetTimeout () {
    if (!!this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
    this.timeoutID = setTimeout(() => {
      this.launchAlert();
    }, 10000);
  }

  launchAlert () {
    let keepWaitingText = "Keep Waiting";
    let endCallText = "End Call";
    if (this.props.isCustomer) {
      keepWaitingText = "Try to Reconnect"
    }

    let buttons = [{text: keepWaitingText, onPress: () => {this.resetTimeout}}];
    Alert.alert("Connection error", "Still not connected, what do you want to do?", buttons, {cancelable: false});
  }

  cleanup () {
    if (!!this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
  }

  getReconnectingMessage () {
    return "Reconnecting..."
  }

  render () {
    return (
      <View style={{marginTop: 100, width: "100%", height: 50, backgroundColor: "#00ff33", padding: 20}}>
        <Text style={{color: "#ffffff"}}>{ this.getReconnectingMessage() }</Text>
      </View>
    );
  }
}