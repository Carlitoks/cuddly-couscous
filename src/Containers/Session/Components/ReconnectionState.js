import React, {Component} from "react";
import {View, Button, StyleSheet, Text, TouchableHighlight} from "react-native";
import Modal from "react-native-modal";

export class ReconnectionState extends Component {
  constructor (props) {
    super(props);
    this.timeoutID = null;
    this.state = {
      isVisible: true
    };
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
      const {userConnection, remoteUserConnection} = this.props;
      if (!userConnection.connected || !remoteUserConnection.connected) {
        this.launchModal();
      }
    }, 3000);
  }

  launchModal () {
    this.setState({modalVisible: true});

    // const {isCustomer, userConnection} = this.props;
    // let keepWaitingText = "Keep Waiting";
    // let endCallText = "End Call";
    // if (isCustomer) {
    //   keepWaitingText = "Try to Reconnect"
    // }

    // let buttons = [{text: keepWaitingText, onPress: () => {this.resetTimeout()}}];
    // if (isCustomer && userConnection.connected) {
    //   buttons.push({text: "Try Another Jeenie", onPress: () => { this.onRetry(); }});
    // }
    // buttons.push({text: endCallText, onPress: () => { this.onEnd() }});
    // Alert.alert("Connection error", "Still not connected, what do you want to do?", buttons, {cancelable: false});
  }

  dismissModal () {
    this.setState({modalVisible: false});
  }

  getEndReason () {
    if (!this.props.userConnection.connected) {
      return "disconnect_local";
    } else {
      return "disconnect_remote";
    }
  }

  onEnd () {
    this.cleanup();
    this.props.onEnd(this.getEndReason());
  }

  onRetry () {
    this.cleanup();
    this.props.onRetry(this.getEndReason(), "retry_disconnect");
  }

  cleanup () {
    this.setState({isVisible: false});
    if (!!this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
  }

  getReconnectingMessage () {
    const {userApp, userConnection, remoteUser, remoteUserConnection} = this.props;
    if (userApp.networkConnection == "none" || !userConnection.connected) {
      return "Reconnecting..."
    }

    if (!remoteUserConnection.connected) {
      return `${remoteUser.firstName} is reconnecting...`;
    }

    return "Reconnecting...";
  }

  render () {
    return (
      <Modal 
        isVisible={this.state.isVisible}
        style = {{margin: 0}}
      >
        <View style = {styles.backdrop}>
          <View style = {styles.content}>
            <Text style={styles.text}>{ this.getReconnectingMessage() }</Text>
            <Button title="End" onPress={() => { this.onEnd() }} />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.33)",
  },
  content: {
    backgroundColor: "#fff",
    padding: 20,
  },
  text: {
    fontSize: 30,
    color: "#44a"
  }
});