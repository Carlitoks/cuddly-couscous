import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import BoxedListComponent from "../../Components/BoxedListComponent/BoxedListComponent";
import { findIndex } from "lodash";
import { Languages } from "../../Config/Languages";
import I18n from "../../I18n/I18n";
import styles from "./styles";
import { updateSettings as updateLinguistForm } from "../../Ducks/LinguistFormReducer";
import { updateSettings as updateContactLinguist } from "../../Ducks/ContactLinguistReducer";
import { updateSettings as updateCallCustomerSettings } from "../../Ducks/CallCustomerSettings";
import { connect } from "react-redux";

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
        selectedScenarios: [scenario ? scenario.scenario : null]
      });
      const primaryLanguageIndex = findIndex(Languages, language =>
        language[3] === scenario.primaryLangCode
          ? scenario.primaryLangCode
          : null
      );
      const secondaryLanguageIndex = findIndex(Languages, language =>
        language[3] === scenario.secondaryLangCode
          ? scenario.secondaryLangCode
          : null
      );
      updateContactLinguist({
        primaryLangCode: scenario ? scenario.primaryLangCode : null,
        selectedLanguageFrom: Languages[primaryLanguageIndex]["name"],
        selectedLanguage: Languages[secondaryLanguageIndex]["name"],
        secundaryLangCode: scenario ? scenario.secondaryLangCode : null,
        customScenarioNote: scenario ? scenario.customScenarioNote : null
      });

      updateCallCustomerSettings({
        selectedTime: scenario ? scenario.estimatedMinutes : null
      });

      navigation.dispatch({ type: "CallConfirmationView" });
    }
  };

  emptyActivity =
    this.props.scenariosList && this.props.scenariosList.length === 0;

  render() {
    const { scenariosList } = this.props;

    const data =
      this.emptyActivity || this.emptyActivity === null
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
        onPress={index => {
          this.itemPress(index);
        }}
        multiple={false}
        selected={this.props.indexSelected}
        chevron={!this.emptyActivity && this.emptyActivity !== null}
        doubleLine={!this.emptyActivity && this.emptyActivity !== null}
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

const mS = state => ({});

const mD = {
  updateLinguistForm,
  updateContactLinguist,
  updateCallCustomerSettings
};

export default connect(
  mS,
  mD
)(RecentActivity);
