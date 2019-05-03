import React, { Component } from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import Permissions from "react-native-permissions";
import I18n, { translateApiError } from "../../../../I18n/I18n";
import { GetInfo } from "../../../../Ducks/SessionInfoReducer";
import { modifyAVModePreference } from "../../../../Ducks/NewSessionReducer";
import { cleanSelected } from "../../../../Ducks/HomeFlowReducer";
import { clearPromoCode } from "../../../../Ducks/PromoCodeReducer";
import { updateSettings } from "../../../../Ducks/ContactLinguistReducer";
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
import{createNewSession} from "../../../../Ducks/CurrentSessionReducer";

// Styles
import styles from "./Styles/CallButtonsStyles";
import { moderateScaleViewports } from "../../../../Util/Scaling";

class CallButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createDisabled: false,
    };
  }

  componentWillMount() {
    this.setLanguages();
  }

  checkAvailableMinutes = async (type) => {
    const {
      navigation,
      stripePaymentToken,
      availableMinutes,
      cleanSelected,
      clearPromoCode,
      updateSettings,
      selectedScenario,
      modifyAVModePreference,
      completedMicAndCamera,
    } = this.props;
    cleanSelected();
    clearPromoCode();
    modifyAVModePreference({ avModePreference: type });

    if (availableMinutes === 0 && !stripePaymentToken) {
      Alert.alert(" ", I18n.t("payments.enterPaymentToTalk"), [
        {
          text: I18n.t("ok"),
          onPress: () => {
            navigation.dispatch({
              type: "PaymentsView"
            });
          }
        }
      ]);
    } else {
      updateSettings({
        selectedScenarioId: selectedScenario && selectedScenario[0] ? selectedScenario[0].id : null,
      });

      Permissions.checkMultiple(["camera", "microphone"]).then(async (response) => {
        if (response.camera !== "authorized" || response.microphone !== "authorized") {
          if (
            response.camera === "restricted"
            || response.microphone === "restricted"
            || response.camera === "denied"
            || response.microphone === "denied"
          ) {
            return Alert.alert(I18n.t("appPermissions"), I18n.t("acceptAllPermissionsCustomer"), [
              { text: I18n.t("ok") },
            ]);
          }
          if (completedMicAndCamera) {
            await checkCallPermissions((valueToUpdate) => {
              Permissions.checkMultiple(["camera", "microphone"]).then((response) => {
                if (response.camera == "authorized" && response.microphone == "authorized") {
                  this.createCall();
                }
              });
            });
          } else {
            navigation.dispatch({ type: "CameraMicPermissionView" });
          }
        }
        if (response.camera == "authorized" && response.microphone == "authorized") {
          this.createCall();
        }
        return null;
      });
    }
  };

  createCall () {
    if (this.state.createDisabled) {
      return;
    }
    this.setState({createDisabled: true}, () => {
      this.props.createNewSession({
        ...this.props.session
      })
      .then(() => {
        this.props.navigation.dispatch({type: "CustomerMatchingView"});
      }).catch((e) => {
        console.log("error", e)
        Alert.alert(
          I18n.t('error'),
          translateApiError(e, "session.createSessionFailed"),
          [
            {text: 'OK'},
          ],
        );
      }).finally(() => {
        this.setState({createDisabled: false});
      });
    });
  }

  setLanguages = () => {
    const { session, updateSettings } = this.props;
    updateSettings({
      primaryLangCode: session.primaryLangCode,
      secundaryLangCode: session.secondaryLangCode,
      selectedScenarioId: session.scenarioID === "custom" ? null : session.scenarioID,
      customScenarioNote: session.customScenarioNote,
    });
  };

  isDisabled = () => {
    const { session } = this.props;
    return session.primaryLangCode === "" || session.secondaryLangCode === "";
  };

  render() {
    return (
      <View style={styles.callButtonContainer}>
        <TouchableOpacity
          disabled={this.isDisabled()}
          onPress={() => this.checkAvailableMinutes("audio")}
          style={this.isDisabled() ? styles.audioCallButtonDisable : styles.audioCallButton}
        >
          <Icon
            name="phone"
            type="material-community"
            color="#fff"
            size={moderateScaleViewports(17)}
            containerStyle={styles.iconPadding}
          />


          <Text
            style={styles.audioOnlyButtonText}
          >
            {I18n.t("newCustomerHome.buttons.audio")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={this.isDisabled()}
          onPress={() => this.checkAvailableMinutes("video")}
          style={this.isDisabled() ? styles.videoCallButtonDisable : styles.videoCallButton }
        >
          <Icon
            name="ios-videocam"
            type="ionicon"
            color="#fff"
            size={moderateScaleViewports(17)}
            containerStyle={styles.iconPadding}
          />
          <Text
            style={styles.callNowButtonText}
          >
            {I18n.t("newCustomerHome.buttons.video")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mS = state => ({
  customScenario: state.homeFlow.customScenario,
  token: state.auth.token,
  scenario: state.linguistForm.selectedLanguage,
  scenarioNotes: state.contactLinguist.customScenarioNote,
  selectedScenario: state.linguistForm.selectedScenarios,
  categoryIndex: state.homeFlow.categoryIndex,
  categories: state.homeFlow.categories,
  selectedLanguageTo: state.contactLinguist.selectedLanguage,
  secondaryLangCode: state.contactLinguist.secundaryLangCode,
  selectedLanguageFrom: state.contactLinguist.selectedLanguageFrom,
  fromLanguage: state.userProfile.selectedNativeLanguage,
  promotion: state.promoCode.scanned,
  event: state.events,
  timerCustomer: state.callCustomerSettings.timer,
  availableMinutes: state.userProfile.availableMinutes,
  nativeLangCode: state.userProfile.nativeLangCode,
  primaryLangCode: state.contactLinguist.primaryLangCode,
  stripeCustomerID: state.userProfile.stripeCustomerID,
  stripePaymentToken: state.userProfile.stripePaymentToken,
  session: state.newSessionReducer.session,
  completedMicAndCamera: state.onboardingReducer.completedMicAndCamera,
});

const mD = {
  GetInfo,
  updateSettings,
  cleanSelected,
  clearPromoCode,
  modifyAVModePreference,

  // from refactor
  createNewSession,
};

export default connect(
  mS,
  mD,
)(CallButtons);
