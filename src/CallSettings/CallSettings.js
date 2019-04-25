import React, { Component } from "react";
import { connect } from "react-redux";

import { View } from "react-native";

import CustomerSettingsView from "./Customer/CustomerSettingsView";
import LinguistSettingsView from "./Linguist/LinguistSettingsView";

import { getProfileAsync } from "../Ducks/UserProfileReducer";

class CallSettings extends Component {
  constructor(props) {
    super(props);
  }

  chooseComponent = () => {
    if (this.props.linguistProfile) {
      return <LinguistSettingsView navigation={this.props.navigation} />;
    } else {
      return <CustomerSettingsView navigation={this.props.navigation} />;
    }
  };

  render() {
    return <View style={{ flex: 1 }}>{this.chooseComponent()}</View>;
  }
}

const mS = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
  uuid: state.auth.uuid,
  linguistProfile: state.userProfile.linguistProfile
});

const mD = {
  getProfileAsync
};

export default connect(
  mS,
  mD
)(CallSettings);
