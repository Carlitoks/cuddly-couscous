import React from "react";
import { TextInputMask } from "react-native-masked-text";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import I18n from "../../../../I18n/I18n";
import Icons from "../../Icons";
//styles
import styles from "./Styles/CVVStyles";

const CvvInput = props => {
  return (
    <View style={styles.CVVContainer}>
      <Text style={styles.CVVText}>{I18n.t("payments.cvv.title")}</Text>
      {props.type === "cardInfo" ? (
        <TextInput editable={false} style={styles.CVVInput}>
          ***
        </TextInput>
      ) : (
        <TextInputMask
          type={"custom"}
          options={{
            mask: props.brand && props.brand === "american-express" ? "9999" : "999"
          }}
          keyboardType={"number-pad"}
          value={props.CVV}
          onChangeText={text => props.onChangeCVV(text)}
          style={styles.CVVInput}
        />
      )}
      <TouchableOpacity style={styles.CVVIconContainer} onPress={props.onTooltipPress}>
        <Image resizeMode="contain" style={styles.CVVIcon} source={props.currentTooltipIcon} />
      </TouchableOpacity>
      {props.currentTooltipIcon === Icons.info_cvv_pressed ? (
        <View style={styles.tooltipContainerStyle}>
          <Text>{I18n.t("payments.cvv.description")}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default CvvInput;
