import React, { Component } from "react";
import { connect } from "react-redux";

import { Text, View, TouchableWithoutFeedback } from "react-native";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import Close from "../../Components/Close/Close";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";
import { previousView } from "../../Util/Helpers";

import styles from "./styles";
import I18n from "../../I18n/I18n";
import CelebrateOurLaunch from "../../Components/CelebrateOurLaunch/CelebrateOurLaunch";
import { Icon } from "react-native-elements";
import Colors from "../../Themes/Colors";
import { moderateScale } from "../../Util/Scaling";
import { DollarSign, PricingTime, RoundCheckMark } from "../../Assets/SVG";

class CallPricingView extends Component {
  showAccountBalance() {
    const { availableMinutes, stripePaymentToken } = this.props;
    if (availableMinutes == 0 && !!stripePaymentToken) {
      return false;
    } else {
      return true;
    }
  }

  showAddPayment() {
    const { stripePaymentToken } = this.props;
    if (!!stripePaymentToken) {
      return false;
    } else {
      return true;
    }
  }

  showChangePayment() {
    const { stripePaymentToken } = this.props;
    if (!!stripePaymentToken) {
      return true;
    } else {
      return false;
    }
  }

  getDescription() {
    const { availableMinutes, stripePaymentToken } = this.props;
    if (availableMinutes == 0 && !!!stripePaymentToken) {
      return I18n.t("pricingScreen.descriptions.noMinutesNoCard");
    }
    if (availableMinutes == 0 && !!stripePaymentToken !== "") {
      return I18n.t("pricingScreen.descriptions.noMinutesHasCard");
    }
    if (availableMinutes > 0 && !!!stripePaymentToken) {
      return I18n.t("pricingScreen.descriptions.hasMinutesNoCard");
    }
    if (availableMinutes > 0 && !!stripePaymentToken) {
      return I18n.t("pricingScreen.descriptions.hasMinutesAndCard");
    }
  }

  getStyleAddCreditCard(type) {
    const { availableMinutes, stripePaymentToken } = this.props;

    switch (type) {
      case "box":
        if (availableMinutes == 0 && stripePaymentToken !== "") {
          return { backgroundColor: Colors.pricingViewRed };
        }
        break;
      case "content":
        if (availableMinutes == 0 && stripePaymentToken !== "") {
          return {
            textColor: { color: Colors.white },
            textContent: I18n.t(
              "pricingScreen.paymentInfo.descriptionNoMinutes"
            ),
            iconColor: Colors.white
          };
        }
        if (availableMinutes <= 5 && stripePaymentToken !== "") {
          return {
            textColor: { color: Colors.pricingViewRed },
            textLinkColor: { color: Colors.pricingViewPurple },
            textContent: I18n.t(
              "pricingScreen.paymentInfo.descriptionLowMinutes"
            ),
            iconColor: Colors.pricingViewRed
          };
        }
        if (availableMinutes >= 5 && stripePaymentToken !== "") {
          return {
            textColor: { color: Colors.pricingViewBlack },
            textLinkColor: { color: Colors.pricingViewPurple },
            textContent: I18n.t(
              "pricingScreen.paymentInfo.descriptionHasMinutes"
            ),
            iconColor: Colors.pricingViewBlack
          };
        }
        break;
      default:
        break;
    }
  }

  render() {
    const {
      availableMinutes,
      stripePaymentToken,
      navigation,
      stripePaymentSourceMeta
    } = this.props;
    const enoughAvailableTime = availableMinutes <= 5 ? false : true;
    const pricingColor = {
      color: enoughAvailableTime
        ? Colors.pricingViewGreen
        : Colors.pricingViewRed
    };
    const addPaymentContent = this.getStyleAddCreditCard("content");
    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          navbarTitle={I18n.t("pricingScreen.screenTitle")}
          navbarType={"Complete"}
          headerRightComponent={
            <Close
              action={() => {
                this.props.navigation.dispatch({ type: "Home" });
              }}
            />
          }
          NoWaves
        >
          {/* Pricing Container */}
          <View style={styles.pricing_title_box}>
            <View style={styles.pricing_inner_box}>
              <View style={styles.pricing_icon_box}>
                <DollarSign
                  width={moderateScale(150)}
                  height={moderateScale(150)}
                />
              </View>
              <Text style={styles.pricing_title}>
                {I18n.t("pricingScreen.pricing.title")}
              </Text>
            </View>
            <Text style={styles.pricing_rate}>
              {I18n.t("pricingScreen.pricing.rate")}
            </Text>
          </View>
          {/* Account Balance Container */}
          {this.showAccountBalance() ? (
            <View style={styles.account_balance_box}>
              <View style={styles.account_balance_inner_box}>
                <View style={styles.pricing_icon_box}>
                  <PricingTime
                    width={moderateScale(150)}
                    height={moderateScale(150)}
                    color={
                      enoughAvailableTime
                        ? Colors.pricingViewGreen
                        : Colors.pricingViewRed
                    }
                  />
                </View>
                <Text style={[styles.account_balance_title, pricingColor]}>
                  {I18n.t("pricingScreen.balance.title")}
                </Text>
              </View>
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Text style={[styles.account_balance_minutes, pricingColor]}>
                  {this.props.availableMinutes}
                </Text>
                <Text
                  style={[styles.account_balance_minutes_label, pricingColor]}
                >
                  {I18n.t("pricingScreen.balance.min")}
                </Text>
              </View>
            </View>
          ) : null}
          {/* Add Credit Card Container */}
          {this.showAddPayment() ? (
            <View
              style={[
                styles.add_credit_card_box,
                this.getStyleAddCreditCard("box")
              ]}
            >
              <View style={styles.account_balance_inner_box}>
                <View style={styles.add_credit_card_icon_align}>
                  <Icon
                    icon={styles.dollar_icon}
                    name={"exclamation"}
                    type="evilicon"
                    size={moderateScale(53)}
                    color={addPaymentContent.iconColor}
                  />
                </View>
                <View style={styles.add_credit_card_content_column_box}>
                  <Text
                    style={[
                      styles.add_credit_card_title,
                      addPaymentContent.textColor
                    ]}
                  >
                    {I18n.t("pricingScreen.paymentInfo.titleNoCard")}
                  </Text>
                  <Text
                    style={[
                      styles.add_credit_card_description,
                      addPaymentContent.textColor
                    ]}
                  >
                    {addPaymentContent.textContent}
                  </Text>
                </View>
              </View>
              <View style={styles.add_credit_card_link}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.props.navigation.dispatch({
                      type: "PaymentsView",
                      params: {
                        title: I18n.t("paymentDetails"),
                        messageText: I18n.t("enterPaymentDetails"),
                        buttonText: I18n.t("save"),
                        buttonTextIfEmpty: I18n.t("save"),
                        optional: true,
                        onSubmit: () =>
                          navigation.dispatch({ type: "CallPricingView" })
                      }
                    });
                  }}
                >
                  <View>
                    <Text
                      style={[
                        styles.account_balance_minutes_label,
                        addPaymentContent.textLinkColor
                      ]}
                    >
                      {I18n.t("pricingScreen.paymentInfo.linkNoCard")}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          ) : null}
          {/* Available Credit Card Container */}
          {this.showChangePayment() ? (
            <View style={styles.available_credit_card_box}>
              <View style={styles.available_credit_card_inner_box}>
                <View style={styles.pricing_icon_box}>
                  <RoundCheckMark
                    width={moderateScale(150)}
                    height={moderateScale(150)}
                    color={Colors.pricingViewBlack}
                  />
                </View>
                <Text style={styles.available_credit_card_title}>
                  {I18n.t("pricingScreen.paymentInfo.titleWithCard")}
                </Text>
              </View>
              <View style={styles.available_credit_card_icon_column}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.props.navigation.dispatch({
                      type: "PaymentsView",
                      params: {
                        title: I18n.t("paymentDetails"),
                        messageText: I18n.t("enterPaymentDetails"),
                        buttonText: I18n.t("save"),
                        buttonTextIfEmpty: I18n.t("save"),
                        optional: true,
                        onSubmit: () =>
                          navigation.dispatch({ type: "CallPricingView" })
                      }
                    });
                  }}
                >
                  <View style={styles.content_align_center}>
                    <View style={styles.available_credit_card_icon_row}>
                      <Icon
                        icon={styles.dollar_icon}
                        name={"credit-card-alt"}
                        type="font-awesome"
                        size={moderateScale(30)}
                        color={Colors.pricingViewBlack}
                      />
                      <Text style={styles.available_credit_card_numbers}>
                        ...
                        {stripePaymentSourceMeta !== null &&
                        !!stripePaymentSourceMeta.last4
                          ? stripePaymentSourceMeta.last4
                          : null}
                      </Text>
                    </View>
                    <Text style={styles.available_credit_card_change}>
                      {I18n.t("pricingScreen.paymentInfo.linkWithCard")}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          ) : null}
          {/* Botttom Button Container */}
          <View style={styles.buttons}>
            <View style={styles.pricing_screen_description_box}>
              <Text style={styles.pricing_screen_description}>
                {this.getDescription()}
              </Text>
            </View>
            <BottomButton
              title={
                !!stripePaymentToken
                  ? I18n.t("pricingScreen.buttons.accept")
                  : I18n.t("continueForFree")
              }
              onPress={() => {
                const { routes, navigation } = this.props;
                if (this.props.event.id) {
                  const setLanguage =
                    !this.props.event.allowSecondaryLangSelection &&
                    this.props.event.defaultSecondaryLangCode;
                  if (setLanguage) {
                    navigation.dispatch({ type: "CallConfirmationView" });
                  } else {
                    const continueScreen =
                      previousView(routes) === "CallConfirmationView"
                        ? "back"
                        : "SessionLanguageView";

                    navigation.dispatch({ type: continueScreen });
                  }
                } else {
                  const continueScreen =
                    previousView(routes) === "CallConfirmationView"
                      ? "back"
                      : "SessionLanguageView";

                  navigation.dispatch({ type: continueScreen });
                }
              }}
              disabled={
                !!!stripePaymentToken && availableMinutes == 0 ? true : false
              }
              fill
              bold
              greyText
              absolute
            />
          </View>
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  routes: state.nav.routes[0].routes[0].routes,
  promotion: state.promoCode.scanned,
  event: state.events,
  availableMinutes: state.userProfile.availableMinutes,
  stripePaymentToken: state.userProfile.stripePaymentToken,
  stripePaymentSourceMeta: state.userProfile.StripePaymentSourceMeta
});

const mD = {};

export default connect(
  mS,
  mD
)(CallPricingView);
