import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { Divider } from "react-native-elements";
import styles from "./Styles/ScenarioStyles";
import { Fonts } from "../../../Themes";
import { changeLangCode, updateSelectedScenario } from "../../../Ducks/NewSessionReducer";
import { closeSlideMenu } from "../../../Ducks/LogicReducer";
import I18n, { translateProperty } from "../../../I18n/I18n";
import { 
  Bus, 
  Dinning, 
  Layers, 
  Shopping, 
  Teamwork, 
  Translator, 
  Emergency,
  SocialConversation,
  Medical,
  CustomerService,
  Legal
} from "../../../Assets/SVG";
import metrics from "../../../Themes/Metrics";

class Scenario extends Component {
  renderCheck = scenario => {
    const { selection, scenarioID } = this.props;
    let ButtonStyle = {
      ...styles.availableLangText,
      color: "#1C1B1B"
    };
    if (selection !== null && selection === "scenarioSelection") {
      if (scenarioID != null && scenarioID === scenario.id) {
        return (
          <View style={styles.iconNameContainer}>
            {this.renderIcon(scenario.id, "#3F1674")}
            <Text style={{ ...ButtonStyle, color: "#3F1674", fontFamily: Fonts.BoldFont }}>
              {" "}
              {translateProperty(scenario, "title")}{" "}
            </Text>
          </View>
        );
      }
      return (
        <View style={styles.iconNameContainer}>
          {this.renderIcon(scenario.id, "black")}
          <Text style={ButtonStyle}> {translateProperty(scenario, "title")}</Text>
        </View>
      );
    }
    return (
      <View style={styles.iconNameContainer}>
        {this.renderIcon(scenario.id, "black")}
        <Text style={ButtonStyle}>{translateProperty(scenario, "title")}</Text>
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
      case "00000000-0000-0000-0000-000000000011":
        return <Emergency fill={selected} />;
      case "00000000-0000-0000-0000-000000000012":
        return <SocialConversation fill={selected} />;
      case "00000000-0000-0000-0000-000000000013":
        return <Medical fill={selected} />;
      case "00000000-0000-0000-0000-000000000014":
        return <CustomerService fill={selected} />;
      case "00000000-0000-0000-0000-000000000015":
        return <Legal fill={selected} />;
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
    scenariosList
    .sort((a, b) => {

      // if scenario has a weight value, and it is heavier, it goes lower
      if (!!a.weight && !!b.weight) {
        if (a.weight < b.weight) {
          return -1;
        }
        if (a.weight > b.weight) {
          return 1;
        }
      }

      // otherwise sort alphabetically
      if (!!a.title && !!b.title) {
        const at = a.title.toUpperCase();
        const bt = b.title.toUpperCase();
        if (at < bt) {
          return -1;
        }
        if (at > bt) {
          return 1;
        }
      }

      // otherwise, no effect
      return 0;
    });
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

  changeLangCode = langCode => {
    const { changeLangCode, selection, updateSelectedScenario, closeSlideMenu, setScenarioID } = this.props;
    if (selection === "scenarioSelection") {
      updateSelectedScenario({ scenarioID: langCode });
    } if(selection === "ratingsScenarioSelection") {
      setScenarioID(langCode);
    } else {
      changeLangCode({ langCode });
    }
    closeSlideMenu();
  };

  render() {
    const { closeSlideMenu, selection } = this.props;
    return (
      <View style={styles.scenarioContainer}>
        <View style={styles.availableLangContainer}>
          <Text style={styles.availableLangContainerText}>
          {selection == "ratingsScenarioSelection" && I18n.t("session.rating.scenario")}
            {selection == "scenarioSelection" && I18n.t("newCustomerHome.scenario.label")}
          </Text>
        </View>
        <ScrollView
          style={styles.fullWidthOnItems}
          contentContainerStyle={selection === "ratingsScenarioSelection"? styles.ratingScrollContainer : styles.scrollContainer}
          bounces={false}
        >
          {this.renderScenariosList()}
        </ScrollView>
        <TouchableOpacity
          style={selection === "ratingsScenarioSelection" ? styles.ratingScenarioList : styles.closeScenarioList}
          onPress={() => closeSlideMenu()}
        >
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
};

export default connect(
  mS,
  mD
)(Scenario);
