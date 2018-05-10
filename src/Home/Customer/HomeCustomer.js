//TODO: Create switch when we retrieve the categories array to add icon names
import React, { Component } from "react";
import { connect } from "react-redux";
import _upperFirst from "lodash/upperFirst";
import { findIndex, take } from "lodash";

import moment from "moment";

import {
  asyncUploadAvatar,
  getProfileAsync,
  clearView,
  updateView
} from "../../Ducks/UserProfileReducer";
import {
  EndCall,
  closeOpenConnections,
  updateSettings as updateCustomerSettings
} from "../../Ducks/CallCustomerSettings";
import { updateSettings as updateLinguistForm } from "../../Ducks/LinguistFormReducer";
import { updateSettings as updateCallCustomerSettings } from "../../Ducks/CallCustomerSettings";
import { updateSettings as updateContactLinguist } from "../../Ducks/ContactLinguistReducer";
import { getCategories, updateSettings } from "../../Ducks/HomeFlowReducer";

import {
  getAllCustomerCalls,
  customerCalls
} from "../../Ducks/CallHistoryReducer";

import PhotoUpload from "react-native-photo-upload";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Button,
  FormLabel,
  Header,
  Badge,
  Rating,
  Avatar,
  Tile,
  List,
  ListItem
} from "react-native-elements";
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import Carousel from "react-native-snap-carousel";

import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import TileButton from "../../Components/TileButton/TileButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";
import BottomButton from "../../Components/BottomButton/BottomButton";
import {
  getScenarios,
  updateSettings as updateHomeFlow
} from "../../Ducks/HomeFlowReducer";
import BoxedListComponent from "../../Components/BoxedListComponent/BoxedListComponent";
import CarouselEntry from "../../Components/CarouselEntry/CarouselEntry";
import InputRegular from "../../Components/InputRegular/InputRegular";
import QRIcon from "../../Components/QRIcon/QRIcon";
import Waves from "../../SVG/waves";

import styles from "./styles";
import { Colors, Images, Fonts } from "../../Themes";
import I18n from "../../I18n/I18n";
import { IMAGE_STORAGE_URL } from "../../Config/env";
import { moderateScale } from "../../Util/Scaling";
import { REASON, CATEGORIES } from "../../Util/Constants";
import {
  sliderWidth,
  itemWidth,
  itemMargin
} from "../../Components/CarouselEntry/styles";

import languages from "../../Config/Languages";

class Home extends Component {
  navigate = this.props.navigation.navigate;

  constructor(props) {
    super(props);

    this.state = {
      indexSelected: -1,
      otherSelected: false,
      qr: false,
      other: false
    };
  }

  componentDidMount() {
    const { getAllCustomerCalls, uuid, token } = this.props;

    getAllCustomerCalls(uuid, token)
      .then(response => {
        this.props.customerCalls(response);
      })
      .then(response => {
        const { allCustomerCalls } = this.props;

        const scenariosList = take(allCustomerCalls, 5)
          .filter(call => {
            return call.session.scenario !== undefined;
          })
          .map(call => {
            const {
              session: {
                id,
                estimatedMinutes,
                primaryLangCode,
                secondaryLangCode,
                scenario,
                createdAt,
                scenario: { category, title }
              }
            } = call;

            const titleMapped = `${_upperFirst(
              CATEGORIES[category]
            )}: ${title}`;

            return {
              id,
              createdAt: moment(createdAt).format("MM/DD/YYYY [at] hh:mm A"),
              title: titleMapped,
              estimatedMinutes,
              scenario,
              primaryLangCode,
              secondaryLangCode
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
      listItemSelected
    } = this.props;

    if (this.props.tokbox && this.props.networkInfoType !== "none") {
      this.props.closeOpenConnections();
    }

    if (this.props.scenarios.length < 1) {
      getScenarios(this.props.token);
      getCategories(this.props.token);
    }

    this.props.updateSettings({
      selectedScenarioIndex: -1
    });

    this.props.updateCustomerSettings({
      allowTimeSelection: true
    });

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
        lastSelectedTile: currentIndex
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
      <Carousel
        slideStyle={styles.carousel}
        ref={c => (this._slider1Ref = c)}
        data={categories}
        renderItem={({ item, index }) => {
          return (
            <CarouselEntry
              onPress={() => this.onCarouselItemPress(index, item)}
              data={item}
              mapper={title => {
                return CATEGORIES[title];
              }}
            />
          );
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
    ) : null;

    return carousel;
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
        titleProperty={"title"}
        onPress={index => {
          if (!emptyActivity) {
            const scenario = scenariosList[index];

            updateLinguistForm({
              selectedScenarios: [scenario.scenario]
            });

            const languageIndex = findIndex(
              languages,
              language => language[3] === scenario.secondaryLangCode
            );

            updateContactLinguist({
              selectedLanguage: languages[languageIndex]["name"],
              primaryLangCode: scenario.primaryLangCode,
              secondaryLangCode: scenario.secondaryLangCode
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
              height={width * 129 / 1175.7}
              viewBox={"0 0 1175.7 129"}
              style={styles.waves}
            />
            <Text style={[styles.title, styles.subtitle, styles.largeSubtitle]}>
              {I18n.t("whereAreYouNow")}
            </Text>
            {this.renderCarousel()}
            <Text style={[styles.subtitle]}>{I18n.t("recentActivity")}</Text>
            <Text style={[styles.smallsubtitle, styles.marginBottom10]}>
              {I18n.t("tapRepeat")}
            </Text>
            <ScrollView
              automaticallyAdjustContentInsets={true}
              alwaysBounceVertical={false}
              style={styles.scrollView}
            >
              {this.renderList()}
            </ScrollView>
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
  updateCustomerSettings,
  updateContactLinguist,
  updateCallCustomerSettings,
  updateHomeFlow,
  getAllCustomerCalls,
  customerCalls
};

export default connect(mS, mD)(Home);
