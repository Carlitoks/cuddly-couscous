import React, { Component } from "react";
import {
  Alert, ImageBackground, TouchableOpacity, View,
} from "react-native";
import InCallManager from "react-native-incall-manager";
import { connect,  } from "react-redux";
import { bindActionCreators } from 'redux';
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
import UpdateEmail from "../../Components/UpdateEmail/UpdateEmail";
import { loadSessionScenarios } from "../../Ducks/AppConfigReducer";
import I18n, { translateApiError } from "../../I18n/I18n";
// Styles
import styles from "./Styles/CustomerHomeScreenStyles";
import CallButtons from "./Components/Partials/CallButtons";
import { moderateScaleViewports } from "../../Util/Scaling";
import HeaderMinutesLeft from "./Components/Partials/HeaderMinutesLeft";
import { Colors } from "../../Themes";
import { loadUser, loadActiveSubscriptionPeriods } from "../../Ducks/AccountReducer";
import { Events } from "../../Api";
import { update as updateAppState } from "../../Ducks/AppStateReducer";
import { handleEvent } from "../../Util/Events";

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

    this.checkDeepLinkEvents();
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

  checkDeepLinkEvents = () => {
    const {
      auth2,
      dispatch,
      appState,
    } = this.props;

    if (appState.openUrlParams
      && appState.openUrlParams.eventID
      && !appState.openUrlParamsHandled) {
      this.handleDeepLinkEvent(auth2, appState.openUrlParams.eventID, dispatch, "OPEN");
    }
    if (appState.installUrlParams
      && appState.installUrlParams.eventID
      && !appState.installUrlParamsHandled) {
      this.handleDeepLinkEvent(auth2, appState.openUrlParams.eventID, dispatch, "INSTALL");
    }
  };

  handleDeepLinkEvent = (user, eventID, dispatch, type) => {
    const { navigation } = this.props;
    if (user.isLoggedIn && user.userJwtToken) {
      Events.getScan(`${eventID.trim()}`, user.userJwtToken).then(async (evt) => {
        await handleEvent(evt.data, { dispatch, navigation });
      }).catch((e) => {
        if (e.response.status === 404) {
          Alert.alert(I18n.t("error"), I18n.t("api.errEventUnavailable"));
        } else {
          Alert.alert(I18n.t("error"), translateApiError(e));
        }
      }).finally(async () => {
        if (type === "INSTALL") {
          await dispatch(updateAppState({ installUrlParamsHandled: true }));
        } else {
          await dispatch(updateAppState({ openUrlParamsHandled: true }));
        }
      });
    }
  };

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
                <TouchableOpacity onPress={() => navigation.dispatch({ type: "AccountDetailsView" })}>
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
  auth2: state.auth2,
  newSession: state.newSessionReducer.session,
  completedLocation: state.onboardingReducer.completedLocation,
  jeenieCounts: state.appConfigReducer.jeenieCounts,
  appState: state.appState
});

function mD(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({
      openSlideMenu,
      updateLocation,
      ensureSessionDefaults,
      loadSessionScenarios,
      loadUser,
      loadActiveSubscriptionPeriods,
      updateAppState,
    }, dispatch),
  };
}

export default connect(
  mS,
  mD,
)(CustomerHomeScreen);
