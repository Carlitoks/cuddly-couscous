import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  StatusBar,
  Keyboard
} from "react-native";
import { Header, Icon } from "react-native-elements";
import { QR, NavMenu, CloseIcon } from "../../../Assets/SVG";
import { Colors } from "../../../Themes";

// Styles
import styles from "./Styles/HeaderStyles";
import I18n from "./../../../I18n/I18n";

export default class LinguistHeader extends Component {
  renderTitle = () => {
    if (this.props.navigation.state.routeName === "RegisterScreen") {
      return {
        text: I18n.t("customerOnboarding.register.createAnAccount"),
        style: styles.createAccountTitleTextStyle
      };
    }

    if (this.props.navigation.state.routeName === "LoginScreen") {
      return {
        text: I18n.t("signIn"),
        style: styles.createAccountTitleTextStyle
      };
    }
    return { text: I18n.t("appName"), style: styles.titleTextStyle };
  };
  renderLeftComponent = () => {
    if (this.props.type === "onboarding") {
      return (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.containerMenu}
          onPress={() => null}
        />
      );
    }

    if (
      this.props.navigation.state.routeName === "RegisterScreen" ||
      this.props.navigation.state.routeName === "LoginScreen"
    ) {
      return (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.containerMenu}
          onPress={() => null}
        />
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.containerMenu}
        onPress={() => this.navigate("DrawerOpen")}
      >
        <NavMenu width={30} height={20} />
      </TouchableOpacity>
    );
  };

  renderRightComponent = () => {
    if (this.props.type === "onboarding") {
      return (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.containerMenu}
          onPress={() => null}
        />
      );
    }

    if (
      this.props.navigation.state.routeName === "RegisterScreen" ||
      this.props.navigation.state.routeName === "LoginScreen"
    ) {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.navigate("OnboardingView")}
        >
          <View style={styles.buttonQR}>
            <CloseIcon width={13} height={13} />
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => this.navigate("ScanScreenView")}
      >
        <View style={styles.buttonQR}>
          <QR width={20} height={20} />
        </View>
      </TouchableOpacity>
    );
  };

  navigate = screenName => {
    Keyboard.dismiss();
    this.props.navigation.dispatch({ type: screenName });
  };

  render() {
    return (
      <View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={Colors.gradientColor.top}
          translucent={true}
        />
        <Header
          backgroundColor={Colors.transparent}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderTitle()}
          rightComponent={this.renderRightComponent()}
          outerContainerStyles={styles.headerOuter}
          innerContainerStyles={styles.headerInner}
        />
      </View>
    );
  }
}
