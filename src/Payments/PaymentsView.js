import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import stripe from "tipsi-stripe";

import { Alert, ScrollView } from "react-native";
import ShowMenuButton from "../Components/ShowMenuButton/ShowMenuButton";
import HeaderView from "../Components/HeaderView/HeaderView";
import Close from "../Components/Close/Close";
import ViewWrapper from "../Containers/ViewWrapper/ViewWrapper";

import styles from "./style";
import I18n from "../I18n/I18n";
import BottomButton from "../Components/BottomButton/BottomButton.android";
import GoBackButton from "../Components/GoBackButton/GoBackButton";
import {
  removePayment,
  clearPayments,
  setPayment,
  updatePayments
} from "../Ducks/PaymentsReducer";
import { stripePublishableKey } from "../Config/env";
import { updateView } from "../Ducks/UserProfileReducer";

import Title from "./PaymentsTitle";
import ManagePaymentMethodArea from "./ManagePaymentMethodArea";
import { CREDIT_CARD_FORMAT } from "../Util/Constants";

class PaymentsView extends Component {
  componentWillMount() {
    const { updatePayments } = this.props;

    stripe.setOptions({
      publishableKey: stripePublishableKey,
      androidPayMode: "test" // Android only
    });

    updatePayments({ displayCardField: false });
  }

  checkFieldValidity = ({ valid, number, expMonth, expYear, cvc }) => {
    const { updatePayments } = this.props;

    const creditCardPattern = new RegExp(CREDIT_CARD_FORMAT);
    const numberProperFormat = creditCardPattern.test(number);

    const dateItemPattern = new RegExp("\\d{1,2}");
    const monthProperFormat = dateItemPattern.test(expMonth);
    const yearProperFormat = dateItemPattern.test(expYear);

    const CVCPattern = new RegExp("\\d{3}");
    const CVCProperFormat = CVCPattern.test(cvc);

    const errors = [];

    if (number.length === 0) {
      errors.push("The credit card number is required");
    } else if (!!!numberProperFormat) {
      errors.push("The credit card number has wrong format");
    }

    if (cvc.length === 0) {
      errors.push("CVC is required");
    } else if (!!!CVCProperFormat) {
      errors.push("CVC has wrong format");
    }

    if (expMonth.length === 0 || expYear.length === 0) {
      errors.push("Expiry date is missing or incomplete");
    } else if (!!!monthProperFormat || !!!yearProperFormat) {
      errors.push("Expiry date has wrong format");
    }

    updatePayments({ errors });
  };

  handleFieldParamsChange = form => {
    const { updatePayments } = this.props;
    const {
      valid,
      values: { number, expiry, cvc }
    } = form;
    const expiryMatch = expiry.match(/(\d\d)\/(\d\d)/);
    const [, expMonth, expYear] = !!expiryMatch ? expiryMatch : [];

    const cardInfo = {
      valid,
      number,
      expMonth: parseInt(expMonth),
      expYear: parseInt(expYear),
      cvc
    };

    updatePayments({ cardInfo });
  };

  createTokenWithCard = callback => {
    const {
      cardInfo: { number, expMonth, expYear, cvc },
      updatePayments,
      updateView,
      setPayment,
      clearPayments
    } = this.props;

    const params = {
      number,
      expMonth,
      expYear,
      cvc
    };

    updatePayments({ loading: true });

    try {
      return stripe
        .createTokenWithCard(params)
        .then(({ tokenId }) => {
          updateView({ stripePaymentToken: tokenId });
          return setPayment(tokenId);
        })
        .then(_ => updatePayments({ loading: false }))
        .then(_ => {
          Alert.alert(
            I18n.t("paymentDetails"),
            I18n.t("paymentDetailsCreated"),
            [{ text: I18n.t("ok") }]
          );

          clearPayments();
          callback();
        })
        .catch(error => {
          this.displayErrorAlert();
        });
    } catch (error) {
      this.displayErrorAlert();

      console.log(error);
    }
  };

  displayErrorAlert = _ => {
    const { updatePayments } = this.props;

    updatePayments({ loading: false, displayCardField: false, errors: [] });

    Alert.alert(I18n.t("paymentDetails"), I18n.t("invalidPaymentDetails"), [
      { text: I18n.t("ok") }
    ]);
  };

  submit = ({ optional, onSubmit }) => {
    const {
      displayCardField,
      cardInfo,
      cardInfo: { valid }
    } = this.props;

    this.checkFieldValidity(cardInfo);

    if ((optional && !!!displayCardField) || !!!displayCardField) {
      onSubmit();

      return;
    }
    valid ? this.createTokenWithCard(onSubmit) : this.displayErrorAlert();
  };

  render() {
    const {
      navigation,
      navigation: {
        state: { params }
      },
      displayCardField,
      updatePayments,
      loading,
      cardInfo,
      cardInfo: { valid },
      stripeCustomerID,
      stripePaymentToken,
      removePayment
    } = this.props;

    const title =
      params && params.title ? params.title : I18n.t("paymentDetails");
    const messageText =
      params && params.messageText
        ? params.messageText
        : I18n.t("enterPaymentDetails");
    const buttonText =
      params && params.buttonText ? params.buttonText : I18n.t("save");
    const buttonTextIfEmpty =
      params && params.buttonTextIfEmpty
        ? params.buttonTextIfEmpty
        : I18n.t("continue");
    const backButton = params && params.backButton ? params.backButton : true;
    const closeButton =
      params && params.closeButton ? params.closeButton : true;
    const optional = params && params.optional ? params.optional : false;
    const onSubmit = params && params.onSubmit ? params.onSubmit : null;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            backButton ? (
              <GoBackButton navigation={navigation} />
            ) : (
              <ShowMenuButton navigation={navigation} />
            )
          }
          headerRightComponent={
            closeButton && (
              <Close
                action={() => {
                  navigation.dispatch({ type: "Home" });
                }}
              />
            )
          }
          navbarTitle={title}
          navbarType={"Complete"}
          tabSelectedIndex={this.props.selectedIndex}
          onTabPress={this.handleIndexChange}
          NoWaves
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            bounces={false}
            alwaysBounceVertical={false}
          >
            <Title messageText={messageText} />

            <ManagePaymentMethodArea
              cardInfo={cardInfo}
              displayCardField={displayCardField}
              handleFieldParamsChange={this.handleFieldParamsChange}
              onAddCardPress={() => {
                updatePayments({ displayCardField: true });
              }}
              onRemoveCardPress={() => {
                removePayment().catch(error => {
                  const errorMessage = error.response.data.errors[0];
                  Alert.alert(I18n.t("temporaryError"), errorMessage, [
                    { text: I18n.t("ok") }
                  ]);
                });
              }}
              stripeCustomerID={stripeCustomerID}
              stripePaymentToken={stripePaymentToken}
            />
          </ScrollView>
          <BottomButton
            title={valid ? buttonText : buttonTextIfEmpty}
            onPress={_ => this.submit({ optional, onSubmit })}
            absolute
            bold={false}
            fill={!!optional || valid}
            loading={loading}
            disabled={!!!optional && (!!!cardInfo || !valid || loading)}
          />
        </HeaderView>
      </ViewWrapper>
    );
  }
}

PaymentsView.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      title: PropTypes.string,
      messageText: PropTypes.string,
      buttonText: PropTypes.string,
      buttonTextIfEmpty: PropTypes.string,
      backButton: PropTypes.bool,
      closeButton: PropTypes.bool,
      optional: PropTypes.bool,
      onSubmit: PropTypes.func
    })
  }).isRequired
};

const mS = ({
  payments: { displayCardField, cardInfo, loading },
  userProfile: { stripeCustomerID, stripePaymentToken },
  userProfile
}) => ({
  displayCardField,
  cardInfo,
  loading,
  stripeCustomerID,
  stripePaymentToken,
  userProfile
});

const mD = {
  updatePayments,
  clearPayments,
  setPayment,
  removePayment,
  updateView
};

export default connect(
  mS,
  mD
)(PaymentsView);
