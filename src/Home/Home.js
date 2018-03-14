import React, { Component } from "react";
import { connect } from "react-redux";

import { View } from "react-native";

import HomeCustomer from "./Customer/HomeCustomer";
import HomeLinguist from "./Linguist/HomeLinguist";
import LoginView from "../Onboarding/LoginView/LoginView";
import {
  getProfileAsync,
  updateView,
  getNativeLang
} from "../Ducks/UserProfileReducer";
import PushNotifications from "../Util/PushNotification";

import { getGeolocationCoords } from "../Util/Helpers";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { HomeView: null };
  }

  componentWillMount() {
    PushNotifications.getNotificationsBackground();

    if (!this.props.isLoggedIn) {
      this.props.navigation.dispatch({ type: "LoginView" });
    } else {
      this.props.getProfileAsync(this.props.uuid, this.props.token).then(() => {
        this.props.updateView({
          selectedNativeLanguage: getNativeLang(this.props.nativeLangCode)
        });
        const homeView = this.chooseComponent();
        this.setState({ HomeView: homeView });
      });
    }
  }

  chooseComponent = () => {
    if (this.props.linguistProfile) {
      return <HomeLinguist navigation={this.props.navigation} />;
    } else {
      return <HomeCustomer navigation={this.props.navigation} />;
    }
  };

  render() {
    return <View>{this.state.HomeView}</View>;
  }
}

const mS = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
  uuid: state.auth.uuid,
  linguistProfile: state.userProfile.linguistProfile,
  nativeLangCode: state.userProfile.nativeLangCode
});

const mD = {
  getProfileAsync,
  updateView
};

export default connect(mS, mD)(Home);
