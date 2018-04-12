import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updatePromoCode,
  asyncScanPromoCode,
  clearPromoCode
} from "../../Ducks/PromoCodeReducer";

import { updateSettings } from "../../Ducks/LinguistFormReducer";

import { View, Text, ScrollView, Alert, Keyboard } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";

import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";

// import { EMAIL_REGEX } from "../../Util/Constants";
import styles from "./styles";
import { Images, Colors } from "../../Themes";
import I18n from "../../I18n/I18n";
import { emptyArray, displayFormErrors } from "../../Util/Helpers";

class PromoCodeView extends Component {
  submit() {
    const { token, promoCode } = this.props;
    Keyboard.dismiss();
    this.props
      .asyncScanPromoCode(promoCode, token)
      .then(response => {
        if (response.type === "networkErrors/error") {
          throw new Error(response.payload.data.errors);
        }
        const {
          requireScenarioSelection,
          restrictEventScenarios,
          scenarios
        } = response.payload;
        this.props.clearPromoCode();
        if (requireScenarioSelection && restrictEventScenarios) {
          /* Dispatch to SelectListView with the scenarios involveds*/
          if (scenarios) {
            this.props.updateSettings({
              selectionItemType: "scenarios",
              selectionItemName: "scenarios",
              scenarios
            });
            this.props.navigation.dispatch({ type: "PromoCodeListView" });
          } else {
            this.props.navigation.dispatch({ type: "CustomScenarioView" });
          }
        } else if (requireScenarioSelection && !restrictEventScenarios) {
          /* Dispatch to Category Selection View (Home) */

          this.props.updateSettings({
            selectionItemType: "scenarios",
            selectionItemName: "scenarios",
            scenarios: emptyArray(scenarios)
          });
          this.props.navigation.dispatch({ type: "PromotionView" });
        } else if (!requireScenarioSelection) {
          /* Dispatch to Call Confirmation view */
          this.props.navigation.dispatch({ type: "CallConfirmationView" });
        }
      })
      .catch(err => {
        displayFormErrors(err);
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
          headerCenterComponent={
            <Text style={styles.titleCall}>{I18n.t("promoCodeTitle")}</Text>
          }
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
  token: state.auth.token
});

const mD = {
  updatePromoCode,
  asyncScanPromoCode,
  clearPromoCode,
  updateSettings
};

export default connect(mS, mD)(PromoCodeView);
