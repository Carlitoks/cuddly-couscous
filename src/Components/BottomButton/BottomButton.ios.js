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
    absolute: Boolean to make View style changes from absolute to absolute,    
    gradient: Boolean to add a white to transparent gradient as background,    
    icon: String containing the Icon name,
    customStyle: Custom styles for View Component,
    whiteText: Boolean to turn text color white,
    transparent: Boolean to make the button background transparent
    color: String set the color of the button
    whiteDisabled: boolean to make disabled button white
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
  absolute,
  gradient,
  icon,
  whiteText,
  customStyle,
  transparent,
  color,
  whiteDisabled
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
        {gradient && (
          <LinearGradient
            colors={[Colors.white, Colors.transparent]}
            style={styles.linearGradientBackground}
          />
        )}
        <Button
          borderRadius={50}
          textStyle={[
            styles.text,
            bold || long ? styles.textBold : null,
            disabled
              ? loading
                ? styles.transparent
                : whiteDisabled ? styles.textWhiteDisabled : styles.textDisabled
              : null,
            fill || whiteText ? styles.white : null
          ]}
          title={title}
          onPress={() => {
            onPress();
          }}
          disabled={disabled}
          disabledStyle={
            whiteDisabled
              ? styles.transparentBackground
              : styles.whiteBackground
          }
          iconRight={
            !!icon
              ? {
                  name: icon,
                  size: 25,
                  color: fill
                    ? Colors.primaryColor
                    : color ? color : Colors.gradientColorButton.top
                }
              : null
          }
          backgroundColor={fill ? Colors.transparent : Colors.primaryColor}
          buttonStyle={[
            styles.buttonContainer,
            whiteDisabled ? styles.whiteBorder : styles.normalBorder,
            transparent ? styles.transparent : null,
            long ? styles.long : null,
            fill ? styles.fillBtn : null,
            disabled
              ? whiteDisabled ? styles.disabledWhiteBtn : styles.disabledBtn
              : styles.enabledBtn,
            negative ? styles.negative : null,
            color ? { borderColor: color } : null
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
      </View>
    </KeyboardAvoidingView>
  );
};

export default BottomButton;
