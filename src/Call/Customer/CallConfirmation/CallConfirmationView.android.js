import React, { Component } from "react";

import { Text, View, ScrollView, Switch } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Button, Header, List, ListItem } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";

import ViewWrapper from "../../../Containers/ViewWrapper/ViewWrapper";
import SettingsButton from "../../../Components/SettingsButton/SettingsButton";

import { connect } from "react-redux";
import { GetInfo } from "../../../Ducks/SessionInfoReducer";
import {
  clearSettings,
  updateSettings as customerUpdateSettings
} from "../../../Ducks/CallCustomerSettings.js";
import { updateSettings } from "../../../Ducks/ContactLinguistReducer";
import { cleanSelected } from "../../../Ducks/HomeFlowReducer";
import { clearSettings as clearLinguistReducer } from "../../../Ducks/LinguistFormReducer";

import I18n from "../../../I18n/I18n";
import _isEmpty from "lodash/isEmpty";
import { styles } from "./styles";
import { Images, Colors } from "../../../Themes";
import LinearGradient from "react-native-linear-gradient";
import GoBackButton from "../../../Components/GoBackButton/GoBackButton";
import HeaderView from "../../../Components/HeaderView/HeaderView";
import BottomButton from "../../../Components/BottomButton/BottomButton";
import { CATEGORIES } from "../../../Util/Constants";

import {
  setPermission,
  displayOpenSettingsAlert
} from "../../../Util/Permission";

class CallConfirmationView extends Component {
  carouselTitleMapper = title => {
    return CATEGORIES[title];
  };

  render() {
    const navigation = this.props.navigation;
    const { customScenario, selectedCategory, categoryIndex } = this.props;

    const categorySelected =
      categoryIndex > -1 && !!selectedCategory
        ? this.carouselTitleMapper(selectedCategory[categoryIndex])
        : null;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          headerRightComponent={
            <Text
              style={styles.headerButtonCancel}
              onPress={() => {
                navigation.dispatch({ type: "Home" });
              }}
            >
              {I18n.t("cancel")}
            </Text>
          }
          headerCenterComponent={
            <Text style={styles.titleCall}>{I18n.t("confirmAndConnect")}</Text>
          }
          NoWaves
        >
          <View style={{ flex: 1 }}>
            <ScrollView
              automaticallyAdjustContentInsets={true}
              contentContainerStyle={styles.scroll}
            >
              <List containerStyle={{ borderTopWidth: 0, marginTop: 0 }}>
                {/* Type of Assistance*/}
                <ListItem
                  containerStyle={styles.listItemContainer}
                  hideChevron
                  title={
                    !!categorySelected ? categorySelected.toUpperCase() : null
                  }
                  titleStyle={styles.titleStyle}
                  subtitle={
                    customScenario
                      ? customScenario
                      : this.props.selectedScenario &&
                        this.props.selectedScenario[0]
                        ? this.props.selectedScenario[0].title
                        : I18n.t("generalAssistance")
                  }
                  subtitleStyle={styles.listSubtitle}
                />
                {/* Time */}
                <ListItem
                  containerStyle={styles.listItemContainer}
                  title={I18n.t("time").toUpperCase()}
                  titleStyle={styles.titleStyle}
                  subtitle={I18n.t("youCanAddTime")}
                  subtitleStyle={styles.listSubtitle}
                  rightTitle={`${this.props.approxTime} ${I18n.t(
                    "minutesAbbreviation"
                  )}`}
                  rightTitleContainerStyle={styles.listRightTitleContainer}
                  rightTitleStyle={styles.listRightTitle}
                  onPress={() =>
                    navigation.dispatch({
                      type: "TextView",
                      params: {
                        title: I18n.t("time"),
                        texts: [I18n.t("timeStatic1"), I18n.t("timeStatic2")]
                      }
                    })
                  }
                />
                {/* Languages */}
                <ListItem
                  containerStyle={styles.listItemContainer}
                  title={I18n.t("languages").toUpperCase()}
                  titleStyle={styles.titleStyle}
                  subtitle={this.props.toLanguage}
                  subtitleStyle={styles.listSubtitle}
                  onPress={() =>
                    navigation.dispatch({
                      type: "TextView",
                      params: {
                        title: I18n.t("languages"),
                        texts: [
                          I18n.t("languagesStatic1"),
                          I18n.t("languagesStatic2")
                        ]
                      }
                    })
                  }
                />
                {/* Video Mode */}
                <ListItem
                  containerStyle={styles.listItemContainer}
                  hideChevron
                  title={I18n.t("videoMode").toUpperCase()}
                  titleStyle={styles.titleStyle}
                  subtitle={I18n.t("youCanChangeThis")}
                  subtitleStyle={styles.listSubtitle}
                  switchButton
                  onSwitch={() => {
                    setPermission("camera").then(response => {
                      if (response == "denied" || response == "restricted") {
                        displayOpenSettingsAlert();
                      }
                      this.props.customerUpdateSettings({
                        video: !this.props.video
                      });
                    });
                  }}
                  switched={this.props.video}
                  switchOnTintColor={Colors.onTintColor}
                  switchThumbTintColor={Colors.thumbTintColor}
                />
                {/* Estimated Cost */}
                <ListItem
                  hideChevron
                  containerStyle={styles.listItemContainer}
                  subtitle={I18n.t("estimatedCost").toUpperCase()}
                  subtitleStyle={styles.titleStyle}
                  // rightTitle={`${I18n.t("currency")} ${
                  //   this.props.estimatedPrice
                  // }`}
                  rightTitle={`${I18n.t("freeTrial")}`}
                  rightTitleContainerStyle={styles.listRightTitleContainer}
                  rightTitleStyle={[styles.listRightTitle, styles.freeTrial]}
                  // onPress={() =>
                  //   navigation.dispatch({
                  //     type: "TextView",
                  //     params: {
                  //       title: I18n.t("estimatedCost"),
                  //       texts: [
                  //         I18n.t("estimatedCostStatic1"),
                  //         I18n.t("estimatedCostStatic2")
                  //       ]
                  //     }
                  //   })
                  // }
                />
              </List>
            </ScrollView>
            <View style={styles.buttons}>
              {/* Buttons */}
              {/* Connect Now */}
              <BottomButton
                onPress={() => {
                  this.props.updateSettings({
                    selectedScenarioId: !_isEmpty(this.props.selectedScenario)
                      ? this.props.selectedScenario[0].id
                      : null
                  });
                  this.props.cleanSelected();
                  navigation.dispatch({ type: "CustomerView" });
                }}
                title={I18n.t("connectNow").toUpperCase()}
                icon="videocam"
                long
                fill
                bottom={true}
                relative
              />
            </View>
          </View>
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  customScenario: state.homeFlow.customScenario,
  sessionId: state.tokbox.sessionID,
  token: state.auth.token,
  customerExtraTime: state.callCustomerSettings.customerExtraTime,
  video: state.callCustomerSettings.video,
  approxTime: state.callCustomerSettings.selectedTime,
  scenario: state.linguistForm.selectedLanguage,
  selectedScenario: state.linguistForm.selectedScenarios,
  categoryIndex: state.homeFlow.categoryIndex,
  selectedCategory: state.homeFlow.categories,
  estimatedPrice:
    state.callCustomerSettings.selectedTime * state.contactLinguist.cost,
  toLanguage: state.contactLinguist.selectedLanguage
});

const mD = {
  GetInfo,
  updateSettings,
  customerUpdateSettings,
  clearSettings,
  cleanSelected,
  clearLinguistReducer
};

export default connect(mS, mD)(CallConfirmationView);
