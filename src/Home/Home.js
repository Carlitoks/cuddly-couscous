import React, { Component } from "react";
import { connect } from "react-redux";

import { View } from "react-native";

import HomeCustomer from "./Customer/HomeCustomer";
import HomeLinguist from "./Linguist/HomeLinguist";
import LoginView from "../Onboarding/LoginView/LoginView";
import { getProfileAsync } from "../Ducks/UserProfileReducer";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { HomeView: null };
  }
  componentWillMount() {
    if (!this.props.isLoggedIn) {
      this.props.navigation.dispatch({ type: "LoginView" });
    } else {
      this.props.getProfileAsync(this.props.uuid, this.props.token).then(() => {
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
  linguistProfile: state.userProfile.linguistProfile
});

const mD = {
  getProfileAsync
};

export default connect(mS, mD)(Home);
