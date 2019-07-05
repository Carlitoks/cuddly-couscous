import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import moment from "moment";
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
import { CUSTOMER_FREE_MINUTES } from "../../../Util/Constants";

class CallInputs extends Component {
  componentWillMount() {
    this.props.guessSecondaryLangCode();
  }

  paymentNotice = () => {
    const { user, hasUnlimitedUse, hasUnlimitedUseUntil } = this.props;
    if (hasUnlimitedUse) {
      let d = null;
      try {
        d = hasUnlimitedUseUntil.format("YYYY/M/D")
      } catch (e) {
        d = moment().format("YYYY/M/D")
      }

      return I18n.t("newCustomerHome.rateNotices.unlimitedUntil", {date: d});
    }
    if (this.hasMadeFirstCall()) {
      return I18n.t("newCustomerHome.rateNotices.beforeFirst", {num: CUSTOMER_FREE_MINUTES});
    }
    if (user.availableMinutes) {
      if (user.stripePaymentToken) {
        return I18n.t("newCustomerHome.rateNotices.hasBalance", { num: user.availableMinutes });
      }
    } else {
      if (!user.stripePaymentToken) {
        return I18n.t("newCustomerHome.rateNotices.noBalanceNoCard");
      }
      return I18n.t("newCustomerHome.rateNotices.noBalanceHasCard");
    }
    return I18n.t("newCustomerHome.rateNotices.hasBalance", { num: user.availableMinutes });
  };

  hasMadeFirstCall () {
    const history = this.props.customerCallHistory;
    if (!!history && history.length > 0) {
      for (let call of history) {
        if (call.duration > 0) {
          return true;
        }
      }
    }
    return false;
  }

  render() {
    const {
      type,
      openSlideMenu,
      swapCurrentSessionLanguages,
      user,
      navigation
    } = this.props;
    return (
      <View style={styles.mainInputsContainer}>
        <TouchableOpacity
          activeOpacity={user.stripePaymentToken ? 1 : 0}
          onPress={() => {
            if (!user.stripePaymentToken) {
              return navigation.dispatch({ type: "PaymentDetailScreen" });
            }
            return null;
          }}
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
              icon={
                <Icon
                  color="rgba(0, 0, 0, 0.25)"
                  name="chevron-right"
                  type="evilicon"
                  size={moderateScaleViewports(17)}
                />
              }
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
              placeholder={I18n.t("actions.select")}
              type="secondaryLang"
              contentContainerStyle={styles.renderPickerContainer}
              labelStyle={styles.renderPickerLabel}
              showDivider={false}
              selectedLabelStyle={styles.renderPickerSelectedLabel}
              icon={
                <Icon
                  color="rgba(0, 0, 0, 0.25)"
                  name="chevron-right"
                  type="evilicon"
                  size={moderateScaleViewports(17)}
                />
              }
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
              icon={
                <Icon
                  color="rgba(0, 0, 0, 0.25)"
                  name="chevron-right"
                  type="evilicon"
                  size={moderateScaleViewports(17)}
                />
              }
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
  user: state.account.user,
  hasUnlimitedUse: state.account.hasUnlimitedUse,
  hasUnlimitedUseUntil: state.account.hasUnlimitedUseUntil,
  customerCallHistory: state.account.customerCallHistory,
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
