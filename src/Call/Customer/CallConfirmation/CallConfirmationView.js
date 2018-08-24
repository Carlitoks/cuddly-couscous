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
import timer from "react-native-timer";
import ViewWrapper from "../../../Containers/ViewWrapper/ViewWrapper";
import SettingsButton from "../../../Components/SettingsButton/SettingsButton";
import { getGeolocationCoords } from "../../../Util/Helpers";
import { connect } from "react-redux";
import { GetInfo } from "../../../Ducks/SessionInfoReducer";
import {
  clear as clearSettings,
  update as customerUpdateSettings,
  clearTokboxStatus
} from "../../../Ducks/ActiveSessionReducer";
import {
  updateSettings,
  resetConnectingMessage
} from "../../../Ducks/ContactLinguistReducer";
import { cleanSelected } from "../../../Ducks/HomeFlowReducer";
import { clear as clearEvents } from "../../../Ducks/EventsReducer";
import { clearPromoCode } from "../../../Ducks/PromoCodeReducer";
import { clearSettings as clearLinguistReducer } from "../../../Ducks/LinguistFormReducer";

import I18n, { translateProperty, translateLanguage } from "../../../I18n/I18n";
import _isEmpty from "lodash/isEmpty";
import { styles } from "./styles";
import { Images, Colors } from "../../../Themes";
import LinearGradient from "react-native-linear-gradient";
import GoBackButton from "../../../Components/GoBackButton/GoBackButton";
import Close from "../../../Components/Close/Close";
import HeaderView from "../../../Components/HeaderView/HeaderView";
import BottomButton from "../../../Components/BottomButton/BottomButton";
import LanguageSelection from "../../../Components/LanguageSelection/LanguageSelection";
import { Iphone5 } from "../../../Util/Devices";
import { TranslationArrows, Checkmark } from "../../../Assets/SVG";
import { checkOperatingHours } from "../../../Util/Helpers";
import { Languages } from "../../../Config/Languages";
import {
  setPermission,
  displayOpenSettingsAlert
} from "../../../Util/Permission";
import { moderateScale } from "../../../Util/Scaling";
import { getLocalizedCategories } from "../../../Util/Constants";

class CallConfirmationView extends Component {
  CATEGORIES = getLocalizedCategories(I18n.currentLocale());

  componentWillMount() {
    const { promotion, event, resetConnectingMessage } = this.props;
    timer.clearInterval("timer");
    timer.clearInterval("counterId");
    this.props.clearSettings();
    this.props.clearTokboxStatus();
    getGeolocationCoords()
      .then(response => {
        this.props.customerUpdateSettings({
          location: [response.coords.longitude, response.coords.latitude]
        });
      })
      .catch(err => {
        console.log("GeoLocation error  ", err);
      });
    resetConnectingMessage();
    let inputHeight = 0;
    if (promotion || event.id) {
      const scannedEvent = promotion ? promotion : event;

      const {
        allowSecondaryLangSelection,
        defaultSecondaryLangCode
      } = scannedEvent;

      if (!allowSecondaryLangSelection && defaultSecondaryLangCode) {
        const selectedLangTo = Languages.filter(
          language => language[3] === defaultSecondaryLangCode
        );

        this.props.updateSettings({
          secondaryLangCode: defaultSecondaryLangCode,
          selectedLanguageTo: translateLanguage(
            selectedLangTo[0][3],
            selectedLangTo[0].name
          ),
          selectedLanguage: translateLanguage(
            selectedLangTo[0][3],
            selectedLangTo[0].name
          )
        });
      }
    }
  }

  render() {
    const {
      navigation,
      customScenario,
      categories,
      selectedScenario,
      categoryIndex,
      promotion,
      event,
      secundaryLangCode,
      scenarioNotes,
      updateSettings
    } = this.props;

    const scannedEvent = promotion ? promotion : event;

    const allowSecondaryLangSelection =
      !scannedEvent.id || scannedEvent.allowSecondaryLangSelection;

    const category =
      !!selectedScenario && !!selectedScenario[0]
        ? selectedScenario[0].category
        : categories[categoryIndex];

    const categoryTitle = this.CATEGORIES[category];

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton
              navigation={this.props.navigation}
              exec={() => {
                updateSettings({ customScenarioNote: "" });
              }}
            />
          }
          headerRightComponent={
            <Close
              action={() => {
                navigation.dispatch({ type: "Home" });
                this.props.updateSettings({ customScenarioNote: "" });
              }}
            />
          }
          navbarTitle={I18n.t("confirmAndConnect")}
          navbarType={"Complete"}
          NoWaves
        >
          <View style={styles.flex}>
            {/* Category / Scenario */}
            <View style={styles.category}>
              <View>
                <Text style={styles.titleStyle}>
                  {`${categoryTitle}: `}

                  <Text style={styles.regularText}>
                    {customScenario
                      ? customScenario
                      : this.props.selectedScenario &&
                        this.props.selectedScenario[0]
                        ? translateProperty(
                            this.props.selectedScenario[0],
                            "title"
                          )
                        : I18n.t("generalAssistance")}
                  </Text>
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    { height: Math.max(10, this.inputHeight) }
                  ]}
                  underlineColorAndroid={Colors.transparent}
                  value={
                    scenarioNotes ? scenarioNotes : this.props.scenarioNotes
                  }
                  fontStyle={
                    !!this.props.scenarioNotes &&
                    this.props.scenarioNotes.length == 0
                      ? "italic"
                      : "normal"
                  }
                  multiline
                  blurOnSubmit
                  allowFontScaling={false}
                  returnKeyType={"done"}
                  placeholder={I18n.t("scenarioNotes")}
                  onChangeText={text =>
                    this.props.updateSettings({ customScenarioNote: text })
                  }
                  onContentSizeChange={event => {
                    this.inputHeight = event.nativeEvent.contentSize.height;
                  }}
                  maxLength={350}
                />
              </View>
            </View>

            {/* Languages */}
            <TouchableOpacity
              onPress={() => {
                if (allowSecondaryLangSelection) {
                  navigation.dispatch({
                    type: "SessionLanguageView",
                    params: { noautoselect: true, secundaryLangCode }
                  });
                }
              }}
              style={styles.time}
            >
              <LanguageSelection
                firstLanguage={this.props.selectedLanguageFrom}
                secondLanguage={this.props.selectedLanguageTo}
              />
              <View style={styles.iconAlign}>
                {allowSecondaryLangSelection && (
                  <Icon
                    name="chevron-right"
                    style={styles.iconSize}
                    color={Colors.defaultChevron}
                  />
                )}
              </View>
            </TouchableOpacity>

            {/* Time selection */}
            <TouchableOpacity
              onPress={() => {
                if (this.props.allowTimeSelection) {
                  navigation.dispatch({
                    type: "CallPricingView"
                  });
                }
              }}
              style={styles.time}
            >
              <View style={styles.flexColumn}>
                <Text style={styles.titleStyle}>
                  {this.props.approxTime
                    ? `${this.props.approxTime} ${I18n.t("minutes")}: `
                    : `${I18n.t("upTo60")}: `}
                  <Text style={[styles.regularText]}>
                    {/* {I18n.t("timeCompliments")} */}
                    {"$0"}
                  </Text>
                </Text>
                <Text style={[styles.regularText]}>
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
                  style={[
                    this.props.video ? styles.audioBoxActive : styles.audioBox,
                    styles.extraMarginLeft
                  ]}
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
                  <View style={[styles.justifyCenter, styles.roundBox]}>
                    <View style={styles.iconContainer}>
                      {this.props.video && (
                        <Checkmark
                          width={moderateScale(21)}
                          height={moderateScale(21)}
                          color={Colors.white}
                        />
                      )}
                    </View>
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
                  style={[
                    !this.props.video ? styles.audioBoxActive : styles.audioBox,
                    styles.extraMarginRight
                  ]}
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
                  <View style={[styles.justifyCenter, styles.roundBox]}>
                    <View style={styles.iconContainer}>
                      {!this.props.video && (
                        <Checkmark
                          width={moderateScale(20)}
                          height={moderateScale(20)}
                          color={Colors.white}
                        />
                      )}
                    </View>
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
                  checkOperatingHours(true);

                  this.props.updateSettings({
                    selectedScenarioId:
                      this.props.selectedScenario &&
                      this.props.selectedScenario[0]
                        ? this.props.selectedScenario[0].id
                        : "11111111-1111-1111-1111-111111111126"
                  });
                  this.props.cleanSelected();
                  // this.props.clearEvents();
                  this.props.clearPromoCode();
                  navigation.dispatch({ type: "CustomerView" });
                }}
                title={I18n.t("connectNow")}
                fill
                relative
                absolute
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
  sessionId: state.activeSessionReducer.sessionID,
  token: state.auth.token,
  video: state.activeSessionReducer.video,
  approxTime: state.activeSessionReducer.selectedTime,
  timer: state.activeSessionReducer.timer,
  counterId: state.activeSessionReducer.counterId,
  scenario: state.linguistForm.selectedLanguage,
  scenarioNotes: state.contactLinguist.customScenarioNote,
  selectedScenario: state.linguistForm.selectedScenarios,
  categoryIndex: state.homeFlow.categoryIndex,
  categories: state.homeFlow.categories,
  estimatedPrice:
    state.activeSessionReducer.selectedTime * state.contactLinguist.cost,
  selectedLanguageTo: state.contactLinguist.selectedLanguage,
  secundaryLangCode: state.contactLinguist.secundaryLangCode,
  selectedLanguageFrom: state.contactLinguist.selectedLanguageFrom,
  fromLanguage: state.userProfile.selectedNativeLanguage,
  allowTimeSelection: state.activeSessionReducer.allowTimeSelection,
  promotion: state.promoCode.scanned,
  event: state.events,
  timerCustomer: state.callCustomerSettings.timer
});

const mD = {
  GetInfo,
  updateSettings,
  customerUpdateSettings,
  clearSettings,
  cleanSelected,
  clearLinguistReducer,
  clearEvents,
  clearPromoCode,
  resetConnectingMessage,
  clearTokboxStatus
};

export default connect(
  mS,
  mD
)(CallConfirmationView);
