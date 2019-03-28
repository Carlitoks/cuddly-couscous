import React from "react";
import { TextInputMask } from "react-native-masked-text";
import { View, Text, Image } from "react-native";
//import { Tooltip } from "react-native-elements";
//import { Checkmark, RoundCheckMark, ExclamationMark } from "../../../../Assets/SVG";
import { moderateScale } from "../../../../Util/Scaling";
import Icons from "../../Icons";
//styles
import styles from "./Styles/CVVStyles";

const CvvInput = props => {
  return (
    <View style={styles.CVVContainer}>
      <Text style={styles.CVVText}>CVV</Text>
      <TextInputMask
        type={"custom"}
        options={{
          mask: "999"
        }}
        value={props.CVV}
        onChangeText={text => props.onChangeCVV(text)}
        style={styles.CVVInput}
      />
      <View style={styles.CVVIconContainer}>
        <Image resizeMode="contain" style={styles.CVVIcon} source={Icons.info_cvv} />
      </View>
    </View>
  );
};

export default CvvInput;
