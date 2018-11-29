import React from "react";
import { Button } from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";

import { Text, View } from "react-native";

import styles from "./style";
import I18n from "../I18n/I18n";
import { Colors } from "../Themes/index";

import { LiteCreditCardInput } from "react-native-credit-card-input";

const PaymentsFieldErrorMessages = ({ errors }) =>
  errors.map((error, index) => (
    <Text key={index} style={styles.errorMessages}>
      {error}
    </Text>
  ));

const ManagePaymentMethodArea = props => {
  const {
    displayCardField,
    onAddCardPress,
    onRemoveCardPress,
    handleFieldParamsChange,
    stripePaymentToken,
    errors
  } = props;

  return (
    <View>
      <Text style={styles.cardsTitle}>{I18n.t("card")}</Text>
      {!!displayCardField ? (
        <View>
          <View style={styles.cardFieldContainer}>
            <LiteCreditCardInput
              onChange={handleFieldParamsChange}
              additionalInputsProps={{
                number: {
                  maxLength: 19,
                  keyboardType: "phone-pad"
                  // contextMenuHidden: true adds the ability to disable pasting in the field
                },
                expiry: { maxLength: 5, keyboardType: "decimal-pad" },
                cvc: { maxLength: 4, keyboardType: "number-pad" }
              }}
            />
          </View>

          <PaymentsFieldErrorMessages errors={errors} />
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

const mS = ({ payments: { errors } }) => ({
  errors
});

const mD = {};

export default connect(
  mS,
  mD
)(ManagePaymentMethodArea);
