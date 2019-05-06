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
import { logOutAsync, updateEmailAsync } from "../../Ducks/AuthReducer";
import { connect } from "react-redux";
import { EMAIL_REGEX } from "../../Util/Constants";
import UpdateEmailForm from "./UpdateEmailForm";
import UpdateEmailSuccess from "./UpdateEmailSuccess";

class UpdateEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
    };
  }

  setSuccessState = () => {
    this.setState({success: true});
  };

  render() {
    if(this.state.success){
      return <UpdateEmailSuccess />;
    }else{
      return <UpdateEmailForm setSuccessState={() => this.setSuccessState() } />;
    }
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
  updateProfileAsync,
  updateEmailAsync
};

export default connect(
  mS,
  mD
)(UpdateEmail);
