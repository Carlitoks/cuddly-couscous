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
    const {isCustomer, userConnection} = this.props;
    let keepWaitingText = "Keep Waiting";
    let endCallText = "End Call";
    if (isCustomer) {
      keepWaitingText = "Try to Reconnect"
    }

    let buttons = [{text: keepWaitingText, onPress: () => {this.resetTimeout()}}];
    if (isCustomer && userConnection.connected) {
      buttons.push({text: "Try Another Jeenie", onPress: () => { this.onRetry(); }});
    }
    buttons.push({text: endCallText, onPress: () => { this.onEnd() }});
    Alert.alert("Connection error", "Still not connected, what do you want to do?", buttons, {cancelable: false});
  }

  getEndReason () {
    if (!this.props.userConnection.connected) {
      return "disconnect_local";
    } else {
      return "disconnect_remote";
    }
  }

  onEnd () {
    this.props.onEnd(this.getEndReason());
  }

  onRetry () {
    this.props.onRetry(this.getEndReason(), "retry_disconnect");
  }

  cleanup () {
    if (!!this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
  }

  getReconnectingMessage () {
    return "Reconnecting...";
  }

  renderModal () {
    return (
      <React.Fragment />
    );
  }

  render () {
    return (
      <View style={{marginTop: 100, width: "100%", height: 50, backgroundColor: "#00ff33", padding: 20}}>
        { this.renderModal() }
        <Text style={{color: "#ffffff"}}>{ this.getReconnectingMessage() }</Text>
      </View>
    );
  }
}