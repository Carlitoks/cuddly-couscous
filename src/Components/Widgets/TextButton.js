import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";

export default function TextButton(props) {

  const buttonStyle = {
    ...props.style,
    justifyContent: 'center',
    alignItems: 'center'
  }

  const press = () => {
    if (!props.disabled) {
      props.onPress();
    }
  };

  return (
    <TouchableOpacity onPress = {() => { press() }} style = {buttonStyle}>
      <Text style = {props.textStyle }>{props.text}</Text>
    </TouchableOpacity>
  );
}
