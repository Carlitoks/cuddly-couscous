import React, { Component } from "react";
import { connect } from "react-redux";

import { View } from "react-native";

import HomeCustomer from "./Customer/HomeCustomer";
import HomeLinguist from "./Linguist/HomeLinguist";
import LoginView from "../Onboarding/LoginView/LoginView";
import PushNotifications from "../Util/PushNotification";

class Home extends Component {
  componentWillMount() {
    const { isLoggedIn, navigation, uuid, token, nativeLangCode } = this.props;
    PushNotifications.getNotificationsBackground();

    if (!isLoggedIn) {
      navigation.dispatch({ type: "LoginView" });
    }
  }

  render() {
    return (
      <View>
        {this.props.linguistProfile ? (
          <HomeLinguist navigation={this.props.navigation} />
        ) : (
          <HomeCustomer navigation={this.props.navigation} />
        )}
      </View>
    );
  }
}

const mS = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
  uuid: state.auth.uuid,
  linguistProfile: state.userProfile.linguistProfile,
  nativeLangCode: state.userProfile.nativeLangCode
});

const mD = {};

export default connect(mS, mD)(Home);
