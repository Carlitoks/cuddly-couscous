import React, { Component } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

import styles from "./styles";
import I18n from "../../I18n/I18n";
import { updateView as closeUpdateEmail } from "../../Ducks/UserProfileReducer";
import { logOutAsync, updateEmailAsync } from "../../Ducks/AuthReducer";
import { connect } from "react-redux";
import { EMAIL_REGEX } from "../../Util/Constants";

class UpdateEmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "ebruiz+1@teravisiontech.com",
      confirmEmail: "ebruiz+1@teravisiontech.com",
      isValidEmail: true,
      emailMatches: true,
      loading: false,
      error: null,
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
      if(this.state.email === this.state.confirmEmail){
        return true;
      }
      return false;
    }
    return false;
  };

  submitEmail = async () => {
    const { updateEmailAsync, uuid, token, setSuccessState } = this.props;
    try {
      this.setState({ loading: true });
      const payload = {
        email: this.state.email,
      };
      const updateProfilePayload = await updateEmailAsync(uuid, token, payload);
      if(!updateProfilePayload.data.errors){
        closeUpdateEmail(updateProfilePayload.data);
        setSuccessState();
      }
    }catch(err){
      this.setState({ error: I18n.t("temporaryError")});
      console.log(err);
    } finally {
     this.setState({ loading: false });
    }
  };

  render() {
    const { emailBounced, logOutAsync, closeModal } = this.props;
    const handleClose = async () => {
      await logOutAsync();
      await closeUpdateEmail({ emailBounced: false });
    };
    return (
      <View style={styles.mainContainer}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={true}
          onRequestClose={() => console.log("lel")}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <View style={styles.topContainer}>
                <Text style={styles.titleText}>Email Failed</Text>
                <Text style={styles.subtitleText}>Something went wrong with the email you have
                  entered, please enter a new emaill address.</Text>
              </View>
              <View style={styles.middleContainer}>
                <TextInput onChangeText={text => this.isValidEmail(text)}
                           keyboardType={"email-address"} placeholder={"New Emaill Address"}
                           placeholderColor={"#8A8A8F"} style={this.isValidEmailCheck() ? styles.emailInput : styles.emailInputInvalid }/>
                {(this.isValidEmailCheck() &&
                  <Text style={styles.invalidText}>Not a valid email.</Text>)}
                <TextInput onChangeText={text => this.emailsMatch(text)}
                           keyboardType={"email-address"} placeholder={"Confirm Email Address"}
                           placeholderColor={"#8A8A8F"} style={(!this.emailsMatchCheck() && this.state.confirmEmail.length > 0) ? styles.emailInput : styles.emailInputInvalid }/>
                {((!this.emailsMatchCheck() && this.state.confirmEmail.length > 0) &&
                  <Text style={styles.invalidText}>Emails don't match.</Text>)}
                {(this.state.error &&
                  <Text style={styles.invalidText}>{this.state.error}</Text>)}
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => handleClose()}>
                  <Text style={styles.actionButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.submitEmail()} style={styles.okButton}
                                  disabled={!this.isButtonEnabled()}>
                  <Text style={styles.actionButtonText}>Ok</Text>
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
  token: state.auth.token,
  uuid: state.auth.uuid,
  emailBounced: state.userProfile.emailBounced
});

const mD = {
  logOutAsync,
  closeUpdateEmail,
  updateEmailAsync
};

export default connect(
  mS,
  mD
)(UpdateEmailForm);
