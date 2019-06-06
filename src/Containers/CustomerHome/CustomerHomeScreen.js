import React, { Component } from "react";
import {
  Alert, ImageBackground, TouchableOpacity, View,
} from "react-native";
import InCallManager from "react-native-incall-manager";
import { connect } from "react-redux";
import analytics from "@segment/analytics-react-native";
import { Icon } from "react-native-elements";
import NavBar from "../../Components/NavBar/NavBar";
import AvatarSection from "./Components/AvatarSection";
import CallInputs from "./Components/CallInputs";
import SlideUpPanel from "../../Components/SlideUpModal/SlideUpPanel";
import {
  ensureSessionDefaults,
  guessSecondaryLangCode,
  updateLocation,
} from "../../Ducks/NewSessionReducer";

import { openSlideMenu } from "../../Ducks/LogicReducer";
import { getProfileAsync, updateView as closeUpdateEmail } from "../../Ducks/UserProfileReducer";
import UpdateEmail from "../../Components/UpdateEmail/UpdateEmail";
import { clear as clearEvents } from "../../Ducks/EventsReducer";
import { loadSessionScenarios } from "../../Ducks/AppConfigReducer";
import I18n from "../../I18n/I18n";
import { supportedLangCodes } from "../../Config/Languages";
// Styles
import styles from "./Styles/CustomerHomeScreenStyles";
import CallButtons from "./Components/Partials/CallButtons";
import { loadActiveSubscriptionPeriods } from "../../Ducks/AccountReducer";
import { moderateScaleViewports } from "../../Util/Scaling";
import HeaderMinutesLeft from "./Components/Partials/HeaderMinutesLeft";
import { Colors } from "../../Themes";

const imgBackground = require("../../Assets/Images/Background.png");

class CustomerHomeScreen extends Component {
  componentWillMount() {
    const {
      uuid,
      updateLocation,
      ensureSessionDefaults,
      secondaryLangCode,
      clearEvents,
      navigation,
      firstName,
      completedLocation,
    } = this.props;

    analytics.identify(uuid, {
      name: firstName,
    });

    ensureSessionDefaults({
      primaryLangCode: this.setPrimaryLangCode(),
      secondaryLangCode: secondaryLangCode || "",
    });

    clearEvents();
    InCallManager.stop();
    if (navigation.state.params && navigation.state.params.alertFail) {
      Alert.alert(I18n.t("notification"), I18n.t("session.callFailCustomer"));
    }
  }

  componentDidMount() {
    const {
      linguistProfile,
      isLoggedIn,
      uuid,
      token,
      getProfileAsync,
      loadSessionScenarios,
      loadActiveSubscriptionPeriods,
    } = this.props;

    if (uuid !== "" && token !== "") {
      getProfileAsync(uuid, token); // TODO: find a way to replace this
    }
    if (!linguistProfile && isLoggedIn) {
      // checkOperatingHours(true);
    }


    if (this.props.navigation.state.params && this.props.navigation.state.params.usageError) {
      Alert.alert(I18n.t("invalidCode"), this.props.navigation.state.params.usageError);
    }
    if (this.props.navigation.state.params && this.props.navigation.state.params.minutesGranted) {
      Alert.alert(
        I18n.t("minutesAdded"),
        I18n.t("complimentMinutes", {
          maxMinutesPerUser: this.props.navigation.state.params.maxMinutesPerUser,
          organizer: this.props.navigation.state.params.organization,
        }),
      );
    }

    loadSessionScenarios(true);
    loadActiveSubscriptionPeriods(true);
  }

  setPrimaryLangCode = () => {
    const { primaryLangCode, nativeLangCode } = this.props;
    this.props.guessSecondaryLangCode();
    if (primaryLangCode) {
      return primaryLangCode;
    }
    if (nativeLangCode) {
      return supportedLangCodes.includes(nativeLangCode);
    }
    if (nativeLangCode === "eng") {
      return "eng";
    }
    return "eng";
  };

  openSlideMenu = (type) => {
    const { openSlideMenu } = this.props;
    return openSlideMenu({ type });
  };

  render() {
    const {
      navigation,
      emailBounced,
      closeUpdateEmail,
      secondaryLangCode,
      jeenieCounts,
    } = this.props;
    return (
      <View style={styles.wrapperContainer}>
        <View style={styles.mainContainerHome}>
          <NavBar
            leftComponent={(
              <TouchableOpacity
                activeOpacity={1}
                style={styles.containerMenu}
                onPress={() => navigation.dispatch({ type: "DrawerOpen" })}
              >
                <Icon name="navicon" type="evilicon" color="white" size={moderateScaleViewports(30)} />
              </TouchableOpacity>
)}
            rightComponent={(
              <View style={styles.minutesLeftContainer}>
                <TouchableOpacity onPress={() => navigation.dispatch({ type: "PaymentDetailScreen" })}>
                  <HeaderMinutesLeft navigation={navigation} />
                </TouchableOpacity>
              </View>
)}
            statusBarBackground={Colors.gradientColor.top}
          />
          <ImageBackground source={imgBackground} style={styles.imgBackgroundContainer} imageStyle={styles.imgBackground}>
            <AvatarSection showNum={!!secondaryLangCode} targetLang={secondaryLangCode} langCounts={jeenieCounts} />
            <View style={styles.flexEndCenter}>
              <CallInputs navigation={navigation} openSlideMenu={this.openSlideMenu} />
              <CallButtons navigation={navigation} />
            </View>
          </ImageBackground>
          <SlideUpPanel />
          { emailBounced && <View style={{ position: "absolute" }}><UpdateEmail emailBounced={emailBounced} /></View>}
        </View>
      </View>
    );
  }
}

const mS = state => ({
  nativeLangCode: state.userProfile.nativeLangCode,
  primaryLangCode: state.newSessionReducer.session.primaryLangCode,
  secondaryLangCode: state.newSessionReducer.session.secondaryLangCode,
  token: state.auth.token,
  uuid: state.auth.uuid,
  firstName: state.userProfile.firstName,
  completedLocation: state.onboardingReducer.completedLocation,
  emailBounced: state.userProfile.emailBounced,
  jeenieCounts: state.appConfigReducer.jeenieCounts,
});

const mD = {
  openSlideMenu,
  updateLocation,
  ensureSessionDefaults,
  clearEvents,
  getProfileAsync,
  loadSessionScenarios,
  closeUpdateEmail,
  guessSecondaryLangCode,
  loadActiveSubscriptionPeriods,
};

export default connect(
  mS,
  mD,
)(CustomerHomeScreen);
