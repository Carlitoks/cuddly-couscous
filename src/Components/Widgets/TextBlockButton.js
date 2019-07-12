import React, { Component } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import I18n, { translateApiError } from "../../I18n/I18n";

// Styles
import styles from "./styles/TextBlockButtonStyles";

class TextBlockButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createDisabled: false,
      creating: false
    };
  }


  render() {
    const { text, textStyle, style, disabled } = this.props;

    return (
      <View style={style}>
            <TouchableOpacity
              disabled={disabled}
              style={disabled ? styles.buttonDisable : styles.button }
              onPress={this.props.onPress}
            >
              <Text
                style={styles.buttonText}
              >
                {I18n.t(text)}
              </Text>
            </TouchableOpacity>
      </View>
    );
  }
}

const mS = state => ({
});

const mD = {
};

export default connect(
  mS,
  mD,
)(TextBlockButton);
