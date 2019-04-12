import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import RenderPicker from "./Partials/PickerSelect";
import {
  modifyAdditionalDetails,
  swapCurrentSessionLanguages,
  guessSecondaryLangCode
} from "../../../Ducks/NewSessionReducer";
import I18n from "../../../I18n/I18n";
// Styles
import styles from "./Styles/CallInputsStyles";
import { moderateScaleViewports } from "../../../Util/Scaling";

class CallInputs extends Component {

  componentWillMount() {
    this.props.guessSecondaryLangCode();
  };

  paymentNotice = () => {
    const { isNewUser, availableMinutes, stripePaymentToken } = this.props;
    if (isNewUser) {
      return I18n.t("newCustomerHome.rateNotices.beforeFirst");
    }
    if (availableMinutes) {
      if (stripePaymentToken) {
        return I18n.t("newCustomerHome.rateNotices.hasBalance", { num: availableMinutes });
      }
    } else {
      if (!stripePaymentToken) {
        return I18n.t("newCustomerHome.rateNotices.noBalanceNoCard");
      }
      return I18n.t("newCustomerHome.rateNotices.noBalanceHasCard");
    }
    return I18n.t("newCustomerHome.rateNotices.hasBalance", { num: availableMinutes });
  };

  render() {
    const {
      type,
      openSlideMenu,
      swapCurrentSessionLanguages,
      stripePaymentToken,
      navigation
    } = this.props;
    return (
      <View style={styles.mainInputsContainer}>
        <TouchableOpacity
          activeOpacity={stripePaymentToken ? 1 : 0}
          onPress={() => {
            if (!stripePaymentToken) {
              return navigation.dispatch({ type: "PaymentDetailScreen" });
            }
            return null;
          }
          }
        >
          <Text style={styles.pricingText}>{this.paymentNotice()}</Text>
        </TouchableOpacity>
        <View style={styles.inputsContainer}>
          <View style={styles.langInputs}>
            <RenderPicker
              navType={type}
              openSlideMenu={openSlideMenu}
              title={I18n.t("newCustomerHome.primaryLang.label")}
              placeholder={I18n.t("customerHome.secondaryLang.placeholder")}
              type="primaryLang"
              contentContainerStyle={styles.renderPickerContainer}
              labelStyle={styles.renderPickerLabel}
              showDivider={false}
              selectedLabelStyle={styles.renderPickerSelectedLabel}
              icon={(
                <Icon
                  color="rgba(0, 0, 0, 0.18)"
                  name="chevron-right"
                  type="evilicon"
                  size={moderateScaleViewports(17)}
                />
              )}
              selectorContainer={styles.renderPickerSelectorContainer}
            />

            <TouchableOpacity
              onPress={() => {
                swapCurrentSessionLanguages();
              }}
            >
              <Icon
                color="rgba(63, 22, 116, 0.7)"
                name="md-swap"
                type="ionicon"
                size={17}
                containerStyle={styles.swapLangsInput}
              />
            </TouchableOpacity>

            <RenderPicker
              navType={type}
              openSlideMenu={openSlideMenu}
              title={I18n.t("newCustomerHome.secondaryLang.label")}
              placeholder={I18n.t("customerHome.secondaryLang.placeholder")}
              type="secondaryLang"
              contentContainerStyle={styles.renderPickerContainer}
              labelStyle={styles.renderPickerLabel}
              showDivider={false}
              selectedLabelStyle={styles.renderPickerSelectedLabel}
              icon={(
                <Icon
                  color="rgba(0, 0, 0, 0.18)"
                  name="chevron-right"
                  type="evilicon"
                  size={moderateScaleViewports(17)}
                />
              )}
              selectorContainer={styles.renderPickerSelectorContainer}
            />
          </View>

          <View style={styles.scenarioInputContainer}>
            <RenderPicker
              navType={type}
              openSlideMenu={openSlideMenu}
              title={I18n.t("newCustomerHome.scenario.label")}
              placeholder={I18n.t("newCustomerHome.scenario.placeholder")}
              type="scenarioSelection"
              contentContainerStyle={styles.renderPickerScenarioContainer}
              labelStyle={styles.renderPickerLabel}
              showDivider={false}
              selectedLabelStyle={styles.renderPickerSelectedLabel}
              icon={(
                <Icon
                  color="rgba(0, 0, 0, 0.18)"
                  name="chevron-right"
                  type="evilicon"
                  size={moderateScaleViewports(17)}
                />
              )}
              selectorContainer={styles.renderPickerSelectorContainer}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mS = state => ({
  session: state.newSessionReducer.session,
  stripeCustomerID: state.userProfile.stripeCustomerID,
  stripePaymentToken: state.userProfile.stripePaymentToken,
  availableMinutes: state.userProfile.availableMinutes,
  isNewUser: state.userProfile.isNewUser
});

const mD = {
  modifyAdditionalDetails,
  swapCurrentSessionLanguages,
  guessSecondaryLangCode
};

export default connect(
  mS,
  mD
)(CallInputs);
