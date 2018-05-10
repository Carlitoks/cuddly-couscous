//TODO: Create switch when we retrieve the categories array to add icon names
import React, { Component } from "react";
import { connect } from "react-redux";

import { updatePromoCode as updateSettings } from "../../Ducks/PromoCodeReducer";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
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
import BottomButton from "../../Components/BottomButton/BottomButton";
import { updateSettings as updateSelectionList } from "../../Ducks/LinguistFormReducer";
import BoxedListComponent from "../../Components/BoxedListComponent/BoxedListComponent";
import CarouselEntry from "../../Components/CarouselEntry/CarouselEntry";

import Waves from "../../SVG/waves";
import { Colors } from "../../Themes";

import styles from "../../Home/Customer/styles";
import I18n from "../../I18n/I18n";
import { moderateScale } from "../../Util/Scaling";
import { REASON, CATEGORIES } from "../../Util/Constants";
import { sliderWidth, itemWidth } from "../../Components/CarouselEntry/styles";

class PromotionView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemSelected: -1,
      showNavbarTitle: false
    };
  }

  componentWillMount() {
    let categories = [];
    const { scenarios } = this.props;
    if (scenarios.length > 0) {
      categories = scenarios.map(index => index.category);
    }
    this.updateCategoryIndex(0);
    let filteredCat = [...new Set(categories)];
    this.props.updateSettings({
      categories: filteredCat,
      scenarios: this.props.scenarios
    });
  }

  onCarouselItemPress = name => {
    this.props.updateSelectionList({
      selectionItemType: "scenarios",
      selectionItemName: "scenarios",
      scenarios: []
    });
    this.props.navigation.dispatch({
      type: "SelectListView",
      params: { category: name }
    });
  };

  updateCategoryIndex = categoryIndex => {
    this.props.updateSettings({ categoryIndex, listItemSelected: -1 });
  };

  getScenariosByCategory = (scenarios = [], categoryName) => {
    return scenarios.filter(scenario => {
      return scenario.category === categoryName;
    });
  };

  checkCategoriesLength = component => {
    return this.props.categories.length > 0 ? (
      component
    ) : (
      <ActivityIndicator size="large" color="#fb6a28" />
    );
  };

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

    const scenariosFiltered = this.getScenariosByCategory(
      scenarios,
      categoryName
    );
    const list = (
      <BoxedListComponent
        data={scenariosFiltered}
        titleProperty={"title"}
        onPress={index => {
          updateSelectionList({
            selectedScenarios: [scenariosFiltered[index]]
          });

          this.setState({
            itemSelected: index
          });
        }}
        leftText
        multiple={false}
        selected={this.state.itemSelected}
        other={{ other: true, title: "Something else" }}
        otherOnPress={() => {
          navigation.dispatch({ type: "CustomScenarioView" });
        }}
      />
    );

    return this.checkCategoriesLength(list);
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
              data={item}
              mapper={title => {
                return CATEGORIES[title];
              }}
            />
          );
        }}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        firstItem={carouselFirstItem}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.7}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
        loop={true}
        loopClonesPerSide={2}
        onSnapToItem={index => {
          this.updateCategoryIndex(index);
        }}
      />
    );

    return this.checkCategoriesLength(carousel);
  };

  navigate = this.props.navigation.navigate;

  handleScroll = event => {
    const scrolledY = event.nativeEvent.contentOffset.y;

    if (scrolledY > 20) {
      this.setState({ showNavbarTitle: true });
    } else {
      this.setState({ showNavbarTitle: false });
    }
  };

  render() {
    const {
      navigation,
      categories,
      scenarios,
      categoryIndex,
      organization,
      eventName
    } = this.props;
    const { width, height } = Dimensions.get("window");

    const categoryName = categories[categoryIndex];
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <HeaderView
          headerLeftComponent={
            <ShowMenuButton navigation={this.props.navigation} />
          }
          headerCenterComponent={
            this.state.showNavbarTitle ? (
              <View>
                <Text style={[styles.titleCall, styles.titleCallOrganization]}>
                  {organization.Name}
                </Text>
                <Text style={[styles.titleCall, styles.titleCallEvent]}>
                  {eventName}
                </Text>
              </View>
            ) : null
          }
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
            <ScrollView
              automaticallyAdjustContentInsets={true}
              style={styles.scrollContainer}
              alwaysBounceVertical={false}
              onScroll={this.handleScroll}
            >
              <View style={styles.subtitleCallContainer}>
                <Text style={[styles.subtitleCall]}>{organization.Name}</Text>
                <Text style={[styles.subtitleCall]}>{eventName}</Text>
              </View>
              {this.renderList()}
            </ScrollView>
            {/* Next Button */}
            <BottomButton
              title={I18n.t("continue")}
              disabled={this.state.itemSelected === -1}
              fill={!(this.state.itemSelected === -1)}
              onPress={() => {
                navigation.dispatch({ type: "CallConfirmationView" });
              }}
              absolute
              whiteDisabled
            />
          </View>
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  uuid: state.auth.uuid,
  token: state.auth.token,
  categories: state.promoCode.categories,
  sessionID: state.tokbox.sessionID,
  networkInfoType: state.networkInfo.type,
  tokbox: state.tokbox.tokboxID,
  invitationID: state.callCustomerSettings.invitationID,
  carouselFirstItem: state.homeFlow.carouselFirstItem,
  categoryIndex: state.promoCode.categoryIndex,
  listItemSelected: state.homeFlow.listItemSelected,
  organization: state.events.organization,
  scenarios: state.events.scenarios,
  eventName: state.events.name
});

const mD = {
  updateSelectionList,
  updateSettings
};

export default connect(mS, mD)(PromotionView);
