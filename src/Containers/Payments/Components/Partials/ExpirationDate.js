import React from "react";
import { TextInputMask } from "react-native-masked-text";
import { View, Text, TextInput } from "react-native";
import I18n from "../../../../I18n/I18n";

//styles
import styles from "./Styles/ExpirationDateStyles";

const ExpirationDate = props => {
  return (
    <View style={styles.EDContainer}>
      <Text style={styles.EDText}>{I18n.t("payments.expiration.title")}</Text>
      {props.type === "cardInfo" ? (
        <TextInput editable={false} style={styles.EDInput}>
          {props.date}
        </TextInput>
      ) : (
        <TextInputMask
          placeholder={I18n.t("payments.expiration.placeholder")}
          type={"datetime"}
          options={{
            format: "MM/YY"
          }}
          value={props.date}
          onChangeText={text => props.onDateChange(text)}
          style={ props.expirationDateFocus ? styles.EDInputActive :  styles.EDInput}
          onFocus={() => props.onFocus("expirationDateFocus")} 
        />
      )}
      {!props.isValidDate && props.date && props.date.length >= 4 && props.type != "cardInfo" ? (
        <Text style={styles.CCNInvalidText}>{I18n.t("payments.expiration.errInvalid")}</Text>
      ) : (
        <React.Fragment />
      )}
    </View>
  );
};

export default ExpirationDate;
