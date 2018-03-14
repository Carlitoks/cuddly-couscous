import React, { Component } from "react";
import I18n from "../../I18n/I18n";
import { View, ActivityIndicator, KeyboardAvoidingView } from "react-native";
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
          negative ? styles.negativeContainer : null,
          !!relative ? styles.relative : null
        ]}
      >
        <LinearGradient
          colors={
            fill
              ? [
                  Colors.gradientColorButton.top,
                  //Colors.gradientColorButton.middle,
                  Colors.gradientColorButton.bottom
                ]
              : ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.1)"]
          }
          locations={[0.0, 1.0]}
          style={[styles.linearGradient, long ? styles.long : null]}
          //Left to Right
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1.0, y: 0.5 }}
        >
          <Button
            borderRadius={50}
            textStyle={[
              styles.text,
              bold || long ? styles.textBold : null,
              disabled
                ? loading ? styles.transparent : styles.textDisabled
                : null,
              fill || whiteText ? styles.white : null
            ]}
            title={title}
            onPress={() => {
              onPress();
            }}
            disabled={disabled}
            disabledStyle={{ backgroundColor: Colors.primaryColor }}
            iconRight={
              !!icon
                ? {
                    name: icon,
                    size: 25,
                    color: fill
                      ? Colors.primaryColor
                      : Colors.gradientColorButton.top
                  }
                : null
            }
            backgroundColor={fill ? "transparent" : Colors.primaryColor}
            buttonStyle={[
              styles.buttonContainer,
              long ? styles.long : null,
              fill ? styles.fillBtn : null,
              disabled ? styles.disabledBtn : null,
              negative ? styles.negative : null
            ]}
          />
          <View style={styles.spinner}>
            {!!loading ? (
              <ActivityIndicator
                size="large"
                color={Colors.gradientColorButton.top}
              />
            ) : null}
          </View>
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  );
};

export default BottomButton;
