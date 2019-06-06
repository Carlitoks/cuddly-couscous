import React, { Component } from "react";
import { connect } from "react-redux";
import { asyncScanPromoCode, clearPromoCode, updatePromoCode } from "../../Ducks/PromoCodeReducer";

import { updateSettings as updateHomeFlow } from "../../Ducks/HomeFlowReducer";

import { Keyboard, ScrollView, View } from "react-native";

import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
import BottomButton from "../../Components/BottomButton/BottomButton";
import Close from "../../Components/Close/Close";
// import { EMAIL_REGEX } from "../../Util/Constants";
import styles from "./styles";
import I18n, { translateApiErrorString } from "../../I18n/I18n";
import { displayFormErrors } from "../../Util/Alerts";
import Header from "../../Containers/CustomerHome/Components/Header";

class PromoCodeView extends Component {

  componentWillUnmount () {
    Keyboard.dismiss();
  }

  submit() {
    this.props.updateHomeFlow({
      categorySelected: ""
    });

    const { token, promoCode } = this.props;

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

        // if an error, handle that first
        if (usageError) {
          this.props.navigation.dispatch({
            type: "Home",
            params: {
              usageError: translateApiErrorString(
                usageError,
                "api.errEventUnavailable"
              )
            }
          });
          return;
        }

        // otherwise, for now we only support codes that add
        // minutes to the user account
        if (addMinutesToUser) {
          this.props.navigation.dispatch({
            type: "Home",
            params: {
              minutesGranted: true,
              maxMinutesPerUser,
              organization: organization.name
            }
          });
          return;
        }

        // otherwise... unexpected code
        this.props.navigation.dispatch({ type: "Home" });
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
      <View style={styles.scrollContainer}>
        <Header
          navigation={this.props.navigation}
          leftComponent={
            <ShowMenuButton navigation={this.props.navigation} />
          }
          rightComponent={
            <Close
              action={() => {
                this.props.navigation.dispatch({ type: "Home" });
              }}
            />
          }
          navbarTitle={I18n.t("promoCodeTitle")}
        />
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
        {/* Next Button */}
        <BottomButton
          title={I18n.t("next")}
          onPress={() => this.submit()}
          bold={false}
          disabled={this.isDisabled()}
          fill={!this.isDisabled()}
        />
      </View>
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
  updateHomeFlow,
};

export default connect(
  mS,
  mD
)(PromoCodeView);
