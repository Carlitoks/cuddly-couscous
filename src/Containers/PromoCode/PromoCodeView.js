import React, { Component } from "react";
import { connect } from "react-redux";
import { findIndex } from "lodash";
import {
  updatePromoCode,
  asyncScanPromoCode,
  clearPromoCode
} from "../../Ducks/PromoCodeReducer";

import { updateSettings } from "../../Ducks/LinguistFormReducer";
import { updateSettings as updateHomeFlow } from "../../Ducks/HomeFlowReducer";
import { updateSettings as updateContactLinguist } from "../../Ducks/ContactLinguistReducer";

import { View, Text, ScrollView, Keyboard, Alert } from "react-native";

import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";
import Close from "../../Components/Close/Close";

// import { EMAIL_REGEX } from "../../Util/Constants";
import styles from "./styles";
import I18n, { translateApiErrorString } from "../../I18n/I18n";
import { displayFormErrors } from "../../Util/Alerts";

class PromoCodeView extends Component {
  submit() {
    this.props.updateHomeFlow({
      categorySelected: ""
    });
    this.props.updateSettings({
      selectedScenarios: []
    });

    const { token, promoCode } = this.props;

    this.props.updateContactLinguist({ customScenarioNote: "" });

    Keyboard.dismiss();
    this.props
      .asyncScanPromoCode(promoCode, token)
      .then(response => {
        this.props.clearPromoCode();
        if (response.type === "networkErrors/error") {
          throw new Error(I18n.t("errorPromo"));
        }
        const {
          requireScenarioSelection,
          restrictEventScenarios,
          scenarios,
          initiateCall,
          usageError,
          addMinutesToUser,
          maxMinutesPerUser,
          organization
        } = response.payload;
        this.props.clearPromoCode();
        if(initiateCall){
        if (
          !response.payload.userCanCreateSession ||
          !!response.payload.sessionCreateErr
        ) {
          Alert.alert("Error", response.payload.sessionCreateErr, [
            {
              text: "OK",
              onPress: () => {
                this.props.clearPromoCode();
              }
            }
          ]);
        } else {
          if (requireScenarioSelection && restrictEventScenarios) {
            /* Dispatch to SelectListView with the scenarios involveds*/
            if (scenarios) {
              let actualCats = this.props.categories;
              actualCats.includes(scenarios[0].category)
                ? null
                : actualCats.push(scenarios[0].category);
              const catIndex = findIndex(actualCats, scenario => {
                return scenario === scenarios[0].category;
              });
              this.props.updateHomeFlow({
                categoryIndex: catIndex,
                categories: actualCats
              });
              this.props.updateSettings({
                selectionItemType: "scenarios",
                selectionItemName: "scenarios",
                scenarios
              });
              this.props.navigation.dispatch({ type: "PromotionView" });
            } else {
              this.props.navigation.dispatch({ type: "CustomScenarioView" });
            }
          } else if (requireScenarioSelection && !restrictEventScenarios) {
            /* Dispatch to Category Selection View (Home) */

            this.props.updateSettings({
              selectionItemType: "scenarios",
              selectionItemName: "scenarios",
              scenarios: scenarios || []
            });
            this.props.navigation.dispatch({ type: "PromoCodeListView" });
          } else if (!requireScenarioSelection) {
            /* Dispatch to Call Confirmation view */
            const setLanguage =
              !this.props.event.allowSecondaryLangSelection &&
              this.props.event.defaultSecondaryLangCode;
            if (setLanguage) {
              this.props.navigation.dispatch({ type: "CallConfirmationView" });
            } else {
              this.props.navigation.dispatch({ type: "CallPricingView" });
            }
          }
        }
        }
        else{
      if(usageError){
        this.props.navigation.dispatch({ type: "Home", params: { usageError: translateApiErrorString(usageError, "api.errEventUnavailable") } });
      }
      if(addMinutesToUser){
        this.props.navigation.dispatch({ type: "Home", params: { minutesGranted: true, maxMinutesPerUser, organization:  organization.name } });
      }
      this.props.navigation.dispatch({ type: "Home" });
    }
      })
      .catch(err => {
        console.log("Error ", err);
        displayFormErrors(I18n.t("errorPromo"));
      });
  }

  isDisabled() {
    return !this.props.promoCode;
  }

  render() {
    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <ShowMenuButton navigation={this.props.navigation} />
          }
          headerRightComponent={
            <Close
              action={() => {
                this.props.navigation.dispatch({ type: "Home" });
              }}
            />
          }
          navbarTitle={I18n.t("promoCodeTitle")}
          navbarType={"Basic"}
          NoWaves
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={styles.scrollContainer}
          >
            <View>
              {/* Email */}
              <InputRegular
                containerStyle={styles.containerInput}
                placeholder={I18n.t("promoCodeInput")}
                autoCorrect={false}
                onChangeText={text =>
                  this.props.updatePromoCode({ code: text })
                }
                value={this.props.promoCode}
                keyboardType={"email-address"}
                maxLength={64}
                autoFocus={true}
              />
            </View>
          </ScrollView>
        </HeaderView>
        {/* Next Button */}
        <BottomButton
          title={I18n.t("next")}
          onPress={() => this.submit()}
          bold={false}
          disabled={this.isDisabled()}
          fill={!this.isDisabled()}
        />
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  promoCode: state.promoCode.code,
  token: state.auth.token,
  categories: state.homeFlow.categories,
  event: state.events
});

const mD = {
  updatePromoCode,
  asyncScanPromoCode,
  clearPromoCode,
  updateSettings,
  updateHomeFlow,
  updateContactLinguist
};

export default connect(
  mS,
  mD
)(PromoCodeView);
