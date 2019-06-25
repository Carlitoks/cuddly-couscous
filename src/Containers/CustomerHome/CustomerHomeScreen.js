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
  updateLocation,
} from "../../Ducks/NewSessionReducer";

import { openSlideMenu } from "../../Ducks/LogicReducer";
import { getProfileAsync } from "../../Ducks/UserProfileReducer";
import ViewWrapper from "../ViewWrapper/ViewWrapper";
import UpdateEmail from "../../Components/UpdateEmail/UpdateEmail";
import { clear as clearEvents } from "../../Ducks/EventsReducer";
import { loadSessionScenarios } from "../../Ducks/AppConfigReducer";
import I18n from "../../I18n/I18n";
// Styles
import styles from "./Styles/CustomerHomeScreenStyles";
import CallButtons from "./Components/Partials/CallButtons";
import { moderateScaleViewports } from "../../Util/Scaling";
import HeaderMinutesLeft from "./Components/Partials/HeaderMinutesLeft";
import { Colors } from "../../Themes";
import { loadUser, loadActiveSubscriptionPeriods } from "../../Ducks/AccountReducer";

const imgBackground = require("../../Assets/Images/Background.png");

class CustomerHomeScreen extends Component {
  constructor(props) {
    super(props);
    const {
      ensureSessionDefaults,
      newSession,
      navigation,
    } = this.props;

    this.state = {
      loading: true,
    };

    ensureSessionDefaults();

    InCallManager.stop();
    if (navigation.state.params && navigation.state.params.alertFail) {
      Alert.alert(I18n.t("notification"), I18n.t("session.callFailCustomer"));
    }
  }

  componentDidMount() {
    const {
      loadUser,
      loadSessionScenarios,
      loadActiveSubscriptionPeriods,
    } = this.props;

    Promise.all([
      loadSessionScenarios(true),
      loadActiveSubscriptionPeriods(true),
      loadUser(true),
    ]).finally(() => {
      this.setState({loading: false});
    });
  }

  openSlideMenu = (type) => {
    const { openSlideMenu } = this.props;
    return openSlideMenu({ type });
  };

  render() {
    const {
      navigation,
      user,
      newSession,
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
            <AvatarSection showNum={!!newSession.secondaryLangCode} targetLang={newSession.secondaryLangCode} langCounts={jeenieCounts} />
            <View style={styles.flexEndCenter}>
              <CallInputs navigation={navigation} openSlideMenu={this.openSlideMenu} />
              <CallButtons navigation={navigation} />
            </View>
          </ImageBackground>
          <SlideUpPanel />
          { user.emailBounced && <View style={{ position: "absolute" }}><UpdateEmail emailBounced={user.emailBounced} /></View>}
        </View>
      </View>
    );
  }
}

const mS = state => ({
  user: state.account.user,
  newSession: state.newSessionReducer.session,
  completedLocation: state.onboardingReducer.completedLocation,
  jeenieCounts: state.appConfigReducer.jeenieCounts,
});

const mD = {
  openSlideMenu,
  updateLocation,
  ensureSessionDefaults,
  loadSessionScenarios,
  loadUser,
  loadActiveSubscriptionPeriods,
};

export default connect(
  mS,
  mD,
)(CustomerHomeScreen);
