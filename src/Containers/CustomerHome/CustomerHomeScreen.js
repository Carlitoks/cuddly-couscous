import React, { Component } from "react";
import { Alert, ScrollView, View } from "react-native";
import timer from "react-native-timer";
import InCallManager from "react-native-incall-manager";
import { connect } from "react-redux";
import analytics from "@segment/analytics-react-native";
import Header from "./Components/Header";
import AvatarSection from "./Components/AvatarSection";
import CallInputs from "./Components/CallInputs";
import SlideUpPanel from "../../Components/SlideUpModal/SlideUpPanel";
import { ensureSessionDefaults, updateLocation } from "../../Ducks/NewSessionReducer";

import { openSlideMenu } from "../../Ducks/LogicReducer";
import { getProfileAsync } from "../../Ducks/UserProfileReducer";
import ViewWrapper from "../ViewWrapper/ViewWrapper";
import { clear as clearEvents } from "../../Ducks/EventsReducer";
import { clear as clearActiveSession } from "../../Ducks/ActiveSessionReducer";
import { loadSessionScenarios } from "../../Ducks/AppConfigReducer";
import I18n from "../../I18n/I18n";
import { supportedLangCodes } from "../../Config/Languages";
// Styles
import styles from "./Styles/CustomerHomeScreenStyles";
import CallButtons from "./Components/Partials/CallButtons";

class CustomerHomeScreen extends Component {
  componentWillMount() {
    const {
      uuid,
      updateLocation,
      ensureSessionDefaults,
      secondaryLangCode,
      clearEvents,
      clearActiveSession,
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

    // Clean call
    timer.clearInterval("timer");
    timer.clearInterval("counterId");
    clearEvents();
    clearActiveSession();
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
    } = this.props;

    if (uuid !== "" && token !== "") {
      getProfileAsync(uuid, token);
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
  }

  setPrimaryLangCode = () => {
    const { primaryLangCode, nativeLangCode } = this.props;
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
    const { navigation } = this.props;
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <View style={styles.mainContainerHome}>
          <Header navigation={navigation}/>
          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
            <View style={styles.flexEndCenter}>
              <AvatarSection/>
              <CallInputs navigation={navigation} openSlideMenu={this.openSlideMenu}/>
            </View>
            <CallButtons navigation={navigation}/>
          </ScrollView>
          <SlideUpPanel/>
        </View>
      </ViewWrapper>
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
});

const mD = {
  openSlideMenu,
  updateLocation,
  ensureSessionDefaults,
  clearEvents,
  clearActiveSession,
  getProfileAsync,
  loadSessionScenarios,
};

export default connect(
  mS,
  mD,
)(CustomerHomeScreen);
