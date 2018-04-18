//TODO: Create switch when we retrieve the categories array to add icon names
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  asyncUploadAvatar,
  getProfileAsync,
  clearView,
  updateView,
  getNativeLang
} from "../../Ducks/UserProfileReducer";
import {
  EndCall,
  closeOpenConnections,
  updateSettings as updateCustomerSettings
} from "../../Ducks/CallCustomerSettings";
import { updateSettings as updateContactLinguist } from "../../Ducks/ContactLinguistReducer";
import { getCategories, updateSettings } from "../../Ducks/HomeFlowReducer";
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
import { updateSettings as updateSelectionList } from "../../Ducks/LinguistFormReducer";
import { getScenarios } from "../../Ducks/HomeFlowReducer";
import ListComponent from "../../Components/ListComponent/ListComponent";
import CarouselEntry from "../../Components/CarouselEntry/CarouselEntry";
import InputRegular from "../../Components/InputRegular/InputRegular";
import Waves from "../../SVG/wavesOrange";

import styles from "./styles";
import { Colors, Images, Fonts } from "../../Themes";
import I18n from "../../I18n/I18n";
import { IMAGE_STORAGE_URL } from "../../Config/env";
import { moderateScale } from "../../Util/Scaling";
import { REASON, CATEGORIES } from "../../Util/Constants";
import { sliderWidth, itemWidth } from "../../Components/CarouselEntry/styles";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      indexSelected: -1,
      otherSelected: false,
      qr: false,
      other: false
    };
  }

  componentWillMount() {
    if (this.props.tokbox && this.props.networkInfoType !== "none") {
      this.props.closeOpenConnections();
    }
    const { firstName, lastName, getCategories, getScenarios } = this.props;
    if (this.props.scenarios.length < 1) {
      getScenarios(this.props.token);
      getCategories(this.props.token);
    }
    const { listItemSelected } = this.props;

    this.props.updateSettings({
      categoryIndex: this.props.carouselFirstItem
    });

    this.props.updateCustomerSettings({
      allowTimeSelection: true
    });

    this.setState({
      indexSelected: listItemSelected
    });
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.networkInfoType !== "none" && this.props.sessionID) {
    //   this.props.EndCall(this.props.sessionID, REASON.CANCEL, this.props.token);
    // }
  }

  onCarouselItemPress = index => {
    const { categories } = this.props;
    const calculatedIndex = index - categories.length;
    const { currentIndex } = this._slider1Ref;

    if (calculatedIndex > currentIndex) {
      this._slider1Ref.snapToNext();
    }
    if (calculatedIndex < currentIndex) {
      this._slider1Ref.snapToPrev();
    }
  };

  qrIcon = () => {
    const { navigation } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.dispatch({ type: "ScanScreenView" })}>
        <View style={styles.buttonGrid}>
          <Image style={styles.scanQRImage} source={Images.scan_qr_code} />
        </View>
      </TouchableOpacity>
    );
  };
  updateCategoryIndex = categoryIndex => {
    this.props.updateSettings({ categoryIndex, listItemSelected: -1 });
    this.setState({
      indexSelected: -1,
      qr: categoryIndex == 6
    });
    this.props.updateSettings({
      customScenario: ""
    });
  };

  getScenariosByCategory = (scenarios, categoryName) => {
    return scenarios.filter(scenario => {
      return scenario.category === categoryName;
    });
  };

  checkCategoriesLength = (component, loader) => {
    return this.props.categories.length > 0 ? (
      component
    ) : loader ? (
      <ActivityIndicator size="large" color="#fb6a28" />
    ) : null;
  };

  onSelected = bool => {
    this.setState({
      otherSelected: bool
    });
  };

  changeSelect = index => {
    this.setState({
      indexSelected: index
    });
  };

  submit() {
    const { navigation, updateContactLinguist } = this.props;

    updateContactLinguist({ customScenarioNote: "" });

    this.state.otherSelected
      ? navigation.dispatch({ type: "CustomScenarioView" })
      : navigation.dispatch({ type: "CallTimeView" });
  }

  renderList = () => {
    const {
      categories,
      scenarios,
      navigation,
      updateSelectionList,
      categoryIndex,
      listItemSelected
    } = this.props;
    const categoryName = categories[categoryIndex];
    let scenariosFiltered = this.getScenariosByCategory(
      scenarios,
      categoryName
    );

    let scenariosPlusOther = [
      ...scenariosFiltered,
      {
        other: true,
        title: "Something else",
        onPress: () => navigation.dispatch({ type: "CustomScenarioView" })
      }
    ];

    const list = (
      <ListComponent
        customContainerStyle={styles.listContainer}
        data={scenariosPlusOther}
        titleProperty={"title"}
        onPress={index => {
          updateSelectionList({
            selectedScenarios: [scenariosFiltered[index]]
          });
          this.props.updateSettings({ listItemSelected: index });
          this.onSelected(false);
        }}
        changeSelected={index => {
          this.changeSelect(index);
        }}
        multiple={false}
        selected={this.state.indexSelected}
      />
    );

    return this.checkCategoriesLength(list, false);
  };

  // NOTE: this should probably move somewhere else so it can be referenced
  // in a few places, such as the Custom Scenario entry screen... and
  // it will need be translated via i18n, so the mapping should probably
  // reference an i18n key instead of the string directly
  carouselTitleMapper = title => {
    return CATEGORIES[title];
  };

  renderCarousel = () => {
    const { categories, navigation, carouselFirstItem } = this.props;

    const carousel = (
      <Carousel
        ref={c => (this._slider1Ref = c)}
        data={categories}
        renderItem={({ item, index }) => {
          return (
            <CarouselEntry
              onPress={() => this.onCarouselItemPress(index)}
              data={item}
              mapper={this.carouselTitleMapper}
            />
          );
        }}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        firstItem={carouselFirstItem}
        inactiveSlideScale={0.8}
        inactiveSlideOpacity={0.7}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
        loop={true}
        loopClonesPerSide={7}
        onSnapToItem={index => {
          this.updateCategoryIndex(index);
        }}
        enableMomentum={true}
      />
    );

    return this.checkCategoriesLength(carousel, true);
  };

  renderInput = () => {
    return (
      <InputRegular
        placeholder={I18n.t("iNeedSomethingElse")}
        value={this.props.customScenario}
        onChangeText={text => {
          this.props.updateSettings({
            customScenario: text
          });
        }}
        maxLength={70}
        multiline
      />
    );
  };

  truncate = (string, length) => {
    return string.length > length
      ? string.substring(0, length) + "..."
      : string;
  };
  bottomButtonTitle = () => {
    const { qr, other } = this.state;

    return qr ? I18n.t("scanQRCode") : I18n.t("confirm");
  };

  bottomButtonDisabled = () => {
    const { qr, other, indexSelected } = this.state;
    const { customScenario } = this.props;

    return qr ? false : other ? false : indexSelected <= -1;
  };

  bottomButtonOnPress = () => {
    const { qr, other, indexSelected } = this.state;
    const { customScenario, updateSettings } = this.props;

    updateSettings({ listItemSelected: -1 });
    this.setState({
      indexSelected: -1
    });

    return qr
      ? this.props.navigation.dispatch({ type: "ScanScreenView" })
      : other
        ? this.props.navigation.dispatch({ type: "CallTimeView" })
        : this.submit();
  };

  navigate = this.props.navigation.navigate;

  render() {
    const {
      firstName,
      lastName,
      preferredName,
      avatarURL,
      navigation,
      categories,
      scenarios,
      categoryIndex
    } = this.props;
    const { width, height } = Dimensions.get("window");

    const categoryName = categories[categoryIndex];

    const salute =
      preferredName.length > 0
        ? `${I18n.t("hi")} ${preferredName}!`
        : `${I18n.t("hi")} ${firstName}!`;

    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <HeaderView
          headerCenterComponent={
            <Text style={styles.textName}>{this.truncate(salute, 30)}</Text>
          }
          headerLeftComponent={
            <ShowMenuButton navigation={this.props.navigation} />
          }
          headerRightComponent={this.qrIcon()}
          title={I18n.t("languageHelp")}
          titleComponent={
            <Text style={styles.titleComponent}>{I18n.t("languageHelp")}</Text>
          }
          subtitle={" "}>
          <View style={styles.mainContainer}>
            {/* SVG White Waves */}
            <View>
              <Waves
                width={width}
                height={width * 80 / 750}
                viewBox={"0 0 750 80"}
              />
            </View>
            {this.renderCarousel()}

            {this.checkCategoriesLength(
              <View style={styles.triangle} />,
              false
            )}
          </View>
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={styles.scrollContainer}
            alwaysBounceVertical={false}>
            {this.state.other ? this.renderInput() : null}
            {!this.state.qr && !this.state.other ? this.renderList() : null}
          </ScrollView>

          <BottomButton
            title={this.bottomButtonTitle()}
            disabled={this.bottomButtonDisabled()}
            fill={!this.bottomButtonDisabled()}
            onPress={this.bottomButtonOnPress}
          />
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
  rate: state.userProfile.averageStarRating,
  categories: state.homeFlow.categories,
  scenarios: state.homeFlow.scenarios,
  sessionID: state.tokbox.sessionID,
  networkInfoType: state.networkInfo.type,
  tokbox: state.tokbox.tokboxID,
  invitationID: state.callCustomerSettings.invitationID,
  carouselFirstItem: state.homeFlow.carouselFirstItem,
  categoryIndex: state.homeFlow.categoryIndex,
  listItemSelected: state.homeFlow.listItemSelected,
  customScenario: state.homeFlow.customScenario
});

const mD = {
  clearView,
  updateView,
  getProfileAsync,
  asyncUploadAvatar,
  updateSelectionList,
  getCategories,
  EndCall,
  closeOpenConnections,
  getScenarios,
  updateSettings,
  updateCustomerSettings,
  updateContactLinguist
};

export default connect(mS, mD)(Home);
