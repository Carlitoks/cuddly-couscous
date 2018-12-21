import React, { Component } from "react";
import { View, TouchableOpacity, Platform, StatusBar } from "react-native";
import { Header, Icon } from "react-native-elements";
import { QR, NavMenu } from "../../../Assets/SVG";
import { Colors } from "../../../Themes";

// Styles
import styles from "./Styles/HeaderStyles";

export default class LinguistHeader extends Component {
  openMenu = () => (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.containerMenu}
      onPress={() => this.navigate("DrawerOpen")}
    >
      <NavMenu width={30} height={20} />
    </TouchableOpacity>
  );

  openQRReader = () => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => this.navigate("ScanScreenView")}
    >
      <View style={styles.buttonQR}>
        <QR width={20} height={20} />
      </View>
    </TouchableOpacity>
  );

  navigate = screenName => this.props.navigation.dispatch({ type: screenName });

  render() {
    return (
      <View style={{ flexDirection: "column", justifyContent: "flex-start" }}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={Colors.transparent}
          translucent={true}
        />
        <Header
          backgroundColor={Colors.transparent}
          leftComponent={this.openMenu()}
          centerComponent={{ text: "Jeenie", style: styles.titleTextStyle }}
          rightComponent={this.openQRReader()}
          outerContainerStyles={styles.headerOuter}
          innerContainerStyles={styles.headerInner}
        />
      </View>
    );
  }
}
