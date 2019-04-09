import React, {Component} from "react";
import {View, Button, StyleSheet, Text, TouchableHighlight} from "react-native";
import Modal from "react-native-modal";
import { SESSION, DURATION } from "../../../Util/Constants";
import I18n from "../../../I18n/I18n";

import TextButton from "../../../Components/Widgets/TextButton";

import sharedStyles from "../styles";
import { moderateFontSize } from "../../../Util/Scaling";

export class ReconnectionModal extends Component {
  constructor (props) {
    super(props);
    this.timeoutID = null;
    this.state = {
      showOptions: false
    };
    this.waiting = false;
  }

  init () {
    if (!!this.timeoutID) {
      clearTimeout(this.timeoutID);
    }
    this.setState({showOptions: false});
    this.waiting = false;
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

    // beyond here doesn't matter if the modal isn't shown
    if (!this.props.isVisible) {
      return;
    }

    // check if either the local or remote user has started reconnecting
    //
    // NOTE: this currently does not work as expected - it was traced back to the fact
    // that `prevProps.remoteUserConnection.connecting` and `this.props.remoteUserConnection.connecting`
    // are both changing at the same time... so the condition where it was previously false but is now true
    // is never met.  I have no explanation for how that's possible... but I'm moving on for now.
    const oldLC = prevProps.userConnection;
    const newLC = this.props.userConnection;
    const oldRC = prevProps.remoteUserConnection;
    const newRC = this.props.remoteUserConnection;

    if (
      (!oldLC.connecting && newLC.connecting)
      || (!oldRC.connecting && newRC.connecting)
    ) {
      this.waiting = false;
      this.dismissOptions();
      this.resetTimeout();  
    }
  }

  resetTimeout () {
    this.timeoutID = setTimeout(() => {
      if (!this.props.isVisible) {
        this.cleanup();
        return;
      }
      this.waiting = false;
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
    if (!this.props.userConnection.connected) {
      return SESSION.END.DISCONNECT_LOCAL;
    } else {
      return SESSION.END.DISCONNECT_REMOTE;
    }
  }

  keepWaiting () {
    this.waiting = true;
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
    this.waiting = false;
  }

  isEnding () {
    return this.props.status.ending || this.props.status.ended;
  }

  getConnectionMessage () {
    const {localDevice, userConnection, remoteUser, remoteUserConnection} = this.props;
    const {showOptions} = this.state;
    const localDisconnect = localDevice.networkConnection == "none" || !userConnection.connected;
    const connected = localDevice.hasNetworkConnection && userConnection.connected && remoteUserConnection.connected;

    if (this.isEnding()) {
      return I18n.t('session.reconnection.ending');
    }

    if (!connected) {
      if (userConnection.connecting) {
        return I18n.t('session.reconnection.reconnecting');
      }
      if (remoteUserConnection.connecting) {
        return I18n.t('session.reconnection.reconnectingUser', {name: remoteUser.firstName});
      }

      if (showOptions) {
        if (this.waiting) {
          return localDisconnect ? I18n.t('session.reconnection.waiting') : I18n.t('session.reconnection.waitingUser', {name: remoteUser.firstName});
        }
        return localDisconnect ? I18n.t('session.reconnection.notice') : I18n.t('session.reconnection.noticeUser', {name: remoteUser.firstName});
      }

      if (this.waiting) {
        return localDisconnect ? I18n.t('session.reconnection.waiting') : I18n.t('session.reconnection.waitingUser', {name: remoteUser.firstName});
      }
      return localDisconnect ? I18n.t('session.reconnection.attempting') : I18n.t('session.reconnection.attemptingUser', {name: remoteUser.firstName});
    }

    return I18n.t('session.reconnection.reconnected');
  }

  renderButtons () {
    const {isCustomer, localDevice} = this.props;

    let buttons = [
      {
        title: I18n.t("session.reconnection.actions.wait"),
        onPress: () => {
          this.keepWaiting();
        }
      }
    ];

    // if customer still has a network connection, provide option to try someone else
    if (isCustomer && localDevice.hasNetworkConnection) {
      buttons.push({
        title: I18n.t('session.reconnection.actions.tryAnother'),
        onPress: () => { this.retryCall() }
      });
    }

    buttons.push({
      title: I18n.t('session.reconnection.actions.end'),
      onPress: () => { this.endCall() }
    });
  
    return buttons.map((button, i) => {
      return (
        <View key={i} style={{marginTop: 5}}>
          <TextButton
            text={button.title}
            onPress={() => { button.onPress() }}
            style={styles.button}
            textStyle={sharedStyles.prominentButtonText}
          />
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
    alignItems: 'center',
  },
  content: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    alignItems: "center"
  },
  text: {
    fontSize: moderateFontSize(20),
    color: "#44a",
    textAlign: "center"
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
  },
  button: {
    ...sharedStyles.prominentButtonBase,
    ...sharedStyles.prominentButtonBlue,
    marginTop: 5,
    marginBottom: 0,
    alignSelf: "center",
    width: "100%"
  }
});