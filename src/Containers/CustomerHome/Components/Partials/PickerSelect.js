import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

// Styles
import { Icon, Divider } from "react-native-elements";
import styles from "./Styles/PickerSelectStyles";
import { FilterLangsByCodes } from "../../../../Config/Languages";
import { translateLanguage } from "../../../../I18n/I18n";
import { Scenarios } from "../../../../Api";

class PickerSelectComponent extends Component {
  showCurrentSelectedLang = () => {
    const { type, session, placeholder } = this.props;
    if (type === "primaryLang" && session.primaryLangCode) {
      return (
        <Text style={styles.inputValue}>
          {translateLanguage(
            FilterLangsByCodes([session.primaryLangCode])[0]["3"],
            FilterLangsByCodes([session.primaryLangCode])[0].name
          )}
        </Text>
      );
    }
    if (type === "secondaryLang" && session.secondaryLangCode) {
      return (
        <Text style={styles.inputValue}>
          {translateLanguage(
            FilterLangsByCodes([session.secondaryLangCode])[0]["3"],
            FilterLangsByCodes([session.secondaryLangCode])[0].name
          )}
        </Text>
      );
    }
    return <Text style={styles.inputPlaceholderValue}>{placeholder}</Text>;
  };

  showScenarioList = () => {
    const { scenariosList, session, placeholder } = this.props;

    if (session.scenarioID && session.scenarioID != "custom") {
      const selectedScenario = scenariosList.find(scenario => scenario.id === session.scenarioID);
      return <Text style={styles.inputValue}>{selectedScenario.title}</Text>;
    }
    if (session.customScenarioSelected === "custom") {
      return <Text style={styles.inputValue}>{"Other"}</Text>;
    }
    return <Text style={styles.inputPlaceholderValue}>{placeholder}</Text>;
  };

  showCurrentCustomScenarioNote = () => {
    const { session, placeholder } = this.props;
    if (session.customScenarioNote.length > 0)
      return (
        <Text style={styles.inputValue}>{`${session.customScenarioNote.substring(0, 50)}...`}</Text>
      );
    return <Text style={styles.inputPlaceholderValue}>{placeholder}</Text>;
  };

  render() {
    const { navType, openSlideMenu, title, type, isSlideUpMenuVisible, session } = this.props;
    return (
      <View
        style={
          navType === "onboarding" ? styles.onboardingInputContainer : styles.homeInputContainer
        }
      >
        <TouchableOpacity
          onPress={() => {
            openSlideMenu(type);
          }}
        >
          <Text style={styles.inputTitle}>{title}</Text>
          <View style={styles.currentSelectedLangContainer}>
            {type === "additionalDetails"
              ? this.showCurrentCustomScenarioNote()
              : type === "scenarioSelection"
              ? this.showScenarioList()
              : this.showCurrentSelectedLang()}
            {type === "additionalDetails" ? (
              <React.Fragment />
            ) : (
              <Icon
                color="#ffffff"
                name={isSlideUpMenuVisible ? "chevron-up" : "chevron-down"}
                type="evilicon"
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

const mS = state => ({
  scenariosList: state.appConfigReducer.scenarios,
  session: state.newSessionReducer.session,
  isSlideUpMenuVisible: state.newSessionReducer.isSlideUpMenuVisible
});

const mD = {};

export default connect(
  mS,
  mD
)(PickerSelectComponent);
