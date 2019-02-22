import React, {Component} from "react";
import {View, Button, StyleSheet, Text, TouchableHighlight} from "react-native";
import Modal from "react-native-modal";

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
    }, 10000);
  }

  showOptions () {
    this.setState({showOptions: true});
  }

  dismissOptions () {
    this.setState({showOptions: false});
  }

  getEndReason () {
    if (!this.props.remoteUserConnection.connected) {
      return "disconnect_remote";
    } else {
      return "disconnect_local";
    }
  }

  keepWaiting () {
    this.dismissOptions();
    this.resetTimeout();
  }

  endCall () {
    this.cleanup();
    this.props.onEnd(this.getEndReason());
  }

  retryCall () {
    this.cleanup();
    this.props.onRetry(this.getEndReason(), "retry_disconnect");
  }

  cleanup () {
    this.dismissOptions();
    clearTimeout(this.timeoutID);
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