import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { Divider, Icon } from "react-native-elements";
import { FilterLangsByCodes } from "../../../../Config/Languages";
import I18n, { translateLanguage } from "../../../../I18n/I18n";
// Styles
import styles from "./Styles/PickerSelectStyles";

class PickerSelectComponent extends Component {
  showCurrentSelectedLang = () => {
    const {
      type,
      session,
      placeholder,
      selectedLabelStyle,
    } = this.props;
    if (type === "primaryLang" && session.primaryLangCode) {
      const lang = translateLanguage(
        FilterLangsByCodes([session.primaryLangCode])[0]["3"],
        FilterLangsByCodes([session.primaryLangCode])[0].name,
      );
      return (
        <View style={styles.flexView}>
          <Text nunmberOfLines={1} style={selectedLabelStyle || styles.inputValue}>
            {`${lang.substr(0, 11)}${lang.length >= 11 ? "..." : ""}`}
          </Text>
        </View>
      );
    }
    if (type === "secondaryLang" && session.secondaryLangCode) {
      const lang = translateLanguage(
        FilterLangsByCodes([session.secondaryLangCode])[0]["3"],
        FilterLangsByCodes([session.secondaryLangCode])[0].name,
      );
      return (
        <View style={styles.flexView}>
          <Text nunmberOfLines={1} style={selectedLabelStyle || styles.inputValue}>
            {`${lang.substr(0, 11)}${lang.length >= 11 ? "..." : ""}`}
          </Text>
        </View>
      );
    }
    return (
        <Text
          nunmberOfLines={1}
          style={styles.inputPlaceholderValue}
        >
          {placeholder}
        </Text>
    );
  };

  showScenarioList = () => {
    const {
      scenariosList,
      session,
      placeholder,
      selectedLabelStyle,
    } = this.props;

    if (session.scenarioID && session.scenarioID != "custom") {
      const selectedScenario = scenariosList.find(scenario => scenario.id === session.scenarioID);
      return (
        <View
          style={styles.flexView}
        >
          <Text
            nunmberOfLines={1}
            style={selectedLabelStyle || styles.inputValue}
          >
            {selectedScenario.title}
          </Text>
        </View>
      );
    }
    if (session.customScenarioSelected === "custom") {
      return (
        <View
          style={styles.flexView}
        >
          <Text
            nunmberOfLines={1}
            style={selectedLabelStyle || styles.inputValue}
          >
            {I18n.t("other")}
          </Text>
        </View>
      );
    }
    return (
      <View
        style={styles.flexView}
      >
        <Text
          nunmberOfLines={1}
          style={styles.inputPlaceholderValue}
        >
          {placeholder}
        </Text>
      </View>
    );
  };

  showCurrentCustomScenarioNote = () => {
    const {
      session,
      placeholder,
      selectedLabelStyle,
    } = this.props;
    if (session.customScenarioNote.length > 0) {
      return (
        <View style={styles.flexView}>
          <Text
            style={selectedLabelStyle || styles.inputValue}
            nunmberOfLines={1}
          >
            {`${session.customScenarioNote.substring(0, 50)}...`}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.flexView}>
        <Text
          nunmberOfLines={1}
          style={selectedLabelStyle || styles.inputPlaceholderValue}
        >
          {placeholder}
        </Text>
      </View>
    );
  };

  render() {
    const {
      openSlideMenu,
      title,
      type,
      isSlideUpMenuVisible,
      contentContainerStyle,
      labelStyle,
      showDivider,
      icon,
      selectorContainer,
      loading,
    } = this.props;
    return (
      <TouchableOpacity
        disabled={loading}
        onPress={() => {
          openSlideMenu(type);
        }}
        style={
          contentContainerStyle || styles.homeInputContainer
        }
      >
        <Text style={labelStyle || styles.inputTitle}>{title}</Text>
        <View style={selectorContainer || styles.currentSelectedLangContainer}>
          {type === "additionalDetails"
            ? this.showCurrentCustomScenarioNote()
            : type === "scenarioSelection"
              ? this.showScenarioList()
              : this.showCurrentSelectedLang()}
          {type === "additionalDetails" ? (
            <React.Fragment />
          ) : (
            icon || (
              <Icon
                color="#ffffff"
                name={isSlideUpMenuVisible ? "chevron-up" : "chevron-down"}
                type="evilicon"
                size={17}
              />
            )
          )}
        </View>
        {showDivider ? <Divider /> : <React.Fragment />}
      </TouchableOpacity>
    );
  }
}

const mS = state => ({
  scenariosList: state.appConfigReducer.scenarios,
  session: state.newSessionReducer.session,
  isSlideUpMenuVisible: state.LogicReducer.isSlideUpMenuVisible,
  loading: state.LogicReducer.loading,
});

const mD = {};

export default connect(
  mS,
  mD,
)(PickerSelectComponent);
