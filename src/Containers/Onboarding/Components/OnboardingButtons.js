import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";

// Styles
import styles from "./Styles/OnboardingButtonsStyles";
import I18n from './../../../I18n/I18n';
import metrics from './../../../Themes/Metrics';

class OnboardingButtons extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.callButtonContainer}>
        <View style={styles.callNowButtonContainer}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.dispatch({ type: "RegisterScreen" })
            }
            style={styles.callNowButton}
          >
            <Icon
              name={"ios-videocam"}
              type={"ionicon"}
              color={"#fff"}
              size={23}
              containerStyle={styles.iconPadding}
            />
            <Text style={styles.callNowButtonText}>
            {I18n.t("customerOnboarding.connectToLinguist")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.audioOnlyButtonContainer}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.dispatch({ type: "LoginScreen" })
            }
            style={styles.audioOnlyButton}
          >
            <Text style={styles.audioOnlyButtonText}>
            {`${I18n.t("alreadyAccount")} ${I18n.t("signIn")} »`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mS = state => ({});

const mD = {};

export default connect(
  mS,
  mD
)(OnboardingButtons);
