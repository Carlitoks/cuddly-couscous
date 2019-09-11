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
import I18n, { translateApiError, localizePrice } from "../../../../I18n/I18n";
import { modifyAVModePreference } from "../../../../Ducks/NewSessionReducer";
import {
  checkCallPermissions
} from "../../../../Util/Permission";
import { SESSION } from "../../../../Util/Constants";
import{createNewSession} from "../../../../Ducks/CurrentSessionReducer";

// Styles
import styles from "./Styles/CallButtonsStyles";
import { moderateScaleViewports } from "../../../../Util/Scaling";

class CallButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createDisabled: false,
      creating: false,
      rate: localizePrice(props.rate)
    };
  }

  checkAvailableMinutes = async (type) => {
    const {
      navigation,
      user,
      hasUnlimitedUse,
      modifyAVModePreference,
      completedMicAndCamera,
    } = this.props;
    const { rate } = this.state;

    modifyAVModePreference({ avModePreference: type });

    if (!hasUnlimitedUse && user.availableMinutes === 0 && !user.stripePaymentToken) {
      Alert.alert(" ", I18n.t("payments.enterPaymentToTalkRate", { rate }), [
        {
          text: I18n.t("actions.ok"),
          onPress: () => {
            navigation.dispatch({ type: "EditCardScreen" });
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
            navigation.dispatch({ type: "MissingRequiredPermissionsView" });
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
      this.props.createNewSession({
        ...this.props.session,
        reason: SESSION.START.NORMAL
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
  user: state.account.user || {},
  hasUnlimitedUse: state.account.hasUnlimitedUse,
  session: state.newSessionReducer.session,
  completedMicAndCamera: state.onboardingReducer.completedMicAndCamera,
  rate: state.appConfigReducer.payAsYouGoRate,
});

const mD = {
  modifyAVModePreference,
  createNewSession,
};

export default connect(
  mS,
  mD,
)(CallButtons);
