import React from "react";
import { TextInputMask } from "react-native-masked-text";
import { View, Text } from "react-native";

//styles
import styles from './Styles/ExpirationDateStyles';

const ExpirationDate = props => {
  return (
    <View style={styles.EDContainer}>
      <Text style={styles.EDText}>Expiration Date</Text>
      <TextInputMask
        type={'datetime'}
        options={{
          format: 'MM/YY'
        }}
        value={props.date}
        onChangeText={(text) => props.onDateChange(text)}
        style={styles.EDInput}
      />
    </View>
  );
};

export default ExpirationDate;
