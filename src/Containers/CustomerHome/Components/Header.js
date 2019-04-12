import React, { Component } from "react";
import {
  Keyboard,
  StatusBar,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import { Header, Icon } from "react-native-elements";
import { NavMenu } from "../../../Assets/SVG";
import { Colors } from "../../../Themes";
import HeaderMinutesLeft from "./Partials/HeaderMinutesLeft";
// Styles
import styles from "./Styles/HeaderStyles";
import I18n from "../../../I18n/I18n";

export default class LinguistHeader extends Component {
  renderTitle = () => {
    const { navigation } = this.props;
    if (
      navigation.state.routeName === "RegisterView"
      || navigation.state.routeName === "LoginView"
      || navigation.state.routeName === "Home"
    ) {
      return null;
    }

    if (navigation.state.routeName === "PaymentDetailScreen") {
      return { text: I18n.t("paymentDetails"), style: styles.titleTextStyle };
    }

    if (navigation.state.routeName === "PaymentsView") {
      return { text: I18n.t("payments.addCard"), style: styles.titleTextStyle };
    }

    if (navigation.state.routeName === "CardInfoScreen") {
      return { text: I18n.t("payments.cardInfo"), style: styles.titleTextStyle };
    }

    if (navigation.state.routeName === "EditCardScreen") {
      return { text: I18n.t("payments.editCard"), style: styles.titleTextStyle };
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
    if (navigation.state.routeName === "LoginView" || navigation.state.routeName === "RegisterView") {
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => this.navigate("back")}>
          <View style={styles.buttonGoBack}>
            <Icon name="chevron-left" type="evilicon" color="#401674" size={50} />
          </View>
        </TouchableOpacity>
      );
    }
    if (
      navigation.state.routeName === "PaymentDetailScreen" ||
      navigation.state.routeName === "PaymentsView" ||
      navigation.state.routeName === "CardInfoScreen" ||
      navigation.state.routeName === "EditCardScreen"
    ) {
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => this.navigate("back")}>
          <View style={styles.buttonGoBack}>
            <Icon name="chevron-left" type="evilicon" color="white" size={50} />
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
        <NavMenu width={30} height={20}/>
      </TouchableOpacity>
    );
  };

  renderRightComponent = () => {
    const { type, navigation, safeEditCard } = this.props;

    if (type === "onboarding") {
      return (
        <TouchableOpacity activeOpacity={1} style={styles.containerMenu} onPress={() => null}/>
      );
    }

    if (
      navigation.state.routeName === "RegisterView"
      || navigation.state.routeName === "LoginView"
    ) {
      return (
        <TouchableOpacity activeOpacity={1} style={styles.containerMenu} onPress={() => null}/>
      );
    }

    if (navigation.state.routeName === "PaymentDetailScreen") {
      return (
        <TouchableOpacity activeOpacity={1} style={styles.containerMenu} onPress={() => null} />
      );
    }

    if (
      navigation.state.routeName === "PaymentsView" ||
      navigation.state.routeName === "EditCardScreen"
    ) {
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => this.navigate("back")}>
          <View style={styles.cancelButton}>
            <Text style={styles.cancelStyle}>{I18n.t("cancel")}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    if (navigation.state.routeName === "CardInfoScreen") {
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => this.navigate("EditCardScreen")}>
          <View style={styles.cancelButton}>
            <Text style={styles.cancelStyle}>{I18n.t("actions.edit")}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.minutesLeftContainer}>
        <TouchableOpacity onPress={() => navigation.dispatch({ type: "PaymentsView" })}>
          <HeaderMinutesLeft navigation={navigation}/>
        </TouchableOpacity>
      </View>
    );
  };

  renderHeaderInnerStyles = () => {
    const { navigation } = this.props;
    if (
      navigation.state.routeName === "RegisterView"
      || navigation.state.routeName === "LoginView"
    ) {
      return styles.headerInner;
    }
    return styles.headerInnerHome;
  };

  navigate = (screenName) => {
    const { navigation } = this.props;
    Keyboard.dismiss();
    navigation.dispatch({ type: screenName });
  };

  setBackgroundColor = () => {
    const { navigation } = this.props;
    if (navigation.state.routeName === "Home") {
      return Colors.gradientColor.top;
    }
    if (
      navigation.state.routeName === "RegisterView"
      || navigation.state.routeName === "LoginView"
    ) {
      return "#fff";
    }

    return "transparent";
  };

  setIosBackground = () => {
    const { navigation } = this.props;

    if (
      navigation.state.routeName === "RegisterView"
      || navigation.state.routeName === "LoginView"
    ) {
      return styles.headerContainerOnboarding;
    }
return styles.headerContainer;
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={this.setIosBackground()}>
        <StatusBar
          hidden={false}
          backgroundColor={this.setBackgroundColor()}
        />
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
