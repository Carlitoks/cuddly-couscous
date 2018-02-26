import React, { Component } from "react";
import I18n from "../../I18n/I18n";
import { View, KeyboardAvoidingView } from "react-native";
import { Button } from "react-native-elements";
import { Colors } from "../../Themes";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { topIOS } from "../../Util/Devices";
import DeviceInfo from "react-native-device-info";

/**
 * @description Generic fixed to bottom button component
 *
 * Props:
    onPress: function to execute when button is pressed,
    title: Button text,
    bold: Boolean to specify if text is bold,
    loading: Boolean to specify if button is loading,
    disabled: Boolean to specify if button is disabled,
    long: Boolean to make the button larger,
    fill: Boolean to make the button filled with the gradient,
    negative: Boolean to make button negative ie. transparent with colored text,
    bottom: Boolean to make button paddingBottom property 0.
    relative: Boolean to make View style changes from absolute to relative,
    icon: String containing the Icon name,
    customStyle: Custom styles for View Component,
    whiteText: Boolean to turn text color white
 *
*/

const BottomButton = ({
  onPress,
  title,
  bold,
  loading,
  disabled,
  long,
  fill,
  negative,
  bottom,
  relative,
  icon,
  whiteText,
  customStyle
}) => {
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={topIOS()}>
      <View
        style={[
          styles.containerBottom,
          !!customStyle ? customStyle : null,
          negative || bottom ? styles.bottom : null,
          !!relative ? styles.relative : null
        ]}
      >
        <LinearGradient
          colors={
            !!disabled
              ? [Colors.disabledColor, Colors.disabledColor]
              : !!negative
                ? ["transparent", "transparent"]
                : [
                    Colors.gradientColorButton.top,
                    Colors.gradientColorButton.middle,
                    Colors.gradientColorButton.bottom
                  ]
          }
          style={[styles.linearGradient, long ? styles.long : null]}
          //Left to Right
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1.0, y: 0.5 }}
        >
          <Button
            textStyle={
              bold
                ? styles.textBold
                : disabled
                  ? styles.textDisabled
                  : fill || whiteText ? styles.white : styles.text
            }
            title={title}
            onPress={() => {
              onPress();
            }}
            loading={loading}
            disabled={disabled}
            disabledStyle={{ backgroundColor: Colors.primaryColor }}
            icon={
              !!icon
                ? {
                    name: icon,
                    size: 25,
                    color: fill
                      ? Colors.primaryColor
                      : Colors.gradientColorButton.top,
                    style: {
                      position: "absolute",
                      flexDirection: "row",
                      left: !!long ? "85%" : "75%"
                    }
                  }
                : null
            }
            backgroundColor={fill ? "transparent" : Colors.primaryColor}
            buttonStyle={[styles.buttonContainer, long ? styles.long : null]}
          />
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BottomButton;
