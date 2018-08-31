import React, { Component } from "react";
import { connect } from "react-redux";

import { Button, FormLabel, Card } from "react-native-elements";
import {
  View,
  Image,
  ScrollView,
  Text,
  Linking,
  Platform,
  Dimensions
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import DeviceInfo from "react-native-device-info";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import { Images, Fonts } from "../../Themes";
import styles from "./styles";
import BottomButton from "../../Components/BottomButton/BottomButton";

import { checkRecord } from "../../Ducks/OnboardingRecordReducer";
import { updateForm as updateCustomer } from "../../Ducks/CustomerProfileReducer";
import { updateSettings } from "../../Ducks/SettingsReducer";

// For the moment
import I18n from "../../I18n/I18n";
import Colors from "../../Themes/Colors";

import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  sliderWidth,
  itemWidth
} from "../../Components/FullScreenSwipeEntry/style";
import FullScreenSwipeEntry from "../../Components/FullScreenSwipeEntry/FullScreenSwipeEntry";
import { Waves, Logo } from "../../Assets/SVG";
import { checkOperatingHours } from "../../Util/Helpers";
import { InterfaceSupportedLanguages } from "../../Config/Languages";

const IphoneX = DeviceInfo.getModel() == "iPhone X";

class SelectRoleView extends Component {
  LAUNCHSCREENENTRIES = [
    {
      title: "",
      illustration: "lauchScreenSwipe0"
    },
    {
      title: I18n.t("lauchScreenSwipe1"),
      illustration: "lauchScreenSwipe1"
    },
    {
      title: I18n.t("lauchScreenSwipe2"),
      illustration: "lauchScreenSwipe2"
    },
    {
      title: I18n.t("lauchScreenSwipe3"),
      illustration: "lauchScreenSwipe3"
    },
    {
      title: I18n.t("lauchScreenSwipe4"),
      illustration: "lauchScreenSwipe4"
    },
    {
      title: I18n.t("lauchScreenSwipe5"),
      illustration: "lauchScreenSwipe5"
    }
  ];
  constructor(props) {
    super(props);

    this.state = {
      slider1ActiveSlide: 0
    };
  }

  componentWillMount() {
    const {
      navigation,
      isLoggedIn,
      token,
      checkRecord,
      email,
      id,
      updateCustomer
    } = this.props;

    const record = checkRecord(email);
    if (isLoggedIn && token && !record) {
      checkOperatingHours(true);
      navigation.dispatch({ type: "Home" });
    }
  }

  renderSwipeItem({ item, index }, parallaxProps) {
    return (
      <FullScreenSwipeEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  renderCarousel() {
    const { slider1ActiveSlide } = this.state;

    return (
      <View style={styles.exampleContainer}>
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={this.LAUNCHSCREENENTRIES}
          renderItem={this.renderSwipeItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={1}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
          bounces={false}
        />
      </View>
    );
  }

  renderPagination() {
    const { slider1ActiveSlide } = this.state;
    return (
      <Pagination
        dotsLength={this.LAUNCHSCREENENTRIES.length}
        activeDotIndex={slider1ActiveSlide}
        containerStyle={[
          styles.paginationContainer,
          styles.zIndex1,
          styles.center
        ]}
        dotColor={Colors.primaryColor}
        inactiveDotColor={Colors.primaryColor}
        inactiveDotOpacity={0.3}
        inactiveDotScale={1}
        carouselRef={this._slider1Ref}
        tappableDots={!!this._slider1Ref}
      />
    );
  }

  renderLink({ onPress, text }) {
    return (
      <Text
        style={[styles.textBottom, this.IphoneX ? styles.textBottomX : null]}
        onPress={onPress}
      >
        {text}
      </Text>
    );
  }

  render() {
    const { navigation } = this.props;
    const { slider1ActiveSlide } = this.state;
    const { width, height } = Dimensions.get("window");

    return (
      <ViewWrapper style={{ flex: 1 }}>
        {/* Logo and slogan container */}
        <View style={[styles.center, styles.absolute, styles.zIndex1]}>
          <View style={[this.IphoneX ? styles.logoX : styles.logo]}>
            {/* <Image
              source={Images.jeenieLogo}
              style={[styles.logoImage, styles.center]}
            /> */}
            <Logo
              width={width / 0.2}
              height={(width * 63) / 750}
              style={styles.logoImage}
            />
          </View>
          <Text style={styles.slogan}>{I18n.t("languageCommand")}</Text>
        </View>

        {/* Pagination, bottomButton and links container */}
        <View
          style={[
            styles.center,
            styles.absolute,
            styles.bottom,
            styles.zIndex1,
            styles.fullWidth
          ]}
        >
          {this.renderPagination()}

          <BottomButton
            title={I18n.t("getStarted")}
            onPress={() => navigation.dispatch({ type: "EmailCustomerView" })}
            fill={true}
            long={false}
            relative
            whiteDisabled
          />

          <View style={styles.linksContainer}>
            {this.renderLink({
              text: I18n.t("signIn"),
              onPress: () => navigation.dispatch({ type: "LoginView" })
            })}
          </View>

          <Waves
            width={width}
            height={(width * 129) / 1175.7}
            viewBox={"0 0 1175.7 129"}
            style={styles.waves}
          />
        </View>

        {this.renderCarousel()}
      </ViewWrapper>
    );
  }
}

ms = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
  email: state.auth.email,
  id: state.userProfile.id,
  userLocaleSet: state.settings.userLocaleSet
});

mD = {
  checkRecord,
  updateCustomer,
  updateSettings
};

export default connect(
  ms,
  mD
)(SelectRoleView);
