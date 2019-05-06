import React, { Component } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import { updateView as closeUpdateEmail } from "../../Ducks/UserProfileReducer";
import { logOutAsync } from "../../Ducks/AuthReducer";
import { connect } from "react-redux";

class UpdateEmailSuccess extends Component {
  render() {
    const { emailBounced, logOutAsync } = this.props;
    const handleClose = async () => {
      await logOutAsync();
      await closeUpdateEmail({ emailBounced: false });
    };
    console.log(this.props.email);
    return (
      <View style={styles.mainContainer}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={true}
          onRequestClose={() => null}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.topContainer}>
                <Text style={styles.titleText}>Success</Text>
                <Text style={styles.subtitleText}>Your email has been updated! You can sign in Jeenie with the new email “adominick@jeenie.com”.</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.closeModal} onPress={() => handleClose()}>
                  <Text style={styles.actionButtonText}>ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
};

const mS = state => ({
  emailBounced: state.userProfile.emailBounced,
  email: state.userProfile.email,
});

const mD = {
  logOutAsync,
  closeUpdateEmail,
};

export default connect(
  mS,
  mD
)(UpdateEmailSuccess);
