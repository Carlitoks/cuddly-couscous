import React, { Component } from "react";

import { Text, Modal, View, ActivityIndicator } from "react-native";

import { connect } from "react-redux";

import I18n from "../../I18n/I18n";
import { styles } from "./styles";
import { Colors } from "../../Themes";
import { TIME } from "../../Util/Constants";

import ReconnectOptions from "../ReconnectOptions/ReconnectOptions";

class ModalReconnect extends Component {
  showCustomerOptions() {
    return (
      <View style={styles.modalWrapper}>
        <View style={styles.topContainer}>
          <Text>{I18n.t("cantReachLinguist")}</Text>
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
          <Text>{I18n.t("cantReachCustomer")}</Text>
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
  visibility: state.contactLinguist.modalReconnect,
  counter: state.contactLinguist.counter,
  isLinguist: !!state.userProfile.linguistProfile
});

const mD = {};

export default connect(mS, mD)(ModalReconnect);
