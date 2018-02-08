import React, { Component } from "react";
import { FormInput } from "react-native-elements";
import { Colors } from "../../Themes";

import styles from "./styles";

/**
 * @description Generic form input component
 *
 * Props:
    containerStyle: Styke for the Form Container,
    placeholder: Placeholder text to show on input, 
    autoCorrect: Boolean to activate/deactivate autocorrect,
    onChangeText: Function to execute when text changes,
    value: Input value,
    keyboardType: Type of keyboard to show when input is focused,
    maxLength: Input's maximum length,
    secureTextEntry: Boolean to make text secure (password),
    autoFocus: Boolean to focus on input automatically (false by default)
 *
 * @export
 * @class InputRegular
 * @extends {Component}
 */
const InputRegular = ({ containerStyle, placeholder, autoCorrect, onChangeText, value, keyboardType, maxLength, secureTextEntry, autoFocus}) => {
  return (
    <FormInput
      containerStyle={containerStyle}
      placeholder={placeholder}
      autoCorrect={autoCorrect}
      onChangeText={onChangeText}
      value={value}
      keyboardType={keyboardType}
      maxLength={maxLength}
      secureTextEntry={secureTextEntry}
      autoFocus={autoFocus}
      inputStyle={styles.formInput}
      placeholderTextColor={Colors.placeholderColor}
    />
  );
};

export default InputRegular;