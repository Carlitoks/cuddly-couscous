import React, { Component } from "react";
import { FormInput } from "react-native-elements";
import { View, TextInput } from "react-native";
import { Colors } from "../../Themes";

import styles from "./styles";

/**
 * @description Generic form input component
 *
 * Props:
    containerStyle: Style for the Form Container,
    placeholder: Placeholder text to show on input, 
    autoCorrect: Boolean to activate/deactivate autocorrect,
    onChangeText: Function to execute when text changes,
    value: Input value,
    keyboardType: Type of keyboard to show when input is focused,
    maxLength: Input's maximum length,
    secureTextEntry: Boolean to make text secure (password),
    autoFocus: Boolean to focus on input automatically (false by default),
    sec: Boolean that indicates this input is at least the second on the form (Change styles),
    multiline: Boolean to make input multiline
 *
 * @export
 * @class InputRegular
 * @extends {Component}
 */
const InputRegular = ({
  containerStyle,
  placeholder,
  autoCorrect,
  onChangeText,
  value,
  keyboardType,
  maxLength,
  secureTextEntry,
  autoFocus,
  sec,
  multiline
}) => {
  return (
    <View style={[styles.viewBorder, !!sec ? styles.secondary : null]}>
      {!!multiline ? (
        <TextInput
          underlineColorAndroid="transparent"
          style={[
            styles.container,
            styles.multilineContainer,
            styles.formInputMultiline
          ]}
          placeholder={placeholder}
          autoCorrect={autoCorrect}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          autoFocus={autoFocus}
          inputStyle={styles.formInputMultiline}
          placeholderTextColor={Colors.placeholderColor}
          multiline={true}
          numberOfLines={3}
        />
      ) : (
        <FormInput
          underlineColorAndroid="transparent"
          containerStyle={styles.container}
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
      )}
    </View>
  );
};

export default InputRegular;
