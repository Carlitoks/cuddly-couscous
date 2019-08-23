import React, { Component } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Styles
import styles from "./styles/TextBlockButtonStyles";

export default class TextBlockButton extends Component {

  render() {
    const { loading, text, textStyle, style,buttonStyle,disabledStyle, disabled } = this.props;
    const defaultDisableStyle = disabledStyle ?  {...styles.buttonDisable, ...disabledStyle} : styles.buttonDisable;

    return (
      <View style={style? style : styles.buttonContainer}>
            <TouchableOpacity
              disabled={disabled}
              style={disabled ? defaultDisableStyle : buttonStyle ? buttonStyle : styles.button }
              onPress={this.props.onPress}
            >
              
              {loading
                ? (<ActivityIndicator color="#ffffff" />)
                : (<Text style={styles.buttonText}>{text}</Text>)
              }
            </TouchableOpacity>
      </View>
    );
  }
}
