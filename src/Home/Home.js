import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, View } from "react-native";

import HomeLinguist from "./Linguist/HomeLinguist";
import CustomerHomeScreenRedesign from "../Containers/CustomerHome/CustomerHomeScreen";
import { flushEvents } from "../Util/Forensics";
import { displayNoNetworkConnectionAlert } from "../Util/Alerts";

class Home extends Component {
  constructor(props) {
    super(props);

    const { isLoggedIn, navigation } = this.props;

    if (!isLoggedIn) {
      navigation.dispatch({ type: "LoginView" });
    }

  }

  componentDidUpdate(prevProps) {
    if (!this.props.hasNetworkConnection && prevProps.hasNetworkConnection) {
      displayNoNetworkConnectionAlert();
    }
  }

  componentDidMount() {
    flushEvents();

    // check for network connection, alert if no connection
    if (!this.props.hasNetworkConnection) {
      displayNoNetworkConnectionAlert();
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
