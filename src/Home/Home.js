import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";

import HomeLinguist from "./Linguist/HomeLinguist";
import CustomerHomeScreenRedesign from "../Containers/CustomerHome/CustomerHomeScreen";
import { flushEvents } from "../Util/Forensics";
import { displayNoNetworkConnectionAlert } from "../Util/Alerts";
import { handleDeepLinkEvent } from "../Util/Events";
import {detectNetworkStatus} from "../Ducks/AppStateReducer";

class Home extends Component {
  constructor(props) {
    super(props);

    const { isLoggedIn, navigation, user } = this.props;

    this.state = {
      load: true
    };

    // TODO: after the navigation refactor, we shouldn't need logic for
    // redirecting views
    if (!isLoggedIn || !user) {
      navigation.dispatch({ type: "IntroView" });
      this.state.load = false;
    } else {
      this.checkDeepLinkEvents();
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
      this.props.detectNetworkStatus().then(() => {
        if (!this.props.hasNetworkConnection) {
          displayNoNetworkConnectionAlert();
        }
      });
    }
  }

  checkDeepLinkEvents = () => {
    const {
      dispatch,
      appState,
    } = this.props;

    if (appState.openUrlParams
      && !appState.openUrlParamsHandled) {
      handleDeepLinkEvent(appState.openUrlParams, dispatch, "OPEN");
    }
    if (appState.installUrlParams
      && !appState.installUrlParamsHandled) {
      handleDeepLinkEvent(appState.installUrlParams, dispatch, "INSTALL");
    }
  };

  render() {
    return this.state.load && (
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
  user: state.account.user,
  linguistProfile: state.account.linguistProfile,
  hasNetworkConnection: state.appState.hasNetworkConnection,
  appState: state.appState,
});

function mD(dispatch) {
  return {
    dispatch,
    detectNetworkStatus: () => dispatch(detectNetworkStatus()),
  };
}

export default connect(
  mS,
  mD
)(Home);
