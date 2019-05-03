import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import StarRating from "react-native-star-rating";
import { View, Text, Alert, Modal, TextInput, TouchableOpacity } from "react-native";
import { Colors } from "../../Themes";

import styles from "./styles";
import I18n from "../../I18n/I18n";
import metrics from "../../Themes/Metrics";
import { moderateScaleViewports } from "../../Util/Scaling";
import { openSlideMenu } from "../../Ducks/LogicReducer";
import { ensureSessionDefaults, updateLocation } from "../../Ducks/NewSessionReducer";
import { clear as clearEvents } from "../../Ducks/EventsReducer";
import { clear as clearActiveSession } from "../../Ducks/ActiveSessionReducer";
import { getProfileAsync, updateView as closeUpdateEmail, updateProfileAsync } from "../../Ducks/UserProfileReducer";
import { loadSessionScenarios } from "../../Ducks/AppConfigReducer";
import { logOutAsync } from "../../Ducks/AuthReducer";
import { connect } from "react-redux";
import { EMAIL_REGEX } from "../../Util/Constants";

class UpdateEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      confirmEmail: "",
      isValidEmail: false,
      emailMatches: false
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
    if(this.state.isValidEmail && this.state.emailMatches){
      if(this.state.email === this.state.confirmEmail){
        return true;
      }
      return false;
    }
    return false;
  };

  submitEmail = async () => {
    const { updateProfileAsync, uuid, token } = this.props;
    try {
      const payload = {
        email: this.state.email,
      };
      const updateProfilePayload = await updateProfileAsync(uuid, payload, token);
      console.log(updateProfilePayload);
    }catch(err){
      console.log(err);
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
  nativeLangCode: state.userProfile.nativeLangCode,
  primaryLangCode: state.newSessionReducer.session.primaryLangCode,
  secondaryLangCode: state.newSessionReducer.session.secondaryLangCode,
  token: state.auth.token,
  uuid: state.auth.uuid,
  firstName: state.userProfile.firstName,
  completedLocation: state.onboardingReducer.completedLocation,
  emailBounced: state.userProfile.emailBounced
});

const mD = {
  openSlideMenu,
  updateLocation,
  ensureSessionDefaults,
  clearEvents,
  clearActiveSession,
  getProfileAsync,
  loadSessionScenarios,
  logOutAsync,
  closeUpdateEmail,
  updateProfileAsync
};

export default connect(
  mS,
  mD
)(UpdateEmail);
