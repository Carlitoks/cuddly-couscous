import React, { Component } from "react";
import I18n from "../../I18n/I18n";
import { View, KeyboardAvoidingView } from "react-native";
import DeviceInfo from "react-native-device-info"
import { Button } from "react-native-elements";
import { Colors } from "../../Themes";
import styles from "./styles";
import { topIOS } from "../../Util/Devices";

/**
 * @description Generic fixed to bottom button component
 *
 * Props:
    onPress: function to execute when button is pressed,
    disabledColor: Base button disabled color,
    title: Button text,
    bold: Boolean to specify if text is bold,
    loading: Boolean to specify if button is loading,
    disabled: Boolean to specify if button is disabled,
    icon: Object containing the Icon
 *
*/
const IphoneX = DeviceInfo.getModel() == "iPhone X";
const BottomButton = ({ onPress, color, title, buttonColor, bold, loading, disabled, disabledColor, icon}) => { 
  return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={topIOS()}>
       <View style={styles.containerBottom}>
        <Button
          buttonStyle={IphoneX ? styles.buttonContainerX : styles.buttonContainer}
          textStyle={bold ? styles.textBold : null}
          title={title}
          onPress = {() => {onPress()}}
          loading={loading}
          disabled={disabled}
          disabledStyle={!!disabledColor ? {backgroundColor: disabledColor } : null }
          icon={!!icon ? icon : null}
          color={Colors.primaryAltFontColor}
          backgroundColor={Colors.primaryLightFillColor}
          buttonStyle={styles.buttonContainer}
        />
        </View>
        </KeyboardAvoidingView>
    );
};

export default BottomButton;