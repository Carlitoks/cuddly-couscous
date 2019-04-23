import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Divider, Icon } from "react-native-elements";
import styles from "./Styles/ScenarioStyles";
import { Colors, Fonts } from "../../../Themes";
import { changeLangCode, updateSelectedScenario } from "../../../Ducks/NewSessionReducer";
import { closeSlideMenu } from "../../../Ducks/LogicReducer";
import I18n, { translateProperty } from "../../../I18n/I18n";
import { Bus, Shopping, Dinning, Translator, Teamwork, Layers } from "../../../Assets/SVG";
import Reactotron from "reactotron-react-native";
import metrics from "../../../Themes/Metrics";
import {isIphoneXorAbove} from "../../../Util/Devices";
import { updateOptions } from "../../../Ducks/RateCallReducer";

class Scenario extends Component {
  renderCheck = currentLang => {
    const { selection, scenarioID } = this.props;
    let ButtonStyle = {
      ...styles.availableLangText,
      color: "#1C1B1B"
    };
    if (selection !== null && selection === "scenarioSelection") {
      if (scenarioID != null && scenarioID === currentLang.id) {
        return (
          <View style={styles.iconNameContainer}>
            {this.renderIcon(currentLang.id, "#3F1674")}
            <Text style={{ ...ButtonStyle, color: "#3F1674", fontFamily: Fonts.BoldFont }}>
              {" "}
              {translateProperty(currentLang, "title")}{" "}
            </Text>
          </View>
        );
      }
      return (
        <View style={styles.iconNameContainer}>
          {this.renderIcon(currentLang.id, "black")}
          <Text style={ButtonStyle}> {translateProperty(currentLang, "title")}</Text>
        </View>
      );
    }
    return (
      <View style={styles.iconNameContainer}>
        {this.renderIcon(currentLang.id, "black")}
        <Text style={ButtonStyle}>{translateProperty(currentLang, "title")}</Text>
      </View>
    );
  };

  renderIcon = (scenarioId, selected) => {
    switch (scenarioId) {
      case "00000000-0000-0000-0000-000000000002":
        return <Bus fill={selected} />;
      case "00000000-0000-0000-0000-000000000005":
        return <Dinning fill={selected} />;
      case "00000000-0000-0000-0000-000000000003":
        return <Shopping fill={selected} />;
      case "00000000-0000-0000-0000-000000000007":
        return <Translator fill={selected} />;
      case "00000000-0000-0000-0000-000000000010":
        return <Teamwork fill={selected} />;
      case "00000000-0000-0000-0000-000000000100":
        return <Layers fill={selected} />;
      default:
        return <Layers fill={selected} />;
    }
  };

  renderScenarioListButtonContent = scenario => {
    const currentIcon = this.renderCheck(scenario);
    return <React.Fragment>{currentIcon}</React.Fragment>;
  };

  renderScenariosList = () => {
    const { scenariosList, scenarioID } = this.props;
    return scenariosList.map((scenario, current) => {
      if (scenario.active) {
        return (
          <View style={{ width: metrics.width * 0.9 }} key={current}>
            {scenario.id === scenarioID ? null : <Divider style={styles.dividerStyle} />}
            <TouchableOpacity
              style={
                scenario.id === scenarioID
                  ? styles.selectedLangViewContainer
                  : styles.LangViewContainer
              }
              onPress={() => this.changeLangCode(scenario.id)}
            >
              <View
                style={
                  scenario.id === scenarioID
                    ? styles.selectedScenarioButton
                    : styles.selectLangButton
                }
              >
                {this.renderScenarioListButtonContent(scenario)}
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    });
  };

  renderCustomOption = () => {
    const customScenario = {
      id: "custom",
      active: true,
      category: "custom",
      title: I18n.t("other"),
      eventID: null
    };
    return (
      <React.Fragment>
        <TouchableOpacity
          style={styles.LangViewContainer}
          onPress={() => this.changeLangCode(customScenario.id)}
        >
          <View style={styles.selectLangButton}>
            {this.renderScenarioListButtonContent(customScenario)}
          </View>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
      </React.Fragment>
    );
  };

  changeLangCode = langCode => {
    const { changeLangCode, selection, updateSelectedScenario, closeSlideMenu, updateOptions } = this.props;
    if (selection === "scenarioSelection") {
      updateSelectedScenario({ scenarioID: langCode });
    } if(selection === "ratingsScenarioSelection") {
      updateOptions({ scenarioID: langCode });
    } else {
      changeLangCode({ langCode });
    }
    closeSlideMenu();
  };

  render() {
    const { closeSlideMenu } = this.props;
    return (
      <View style={styles.scenarioContainer}>
        <View style={styles.availableLangContainer}>
          <Text style={styles.availableLangContainerText}>
            {I18n.t("newCustomerHome.scenario.label")}
          </Text>
        </View>
        <ScrollView
          style={styles.fullWidthOnItems}
          contentContainerStyle={styles.scrollContainer}
          bounces={false}
        >
          {this.renderScenariosList()}
        </ScrollView>
        <TouchableOpacity style={styles.closeScenarioList} onPress={() => closeSlideMenu()}>
          <Text style={styles.cancelButtonText}>{I18n.t("actions.cancel")}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mS = state => ({
  selection: state.LogicReducer.selection,
  scenarioID: state.newSessionReducer.session.scenarioID,
  scenariosList: state.appConfigReducer.scenarios
});

const mD = {
  closeSlideMenu,
  changeLangCode,
  updateSelectedScenario,
  updateOptions
};

export default connect(
  mS,
  mD
)(Scenario);
