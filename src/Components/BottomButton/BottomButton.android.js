import React, { Component } from "react";
import I18n from "../../I18n/I18n";
import { View, ActivityIndicator } from "react-native";
import { Button } from "react-native-elements";
import { Colors } from "../../Themes";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";

/**
 * @description Generic fixed to bottom button component
 *
 * Props:
    onPress: function to execute when button is pressed,
    title: Button text,
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
  whiteDisabled,
  greyText,
  smaller
}) => {
  return (
    <View
      style={[
        styles.containerBottom,
        !!customStyle ? customStyle : null,
        negative || bottom ? styles.bottom : null,
        !!relative ? styles.relative : null,
        !!absolute ? styles.absolute : null
      ]}
    >
      {gradient && (
        <LinearGradient
          colors={[Colors.transparent, Colors.white]}
          style={styles.linearGradientBackground}
          locations={[0, 0.3]}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button
          borderRadius={50}
          textStyle={[
            styles.text,
            disabled
              ? loading
                ? styles.transparent
                : whiteDisabled
                  ? styles.textWhiteDisabled
                  : styles.textDisabled
              : null,
            fill || whiteText ? styles.white : null,
            greyText ? styles.textDisabled : null
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
                    : color
                      ? color
                      : Colors.gradientColorButton.top
                }
              : null
          }
          backgroundColor={fill ? Colors.transparent : Colors.primaryColor}
          buttonStyle={[
            styles.button,
            whiteDisabled ? styles.whiteBorder : styles.normalBorder,
            transparent ? styles.transparent : null,
            long ? styles.long : null,
            fill ? styles.fillBtn : null,
            disabled
              ? whiteDisabled
                ? styles.disabledWhiteBtn
                : styles.disabledBtn
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
      <View
        style={[
          styles.bottomSeparation,
          gradient ? { backgroundColor: Colors.white } : null
        ]}
      />
    </View>
  );
};

export default BottomButton;
