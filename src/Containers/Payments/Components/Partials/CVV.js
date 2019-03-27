import React from "react";
import { TextInputMask } from "react-native-masked-text";
import { View, Text } from "react-native";

//styles
import styles from './Styles/CVVStyles';

const ExpirationDate = props => {
  return (
    <View style={styles.CVVContainer}>
      <Text style={styles.CVVText}>CVV</Text>
      <TextInputMask
        type={'custom'}
        options={{
          mask: '999'
        }}
        value={props.CVV}
        onChangeText={(text) => props.onChangeCVV(text) }
        style={styles.CVVInput}
      />
    </View>
  );
};

export default ExpirationDate;
