import React, { Component } from "react";
import { connect } from "react-redux";
import _upperFirst from "lodash/upperFirst";
import { take } from "lodash";
import moment from "moment";
import InCallManager from "react-native-incall-manager";
import {View, Text, ScrollView, Dimensions, Alert} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { checkOperatingHours } from "../../Util/Helpers";
import { asyncGetAccountInformation } from "../../Ducks/ProfileLinguistReducer";
import timer from "react-native-timer";
import {
  asyncUploadAvatar,
  getProfileAsync,
  clearView,
  updateView
} from "../../Ducks/UserProfileReducer";
import {
  EndCall,
  closeOpenConnections,
  clear,
  update as updateCallCustomerSettings
} from "../../Ducks/ActiveSessionReducer";
import { clear as clearEvents } from "../../Ducks/EventsReducer";
import { updateSettings as updateLinguistForm } from "../../Ducks/LinguistFormReducer";
import { updateSettings as updateContactLinguist } from "../../Ducks/ContactLinguistReducer";
import {
  getAllCustomerCalls,
  customerCalls
} from "../../Ducks/CallHistoryReducer";
import {
  getScenarios,
  getCategories,
  updateSettings as updateHomeFlow
} from "../../Ducks/HomeFlowReducer";

import styles from "./styles";
import { Colors } from "../../Themes";
import I18n, { translateLanguage, translateProperty } from "../../I18n/I18n";
import { SUPPORTED_LANGS, getLocalizedCategories } from "../../Util/Constants";
import {
  sliderWidth,
  itemWidth,
  itemMargin
} from "../../Components/CarouselEntry/styles";
import PillButton from "../../Components/PillButton/PillButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import QRIcon from "../../Components/QRIcon/QRIcon";
import { Waves } from "../../Assets/SVG";
import { Languages } from "../../Config/Languages";
import SixtyMinutesModal from "./SixtyMinutesModal/SixtyMinutesModal";
import HomeCarousel from "./HomeCarousel";
import RecentActivity from "./RecentActivity";
import PaymentModal from "../Customer/PaymentModal/PaymentModal";
import FeedbackProvidedModal from "./FeedbackProvidedModal/FeedbackProvidedModal";

class Home extends Component {
  navigate = this.props.navigation.navigate;

  constructor(props) {
    super(props);

    this.state = {
      indexSelected: -1,
      otherSelected: false,
      qr: false,
      other: false,
      languagesMapper: { eng: "cmn", cmn: "eng", yue: "eng", jpn: "eng" },
      modal: false
    };
  }

  CATEGORIES = getLocalizedCategories(I18n.currentLocale());

  componentDidMount() {
    const {
      getAllCustomerCalls,
      uuid,
      token,
      customerCalls,
      updateHomeFlow,
      linguistProfile,
      isLoggedIn
    } = this.props;
    if (!linguistProfile && isLoggedIn) {
      //checkOperatingHours(true);
    }

    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.usageError
    ) {
      Alert.alert(I18n.t("invalidCode"), this.props.navigation.state.params.usageError);
    }
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.minutesGranted
    ) {
      Alert.alert(I18n.t("minutesAdded"), I18n.t("complimentMinutes",{
        maxMinutesPerUser: this.props.navigation.state.params.maxMinutesPerUser,
        organizer: this.props.navigation.state.params.organization
      }));
    }

    getAllCustomerCalls(uuid, token)
      .then(response => {
        customerCalls(response);
      })
      .then(() => {
        const { allCustomerCalls } = this.props;

        const filteredCalls = allCustomerCalls.filter(call => {
          const {
            session,
            session: { scenario }
          } = call;

          return scenario !== undefined && !scenario.eventID;
        });

        const scenariosList = take(filteredCalls, 5).map(call => {
          const {
            session: {
              id,
              estimatedMinutes,
              primaryLangCode,
              secondaryLangCode,
              scenario,
              createdAt,
              scenario: { category, title },
              customScenarioNote
            }
          } = call;

          const titleMapped = `${_upperFirst(
            this.CATEGORIES[category]
          )}: ${title}`;

          return {
            id,
            createdAt: moment(createdAt).format("MM/DD/YYYY [at] hh:mm A"),
            title: titleMapped,
            estimatedMinutes,
            scenario,
            primaryLangCode,
            secondaryLangCode,
            customScenarioNote
          };
        });

        updateHomeFlow({ scenariosList });
      });
  }

  componentWillMount() {
    const {
      getCategories,
      getScenarios,
      listItemSelected,
      updateHomeFlow,
      scenarios,
      uuid,
      token
    } = this.props;
    this.setLanguages();
    if (scenarios.length < 1) {
      getScenarios(token);
      getCategories(token);
    }
    this.changeModal();

    updateHomeFlow({
      selectedScenarioIndex: -1,
      displayPaymentModal: false,
      display60MinModal: false
    });

    //Clean call
    timer.clearInterval("timer");
    timer.clearInterval("counterId");
    this.props.asyncGetAccountInformation();
    this.props.clearEvents();
    this.props.clear();
    updateHomeFlow({
      customScenario: "",
      categoryIndex: -1
    });

    InCallManager.stop();
    this.setState({
      indexSelected: listItemSelected
    });
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.alertFail
    ) {
      Alert.alert(I18n.t("notification"), I18n.t("session.callFailCustomer"));
    }
  }

  changeModal() {
    if (this.props.displayFeedbackProvided) {
      this.setState({ modal: true });
      this.props.updateHomeFlow({ displayFeedbackProvided: false });
    } else {
      this.setState({ modal: false });
    }
  }

  submit() {
    const { navigation, updateContactLinguist } = this.props;

    updateContactLinguist({ customScenarioNote: "" });

    navigation.dispatch({
      type: this.state.otherSelected ? "CustomScenarioView" : "CallTimeView"
    });
  }

  getPillLabel() {
    const { availableMinutes, stripePaymentToken } = this.props;
    if (availableMinutes == 0 && !stripePaymentToken) {
      return I18n.t("noAvailableMinutes");
    }
    if (availableMinutes > 0) {
      return `${I18n.t("minutesAbbreviation", {
        minutes: availableMinutes
      })}`;
    }
    if (availableMinutes == 0 && !!stripePaymentToken) {
      return I18n.t("costPerMinute");
    }
  }

  modalSelection() {
    const { updateHomeFlow, availableMinutes, stripePaymentToken } = this.props;
    if (availableMinutes < 5 || !stripePaymentToken) {
      updateHomeFlow({ displayPaymentModal: true });
    }
    if (availableMinutes > 5 && !!stripePaymentToken) {
      updateHomeFlow({ display60MinModal: true });
    }
  }

  setLanguages = () => {
    const { nativeLangCode, updateContactLinguist } = this.props;

    const { languagesMapper } = this.state;
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

    updateContactLinguist({
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
      firstName,
      lastName,
      preferredName,
      avatarURL,
      navigation,
      categories,
      scenarios,
      scenariosList,
      categoryIndex,
      lastSelectedTile,
      availableMinutes,
      display60MinModal,
      displayPaymentModal,
      displayFeedbackProvided,
      updateHomeFlow,
      getProfileAsync,
      uuid,
      token
    } = this.props;

    const { width, height } = Dimensions.get("window");

    getProfileAsync(uuid, token);

    const categoryName = categories[categoryIndex];

    const salute =
      preferredName.length > 0
        ? `${I18n.t("hi")}, ${preferredName}!`
        : `${I18n.t("hi")}, ${firstName}!`;

    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <HeaderView
          headerCenterComponent={<Text style={styles.textName}>{salute}</Text>}
          navbarTitle={salute}
          navbarType={"Complete"}
          headerLeftComponent={<ShowMenuButton navigation={navigation} />}
          headerRightComponent={<QRIcon navigation={navigation} />}
          NoWaves
        >
          <View style={styles.viewContainer}>
            <LinearGradient
              colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
              style={styles.linearGradient}
            />
            <Waves
              width={width}
              height={(width * 129) / 1175.7}
              viewBox={"0 0 1175.7 129"}
              style={styles.waves}
            />
            <ScrollView
              automaticallyAdjustContentInsets={true}
              alwaysBounceVertical={false}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollViewContainer}
            >
              <Text style={[styles.title]}>{I18n.t("whereAreYouNow")}</Text>

              <HomeCarousel
                categories={categories}
                lastSelectedTile={lastSelectedTile}
                navigation={navigation}
                updateHomeFlow={updateHomeFlow}
              />

              <RecentActivity
                navigation={navigation}
                scenariosList={scenariosList}
                indexSelected={this.state.indexSelected}
              />
            </ScrollView>

            {display60MinModal && (
              <SixtyMinutesModal
                visible={display60MinModal}
                closeModal={() => {
                  this.props.updateHomeFlow({
                    display60MinModal: false
                  });
                }}
                availableMinutes={availableMinutes}
              />
            )}

            {displayPaymentModal && (
              <PaymentModal
                visible={displayPaymentModal}
                closeModal={() => {
                  this.props.updateHomeFlow({ displayPaymentModal: false });
                }}
                navigation={navigation}
              />
            )}

            {this.state.modal ? (
              <FeedbackProvidedModal
                visible={this.state.modal}
                closeModal={() => {
                  this.changeModal();
                }}
                continueUsing={() => {
                  this.changeModal();
                }}
                availableMinutes={availableMinutes}
              />
            ) : null}

            <PillButton
              onPress={() => {
                this.modalSelection();
              }}
              title={this.getPillLabel()}
              icon={"ios-time"}
              absolute
              alignButton={"Right"}
            />
          </View>
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  firstName: state.userProfile.firstName,
  lastName: state.userProfile.lastName,
  preferredName: state.userProfile.preferredName,
  avatarURL: state.userProfile.avatarURL,
  selectedNativeLanguage: state.userProfile.selectedNativeLanguage,
  nativeLangCode: state.userProfile.nativeLangCode,
  uuid: state.auth.uuid,
  token: state.auth.token,
  userId: state.userProfile.id,
  rate: state.userProfile.averageStarRating,
  availableMinutes: state.userProfile.availableMinutes,
  categories: state.homeFlow.categories,
  scenarios: state.homeFlow.scenarios,
  scenariosList: state.homeFlow.scenariosList,
  networkInfoType: state.networkInfo.type,
  tokbox: state.tokbox.tokboxID,
  invitationID: state.activeSessionReducer.invitationID,
  timer: state.activeSessionReducer.timer,
  counterId: state.activeSessionReducer.counterId,
  carouselFirstItem: state.homeFlow.carouselFirstItem,
  categoryIndex: state.homeFlow.categoryIndex,
  listItemSelected: state.homeFlow.listItemSelected,
  categorySelected: state.homeFlow.categorySelected,
  customScenario: state.homeFlow.customScenario,
  allCustomerCalls: state.callHistory.allCustomerCalls,
  lastSelectedTile: state.homeFlow.lastSelectedTile,
  display60MinModal: state.homeFlow.display60MinModal,
  displayPaymentModal: state.homeFlow.displayPaymentModal,
  displayFeedbackProvided: state.homeFlow.displayFeedbackProvided,
  stripeCustomerID: state.userProfile.stripeCustomerID,
  stripePaymentToken: state.userProfile.stripePaymentToken,
  linguistProfile: state.userProfile.linguistProfile,
  isLoggedIn: state.auth.isLoggedIn
});

const mD = {
  clearView,
  updateView,
  getProfileAsync,
  asyncUploadAvatar,
  updateLinguistForm,
  getCategories,
  EndCall,
  clear,
  closeOpenConnections,
  getScenarios,
  updateCallCustomerSettings,
  updateContactLinguist,
  updateHomeFlow,
  getAllCustomerCalls,
  customerCalls,
  asyncGetAccountInformation,
  clearEvents
};

export default connect(
  mS,
  mD
)(Home);
