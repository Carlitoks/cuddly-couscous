import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import { Fonts } from "../../../Themes";
import PickerSelect from "react-native-picker-select";
import { moderateScale } from "../../../Util/Scaling";
import InfoInputs from "./Partials/InfoInputs";
import CallButtons from "./Partials/CallButtons";
import OnboardingButtons from "../../Onboarding/Components/OnboardingButtons";

// Styles
import styles from "./Styles/CallSectionStyles";

export default class CallSection extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={
          this.props.type === "onboarding"
            ? [styles.mainContainer, styles.onboardingCallSectionContainer]
            : [
                styles.mainContainer,
                styles.callSectionContainer,
                styles.columnView
              ]
        }
      >
        <InfoInputs
          type={this.props.type}
          openSlideMenu={this.props.openSlideMenu}
        />
      </View>
    );
  }
}
