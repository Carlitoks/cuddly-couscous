import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";

export default function TextButton(props) {

  const buttonStyle = {
    ...props.style,
    justifyContent: 'center',
    alignItems: 'center'
  }

  return (
    <TouchableOpacity onPress = { props.onPress } style = {buttonStyle}>
      <Text style = {props.textStyle }>{props.text}</Text>
    </TouchableOpacity>
  );
}
