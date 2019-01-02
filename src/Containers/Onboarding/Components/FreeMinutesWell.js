import React, { Component } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import I18n, { translateProperty, translateLanguage } from "../../../I18n/I18n";
import { GetInfo } from "../../../Ducks/SessionInfoReducer";
import { modifyAVModePreference } from "../../../Ducks/NewSessionReducer";
import {
  clear as clearSettings,
  update as customerUpdateSettings
} from "../../../Ducks/ActiveSessionReducer";
import { cleanSelected } from "../../../Ducks/HomeFlowReducer";
import { clearPromoCode } from "../../../Ducks/PromoCodeReducer";
import { updateSettings } from "../../../Ducks/ContactLinguistReducer";
import Permissions from "react-native-permissions";
import {
  setPermission,
  displayOpenSettingsAlert,
  checkForAllPermissions,
  checkCallPermissions
} from "../../../Util/Permission";
import { Languages, DefaultLanguagePairMap } from "../../../Config/Languages";
import {
  getLocalizedCategories,
  SUPPORTED_LANGS
} from "../../../Util/Constants";

// Styles
import styles from "./Styles/FreeMinutesWellStyles";
import { moderateScale } from "../../../Util/Scaling";
import { Metrics, Fonts } from "../../../Themes";
import metrics from "../../../Themes/Metrics";

class FreeMinutesWell extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          width: Metrics.width * 0.89,
          backgroundColor: "#CDCDF4",
          alignSelf: "center",
          position: "absolute",
          justifyContent: "center",
          alignItems: "flex-start",
          borderWidth: 1,
          borderRadius: 4,
          borderColor: "#CDCDF4",
          top: 220
        }}
      >
        <View
          style={{
            backgroundColor: "#63A901",
            alignSelf: "flex-start",
            position: "relative",
            justifyContent: "center",
            alignItems: "flex-start",
            borderWidth: 1,
            borderRadius: 30,
            borderColor: "rgba(255,255,255,0.55)",
            top: -13,
            left: 8,
            paddingBottom: 5,
            paddingTop: 5,
            flexDirection: "row",
            padding: 10
          }}
        >
          <Icon
            name={"clock"}
            type={"entypo"}
            color={"#fff"}
            size={15}
          />
          <Text
            style={{
              paddingLeft: 5,
              color: "#fff",
              fontWeight: "600",
              fontFamily: Fonts.ItalicFont,
              fontSize: moderateScale(16)
            }}
          >
            10 FREE Minutes
          </Text>
        </View>
        <Text
          style={{
            color: "#401674",
            fontFamily: Fonts.BoldFont,
            fontSize: moderateScale(21),
            paddingLeft: 15,
            marginTop: -10
          }}
        >
          Your First 10 Minutes are Free!
        </Text>
        <Text
          style={{
            color: "#401674",
            fontFamily: Fonts.ItalicFont,
            fontSize: moderateScale(13),
            paddingLeft: 15,
            paddingBottom: 15
          }}
        >
          After your first 10 minutes, pricing is $1 per minute.
        </Text>
      </View>
    );
  }
}

const mS = state => ({});

const mD = {};

export default connect(
  mS,
  mD
)(FreeMinutesWell);
