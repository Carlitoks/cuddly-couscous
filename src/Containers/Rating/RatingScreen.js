import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import Swiper from "react-native-swiper";
import SlideUpPanel from "../../Components/SlideUpModal/SlideUpPanel";
import AvatarSection from "./Components/AvatarSection";
import RateComponent from "./Components/RateComponent";
import CallClassification from "./Components/CallClassification";
import CallTags from "./Components/CallTags";
import { openSlideMenu } from "../../Ducks/LogicReducer";
import { clearOptions, submitRateCall } from "../../Ducks/RateCallReducer";
import I18n from "../../I18n/I18n";
// Styles
import styles from "./Styles/RatingsScreenStyles";

class RatingScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      enableScroll: false,
    };
  }

  submit = () => {
    const {
      rating, thumbsUp, sessionID, submitRateCall, token, clearOptions, navigation,
    } = this.props;

    let rateInformation;

    if (thumbsUp) {
      rateInformation = {
        ...rateInformation,
        resolved: true,
      };
    } else {
      rateInformation = {
        ...rateInformation,
        resolved: false,
      };
    }

    if (rating > 0) {
      rateInformation = {
        ...rateInformation,
        stars: rating,
      };
    }
    if (sessionID) {
      submitRateCall(rateInformation, sessionID, token)
        .then((response) => {
          clearOptions();
          navigation.dispatch({ type: "Home" });
        })
        .catch((err) => {
          console.log(err);
          clearOptions();
          navigation.dispatch({ type: "Home" });
        });
    } else {
      clearOptions();
      navigation.dispatch({ type: "Home" });
    }
  };

  nextSlide = () => {
    const {
      index,
    } = this.state;

    const {
      linguistProfile,
    } = this.props;
    if (index === 0) {
      if (this.canContinue()) {
        this.swiperRef.scrollBy(1);
        this.setState({ enableScroll: true});
      }
    }

    if (index === 1) {
      if (linguistProfile) {
        this.swiperRef.scrollBy(1);
      } else {
        this.submit();
      }
    }

    if (index === 2) {
      this.submit();
    }
  };

  canContinue = () => {
    const {
      rating,
      thumbsUp,
      thumbsDown,
      linguistProfile
    } = this.props;
    if(linguistProfile)
      return rating && (thumbsUp || thumbsDown);
    return rating;
  };

  openSlideMenu = (type) => {
    const { openSlideMenu } = this.props;
    openSlideMenu({ type });
  };

  renderSwiper = () => {
    const { linguistProfile } = this.props;
    const { index, enableScroll } = this.state;
    if (linguistProfile) {
      return (
        <Swiper
          containerStyle={styles.swiperContainer}
          ref={swiperRef => this.swiperRef = swiperRef}
          index={index}
          scrollEnabled={enableScroll}
          loop={false}
          onIndexChanged={index => this.setState({ index })}
          showsPagination={false}
          showsButtons={false}
        >
          <RateComponent />
          <CallClassification />
          <CallTags openSlideMenu={this.openSlideMenu} />
        </Swiper>
      );
    }
    return (
      <Swiper
        containerStyle={styles.swiperContainer}
        ref={swiperRef => this.swiperRef = swiperRef}
        index={index}
        scrollEnabled={enableScroll}
        loop={false}
        onIndexChanged={index => this.setState({ index })}
        showsPagination={false}
        showsButtons={false}
      >
        <RateComponent />
        <CallTags openSlideMenu={this.openSlideMenu} />
      </Swiper>
    );
  };

  renderPagination = () => {
    const { linguistProfile } = this.props;
    const { index } = this.state;
    const screenNumber = linguistProfile ? 3 : 2;
    const pagination = [];
    for (let i = 0; i < screenNumber; i += 1) {
      if (i === index) {
        pagination.push(<View key={i} style={styles.selectedDot} />);
      } else {
        pagination.push(<View key={i} style={styles.baseDot} />);
      }
    }
    return pagination;
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.ratingScreenContainer}>
        <AvatarSection navigation={navigation} />
        {this.renderSwiper()}
        <View style={styles.bottomButtonContainer}>
          <View
            style={styles.paginationContainer}
          >
            {this.renderPagination()}
          </View>
          <TouchableOpacity
            style={[
              styles.baseButton,
              this.canContinue() ? styles.enabledButton : styles.disabledButton]}
            onPress={() => this.nextSlide()}
          >
            <Text
              style={[
                styles.baseButtonText,
                this.canContinue() ? styles.baseButtonTextEnabled : styles.baseButtonTextDisabled]}
            >
              {I18n.t("session.rating.submit")}
            </Text>
          </TouchableOpacity>
        </View>
        <SlideUpPanel />
      </View>
    );
  }
}

const mS = state => ({
  thumbsUp: state.rateCall.thumbsUp,
  thumbsDown: state.rateCall.thumbsDown,
  rating: state.rateCall.rating,
  linguistProfile: state.userProfile.linguistProfile,
  sessionID: state.rateCall.sessionID,
  token: state.auth.token,
});

const mD = {
  openSlideMenu,
  submitRateCall,
  clearOptions,
};

export default connect(
  mS,
  mD,
)(RatingScreen);
