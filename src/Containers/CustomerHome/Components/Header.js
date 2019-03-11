import React, { Component } from "react";
import { View, TouchableOpacity, StatusBar, Keyboard } from "react-native";
import { Header, Icon } from "react-native-elements";
import { QR, NavMenu, CloseIcon } from "../../../Assets/SVG";
import { Colors } from "../../../Themes";

// Styles
import styles from "./Styles/HeaderStyles";
import I18n from "../../../I18n/I18n";

export default class LinguistHeader extends Component {
  renderTitle = () => {
    const { navigation } = this.props;
    if (
      navigation.state.routeName === "RegisterView" ||
      navigation.state.routeName === "LoginView"
    ) {
      return null;
    }
    return { text: I18n.t("appName"), style: styles.titleTextStyle };
  };

  renderLeftComponent = () => {
    const { type, navigation } = this.props;
    if (type === "onboarding") {
      return (
        <TouchableOpacity activeOpacity={1} style={styles.containerMenu} onPress={() => null} />
      );
    }
    if (
      navigation.state.routeName === "RegisterView" ||
      navigation.state.routeName === "LoginView"
    ) {
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => this.navigate("IntroView")}>
          <View style={styles.buttonGoBack}>
            <Icon name="chevron-left" type="evilicon" color="#401674" size={50} />
          </View>
        </TouchableOpacity>
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
    const { type, navigation } = this.props;
    if (type === "onboarding") {
      return (
        <TouchableOpacity activeOpacity={1} style={styles.containerMenu} onPress={() => null} />
      );
    }

    if (
      navigation.state.routeName === "RegisterView" ||
      navigation.state.routeName === "LoginView"
    ) {
      return (
        <TouchableOpacity activeOpacity={1} style={styles.containerMenu} onPress={() => null} />
      );
    }

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => this.navigate("ScanScreenView")}>
        <View style={styles.buttonQR}>
          <QR width={20} height={20} />
        </View>
      </TouchableOpacity>
    );
  };

  renderHeaderInnerStyles = () => {
    const { navigation } = this.props;
    if (
      navigation.state.routeName === "RegisterView" ||
      navigation.state.routeName === "LoginView"
    ) {
      return styles.headerInner;
    }
    return styles.headerInnerHome;
  };

  navigate = screenName => {
    const { navigation } = this.props;
    Keyboard.dismiss();
    navigation.dispatch({ type: screenName });
  };

  render() {
    return (
      <View style={styles.headerContainer}>
        <StatusBar hidden={false} translucent />
        <Header
          backgroundColor={Colors.transparent}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderTitle()}
          rightComponent={this.renderRightComponent()}
          outerContainerStyles={styles.headerOuter}
          innerContainerStyles={this.renderHeaderInnerStyles()}
        />
      </View>
    );
  }
}
