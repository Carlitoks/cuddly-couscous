import React from "react";
import { connect } from "react-redux";
import { View, Text, Modal, StatusBar, processColor, TouchableWithoutFeedback, Keyboard } from "react-native";
import Instabug, { BugReporting, Surveys, FeatureRequests } from 'instabug-reactnative';
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import I18n from "react-native-i18n";
import { instabugToken } from "../../Config/env";
import Reactotron from 'reactotron-react-native';

import { Colors } from "../../Themes";

import styles from "./styles";

const locale = I18n.currentLocale().toLocaleLowerCase();

const processLocale = locale => {
  let shortLocale = locale.substring(0, 2);
  let instaBugLocale = "";

  if (shortLocale === "zh") {
    instaBugLocale = locale.substring(0, 7);
  } else {
    instaBugLocale = shortLocale ? shortLocale : "en";
  }
  return instaBugLocale;
};

const getInstaBugLanguage = locale => {
  const shortLocale = processLocale(locale);
  switch (shortLocale) {
    case "zh-hant":
      return Instabug.locale.chineseTraditional;
    case "zh-hans":
      return Instabug.locale.chineseSimplified;
    case "ja":
      return Instabug.locale.japanese;
    case "es":
      return Instabug.locale.spanish;
    default:
      return Instabug.locale.english;
  }
};

const instaBugLanguage = getInstaBugLanguage(locale);

const ViewWrapper = ({
  children,
  status,
  style,
  firstName,
  lastName,
  preferredName,
  linguistProfile,
  email,
  deviceId,
  sessionId,
  eventId
}) => {
  const name = preferredName ? preferredName : firstName;
  const role = !!linguistProfile ? "Linguist" : "Customer";
  const device = !!deviceId ? ` DeviceID: ${deviceId} ` : "";
  const session = !!sessionId ? ` SessionID: ${sessionId} ` : "";
  const event = !!eventId ? ` EventID: ${eventId} ` : "";
  try {
    Instabug.startWithToken(instabugToken, [Instabug.invocationEvent.shake]);
    Instabug.setLocale(instaBugLanguage);
    Instabug.setViewHierarchyEnabled(false);
    Instabug.setPromptOptionsEnabled(false, true, true);
    Instabug.setAttachmentTypesEnabled(true, true, true, true, true);
    Instabug.setPrimaryColor(processColor("#52389d"));
    if (email) {
      Instabug.setUserData(
        `${name} ${lastName} (${role})${device}${session}${event}`
      );
      Instabug.setUserEmail(email);
    } else {
      Instabug.setUserData(`User  anonymous`);
    }
  } catch (e) {
    console.log("Error on Instabug");
  }

  return (
    <View style={style}>
      {/* No Connection Modal*/}
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={Colors.transparent}
        translucent={true}
      />
      {/* Render Child Components */}
      {children}
    </View>
  );
};

const mS = state => ({
  status: state.networkInfo.type,
  firstName: state.userProfile.firstName,
  lastName: state.userProfile.lastName,
  preferredName: state.userProfile.preferredName,
  linguistProfile: state.userProfile.linguistProfile,
  email: state.userProfile.email,
  deviceId: state.auth.deviceId,
  sessionId: state.activeSessionReducer.sessionID,
  eventId: state.events.id
});

export default connect(mS)(ViewWrapper);
