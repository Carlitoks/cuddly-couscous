import React, {Component} from "react";
import {View, Button, StyleSheet, Text, TouchableHighlight} from "react-native";
import Modal from "react-native-modal";
import { SESSION } from "../../../Util/Constants";

export class ReconnectionState extends Component {
  constructor (props) {
    super(props);
    this.timeoutID = null;
    this.state = {
      showOptions: false
    };
  }

  init () {
    if (!!this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
    this.setState({showOptions: false});
    this.resetTimeout();
  }

  componentWillUnmount () {
    this.cleanup();
  }

  componentDidUpdate (prevProps) {
    if (prevProps.isVisible && !this.props.isVisible) {
      this.cleanup();
    } else if (!prevProps.isVisible && this.props.isVisible) {
      this.init();
    }
  }

  resetTimeout () {
    this.timeoutID = setTimeout(() => {
      if (!this.props.isVisible) {
        this.cleanup();
        return;
      }
      this.showOptions();
    }, SESSION.TIME.RECONNECT);
  }

  showOptions () {
    this.setState({showOptions: true});
  }

  async dismissOptions () {
    return new Promise((resolve) => {
      this.setState({showOptions: false}, resolve);
    });
  }

  getEndReason () {
    if (!this.props.remoteUserConnection.connected) {
      return SESSION.END.DISCONNECT_REMOTE;
    } else {
      return SESSION.END.DISCONNECT_LOCAL;
    }
  }

  keepWaiting () {
    this.dismissOptions();
    this.resetTimeout();
  }

  async endCall () {
    await this.cleanup();
    this.props.onEnd(this.getEndReason());
  }

  async retryCall () {
    await this.cleanup();
    this.props.onRetry(this.getEndReason(), SESSION.START.RETRY_DISCONNECT);
  }

  async cleanup () {
    clearTimeout(this.timeoutID);
    await this.dismissOptions();
  }

  isEnding () {
    return this.props.status.ending || this.props.status.ended;
  }

  getConnectionMessage () {
    const {userApp, userConnection, remoteUser, remoteUserConnection} = this.props;
    const {showOptions} = this.state;
    const localDisconnect = userApp.networkConnection == "none" || !userConnection.connected;
    const remoteDisconnect = !remoteUserConnection.connected;
    const connected = userApp.hasNetworkConnection && userConnection.connected && remoteUserConnection.connected;

    if (this.isEnding()) {
      return "Ending...";
    }

    if (!connected) {
      if (showOptions) {
        return localDisconnect ? "You have been disconnected." : `${remoteUser.firstName} has been disconnected.`;
      }
      return localDisconnect ? "Reconnecting..." : `${remoteUser.firstName} is reconnecting...`;
    }

    return "Connected";
  }

  renderButtons () {
    const {isCustomer, userConnection, userApp} = this.props;

    let buttons = [
      {
        title: isCustomer ? "Try to Reconnect" : "Keep Waiting",
        onPress: () => { this.keepWaiting() }
      }
    ];

    // if customer still has a network connection, provide option to try someone else
    if (isCustomer && userApp.hasNetworkConnection) {
      buttons.push({
        title: "Try Another Jeenie",
        onPress: () => { this.retryCall() }
      });
    }

    buttons.push({
      title: "End Call",
      onPress: () => { this.endCall() }
    });
  
    return buttons.map((button, i) => {
      return (
        <View key={i} style={{marginTop: 5}}>
          <Button title={button.title} onPress={() => { button.onPress() }} />
        </View>
      );
    });
  }

  render () {
    return !this.isEnding() && (
      <Modal 
        isVisible={this.props.isVisible}
        style = {styles.modal}
        animationIn = {"fadeInDown"}
        animationOut = {"fadeOutUp"}
        hasBackdrop = {false}
      >
        <View style = {styles.content}>
          <Text style={styles.text}>{ this.getConnectionMessage() }</Text>
          
          {/* render user options maybe */}
          {this.state.showOptions && (
          <View style={styles.buttonContainer}>
            { this.renderButtons() }
          </View>
          )}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    backgroundColor: "#fff",
    padding: 20,
  },
  buttonContainer: {

  },
  text: {
    fontSize: 20,
    color: "#44a"
  }
});