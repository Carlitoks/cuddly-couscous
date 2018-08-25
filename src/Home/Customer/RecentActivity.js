import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import BoxedListComponent from "../../Components/BoxedListComponent/BoxedListComponent";
import { findIndex } from "lodash";
import { Languages } from "../../Config/Languages";
import I18n from "../../I18n/I18n";
import styles from "./styles";

class RecentActivity extends Component {
  itemPress = index => {
    const {
      navigation,
      scenariosList,
      updateLinguistForm,
      updateContactLinguist,
      updateCallCustomerSettings
    } = this.props;

    if (!this.emptyActivity) {
      const scenario = scenariosList[index];

      updateLinguistForm({
        selectedScenarios: [scenario.scenario]
      });

      const primaryLanguageIndex = findIndex(
        Languages,
        language => language[3] === scenario.primaryLangCode
      );

      const secondaryLanguageIndex = findIndex(
        Languages,
        language => language[3] === scenario.secondaryLangCode
      );

      updateContactLinguist({
        primaryLangCode: scenario.primaryLangCode,
        selectedLanguageFrom: Languages[primaryLanguageIndex]["name"],
        selectedLanguage: Languages[secondaryLanguageIndex]["name"],
        secundaryLangCode: scenario.secondaryLangCode,
        customScenarioNote: scenario.customScenarioNote
      });

      updateCallCustomerSettings({
        selectedTime: scenario.estimatedMinutes
      });

      navigation.dispatch({ type: "CallConfirmationView" });
    }
  };

  emptyActivity =
    this.props.scenariosList && this.props.scenariosList.length === 0;

  render() {
    const { scenariosList } = this.props;

    const data = this.emptyActivity
      ? [{ id: "emptyActivity", title: I18n.t("noRecentActivityMessage") }]
      : scenariosList;

    const list = scenariosList ? (
      <BoxedListComponent
        customContainerStyle={styles.listContainer}
        data={data}
        itemKey={"id"}
        subtitleProperty={"createdAt"}
        titleProperty={"title"}
        thirdLineProperty={"customScenarioNote"}
        onPress={index => this.itemPress(index)}
        multiple={false}
        selected={this.props.indexSelected}
        chevron={!this.emptyActivity}
        doubleLine={!this.emptyActivity}
        tripleLine={true}
        leftText
      />
    ) : (
      <ActivityIndicator size="large" color="#fb6a28" />
    );

    return (
      <View>
        <Text style={[styles.subtitle]}>{I18n.t("recentActivity")}</Text>
        <Text style={[styles.smallsubtitle, styles.marginBottom10]}>
          {(!!!scenariosList || scenariosList.length !== 0) &&
            I18n.t("tapRepeat")}
        </Text>
        <View style={styles.scrollView}>
          <View style={styles.scrollView}>{list}</View>
        </View>
      </View>
    );
  }
}

export default RecentActivity;
