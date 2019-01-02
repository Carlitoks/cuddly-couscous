import React, { Component } from "react";
import { View } from "react-native";
import InfoInputs from "./Partials/InfoInputs";

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
