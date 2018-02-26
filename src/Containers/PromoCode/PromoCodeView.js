import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updatePromoCode,
  asyncScanPromoCode,
  clearPromoCode
} from "../../Ducks/PromoCodeReducer";

import { updateSettings } from "../../Ducks/LinguistFormReducer";

import { View, Text, ScrollView, Alert } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";

// import { EMAIL_REGEX } from "../../Util/Constants";
import styles from "./styles";
import { Images, Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

class PromoCodeView extends Component {
  submit() {
    const { token, promoCode } = this.props;
    this.props.asyncScanPromoCode(promoCode, token).then(response => {
      const {
        requireScenarioSelection,
        restrictEventScenarios,
        scenarios
      } = response.payload;
      this.props.clearPromoCode();
      if (requireScenarioSelection && restrictEventScenarios) {
        /* Dispatch to SelectListView with the scenarios involveds*/
        this.props.updateSettings({
          selectionItemType: "scenarios",
          selectionItemName: "scenarios",
          scenarios: scenarios
        });
        this.props.navigation.dispatch({ type: "SelectListView" });
      } else if (requireScenarioSelection && !restrictEventScenarios) {
        /* Dispatch to Category Selection View (Home) */
        this.props.navigation.dispatch({ type: "Home" });
      } else if (!requireScenarioSelection) {
        /* Dispatch to Call Confirmation view */
        this.props.navigation.dispatch({ type: "CallConfirmationView" });
      }
    });
  }

  // Will be changed according the designs
  tempDisplayErrors(...errors) {
    const errorStr = errors.reduce((last, current) => {
      curr = "";
      if (current) {
        curr = `- ${current}\n`;
      }
      return last.concat(curr);
    }, "");

    Alert.alert("Errors", errorStr, [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]);
  }

  render() {
    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          title={I18n.t("promoCodeTitle")}
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
                onChangeText={text => this.props.updatePromoCode(text)}
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
