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


  isDisabled = () => {
    return false
  };

  render() {
    return (
      <View style={styles.callButtonContainer}>

            <TouchableOpacity
              disabled={this.isDisabled()}
              style={this.isDisabled() ? styles.videoCallButtonDisable : styles.videoCallButton }
            >
              <Text
                style={styles.callNowButtonText}
              >
                {I18n.t("newCustomerHome.buttons.video")}
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
