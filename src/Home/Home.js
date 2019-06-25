import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, View } from "react-native";

import I18n from "../I18n/I18n";
import HomeLinguist from "./Linguist/HomeLinguist";
import CustomerHomeScreenRedesign from "../Containers/CustomerHome/CustomerHomeScreen";
import { flushEvents } from "../Util/Forensics";

class Home extends Component {
  constructor(props) {
    super(props);

    const { isLoggedIn, navigation } = this.props;

    if (!isLoggedIn) {
      navigation.dispatch({ type: "LoginView" });
    }

  }

  componentDidMount() {
    flushEvents();

    // check for network connection, alert if no connection
    if (!this.props.hasNetworkConnection) {
      Alert.alert(
        I18n.t("thereNoInternetConnection"),
        I18n.t("checkYourConnection")
      );
    }
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
  linguistProfile: state.account.linguistProfile,
  hasNetworkConnection: state.appState.hasNetworkConnection
});

const mD = {
};

export default connect(
  mS,
  mD
)(Home);
