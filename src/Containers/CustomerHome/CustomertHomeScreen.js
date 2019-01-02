import React, { Component } from "react";
import { ScrollView, View, Alert } from "react-native";
import timer from "react-native-timer";
import InCallManager from "react-native-incall-manager";
import LinguistHeader from "./Components/Header";
import AvatarSection from "./Components/AvatarSection";
import CallSection from "./Components/CallSection";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../Themes";
import { connect } from "react-redux";
import SlideUpPanel from "./Components/Partials/SlideUpPanel";
import {
  openSlideMenu,
  updateLocation,
  ensureSessionDefaults
} from "../../Ducks/NewSessionReducer";

import {
  getProfileAsync,
  updateView as updateUserProfile
} from "../../Ducks/UserProfileReducer";

import { getGeolocationCoords } from "../../Util/Helpers";
import AvailableMinutes from "./Components/Partials/AvailableMinutes";
import ViewWrapper from "../ViewWrapper/ViewWrapper";
import { clear as clearEvents } from "../../Ducks/EventsReducer";
import { clear as clearActiveSession } from "../../Ducks/ActiveSessionReducer";
import I18n from "./../../I18n/I18n";
import { supportedLangCodes } from "./../../Config/Languages";
import WelcomeModal from "./Components/Partials/WelcomeModal";
import FreeMinutesWell from "../Onboarding/Components/FreeMinutesWell";

// Styles
import styles from "./Styles/CustomerHomeScreenStyles";
import CallButtons from "./Components/Partials/CallButtons";

class CustomerHomeScreen extends Component {
  componentDidMount() {
    const { linguistProfile, isLoggedIn } = this.props;
    if (!linguistProfile && isLoggedIn) {
      //checkOperatingHours(true);
    }

    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.usageError
    ) {
      Alert.alert(
        I18n.t("invalidCode"),
        this.props.navigation.state.params.usageError
      );
    }
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.minutesGranted
    ) {
      Alert.alert(
        I18n.t("minutesAdded"),
        I18n.t("complimentMinutes", {
          maxMinutesPerUser: this.props.navigation.state.params
            .maxMinutesPerUser,
          organizer: this.props.navigation.state.params.organization
        })
      );
    }
  }

  componentWillMount() {
    getGeolocationCoords()
      .then(response => {
        this.props.updateLocation({
          location: [response.coords.longitude, response.coords.latitude]
        });
      })
      .catch(err => {
        console.log("GeoLocation error  ", err);
      });

    this.props.ensureSessionDefaults({
      primaryLangCode: this.setPrimaryLangCode(),
      secondaryLangCode: this.props.secondaryLangCode
        ? this.props.secondaryLangCode
        : ""
    });

    //Clean call
    timer.clearInterval("timer");
    timer.clearInterval("counterId");
    this.props.clearEvents();
    this.props.clearActiveSession();
    InCallManager.stop();
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.alertFail
    ) {
      Alert.alert(I18n.t("notification"), I18n.t("session.callFailCustomer"));
    }
  }

  setPrimaryLangCode = () => {
    return this.props.primaryLangCode
      ? this.props.primaryLangCode
      : this.props.nativeLangCode
      ? supportedLangCodes.includes(this.props.nativeLangCode)
        ? this.props.nativeLangCode
        : "eng"
      : "eng";
  };

  openSlideMenu = type => {
    this.props.openSlideMenu({ type });
  };
  render() {
    const { uuid, token, getProfileAsync } = this.props;
    if (uuid !== "" && token !== "") {
      getProfileAsync(uuid, token);
    }
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
          <LinearGradient
            colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
            locations={[0, 1]}
            style={{ height: "100%" }}
          >
            <LinguistHeader navigation={this.props.navigation} />
            <ScrollView
              automaticallyAdjustContentInsets={true}
              alwaysBounceVertical={false}
              contentContainerStyle={styles.scrollViewFlex}
            >
              <AvatarSection />
              <FreeMinutesWell navigation={this.props.navigation} />
              <CallSection
                navigation={this.props.navigation}
                openSlideMenu={this.openSlideMenu}
              />
              <CallButtons navigation={this.props.navigation} />
            </ScrollView>
            <SlideUpPanel />
            <WelcomeModal
              visible={this.props.isNewUser}
              closeModal={() => {
                this.props.updateUserProfile({ isNewUser: false });
              }}
              navigation={this.props.navigation}
            />
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
  isNewUser: state.userProfile.isNewUser
});

const mD = {
  openSlideMenu,
  updateLocation,
  ensureSessionDefaults,
  clearEvents,
  clearActiveSession,
  getProfileAsync,
  updateUserProfile
};

export default connect(
  mS,
  mD
)(CustomerHomeScreen);
