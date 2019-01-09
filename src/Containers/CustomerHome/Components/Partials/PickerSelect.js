import React, { Component } from "react";
import { Text, View, TouchableOpacity, Button, ScrollView } from "react-native";
import PickerSelect from "react-native-picker-select";
import { FilterLangsByCodes } from "../../../../Config/Languages";
import { connect } from "react-redux";
import SlidingUpPanel from "rn-sliding-up-panel";

// Styles
import styles from "./Styles/PickerSelectStyles";
import { Icon, Divider } from "react-native-elements";
import Metrics from "./../../../../Themes/Metrics";
import { translateLanguage } from "./../../../../I18n/I18n";

class PickerSelectComponent extends Component {
  constructor(props) {
    super(props);
  }
  showCurrentSelectedLang = () => {
    if (
      this.props.type === "primaryLang" &&
      this.props.session.primaryLangCode
    ) {
      return (
        <Text style={styles.inputValue}>
          {translateLanguage(
            FilterLangsByCodes([this.props.session.primaryLangCode])[0]["3"],
            FilterLangsByCodes([this.props.session.primaryLangCode])[0].name
          )}
        </Text>
      );
    } else if (
      this.props.type === "secondaryLang" &&
      this.props.session.secondaryLangCode
    ) {
      return (
        <Text style={styles.inputValue}>
          {translateLanguage(
            FilterLangsByCodes([this.props.session.secondaryLangCode])[0]["3"],
            FilterLangsByCodes([this.props.session.secondaryLangCode])[0].name
          )}
        </Text>
      );
    }
    return (
      <Text style={styles.inputPlaceholderValue}>{this.props.placeholder}</Text>
    );
  };

  showCurrentCustomScenarioNote = () => {
    if (this.props.session.customScenarioNote.length > 0)
      return (
        <Text style={styles.inputValue}>
          {`${this.props.session.customScenarioNote.substring(0, 50)}...`}
        </Text>
      );
    return (
      <Text style={styles.inputPlaceholderValue}>{this.props.placeholder}</Text>
    );
  };

  render() {
    return (
      <View
        style={
          this.props.navType === "onboarding"
            ? styles.onboardingInputContainer
            : styles.homeInputContainer
        }
      >
        <TouchableOpacity
          onPress={() => { this.props.openSlideMenu(this.props.type) }}
        >
          <Text style={styles.inputTitle}>{this.props.title}</Text>
          <View style={styles.currentSelectedLangContainer}>
            {this.props.type === "additionalDetails"
              ? this.showCurrentCustomScenarioNote()
              : this.showCurrentSelectedLang()}
            {this.props.type === "additionalDetails" ? (
              <React.Fragment />
            ) : (
              <Icon
                color={"#ffffff"}
                name={
                  this.props.isSlideUpMenuVisible
                    ? "chevron-up"
                    : "chevron-down"
                }
                type={"evilicon"}
                size={17}
              />
            )}
          </View>
          <Divider />
        </TouchableOpacity>
      </View>
    );
  }
}

const mS = state => {
  return {
    session: state.newSessionReducer.session,
    isSlideUpMenuVisible: state.newSessionReducer.isSlideUpMenuVisible
  };
};

const mD = {};

export default connect(
  mS,
  mD
)(PickerSelectComponent);
