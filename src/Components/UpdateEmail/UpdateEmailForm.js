import React, { Component } from "react";
import {Alert, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";

import styles from "./styles";
import I18n, { translateApiErrorString } from "../../I18n/I18n";
import { updateView as closeUpdateEmail } from "../../Ducks/UserProfileReducer";
import { logOutAsync, updateEmailAsync } from "../../Ducks/AuthReducer";
import { connect } from "react-redux";
import { EMAIL_REGEX } from "../../Util/Constants";
import UpdateEmailSuccess from "./UpdateEmailSuccess";

class UpdateEmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      confirmEmail: "",
      isValidEmail: false,
      emailMatches: false,
      loading: false,
      error: null,
      success: false,
    };
  }

  isValidEmail = text => {
    const reg = new RegExp(EMAIL_REGEX);
    if (!reg.test(text)) {
      this.setState({ isValidEmail: false });
    } else {
      this.setState({ isValidEmail: true });
    }
    this.setState({ email: text });
  };

  emailsMatch = text => {
    if (!text === this.state.email) {
      this.setState({ emailMatches: false });
    } else {
      this.setState({ emailMatches: true });
    }
    this.setState({ confirmEmail: text });
  };

  isValidEmailCheck = () => {
    return (!this.state.isValidEmail && this.state.email.length >= 1);
  };

  emailsMatchCheck = () => {
    return (this.state.email === this.state.confirmEmail) && this.state.confirmEmail.length > 0;
  };

  isButtonEnabled = () => {
    if(this.state.loading){
      return false;
    }
    if(this.state.isValidEmail && this.state.emailMatches){
      return this.state.email === this.state.confirmEmail;
    }
    return false;
  };

  submitEmail = async () => {
    const { updateEmailAsync, uuid, token, closeUpdateEmail } = this.props;
    try {
      this.setState({ loading: true });
      const payload = {
        email: this.state.email,
      };
      const updateProfilePayload = await updateEmailAsync(uuid, token, payload);
      await closeUpdateEmail({ ...updateProfilePayload.payload, emailBounced: true, email: this.state.email });
      this.setState({success: true});
    }catch(err){
        Alert.alert(
          I18n.t("error"),
          translateApiErrorString(err.data.errors[0], "api.errTemporary"),
          [{ text: I18n.t("ok"), onPress: () => console.log("OK Pressed") }],
        );
    } finally {
     this.setState({ loading: false });
    }
  };

  renderUpdateModal = () => {
    const { logOutAsync, emailBounced, closeUpdateEmail } = this.props;
    const handleClose = async () => {
      await logOutAsync();
      await closeUpdateEmail({ emailBounced: false });
    };
    return (
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.topContainer}>
            <Text style={styles.titleText}>{I18n.t("correctEmailModal.title")}</Text>
            <Text style={styles.subtitleText}>{I18n.t("correctEmailModal.description")}</Text>
          </View>
          <View style={styles.middleContainer}>
            <TextInput onChangeText={text => this.isValidEmail(text)}
                       keyboardType={"email-address"} placeholder={I18n.t("correctEmailModal.label")}
                       placeholderColor={"#8A8A8F"} style={this.isValidEmailCheck() ? styles.emailInput : styles.emailInputInvalid }/>
            {(this.isValidEmailCheck() &&
              <Text style={styles.invalidText}>{I18n.t("fields.email.errInvalid")}</Text>)}
            <TextInput onChangeText={text => this.emailsMatch(text)}
                       keyboardType={"email-address"} placeholder={I18n.t("fields.email.labelConfirm")}
                       placeholderColor={"#8A8A8F"} style={(!this.emailsMatchCheck() && this.state.confirmEmail.length > 0) ? styles.emailInput : styles.emailInputInvalid }/>
            {((!this.emailsMatchCheck() && this.state.confirmEmail.length > 0) &&
              <Text style={styles.invalidText}>{I18n.t("fields.email.errConfirmMatch")}</Text>)}
            {(this.state.error &&
              <Text style={styles.invalidText}>{this.state.error}</Text>)}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => handleClose()}>
              <Text style={styles.actionButtonText}>{I18n.t("actions.cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.submitEmail()} style={styles.okButton}
                              disabled={!this.isButtonEnabled()}>
              <Text style={styles.actionButtonText}>{I18n.t("actions.ok")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { logOutAsync, emailBounced, closeUpdateEmail } = this.props;
    return (
      <View style={styles.mainContainer}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={emailBounced}
          onRequestClose={() => null}
        >
          {this.state.success ? <UpdateEmailSuccess /> : this.renderUpdateModal()}
        </Modal>
      </View>
    );
  }
};

const mS = state => ({
  token: state.auth.token,
  uuid: state.auth.uuid,
  emailBounced: state.userProfile.emailBounced
});

const mD = {
  logOutAsync,
  closeUpdateEmail,
  updateEmailAsync,
};

export default connect(
  mS,
  mD
)(UpdateEmailForm);
