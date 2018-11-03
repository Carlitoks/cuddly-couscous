import React, { Component } from "react";

import { Text, Modal, View, ActivityIndicator } from "react-native";

import { connect } from "react-redux";

import I18n from "../../I18n/I18n";
import { styles } from "./styles";
import { Colors } from "../../Themes";
import { TIME } from "../../Util/Constants";

import ReconnectOptions from "../ReconnectOptions/ReconnectOptions";

class ModalRetry extends Component {
  showCustomerOptions() {
    return (
      <View style={styles.modalWrapper}>
        <View style={styles.mainMessageContainer}>
          <Text style={styles.mainMessage}>
            {this.props.messageReconnect || I18n.t("allLinguistsAreBusy")}
          </Text>
        </View>
        <ReconnectOptions
          closeCall={this.props.closeCall}
          reconnectCall={this.props.reconnectCall}
          callTimeOut={this.props.callTimeOut}
        />
      </View>
    );
  }

  showLinguistOptions() {
    return (
      <View style={styles.modalWrapper}>
        <View style={styles.topContainer}>
          <Text style={styles.mainMessage}>{I18n.t("cantReachCustomer")}</Text>
        </View>
      </View>
    );
  }

  showOptions() {
    if (this.props.isLinguist) {
      return this.showLinguistOptions();
    } else {
      return this.showCustomerOptions();
    }
  }

  render() {
    return (
      <Modal
        visible={this.props.visibility}
        animationType={"fade"}
        onRequestClose={() => false}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          {this.props.counter < TIME.RECONNECT ? (
            <View style={styles.topContainer}>
              <ActivityIndicator
                size="large"
                color={Colors.selectedOptionMenu}
              />
              <Text>{I18n.t("reconnect")}</Text>
            </View>
          ) : (
            this.showOptions()
          )}
        </View>
      </Modal>
    );
  }
}

const mS = state => ({
  visibility: state.contactLinguist.modalContact,
  counter: state.contactLinguist.counter,
  isLinguist: !!state.userProfile.linguistProfile,
  messageReconnect: state.contactLinguist.messageReconnect
});

const mD = {};

export default connect(
  mS,
  mD
)(ModalRetry);
