import React, { Component } from "react";

import { Text, View, ScrollView, Switch } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Button, Header } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import { isUndefined } from "lodash";

import ViewWrapper from "../../../Containers/ViewWrapper/ViewWrapper";
import SettingsButton from "../../../Components/SettingsButton/SettingsButton";

import { connect } from "react-redux";
import { GetInfo } from "../../../Ducks/SessionInfoReducer";
import {
  clearSettings,
  updateSettings as customerUpdateSettings
} from "../../../Ducks/CallCustomerSettings.js";
import {
  setPermission,
  displayOpenSettingsAlert
} from "../../../Util/Permission";
import { updateSettings } from "../../../Ducks/ContactLinguistReducer";
import { clearSettings as clearHomeReducer } from "../../../Ducks/HomeFlowReducer";
import TopViewIOS from "../../../Components/TopViewIOS/TopViewIOS";
import I18n from "../../../I18n/I18n";
import { styles } from "./styles";
import { Images, Colors } from "../../../Themes";
import LinearGradient from "react-native-linear-gradient";
import GoBackButton from "../../../Components/GoBackButton/GoBackButton";

class CallConfirmationView extends Component {
  render() {
    const navigation = this.props.navigation;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          alwaysBounceVertical={false}
        >
          <Grid>
            <Col>
              <Row>
                {/* Linear Gradient */}
                <LinearGradient
                  colors={[
                    Colors.gradientColor.top,
                    Colors.gradientColor.middle,
                    Colors.gradientColor.bottom
                  ]}
                  style={styles.linearGradient}
                />
                <Col style={{ height: 160 }}>
                  {/* Header - Navigation */}
                  <TopViewIOS />
                  <Header
                    outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                    backgroundColor="transparent"
                    leftComponent={
                      <GoBackButton navigation={this.props.navigation} />
                    }
                    /*
                    rightComponent={
                      <SettingsButton navigation={this.props.navigation} />
                    }*/
                  />

                  {/* Confirm call */}
                  <Text style={styles.mainTitle}>{I18n.t("confirmCall")}</Text>
                </Col>
              </Row>

              <Grid style={styles.summaryContainer}>
                {/* Scenario */}
                <Row style={styles.callInformation}>
                  <Col style={styles.alignIcon} size={25}>
                    <Icon
                      color={Colors.selectedOptionMenu}
                      style={styles.iconStyle}
                      name={"help-outline"}
                      size={40}
                    />
                  </Col>
                  <Col style={styles.alignText} size={75}>
                    <Text style={styles.textSize}>
                      {this.props.customScenario
                        ? this.props.customScenario
                        : this.props.scenario
                          ? this.props.scenario.title
                          : "General"}
                    </Text>
                  </Col>
                </Row>
                {/* Toggle Video */}
                <Row style={styles.callInformation}>
                  <Col style={styles.alignIcon} size={25}>
                    <Switch
                      onValueChange={() => {
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
                      value={this.props.video}
                      onTintColor={Colors.onTintColor}
                      thumbTintColor={Colors.selectedOptionMenu}
                      tintColor={Colors.tintColor}
                    />
                  </Col>
                  <Col style={styles.alignText} size={75}>
                    <Text style={styles.textSize}>
                      Video
                      {this.props.video ? " on" : " off"}
                    </Text>
                  </Col>
                </Row>
                {/* Time */}
                <Row style={styles.callInformation}>
                  <Col style={styles.alignIcon} size={25}>
                    <Icon
                      color={Colors.selectedOptionMenu}
                      style={styles.iconStyle}
                      name={"access-time"}
                      size={40}
                    />
                  </Col>
                  <Col style={styles.alignText} size={75}>
                    <Text style={styles.textSize}>
                      {this.props.approxTime} {I18n.t("minutes")}
                    </Text>
                  </Col>
                </Row>
                {/* Allow extra time */}
                <Row style={styles.callInformation}>
                  <Col style={styles.alignIcon} size={25}>
                    <Switch
                      onValueChange={() => {
                        this.props.customerUpdateSettings({
                          customerExtraTime: !this.props.customerExtraTime
                        });
                      }}
                      value={this.props.customerExtraTime}
                      onTintColor={Colors.onTintColor}
                      thumbTintColor={Colors.selectedOptionMenu}
                      tintColor={Colors.tintColor}
                    />
                  </Col>
                  <Col style={styles.alignText} size={75}>
                    <Text style={[styles.subtitleText, styles.fixHeight]}>
                      {this.props.customerExtraTime
                        ? I18n.t("toggleExtraTimeEnable")
                        : I18n.t("toggleExtraTimeDisable")}
                    </Text>
                  </Col>
                </Row>
                {/* Monetization */}
                <Row style={styles.callInformation}>
                  <Col style={styles.alignIcon} size={25}>
                    <Icon
                      color={Colors.selectedOptionMenu}
                      style={styles.iconStyle}
                      name={"monetization-on"}
                      size={40}
                    />
                  </Col>
                  <Col style={styles.alignText} size={75}>
                    <Text style={styles.textSize}>
                      {I18n.t("currency")} {this.props.estimatedPrice}
                    </Text>
                    <Text style={styles.subtitleText}>
                      {I18n.t("chargeAdvice")}
                    </Text>
                  </Col>
                </Row>
                {/* Buttons */}
                <Row style={styles.footerButtons}>
                  <Col style={styles.footerButtons}>
                    {/* Cancel */}
                    <Button
                      buttonStyle={[styles.buttonStyle, styles.buttonCancel]}
                      textStyle={styles.textButtonStyle}
                      title={I18n.t("cancel")}
                      onPress={() => {
                        this.props.clearSettings();
                        this.props.clearHomeReducer();
                        navigation.dispatch({ type: "Home" });
                      }}
                    />
                  </Col>
                  <Col style={styles.footerButtons}>
                    {/* Call */}
                    <Button
                      buttonStyle={[styles.buttonStyle, styles.buttonCall]}
                      textStyle={styles.textButtonStyle}
                      title={I18n.t("call")}
                      onPress={() => {
                        this.props.clearHomeReducer();
                        navigation.dispatch({ type: "CustomerView" });
                      }}
                    />
                  </Col>
                </Row>
              </Grid>
            </Col>
          </Grid>
        </ScrollView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  customScenario: state.homeFlow.customScenario,
  sessionId: state.callCustomerSettings.sessionID,
  token: state.auth.token,
  customerExtraTime: state.callCustomerSettings.customerExtraTime,
  video: state.callCustomerSettings.video,
  approxTime: state.callCustomerSettings.selectedTime,
  scenario: state.linguistForm.selectedLanguage,
  estimatedPrice:
    state.callCustomerSettings.selectedTime * state.contactLinguist.cost,
  toLanguage: state.contactLinguist.selectedLanguage
});

const mD = {
  GetInfo,
  updateSettings,
  customerUpdateSettings,
  clearSettings,
  clearHomeReducer
};

export default connect(mS, mD)(CallConfirmationView);
