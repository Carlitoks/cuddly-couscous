import React from "react";
import { View, Image, TextInput, Text, Platform } from "react-native";
import I18n from "../../../../I18n/I18n";

//styles
import styles from "./Styles/CreditCardNumberStyles";
import { TextInputMask } from "react-native-masked-text";

const CreditCardNumber = props => {
  return (
    <View style={styles.CCNContainer}>
      <Text style={styles.CCNText}>{I18n.t("payments.number.title")}</Text>
      <View style={styles.CCNInputContainer}>
        {props.type === "cardInfo" ? (
          <TextInput editable={false} style={styles.CCNInput}>
            {props.creditCard}
          </TextInput>
        ) : (
          <TextInputMask
            type={"credit-card"}
            placeholder="XXXX - XXXX - XXXX - XXXX"
            options={{
              obfuscated: false
            }}
            value={props.creditCard}
            onChangeText={props.onChange}
            style={styles.CCNInput}
          />
        )}
        {props.creditCard ? (
          <View style={styles.CCIconContainer}>
            <Image resizeMode="contain" style={styles.CCIcon} source={props.creditCardIcon} />
          </View>
        ) : null}
      </View>
      {!props.isValidCC && props.creditCard > 0 ? (
        <Text style={styles.CCNInvalidText}>{I18n.t("payments.number.errInvalid")}</Text>
      ) : (
        <React.Fragment />
      )}
    </View>
  );
};

export default CreditCardNumber;
