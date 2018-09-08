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
  resetConnectingMessage,
  updateSettings as updateContactLinguist
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
import {
  getLocalizedCategories,
  SUPPORTED_LANGS
} from "../../../Util/Constants";
import SupportedLanguagesList from "./../SessionLanguageView/SupportedLanguagesList";
import ComingSoonLanguagesList from "./../SessionLanguageView/ComingSoonLanguagesList";
import { updateSettings as updateHomeFlow } from "../../../Ducks/HomeFlowReducer";
class CallConfirmationView extends Component {
  CATEGORIES = getLocalizedCategories(I18n.currentLocale());

  checkPaymentsAndRedirect = () => {
    const {
      availableMinutes,
      event,
      event: { chargeOverageToOwner },
      navigation,
      promotion,
      stripePaymentToken
    } = this.props;

    const thereAreNoMinutesAvailable = availableMinutes === 0;
    const dontChargeOwnerForEvent =
      (promotion || event.id) && !chargeOverageToOwner;

    if (
      !stripePaymentToken &&
      (thereAreNoMinutesAvailable || dontChargeOwnerForEvent)
    ) {
      const params = {
        title: I18n.t("paymentDetails"),
        messageText: I18n.t("enterPaymentDetails2"),
        buttonText: I18n.t("saveContinue"),
        buttonTextIfEmpty: I18n.t("skipAddLater"),
        optional: false,
        onSubmit: () => navigation.dispatch({ type: "CallConfirmationView" })
      };

      if (thereAreNoMinutesAvailable) {
        params = {
          ...params,
          messageText: I18n.t("enterPaymentDetails3"),
          buttonText: I18n.t("continue")
        };
      }

      if (dontChargeOwnerForEvent) {
        params = {
          ...params,
          messageText: I18n.t("enterPaymentDetails4")
        };
      }

      navigation.dispatch({
        type: "PaymentsView",
        params
      });
    }
  };

  componentWillMount() {
    const {
      promotion,
      event,
      event: { chargeOverageToOwner },
      resetConnectingMessage,
      navigation,
      availableMinutes,
      stripePaymentToken
    } = this.props;
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
    const verifyLang = !!this.props.primaryLangCode;
    resetConnectingMessage();
    let inputHeight = 0;

    this.checkPaymentsAndRedirect();

    if (promotion || event.id) {
      const scannedEvent = promotion ? promotion : event;

      const {
        allowSecondaryLangSelection,
        defaultSecondaryLangCode
      } = scannedEvent;

      const languagesMapper = {
        eng: "cmn",
        cmn: "eng",
        yue: "eng",
        jpn: "eng"
      };
      const userNativeLangIsSupported =
        SUPPORTED_LANGS.indexOf(this.props.nativeLangCode) >= 0;

      const primaryLanguageCode = userNativeLangIsSupported
        ? this.props.nativeLangCode
        : "eng";

      const primaryLanguage = Languages.find(
        lang => lang[3] === primaryLanguageCode
      );

      if (!verifyLang) {
        this.props.updateSettings({
          primaryLangCode: primaryLanguage[3],
          selectedLanguageFrom: translateLanguage(
            primaryLanguage[3],
            primaryLanguage["name"]
          )
        });
      }
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
    } else {
      if (!verifyLang) {
        this.setLanguages();
      }
    }
  }

  componentDidMount() {
    checkOperatingHours(
      true,
      this.props.nativeLangCode,
      this.props.secundaryLangCode
    );
  }

  getLabels(type) {
    const {
      event,
      availableMinutes,
      approxTime,
      stripeCustomerID,
      stripePaymentToken
    } = this.props;
    switch (type) {
      case "minutes":
        if (event.id && event.id !== "") {
          if (event.userStatus) {
            return `${I18n.t("upTo60WithMinutes", {
              minutes: event.userStatus.availableCallTime
            })}: `;
          } else {
            return `${approxTime} ${I18n.t("minutes")}: `;
          }
        }

        if (!event.id) {
          if (!!stripeCustomerID && !!stripePaymentToken) {
            if (availableMinutes == 0) {
              return `${I18n.t("upTo60WithAbrev")}: `;
            }
            if (availableMinutes > 0) {
              return `${I18n.t("upTo60WithMinutes", {
                minutes: availableMinutes
              })}: `;
            }
          }
          if (!stripeCustomerID || !stripePaymentToken) {
            if (availableMinutes == 0) {
              return `${I18n.t("noAvailableMinutes")}: `;
            }
            if (availableMinutes > 0) {
              return `${I18n.t("upTo60WithMinutes", {
                minutes: availableMinutes
              })}: `;
            }
          }
        }
        break;
      case "description":
        if (event.id && event.id !== "") {
          return `${I18n.t("compliments", {
            minutes: event.userStatus.remainingMinutes,
            organizer: event.organization.name
          })}`;
        }
        if (!event.id) {
          if (!!stripeCustomerID && !!stripePaymentToken) {
            if (availableMinutes == 0) {
              return ``;
            }
            if (availableMinutes > 0) {
              return `${I18n.t("timeWithCost")}`;
            }
          }
          if (!stripeCustomerID || !stripePaymentToken) {
            if (availableMinutes == 0) {
              return `${I18n.t("enterPaymentDetailsToContinue")}`;
            }
            if (availableMinutes > 0) {
              return `${I18n.t("callWillEnd")}`;
            }
          }
        }
        break;
      default:
        break;
    }
  }

  redirectToPaymentView() {
    const { navigation, stripeCustomerID, stripePaymentToken } = this.props;
    if (!stripeCustomerID || !stripePaymentToken) {
      navigation.dispatch({
        type: "PaymentsView",
        params: {
          title: I18n.t("paymentDetails"),
          messageText: I18n.t("enterPaymentDetails"),
          buttonText: I18n.t("save"),
          buttonTextIfEmpty: I18n.t("save"),
          optional: true,
          onSubmit: () => navigation.dispatch({ type: "CallConfirmationView" })
        }
      });
    }
    if (this.props.allowTimeSelection && !!stripePaymentToken) {
      navigation.dispatch({
        type: "CallPricingView"
      });
    }
  }

  checkAvailableMinutes() {
    const { navigation, event } = this.props;
    if (!event.id) {
      if (this.props.availableMinutes === 0) {
        this.props.cleanSelected();
        // this.props.clearEvents();
        this.props.clearPromoCode();
        this.props.updateHomeFlow({
          displayFeedbackModal: true
        });
        navigation.dispatch({ type: "Home" });
      } else {
        this.props.updateSettings({
          selectedScenarioId:
            this.props.selectedScenario && this.props.selectedScenario[0]
              ? this.props.selectedScenario[0].id
              : "11111111-1111-1111-1111-111111111126"
        });
        this.props.cleanSelected();
        // this.props.clearEvents();
        this.props.clearPromoCode();
        navigation.dispatch({ type: "CustomerView" });
      }
    } else {
      this.props.updateSettings({
        selectedScenarioId:
          this.props.selectedScenario && this.props.selectedScenario[0]
            ? this.props.selectedScenario[0].id
            : "11111111-1111-1111-1111-111111111126"
      });
      this.props.cleanSelected();
      // this.props.clearEvents();
      this.props.clearPromoCode();
      navigation.dispatch({ type: "CustomerView" });
    }
  }

  setLanguages = () => {
    const { nativeLangCode } = this.props;
    const languagesMapper = { eng: "cmn", cmn: "eng", yue: "eng", jpn: "eng" };
    const userNativeLangIsSupported =
      SUPPORTED_LANGS.indexOf(nativeLangCode) >= 0;

    const primaryLanguageCode = userNativeLangIsSupported
      ? nativeLangCode
      : "eng";

    const primaryLanguage = Languages.find(
      lang => lang[3] === primaryLanguageCode
    );

    let secondaryLanguageCode = languagesMapper[primaryLanguageCode];
    if (!secondaryLanguageCode) {
      secondaryLanguageCode = primaryLanguageCode == "eng" ? "cmn" : "eng";
    }

    const secondaryLanguage = Languages.find(
      lang => lang[3] === secondaryLanguageCode
    );

    this.props.updateSettings({
      primaryLangCode: primaryLanguage[3],
      selectedLanguageFrom: translateLanguage(
        primaryLanguage[3],
        primaryLanguage["name"]
      ),
      secundaryLangCode: secondaryLanguage[3],
      selectedLanguage: translateLanguage(
        secondaryLanguage[3],
        secondaryLanguage["name"]
      )
    });
  };

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
                this.redirectToPaymentView();
              }}
              style={styles.time}
            >
              <View style={styles.flexColumn}>
                <Text style={styles.titleStyle}>
                  {this.props.approxTime
                    ? this.getLabels("minutes")
                    : `${I18n.t("upTo60")}: `}
                  <Text style={[styles.regularText]}>
                    {/* {I18n.t("timeCompliments")} */}
                    {this.props.stripeCustomerID &&
                    this.props.stripePaymentToken &&
                    this.props.availableMinutes == 0 &&
                    !this.props.event.id
                      ? I18n.t("costPerMinute")
                      : "$0"}
                  </Text>
                </Text>
                <Text style={[styles.regularText]}>
                  {/* I18n.t("timeAddMore") */
                  this.getLabels("description")}
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
                  this.checkAvailableMinutes();
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
  timerCustomer: state.callCustomerSettings.timer,
  availableMinutes: state.userProfile.availableMinutes,
  nativeLangCode: state.userProfile.nativeLangCode,
  primaryLangCode: state.contactLinguist.primaryLangCode,
  stripeCustomerID: state.userProfile.stripeCustomerID,
  stripePaymentToken: state.userProfile.stripePaymentToken
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
  clearTokboxStatus,
  updateHomeFlow,
  updateContactLinguist
};

export default connect(
  mS,
  mD
)(CallConfirmationView);
