import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Divider, Icon } from "react-native-elements";
import styles from "./Styles/ScenarioStyles";
import { Colors } from "../../../Themes";
import {
  changeLangCode,
  updateSelectedScenario
} from "../../../Ducks/NewSessionReducer";
import { closeSlideMenu } from "../../../Ducks/LogicReducer";
import I18n  from "../../../I18n/I18n";
import { Bus, Shopping, Dinning, Translator, Teamwork, Layers } from "../../../Assets/SVG";
import Reactotron from "reactotron-react-native";

class Scenario extends Component {
  renderCheck = currentLang => {
    const {
      selection,
      scenarioID,
    } = this.props;
    if (selection !== null && selection === "scenarioSelection") {
      if (scenarioID != null && scenarioID === currentLang) {
        return (
          <Icon
            color={Colors.gradientColor.top}
            containerStyle={styles.checkPadding}
            name="ios-checkmark"
            type="ionicon"
          />
        );
      }
      return <React.Fragment />;
    }
    return <React.Fragment />;
  };

  renderIcon = (scenarioId) => {
    switch(scenarioId){
      case "00000000-0000-0000-0000-000000000002":
        return <Bus />;
      case "00000000-0000-0000-0000-000000000005":
        return <Dinning />;
      case "00000000-0000-0000-0000-000000000003":
        return <Shopping />;
      case "00000000-0000-0000-0000-000000000007":
        return <Translator />;
      case "00000000-0000-0000-0000-000000000010":
        return <Teamwork />;
      case "00000000-0000-0000-0000-000000000100":
        return <Layers />;
      default:
        return <Layers />;
    }
  };

  renderScenarioListButtonContent = scenario => {
    let ButtonStyle = {
      ...styles.availableLangText,
      color: Colors.pricingViewBlack
    };
    const currentIcon = this.renderCheck(scenario.id);
    Reactotron.log(scenario);
    return (
      <React.Fragment>
        <View style={styles.iconNameContainer}>
          { this.renderIcon(scenario.id) }
          <Text style={ButtonStyle}>{scenario.title}</Text>
        </View>
        {currentIcon}
      </React.Fragment>
    );
  };

  renderScenariosList = () => {
    const { scenariosList } = this.props;
    return scenariosList.map((scenario, current) => {
      if (scenario.active) {
        return (
          <React.Fragment key={current}>
            <TouchableOpacity
              style={styles.LangViewContainer}
              onPress={() => this.changeLangCode(scenario.id)}
            >
              <View style={styles.selectLangButton}>
                {this.renderScenarioListButtonContent(scenario)}
              </View>
            </TouchableOpacity>
            <Divider style={styles.dividerStyle} />
          </React.Fragment>
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
    const { changeLangCode, selection, updateSelectedScenario, closeSlideMenu } = this.props;
    if (selection === "scenarioSelection") {
      updateSelectedScenario({ scenarioID: langCode });
    } else {
      changeLangCode({ langCode });
    }
    closeSlideMenu();
  };

  render() {
    const { closeSlideMenu } = this.props;
    return (
      <React.Fragment>
        <View style={styles.availableLangContainer}>
          <Text style={styles.availableLangContainerText}>
            {I18n.t("customerHome.scenario.description")}
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
          <React.Fragment>
            {this.renderScenariosList()}
            {this.renderCustomOption()}
          </React.Fragment>
        </ScrollView>
        <TouchableOpacity style={styles.closeScenarioList} onPress={() => closeSlideMenu()} >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </React.Fragment>
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
  updateSelectedScenario
};

export default connect(
  mS,
  mD
)(Scenario);
