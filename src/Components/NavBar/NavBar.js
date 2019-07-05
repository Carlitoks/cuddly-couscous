import React, { Component } from "react";
import { StatusBar, TouchableOpacity, View } from "react-native";
import { Header } from "react-native-elements";
import { Colors } from "../../Themes";
// Styles
import styles from "./Styles/NavBarStyles";

export default class NavBar extends Component {
  renderTitle = () => {
    const { navbarTitle } = this.props;
    if (navbarTitle) {
      return {
        text: navbarTitle,
        style: styles.titleTextStyle,
      };
    }
    return null;
  };

  renderLeftComponent = () => {
    const { leftComponent } = this.props;
    if (leftComponent) {
      return leftComponent;
    }
    return (
      <TouchableOpacity activeOpacity={1} style={styles.containerMenu} onPress={() => null} />
    );
  };

  renderRightComponent = () => {
    const { rightComponent } = this.props;
    if (rightComponent) {
      return rightComponent;
    }
    return (
      <TouchableOpacity activeOpacity={1} style={styles.containerMenu} onPress={() => null} />
    );
  };

  render() {
    const { statusBarBackground } = this.props;
    return (
      <View
        style={statusBarBackground
          ? { backgroundColor: statusBarBackground }
          : styles.headerContainer}
      >
        <StatusBar
          barStyle="light-content"
          translucent={true}
          hidden={false}
          backgroundColor={statusBarBackground || "transparent"}
        />
        <Header
          backgroundColor={Colors.transparent}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderTitle()}
          rightComponent={this.renderRightComponent()}
          outerContainerStyles={styles.headerOuter}
          innerContainerStyles={statusBarBackground
            ? { ...styles.headerInnerHome, backgroundColor: statusBarBackground }
            : styles.headerInnerHome}
        />
      </View>
    );
  }
}
