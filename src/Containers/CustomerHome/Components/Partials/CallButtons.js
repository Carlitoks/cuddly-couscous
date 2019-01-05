import React, { Component } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import I18n, {
  translateProperty,
  translateLanguage
} from "../../../../I18n/I18n";
import { GetInfo } from "../../../../Ducks/SessionInfoReducer";
import { modifyAVModePreference } from "../../../../Ducks/NewSessionReducer";
import {
  clear as clearSettings,
  update as customerUpdateSettings
} from "../../../../Ducks/ActiveSessionReducer";
import { cleanSelected } from "../../../../Ducks/HomeFlowReducer";
import { clearPromoCode } from "../../../../Ducks/PromoCodeReducer";
import { updateSettings } from "../../../../Ducks/ContactLinguistReducer";
import Permissions from "react-native-permissions";
import {
  setPermission,
  displayOpenSettingsAlert,
  checkForAllPermissions,
  checkCallPermissions
} from "../../../../Util/Permission";
import {
  Languages,
  DefaultLanguagePairMap
} from "../../../../Config/Languages";
import {
  getLocalizedCategories,
  SUPPORTED_LANGS
} from "../../../../Util/Constants";

// Styles
import styles from "./Styles/CallButtonsStyles";

class CallButtons extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setLanguages();
  }

  checkAvailableMinutes = async type => {
    const {
      navigation,
      event,
      stripePaymentToken,
      availableMinutes,
      cleanSelected,
      clearPromoCode,
      updateSettings,
      selectedScenario,
      modifyAVModePreference,
      customerUpdateSettings
    } = this.props;
    cleanSelected();
    clearPromoCode();

    if (type === "video") {
      this.props.modifyAVModePreference({ avModePreference: type });
    }

    if (availableMinutes === 0 && !stripePaymentToken) {
      navigation.dispatch({
        type: "CallPricingView"
      });
    } else {
      updateSettings({
        selectedScenarioId:
          selectedScenario && selectedScenario[0]
            ? selectedScenario[0].id
            : null
      });

      customerUpdateSettings({ video: type === "video" });
      Permissions.checkMultiple(["camera", "microphone"]).then(
        async response => {
          if (
            response.camera !== "authorized" ||
            response.microphone !== "authorized"
          ) {
            await checkCallPermissions(valueToUpdate => {
              this.props.customerUpdateSettings(valueToUpdate);
            });
          }
          if (
            response.camera == "restricted" ||
            response.microphone == "restricted" ||
            (response.camera == "denied" || response.microphone == "denied")
          ) {
            Alert.alert(
              I18n.t("appPermissions"),
              I18n.t("acceptAllPermissionsCustomer"),
              [{ text: I18n.t("ok") }]
            );
          }
          if (
            response.camera == "authorized" &&
            response.microphone == "authorized"
          ) {
            navigation.dispatch({ type: "CustomerView" });
          }
        }
      );
    }
  };

  setLanguages = () => {
    const { session } = this.props;

    this.props.updateSettings({
      primaryLangCode: session.primaryLangCode,
      secundaryLangCode: session.secondaryLangCode
    });
  };

  renderButtonStyles = type => {
    if (type === "video") {
      if (this.isDisabled()) {
        return { ...styles.callNowButtonDisable };
      } else {
        return styles.callNowButton;
      }
    }
    if (this.isDisabled()) {
      return { ...styles.audioOnlyButton, color: "#cccccc" };
    } else {
      return styles.audioOnlyButton;
    }
  };

  isDisabled = () => {
    return (
      this.props.session.primaryLangCode === "" ||
      this.props.session.secondaryLangCode === ""
    );
  };

  render() {
    return (
      <View style={styles.callButtonContainer}>
        <View style={styles.callNowButtonContainer}>
          <TouchableOpacity
            disabled={this.isDisabled()}
            onPress={() => this.checkAvailableMinutes("video")}
            style={this.renderButtonStyles("video")}
          >
            <Icon
              name={"ios-videocam"}
              type={"ionicon"}
              color={this.isDisabled() ? "#ccc" : "#fff"}
              size={23}
              style={styles.iconPadding}
            />
            <Text
              style={
                this.isDisabled()
                  ? styles.callNowButtonTextDisabled
                  : styles.callNowButtonText
              }
            >
              {I18n.t("customerHome.buttons.video")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.audioOnlyButtonContainer}>
          <TouchableOpacity
            disabled={this.isDisabled()}
            onPress={() => this.checkAvailableMinutes("audio")}
            style={this.renderButtonStyles("audio")}
          >
            <Text
              style={
                this.isDisabled()
                  ? styles.audioOnlyButtonTextDisabled
                  : styles.audioOnlyButtonText
              }
            >
              {I18n.t("customerHome.buttons.audio")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mS = state => ({
  customScenario: state.homeFlow.customScenario,
  sessionId: state.activeSessionReducer.sessionID,
  token: state.auth.token,
  video: state.activeSessionReducer.video,
  approxTime: state.activeSessionReducer.selectedTime,
  timer: state.activeSessionReducer.timer,
  counterId: state.activeSessionReducer.counterId,
  scenario: state.linguistForm.selectedLanguage,
  scenarioNotes: state.contactLinguist.customScenarioNote,
  selectedScenario: state.linguistForm.selectedScenarios,
  categoryIndex: state.homeFlow.categoryIndex,
  categories: state.homeFlow.categories,
  estimatedPrice:
    state.activeSessionReducer.selectedTime * state.contactLinguist.cost,
  selectedLanguageTo: state.contactLinguist.selectedLanguage,
  secondaryLangCode: state.contactLinguist.secundaryLangCode,
  selectedLanguageFrom: state.contactLinguist.selectedLanguageFrom,
  fromLanguage: state.userProfile.selectedNativeLanguage,
  allowTimeSelection: state.activeSessionReducer.allowTimeSelection,
  promotion: state.promoCode.scanned,
  event: state.events,
  timerCustomer: state.callCustomerSettings.timer,
  availableMinutes: state.userProfile.availableMinutes,
  nativeLangCode: state.userProfile.nativeLangCode,
  primaryLangCode: state.contactLinguist.primaryLangCode,
  stripeCustomerID: state.userProfile.stripeCustomerID,
  stripePaymentToken: state.userProfile.stripePaymentToken,
  session: state.newSessionReducer.session
});

const mD = {
  GetInfo,
  updateSettings,
  customerUpdateSettings,
  clearSettings,
  cleanSelected,
  clearPromoCode,
  modifyAVModePreference
};

export default connect(
  mS,
  mD
)(CallButtons);
