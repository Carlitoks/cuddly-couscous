import React, { Component } from "react";
import { connect } from "react-redux";
import _upperFirst from "lodash/upperFirst";
import { findIndex, take } from "lodash";
import { asyncGetAccountInformation } from "../../Ducks/ProfileLinguistReducer";
import moment from "moment";
import InCallManager from "react-native-incall-manager";
import {
  asyncUploadAvatar,
  getProfileAsync,
  clearView,
  updateView
} from "../../Ducks/UserProfileReducer";
import {
  EndCall,
  closeOpenConnections,
  clearSettings,
  updateSettings as updateCallCustomerSettings
} from "../../Ducks/CallCustomerSettings";

import { clearSettings as clearCallLinguistSettings } from "../../Ducks/CallLinguistSettings";
import { clear as clearEvents } from "../../Ducks/EventsReducer";
import { updateSettings as updateLinguistForm } from "../../Ducks/LinguistFormReducer";
import { updateSettings as updateContactLinguist } from "../../Ducks/ContactLinguistReducer";
import { getCategories, updateSettings } from "../../Ducks/HomeFlowReducer";

import {
  getAllCustomerCalls,
  customerCalls
} from "../../Ducks/CallHistoryReducer";

import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Carousel from "react-native-snap-carousel";

import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import TileButton from "../../Components/TileButton/TileButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";
import {
  getScenarios,
  updateSettings as updateHomeFlow
} from "../../Ducks/HomeFlowReducer";
import BoxedListComponent from "../../Components/BoxedListComponent/BoxedListComponent";
import CarouselEntry from "../../Components/CarouselEntry/CarouselEntry";
import QRIcon from "../../Components/QRIcon/QRIcon";
import { Waves } from "../../Assets/SVG";

import styles from "./styles";
import { Colors } from "../../Themes";
import I18n, { translateProperty } from "../../I18n/I18n";
import {translateLanguage} from "../../I18n/I18n";
import { SUPPORTED_LANGS, getLocalizedCategories } from "../../Util/Constants";
import {
  sliderWidth,
  itemWidth,
  itemMargin
} from "../../Components/CarouselEntry/styles";

import { Languages } from "../../Config/Languages";

class Home extends Component {
  navigate = this.props.navigation.navigate;

  constructor(props) {
    super(props);

    this.state = {
      indexSelected: -1,
      otherSelected: false,
      qr: false,
      other: false,
      languagesMapper: { eng: "cmn", cmn: "eng", yue: "eng" }
    };
  }

  CATEGORIES = getLocalizedCategories(I18n.currentLocale());

  componentDidMount() {
    const { getAllCustomerCalls, uuid, token } = this.props;

    getAllCustomerCalls(uuid, token)
      .then(response => {
        this.props.customerCalls(response);
      })
      .then(response => {
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

        this.props.updateHomeFlow({ scenariosList });
      });
  }

  componentWillMount() {
    const {
      firstName,
      lastName,
      getCategories,
      getScenarios,
      listItemSelected,
      updateHomeFlow
    } = this.props;

    if (this.props.tokbox && this.props.networkInfoType !== "none") {
      this.props.closeOpenConnections();
    }

    this.setLanguages();

    if (this.props.scenarios.length < 1) {
      getScenarios(this.props.token);
      getCategories(this.props.token);
    }

    this.props.updateSettings({
      selectedScenarioIndex: -1
    });
    //Clean call
    clearInterval(this.props.timer);
    clearInterval(this.props.counterId);
    this.props.clearSettings();
    this.props.clearCallLinguistSettings();
    this.props.asyncGetAccountInformation();
    this.props.clearEvents();

    updateHomeFlow({
      customScenario: "",
      categoryIndex: -1
    });

    InCallManager.stop();
    this.setState({
      indexSelected: listItemSelected
    });
  }

  onCarouselItemPress = (index, item) => {
    const { categories, navigation, updateHomeFlow } = this.props;
    const { currentIndex } = this._slider1Ref;

    updateHomeFlow({ selectedScenarioIndex: -1 });

    if (index > currentIndex) {
      // this._slider1Ref.snapToNext();
    }
    if (index <= currentIndex) {
      this.props.updateSettings({ categorySelected: item });

      updateHomeFlow({
        lastSelectedTile: currentIndex,
        categoryIndex: currentIndex
      });

      item === "qr"
        ? this.props.navigation.dispatch({ type: "ScanScreenView" })
        : navigation.dispatch({ type: "ScenarioSelectionView" });
    }
  };

  submit() {
    const { navigation, updateContactLinguist } = this.props;

    updateContactLinguist({ customScenarioNote: "" });

    this.state.otherSelected
      ? navigation.dispatch({ type: "CustomScenarioView" })
      : navigation.dispatch({ type: "CallTimeView" });
  }
  renderCarousel = () => {
    const {
      categories,
      navigation,
      carouselFirstItem,
      lastSelectedTile
    } = this.props;

    const carousel = categories ? (
      <View style={styles.carouselContainer}>
        <Carousel
          slideStyle={styles.carousel}
          ref={c => (this._slider1Ref = c)}
          data={categories}
          renderItem={({ item, index }) => {
            if (item !== "general") {
              return (
                <CarouselEntry
                  onPress={() => this.onCarouselItemPress(index, item)}
                  data={item}
                  mapper={title => {
                    return this.CATEGORIES[title];
                  }}
                />
              );
            }
          }}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth + itemMargin * 2}
          firstItem={lastSelectedTile}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loopClonesPerSide={7}
          activeSlideAlignment="start"
          enableMomentum={true}
          enableSnap={false}
        />
      </View>
    ) : null;

    return carousel;
  };

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

    const secondaryLanguageCode = languagesMapper[primaryLanguageCode];

    const secondaryLanguage = Languages.find(
      lang => lang[3] === secondaryLanguageCode
    );

    updateContactLinguist({
      primaryLangCode: primaryLanguage[3],
      selectedLanguageFrom: translateLanguage(primaryLanguage[3], primaryLanguage["name"]),
      secundaryLangCode: secondaryLanguage[3],
      selectedLanguage: translateLanguage(secondaryLanguage[3], secondaryLanguage["name"])
    });
  };

  renderList = () => {
    const {
      categories,
      scenarios,
      navigation,
      categoryIndex,
      listItemSelected,
      scenariosList,
      updateLinguistForm,
      updateContactLinguist,
      updateCallCustomerSettings
    } = this.props;

    const categoryName = categories[categoryIndex];

    const emptyActivity = scenariosList && scenariosList.length === 0;

    const data = emptyActivity
      ? [{ id: "emptyActivity", title: I18n.t("noRecentActivityMessage") }]
      : scenariosList;

    const list = scenariosList ? (
      <BoxedListComponent
        customContainerStyle={styles.listContainer}
        data={data}
        itemKey={"id"}
        subtitleProperty={"createdAt"}
        titleFunc={item => translateProperty(item, "title")}
        thirdLineProperty={"customScenarioNote"}
        onPress={index => {
          if (!emptyActivity) {
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
        }}
        multiple={false}
        selected={this.state.indexSelected}
        chevron={!emptyActivity}
        doubleLine={!emptyActivity}
        tripleLine={true}
        leftText
      />
    ) : (
      <ActivityIndicator size="large" color="#fb6a28" />
    );

    return list;
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
      categoryIndex
    } = this.props;
    const { width, height } = Dimensions.get("window");

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
          headerLeftComponent={
            <ShowMenuButton navigation={this.props.navigation} />
          }
          headerRightComponent={<QRIcon navigation={this.props.navigation} />}
          NoWaves
        >
          <View style={styles.mainContainer}>
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
            <Text style={[styles.title, styles.subtitle, styles.largeSubtitle]}>
              {I18n.t("whereAreYouNow")}
            </Text>
            {this.renderCarousel()}
            <Text style={[styles.subtitle]}>{I18n.t("recentActivity")}</Text>
            <Text style={[styles.smallsubtitle, styles.marginBottom10]}>
              {scenariosList && scenariosList.length === 0
                ? ""
                : I18n.t("tapRepeat")}
            </Text>
            <View style={styles.scrollView}>
              <ScrollView
                automaticallyAdjustContentInsets={true}
                alwaysBounceVertical={false}
                style={styles.scrollView}
              >
                {this.renderList()}
              </ScrollView>
            </View>
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
  categories: state.homeFlow.categories,
  scenarios: state.homeFlow.scenarios,
  scenariosList: state.homeFlow.scenariosList,
  sessionID: state.tokbox.sessionID,
  networkInfoType: state.networkInfo.type,
  tokbox: state.tokbox.tokboxID,
  invitationID: state.callCustomerSettings.invitationID,
  timer: state.callCustomerSettings.timer,
  counterId: state.callCustomerSettings.counterId,
  carouselFirstItem: state.homeFlow.carouselFirstItem,
  categoryIndex: state.homeFlow.categoryIndex,
  listItemSelected: state.homeFlow.listItemSelected,
  categorySelected: state.homeFlow.categorySelected,
  customScenario: state.homeFlow.customScenario,
  allCustomerCalls: state.callHistory.allCustomerCalls,
  lastSelectedTile: state.homeFlow.lastSelectedTile
});

const mD = {
  clearView,
  updateView,
  getProfileAsync,
  asyncUploadAvatar,
  updateLinguistForm,
  getCategories,
  EndCall,
  closeOpenConnections,
  getScenarios,
  updateSettings,
  updateCallCustomerSettings,
  updateContactLinguist,
  updateHomeFlow,
  getAllCustomerCalls,
  customerCalls,
  clearSettings,
  clearCallLinguistSettings,
  asyncGetAccountInformation,
  clearEvents
};

export default connect(
  mS,
  mD
)(Home);
