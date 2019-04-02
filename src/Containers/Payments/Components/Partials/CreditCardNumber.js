import React from "react";
import { View, Image, TextInput, Text, Platform } from "react-native";

//styles
import styles from "./Styles/CreditCardNumberStyles";
import { TextInputMask } from "react-native-masked-text";

const CreditCardNumber = props => {
  return (
    <View style={styles.CCNContainer}>
      <Text style={styles.CCNText}>Card Number</Text>
      <View style={styles.CCNInputContainer}>
        {props.type === "cardInfo" ? (
          <TextInput editable={false} style={styles.CCNInput}>
            {props.creditCard}
          </TextInput>
        ) : (
          <TextInputMask
            type={"credit-card"}
            options={{
              obfuscated: false
            }}
            value={props.creditCard}
            onChangeText={props.onChange}
            style={styles.CCNInput}
          />
        )}
        <View style={styles.CCIconContainer}>
          <Image resizeMode="contain" style={styles.CCIcon} source={props.creditCardIcon} />
        </View>
      </View>
      {!props.isValidCC && props.creditCard > 0 ? (
        <Text style={styles.CCNInvalidText}>Invalid Card Number</Text>
      ) : (
        <React.Fragment />
      )}
    </View>
  );
};

export default CreditCardNumber;
