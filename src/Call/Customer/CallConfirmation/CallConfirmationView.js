import React, { Component } from "react";

import {
  Text,
  View,
  ScrollView,
  Switch,
  TextInput,
  TouchableOpacity
} from "react-native";
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
import { clear as clearEvents } from "../../../Ducks/EventsReducer";
import { clearPromoCode } from "../../../Ducks/PromoCodeReducer";
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
import languages from "../../../Config/Languages";

import {
  setPermission,
  displayOpenSettingsAlert
} from "../../../Util/Permission";

class CallConfirmationView extends Component {
  carouselTitleMapper = title => {
    return CATEGORIES[title];
  };

  componentWillMount() {
    const { promotion, event } = this.props;

    if (promotion || event.id) {
      const scannedEvent = promotion ? promotion : event.data;

      const {
        allowSecondaryLangSelection,
        defaultSecondaryLangCode
      } = scannedEvent;

      if (!allowSecondaryLangSelection && defaultSecondaryLangCode) {
        const selectedLangTo = languages.filter(
          language => language[3] === defaultSecondaryLangCode
        );

        this.props.updateSettings({
          secondaryLangCode: defaultSecondaryLangCode,
          selectedLanguageTo: selectedLangTo[0].name,
          selectedLanguage: selectedLangTo[0].name
        });
      }
    }
  }

  render() {
    const {
      navigation,
      customScenario,
      selectedCategory,
      categoryIndex,
      promotion,
      event,
      secundaryLangCode
    } = this.props;

    const scannedEvent = promotion ? promotion : event;

    const allowSecondaryLangSelection =
      !scannedEvent.id || scannedEvent.allowSecondaryLangSelection;

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
                this.props.updateSettings({ customScenarioNote: "" });
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
          <View style={styles.flex}>
            {/* Category / Scenario */}
            <View style={styles.category}>
              <View>
                <Text style={styles.titleStyle}>
                  {!!categorySelected ? `${categorySelected}: ` : null}

                  <Text style={styles.regularText}>
                    {customScenario
                      ? customScenario
                      : this.props.selectedScenario &&
                        this.props.selectedScenario[0]
                        ? this.props.selectedScenario[0].title
                        : I18n.t("generalAssistance")}
                  </Text>
                </Text>
                <TextInput
                  style={styles.textInput}
                  underlineColorAndroid="transparent"
                  value={this.props.scenarioNotes}
                  fontStyle={
                    this.props.scenarioNotes.length == 0 ? "italic" : "normal"
                  }
                  placeholder={I18n.t("scenarioNotes")}
                  editable={true}
                  onChangeText={text =>
                    this.props.updateSettings({ customScenarioNote: text })
                  }
                  multiline
                />
              </View>
            </View>

            {/* Languages */}
            <View style={styles.firstLanguage}>
              <View style={styles.secondLanguage}>
                <Text style={styles.titleStyle}>{I18n.t("languageFrom")} </Text>
                <Text style={styles.regularText}>
                  {this.props.fromLanguage.name}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.selectionLanguage}
                onPress={() => {
                  if (allowSecondaryLangSelection) {
                    navigation.dispatch({
                      type: "SessionLanguageView",
                      params: { noautoselect: true, secundaryLangCode }
                    });
                  }
                }}
              >
                <View style={styles.direction}>
                  <Text style={styles.titleStyle}>{I18n.t("languageTo")}</Text>
                  <Text style={styles.regularText}>
                    {this.props.selectedLanguageTo}
                  </Text>
                </View>
                <View style={styles.justifyCenter}>
                  {allowSecondaryLangSelection ? (
                    <Icon name="chevron-right"                     
                      style={styles.iconSize}
                      color={Colors.defaultChevron} />
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>

            {/* Time selection */}
            <TouchableOpacity
              onPress={() => {
                if (this.props.allowTimeSelection) {
                  navigation.dispatch({
                    type: "CallTimeView"
                  });
                }
              }}
              style={styles.time}
            >
              <View style={styles.flexColumn}>
                <Text style={styles.titleStyle}>
                  {`${this.props.approxTime} ${I18n.t("minutes")}: `}
                  <Text style={[styles.regularText, styles.timeItalic]}>
                    {I18n.t("timeCompliments")}
                  </Text>
                </Text>
                <Text style={[styles.regularText, styles.timeItalic]}>
                  {I18n.t("timeAddMore")}
                </Text>
              </View>
              <View style={styles.iconAlign}>
                {this.props.allowTimeSelection && (
                  <Icon
                    name="chevron-right"
                    style={styles.iconSize}
                    color={Colors.defaultChevron}
                  />
                )}
              </View>
            </TouchableOpacity>

            {/* Audio + Video */}
            <View style={styles.bottomWidth}>
              <View style={styles.flexit}>
                <TouchableOpacity
                  style={
                    this.props.video ? styles.audioBoxActive : styles.audioBox
                  }
                  onPress={() => {
                    setPermission("camera").then(response => {
                      if (response == "denied" || response == "restricted") {
                        displayOpenSettingsAlert();
                      }
                      this.props.customerUpdateSettings({
                        video: true
                      });
                    });
                  }}
                >
                  <View style={styles.justifyCenter}>
                    <Icon
                      name="check"
                      color={Colors.white}
                      style={styles.iconSize}
                    />
                    <Text
                      style={
                        this.props.video
                          ? styles.textAudioActive
                          : styles.textAudioInactive
                      }
                    >
                      {I18n.t("audioVideo")}
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Audio only */}
                <TouchableOpacity
                  style={
                    !this.props.video ? styles.audioBoxActive : styles.audioBox
                  }
                  onPress={() => {
                    setPermission("camera").then(response => {
                      if (response == "denied" || response == "restricted") {
                        displayOpenSettingsAlert();
                      }
                      this.props.customerUpdateSettings({
                        video: false
                      });
                    });
                  }}
                >
                  <View style={styles.justifyCenter}>
                    <Icon
                      name="check"
                      color={Colors.white}
                      style={styles.iconSize}
                    />
                    <Text
                      style={
                        !this.props.video
                          ? styles.textAudioActive
                          : styles.textAudioInactive
                      }
                    >
                      {I18n.t("audioOnly")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.buttons}>
              {/* Buttons */}
              {/* Connect Now */}
              <BottomButton
                onPress={() => {
                  this.props.updateSettings({
                    selectedScenarioId:
                      this.props.selectedScenario &&
                      this.props.selectedScenario[0]
                        ? this.props.selectedScenario[0].id
                        : "11111111-1111-1111-1111-111111111126"
                  });
                  this.props.cleanSelected();
                  this.props.clearEvents();
                  this.props.clearPromoCode();
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
  scenarioNotes: state.contactLinguist.customScenarioNote,
  selectedScenario: state.linguistForm.selectedScenarios,
  categoryIndex: state.homeFlow.categoryIndex,
  selectedCategory: state.homeFlow.categories,
  estimatedPrice:
    state.callCustomerSettings.selectedTime * state.contactLinguist.cost,
  selectedLanguageTo: state.contactLinguist.selectedLanguage,
  secundaryLangCode: state.contactLinguist.secundaryLangCode,
  selectedLanguageFrom: state.contactLinguist.selectedLanguageFrom,
  fromLanguage: state.userProfile.selectedNativeLanguage,
  allowTimeSelection: state.callCustomerSettings.allowTimeSelection,
  promotion: state.promoCode.scanned,
  event: state.events
});

const mD = {
  GetInfo,
  updateSettings,
  customerUpdateSettings,
  clearSettings,
  cleanSelected,
  clearLinguistReducer,
  clearEvents,
  clearPromoCode
};

export default connect(mS, mD)(CallConfirmationView);
