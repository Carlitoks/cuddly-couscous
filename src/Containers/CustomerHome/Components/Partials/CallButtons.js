import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Permissions from 'react-native-permissions';
import I18n from '../../../../I18n/I18n';
import { GetInfo } from '../../../../Ducks/SessionInfoReducer';
import { modifyAVModePreference } from '../../../../Ducks/NewSessionReducer';
import {
  clear as clearSettings,
  update as customerUpdateSettings
} from '../../../../Ducks/ActiveSessionReducer';
import { cleanSelected } from '../../../../Ducks/HomeFlowReducer';
import { clearPromoCode } from '../../../../Ducks/PromoCodeReducer';
import { updateSettings } from '../../../../Ducks/ContactLinguistReducer';
import { checkCallPermissions } from '../../../../Util/Permission';

// Styles
import styles from './Styles/CallButtonsStyles';

class CallButtons extends Component {
  componentWillMount() {
    this.setLanguages();
  }

  checkAvailableMinutes = async type => {
    const {
      navigation,
      stripePaymentToken,
      availableMinutes,
      cleanSelected,
      clearPromoCode,
      updateSettings,
      selectedScenario,
      modifyAVModePreference,
      customerUpdateSettings,
      video,
      mic
    } = this.props;
    cleanSelected();
    clearPromoCode();

    if (type === 'video') {
      modifyAVModePreference({ avModePreference: type });
    }

    if (availableMinutes === 0 && !stripePaymentToken) {
      navigation.dispatch({
        type: 'CallPricingView'
      });
    } else {
      updateSettings({
        selectedScenarioId: selectedScenario && selectedScenario[0] ? selectedScenario[0].id : null
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
              Permissions.checkMultiple(["camera", "microphone"]).then(
                response => {
                  if (
                    response.camera == "authorized" &&
                    response.microphone == "authorized"
                  ) {
                    navigation.dispatch({ type: "CustomerView" });
                  }
                }
              );
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
      });
    }
  };

  setLanguages = () => {
    const { session, updateSettings } = this.props;

    updateSettings({
      primaryLangCode: session.primaryLangCode,
      secundaryLangCode: session.secondaryLangCode
    });
  };

  renderButtonStyles = type => {
    if (type === 'video') {
      if (this.isDisabled()) {
        return { ...styles.callNowButtonDisable };
      }
      return styles.callNowButton;
    }
    if (this.isDisabled()) {
      return { ...styles.audioOnlyButton, color: '#cccccc' };
    }
    return styles.audioOnlyButton;
  };

  isDisabled = () => {
    const { session } = this.props;
    return session.primaryLangCode === '' || session.secondaryLangCode === '';
  };

  render() {
    return (
      <View style={styles.callButtonContainer}>
        <View style={styles.callNowButtonContainer}>
          <TouchableOpacity
            disabled={this.isDisabled()}
            onPress={() => this.checkAvailableMinutes('video')}
            style={this.renderButtonStyles('video')}
          >
            <Icon
              name="ios-videocam"
              type="ionicon"
              color={this.isDisabled() ? '#ccc' : '#fff'}
              size={23}
              style={styles.iconPadding}
            />
            <Text
              style={
                this.isDisabled() ? styles.callNowButtonTextDisabled : styles.callNowButtonText
              }
            >
              {I18n.t('customerHome.buttons.video')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.audioOnlyButtonContainer}>
          <TouchableOpacity
            disabled={this.isDisabled()}
            onPress={() => this.checkAvailableMinutes('audio')}
            style={this.renderButtonStyles('audio')}
          >
            <Text
              style={
                this.isDisabled() ? styles.audioOnlyButtonTextDisabled : styles.audioOnlyButtonText
              }
            >
              {I18n.t('customerHome.buttons.audio')}
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
  mic: state.activeSessionReducer.mic,
  approxTime: state.activeSessionReducer.selectedTime,
  timer: state.activeSessionReducer.timer,
  counterId: state.activeSessionReducer.counterId,
  scenario: state.linguistForm.selectedLanguage,
  scenarioNotes: state.contactLinguist.customScenarioNote,
  selectedScenario: state.linguistForm.selectedScenarios,
  categoryIndex: state.homeFlow.categoryIndex,
  categories: state.homeFlow.categories,
  estimatedPrice: state.activeSessionReducer.selectedTime * state.contactLinguist.cost,
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
