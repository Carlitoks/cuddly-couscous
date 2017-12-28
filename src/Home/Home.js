import React, { Component } from "react";
import { connect } from "react-redux";

import { View } from "react-native";

import HomeCustomer from "./Customer/HomeCustomer";
import HomeLinguist from "./Linguist/HomeLinguist";
import LoginView from "../Onboarding/LoginView/LoginView";

class Home extends Component {
  chooseComponent = () => {
    switch(this.props.uuid){
      case '11111111-1111-1111-1111-111111111111': {
        return <HomeLinguist navigation={this.props.navigation} />
      }
      case '22222222-2222-2222-2222-222222222222': {
        return <HomeCustomer navigation={this.props.navigation} />        
      }
      default: {
        return <LoginView />        
      }
    }
  }

  render() {
    return (
      <View>
        { this.chooseComponent() }
      </View>
    );
  }
}

const mS = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  uuid: state.auth.uuid,
});

const mD = {
};

export default connect(mS, mD)(Home);
