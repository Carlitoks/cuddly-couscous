import React, { Component } from "react";
import {
  ActivityIndicator,
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
      creating: false
    };
  }

  checkAvailableMinutes = async (type) => {
    const {
      navigation,
      stripePaymentToken,
      availableMinutes,
      cleanSelected,
      clearPromoCode,
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
    this.setState({createDisabled: true, creating: true}, () => {
      
setTimeout(() => {

      this.props.createNewSession({
        ...this.props.session
      })
      .then(() => {
        this.props.navigation.dispatch({type: "CustomerMatchingView"});
      }).catch((e) => {
        this.setState({createDisabled: false, creating: false});
        console.log("error", e)
        Alert.alert(
          I18n.t('error'),
          translateApiError(e, "session.createSessionFailed"),
          [
            {text: 'OK'},
          ],
        );
      });
}, 5000);


    });
  }

  isDisabled = () => {
    const { session } = this.props;
    const {creating} = this.state;
    return creating || session.primaryLangCode === "" || session.secondaryLangCode === "";
  };

  render() {
    const {creating} = this.state;
    return (
      <View style={styles.callButtonContainer}>

        {creating && (
          <View style={styles.creatingButtonPlaceholder}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
        
        {!creating && (
          <React.Fragment>
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

          </React.Fragment>
        )}


      </View>
    );
  }
}

const mS = state => ({
  customScenario: state.homeFlow.customScenario,
  token: state.auth.token,
  categoryIndex: state.homeFlow.categoryIndex,
  categories: state.homeFlow.categories,
  fromLanguage: state.userProfile.selectedNativeLanguage,
  promotion: state.promoCode.scanned,
  event: state.events,
  availableMinutes: state.userProfile.availableMinutes,
  nativeLangCode: state.userProfile.nativeLangCode,
  stripeCustomerID: state.userProfile.stripeCustomerID,
  stripePaymentToken: state.userProfile.stripePaymentToken,
  session: state.newSessionReducer.session,
  completedMicAndCamera: state.onboardingReducer.completedMicAndCamera,
});

const mD = {
  GetInfo,
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
