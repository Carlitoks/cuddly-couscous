import React, { Component } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import { logOut } from "../../Ducks/AuthReducer2";
import { connect } from "react-redux";
import I18n from "../../I18n/I18n";
import {update as updateLogicReducer} from "../../Ducks/LogicReducer";

class UpdateEmailSuccess extends Component {
  render() {
    const { navigation, logOut, updateLogicReducer, user } = this.props;
    const handleClose = async () => {
      await updateLogicReducer({emailEditSuccess: false});
      await logOut().finally(() => {navigation.dispatch({type: "LoginView"})});
    };
    return (
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.topContainer}>
                <Text style={styles.titleText}>{I18n.t("correctEmailModal.titleSuccess")}</Text>
                <Text style={styles.subtitleText}>{I18n.t("correctEmailModal.descriptionSuccess", {email: user.email})}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.closeModal} onPress={() => handleClose()}>
                  <Text style={styles.actionButtonText}>{I18n.t("actions.ok")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
    );
  }
};

const mS = state => ({
  user: state.account.user,
});

const mD = {
  logOut,
  updateLogicReducer
};

export default connect(
  mS,
  mD
)(UpdateEmailSuccess);
