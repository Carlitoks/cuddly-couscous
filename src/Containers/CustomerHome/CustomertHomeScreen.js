import React, { Component } from "react";
import { ScrollView, View, Alert } from "react-native";
import timer from "react-native-timer";
import InCallManager from "react-native-incall-manager";
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import analytics from "@segment/analytics-react-native";
import LinguistHeader from "./Components/Header";
import AvatarSection from "./Components/AvatarSection";
import CallSection from "./Components/CallSection";
import { Colors } from "../../Themes";
import SlideUpPanel from "./Components/Partials/SlideUpPanel";
import {
  openSlideMenu,
  updateLocation,
  ensureSessionDefaults,
  swapCurrentSessionLanguages,
} from "../../Ducks/NewSessionReducer";

import { getProfileAsync, updateView as updateUserProfile } from "../../Ducks/UserProfileReducer";

import { getGeolocationCoords } from "../../Util/Helpers";
import ViewWrapper from "../ViewWrapper/ViewWrapper";
import { clear as clearEvents } from "../../Ducks/EventsReducer";
import { clear as clearActiveSession } from "../../Ducks/ActiveSessionReducer";
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
    } = this.props;

    analytics.identify(uuid, {
      name: firstName,
    });

    getGeolocationCoords()
      .then((response) => {
        updateLocation({
          location: [response.coords.longitude, response.coords.latitude],
        });
      })
      .catch((err) => {
        console.log("GeoLocation error  ", err);
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
      linguistProfile, isLoggedIn, uuid, token, getProfileAsync,
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
    openSlideMenu({ type });
  };

  render() {
    const { firstName, navigation } = this.props;
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
          <LinearGradient
            colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
            locations={[0, 1]}
            style={styles.height}
          >
            <LinguistHeader navigation={navigation} />
            <ScrollView
              automaticallyAdjustContentInsets
              alwaysBounceVertical={false}
              contentContainerStyle={styles.scrollViewFlex}
            >
              <View style={styles.flexEndCenter}>
                <AvatarSection
                  home
                  firstName={firstName}
                  pointerEvents="none"
                  navigation={navigation}
                />
                <CallSection navigation={navigation} openSlideMenu={this.openSlideMenu} />
              </View>

              <CallButtons navigation={navigation} />
            </ScrollView>
            <SlideUpPanel />
          </LinearGradient>
        </View>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  isSlideUpMenuVisible: state.newSessionReducer.isSlideUpMenuVisible,
  session: state.newSessionReducer.session,
  nativeLangCode: state.userProfile.nativeLangCode,
  primaryLangCode: state.newSessionReducer.session.primaryLangCode,
  secondaryLangCode: state.newSessionReducer.session.secondaryLangCode,
  token: state.auth.token,
  uuid: state.auth.uuid,
  firstName: state.userProfile.firstName,
});

const mD = {
  openSlideMenu,
  updateLocation,
  ensureSessionDefaults,
  clearEvents,
  clearActiveSession,
  getProfileAsync,
  updateUserProfile,
  swapCurrentSessionLanguages,
};

export default connect(
  mS,
  mD,
)(CustomerHomeScreen);
