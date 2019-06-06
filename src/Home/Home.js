import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import HomeLinguist from "./Linguist/HomeLinguist";
import CustomerHomeScreenRedesign from "../Containers/CustomerHome/CustomerHomeScreen";
import { flushEvents } from "../Util/Forensics";
import { loadUser } from "../Ducks/AccountReducer";

class Home extends Component {
  componentWillMount() {
    const { isLoggedIn, navigation } = this.props;

    if (!isLoggedIn) {
      navigation.dispatch({ type: "LoginView" });
    }

  }

  componentDidMount() {
    flushEvents();
    loadUser(true); // reload user, but let it be cached a bit
    // TODO: check for previously ended session
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.linguistProfile ? (
          <HomeLinguist navigation={this.props.navigation} />
        ) : (
          <CustomerHomeScreenRedesign navigation={this.props.navigation} />
        )}
      </View>
    );
  }
}

const mS = state => ({
  isLoggedIn: state.auth2.isLoggedIn,
  linguistProfile: state.userProfile.linguistProfile,
});

const mD = {
  loadUser
};

export default connect(
  mS,
  mD
)(Home);
