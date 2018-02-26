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
import { clearSettings as clearHomeReducer } from "../../../Ducks/HomeFlowReducer";
import { clearSettings as clearLinguistReducer } from "../../../Ducks/LinguistFormReducer";

import I18n from "../../../I18n/I18n";
import _isEmpty from "lodash/isEmpty";
import { styles } from "./styles";
import { Images, Colors } from "../../../Themes";
import LinearGradient from "react-native-linear-gradient";
import GoBackButton from "../../../Components/GoBackButton/GoBackButton";
import HeaderView from "../../../Components/HeaderView/HeaderView";
import BottomButton from "../../../Components/BottomButton/BottomButton";

import {
  setPermission,
  displayOpenSettingsAlert
} from "../../../Util/Permission";

class CallConfirmationView extends Component {
  render() {
    const navigation = this.props.navigation;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          title={I18n.t("confirmAndConnect")}
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={{ flex: 1 }}
            alwaysBounceVertical={false}
          >
            <Grid>
              <Col>
                <Grid style={styles.summaryContainer}>
                  <List containerStyle={{ borderTopWidth: 0 }}>
                    {/* Type of Assistance*/}
                    <ListItem
                      containerStyle={styles.listItemContainer}
                      hideChevron
                      title={this.props.selectedScenario[0].category.toUpperCase()}
                      titleStyle={styles.titleStyle}
                      subtitle={
                        this.props.customScenario
                          ? this.props.customScenario
                          : this.props.selectedScenario
                            ? this.props.selectedScenario[0].title
                            : "General"
                      }
                      subtitleStyle={styles.listSubtitle}
                    />
                    {/* Time */}
                    <ListItem
                      hideChevron
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
                    />
                    {/* Languages */}
                    <ListItem
                      containerStyle={styles.listItemContainer}
                      hideChevron
                      title={I18n.t("languages").toUpperCase()}
                      titleStyle={styles.titleStyle}
                      subtitle={this.props.toLanguage}
                      subtitleStyle={styles.listSubtitle}
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
                          if (
                            response == "denied" ||
                            response == "restricted"
                          ) {
                            displayOpenSettingsAlert();
                          }
                        });
                        this.props.customerUpdateSettings({
                          video: !this.props.video
                        });
                      }}
                      switched={this.props.video}
                      switchOnTintColor={Colors.onTintColor}
                      switchThumbTintColor={Colors.thumbTintColor}
                    />
                    {/* Estimated Cost */}
                    <ListItem
                      containerStyle={styles.listItemContainer}
                      hideChevron
                      subtitle={I18n.t("estimatedCost")}
                      subtitleStyle={styles.listSubtitle}
                      rightTitle={`${I18n.t("currency")} ${
                        this.props.estimatedPrice
                      }`}
                      rightTitleContainerStyle={styles.listRightTitleContainer}
                      rightTitleStyle={styles.listRightTitle}
                    />
                  </List>

                  {/* Buttons */}
                  <Row style={styles.footerButtons}>
                    <Col style={styles.footerButtons}>
                      {/* Connect Now */}
                      <BottomButton
                        onPress={() => {
                          this.props.updateSettings({
                            selectedScenarioId: !_isEmpty(
                              this.props.selectedScenario
                            )
                              ? this.props.selectedScenario[0].id
                              : null
                          });
                          this.props.clearHomeReducer();
                          navigation.dispatch({ type: "CustomerView" });
                        }}
                        title={I18n.t("connectNow").toUpperCase()}
                        long
                        fill
                        bottom={false}
                        relative
                      />

                      {/* Cancel */}
                      <BottomButton
                        onPress={() => {
                          this.props.clearSettings();
                          this.props.clearLinguistReducer();
                          this.props.clearHomeReducer();
                          navigation.dispatch({ type: "Home" });
                        }}
                        title={I18n.t("cancel")}
                        negative
                        bottom={false}
                        relative
                      />
                    </Col>
                  </Row>
                </Grid>
              </Col>
            </Grid>
          </ScrollView>
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
  estimatedPrice:
    state.callCustomerSettings.selectedTime * state.contactLinguist.cost,
  toLanguage: state.contactLinguist.selectedLanguage
});

const mD = {
  GetInfo,
  updateSettings,
  customerUpdateSettings,
  clearSettings,
  clearHomeReducer,
  clearLinguistReducer
};

export default connect(mS, mD)(CallConfirmationView);
