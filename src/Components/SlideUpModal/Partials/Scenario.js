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

  renderScenarioListButtonContent = scenario => {
    let ButtonStyle = {
      ...styles.availableLangText,
      color: Colors.pricingViewBlack
    };
    const currentIcon = this.renderCheck(scenario.id);
    return (
      <React.Fragment>
        <Text style={ButtonStyle}>{scenario.title}</Text>
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
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <React.Fragment>
          <View style={styles.availableLangContainer}>
            <Text style={styles.availableLangContainerText}>
              {I18n.t("customerHome.scenario.description")}
            </Text>
          </View>
          <Divider style={styles.dividerStyle} />
          {this.renderScenariosList()}
          {this.renderCustomOption()}
        </React.Fragment>
      </ScrollView>
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
