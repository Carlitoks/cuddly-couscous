import React, { Component } from "react";
import { BackHandler } from "react-native";
import * as ReactNavigation from "react-navigation";
import { connect } from "react-redux";
import NavigationService from './../Util/NavigationService';

import AppNavigation from "./AppNavigation";

class ReduxNavigation extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      const { dispatch, navigation, nav } = this.props;

      // Include on the if to exit app from this views (nav.routes[0].routeName === "Login" || nav.routes[0].routeName === "Start")
      if (nav.routes.length === 0) {
        return false;
      }
      dispatch({ type: "back" });
      return true;
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress");
  }

  render() {
    const { dispatch, nav } = this.props;
    const navigation = ReactNavigation.addNavigationHelpers({
      dispatch,
      state: nav
    });

    return <AppNavigation ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }} navigation={navigation} />;
  }
}

const mapStateToProps = state => ({ nav: state.nav });
export default connect(mapStateToProps)(ReduxNavigation);
