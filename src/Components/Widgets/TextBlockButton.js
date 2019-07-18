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
    const { loading, text, textStyle, style, disabled } = this.props;

    return (
      <View style={style}>
            <TouchableOpacity
              disabled={disabled}
              style={disabled ? styles.buttonDisable : styles.button }
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
