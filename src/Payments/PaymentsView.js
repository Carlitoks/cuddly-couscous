import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-native-vector-icons/MaterialIcons";
import PropTypes from "prop-types";
import stripe, { PaymentCardTextField } from "tipsi-stripe";

import { ScrollView, Text, Image, View, Alert } from "react-native";
import ShowMenuButton from "../Components/ShowMenuButton/ShowMenuButton";
import HeaderView from "../Components/HeaderView/HeaderView";
import Close from "../Components/Close/Close";
import ViewWrapper from "../Containers/ViewWrapper/ViewWrapper";

import styles from "./style";
import I18n from "../I18n/I18n";
import { Images } from "../Themes";
import { Colors } from "../Themes/index";
import BottomButton from "../Components/BottomButton/BottomButton.android";
import GoBackButton from "../Components/GoBackButton/GoBackButton";
import {
  updatePayments,
  setPayment,
  removePayment
} from "../Ducks/PaymentsReducer";
import { stripePublishableKey } from "../Config/env";
import { updateView } from "../Ducks/UserProfileReducer";

const Title = ({ messageText }) => (
  <View>
    <Text style={styles.messageText}>{messageText}</Text>

    <View style={styles.imageContainer}>
      <Image style={styles.image} source={Images.cardFormFront} />
    </View>
  </View>
);

const ManagePaymentMethodArea = props => {
  const {
    displayCardField,
    onAddCardPress,
    onRemoveCardPress,
    handleFieldParamsChange,
    stripeCustomerID,
    stripePaymentToken
  } = props;

  return (
    <View>
      <Text style={styles.cardsTitle}>{I18n.t("card")}</Text>
      {!!displayCardField ? (
        <View style={styles.cardFieldContainer}>
          <PaymentCardTextField
            style={styles.cardField}
            disabled={false}
            onParamsChange={handleFieldParamsChange}
          />
        </View>
      ) : (
        <View>
          <Button
            name={stripePaymentToken ? "edit" : "add"}
            size={25}
            backgroundColor={"rgba(194, 194, 194, 0.17)"}
            iconStyle={styles.buttonIcon}
            borderRadius={0}
            style={styles.button}
            underlayColor={Colors.transparent}
            color={Colors.gradientColor.top}
            onPress={onAddCardPress}
          >
            <Text style={styles.buttonText} icon>
              {stripePaymentToken
                ? I18n.t("modifyPayment")
                : I18n.t("addANewCard")}
            </Text>
          </Button>
          {stripePaymentToken && (
            <Button
              name={"remove"}
              size={25}
              backgroundColor={"rgba(194, 194, 194, 0.17)"}
              iconStyle={styles.buttonIcon}
              borderRadius={0}
              style={styles.button}
              underlayColor={"rgba(194, 194, 194, 0.17)"}
              color={Colors.gradientColor.top}
              onPress={onRemoveCardPress}
            >
              <Text style={styles.buttonText} icon>
                {I18n.t("removePayment")}
              </Text>
            </Button>
          )}
        </View>
      )}
    </View>
  );
};

class PaymentsView extends Component {
  handleFieldParamsChange = (valid, params) => {
    const { updatePayments } = this.props;
    const { number, expMonth, expYear, cvc } = params;

    const cardInfo = {
      valid,
      number,
      expMonth,
      expYear,
      cvc
    };

    if (valid) {
      updatePayments({ cardInfo });
    }
  };

  componentWillMount() {
    const { updatePayments } = this.props;

    stripe.setOptions({
      publishableKey: stripePublishableKey,
      androidPayMode: "test" // Android only
    });

    updatePayments({ displayCardField: false });
  }

  createTokenWithCard = callback => {
    const {
      cardInfo: { number, expMonth, expYear, cvc },
      updatePayments,
      updateView,
      setPayment
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
          setPayment(tokenId);
          return updateView({ stripePaymentToken: tokenId });
        })
        .then(_ => updatePayments({ loading: false }))
        .then(_ => {
          Alert.alert(
            I18n.t("paymentDetails"),
            I18n.t("paymentDetailsCreated"),
            [{ text: I18n.t("ok") }]
          );

          callback();
        })
        .catch(error => {
          console.log(error);
          console.log(error.response);
        });
    } catch (error) {
      updatePayments({ loading: false, displayCardField: false });

      Alert.alert(I18n.t("paymentDetails"), I18n.t("invalidPaymentDetails"), [
        { text: I18n.t("ok") }
      ]);

      console.log(error);
    }
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
      !!params && params.title ? params.title : I18n.t("paymentDetails");
    const messageText =
      !!params && params.messageText
        ? params.messageText
        : I18n.t("enterPaymentDetails");
    const buttonText =
      !!params && params.buttonText ? params.buttonText : I18n.t("save");
    const buttonTextIfEmpty =
      !!params && params.buttonTextIfEmpty
        ? params.buttonTextIfEmpty
        : I18n.t("continue");
    const backButton = !!params && params.backButton ? params.backButton : true;
    const closeButton =
      !!params && params.closeButton ? params.closeButton : true;
    const optional = !!params && params.optional ? params.optional : false;
    const onSubmit = !!params && params.onSubmit ? params.onSubmit : null;

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
            onPress={() => {
              if (optional && !!!displayCardField) {
                onSubmit();

                return;
              }

              this.createTokenWithCard(onSubmit);
            }}
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
  setPayment,
  removePayment,
  updateView
};

export default connect(
  mS,
  mD
)(PaymentsView);
