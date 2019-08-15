import React, { Component } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import Swiper from "react-native-swiper";
import SlideUpPanel from "../../Components/SlideUpModal/SlideUpPanel";
import AvatarSection from "./Components/AvatarSection";
import RateComponent from "./Components/RateComponent";
import CallClassification from "./Components/CallClassification";
import CallTags from "./Components/CallTags";
import { openSlideMenu } from "../../Ducks/LogicReducer";
import I18n, { translateApiError } from "../../I18n/I18n";
// Styles
import styles from "./Styles/RatingsScreenStyles";
import { Sessions } from "../../Api";

const WhatWasGood = [];
const WhatCouldBetter = [];

class RatingScreen extends Component {
  constructor(props) {
    super(props);
    const { session, user, isLinguist, token } = props.navigation.state.params;
    this.state = {
      index: 0,
      enableScroll: false,
      rating: 0,
      session,
      user,
      token,
      linguistProfile: isLinguist ,
      customerName: `${user.firstName}` ,
      avatarURL: user.avatarURL,
      comment: "",
      thumbsUp: false,
      thumbsDown: false,
      scenarioID: null,
      scenarioNote: "",
      callType: "",

      // States for icons that belong to What was Good question
      iconWaitTimeFirstList: false,
      iconProfessionalismFirstList: false,
      iconFriendlinessFirstList: false,
      iconLanguageAbilityFirstList: false,
      iconUnderstandFirstList: false,
      iconAudioQualityFirstList: false,

      // States for icons that belong to What could be better
      iconWaitTimeSecondList: false,
      iconProfessionalismSecondList: false,
      iconFriendlinessSecondList: false,
      iconLanguageAbilitySecondList: false,
      iconUnderstandSecondList: false,
      iconConnectionSecondList: false,
      iconBackgroundNoiseSecondList: false,
      iconVoiceClaritySecondList: false,
      iconDistractionsSecondList: false,

      // loading status for button
      submitting: false,
    };

    // double tap prevention
    this.submitting = false;
  }

  submitRateCall = async (RateInformationData) => {
    const {
      comment,
      callType,
      scenarioID,
      scenarioNote,
      token,
      session,
    } = this.state;
    const RateInformation = {
      ...RateInformationData,
      negativeFlags: WhatCouldBetter.filter((item, i, ar) => ar.indexOf(item) === i),
      positiveFlags: WhatWasGood.filter((item, i, ar) => ar.indexOf(item) === i),
      comment,
      callType,
      scenarioID,
      scenarioNote,
    };

    try {
      return await Sessions.RatingSession(
        RateInformation,
        session.id,
        token,
      );
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };

  submit = () => {
    const { navigation } = this.props;

    const {
      rating, thumbsUp,
    } = this.state;

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

    // return early if no session for whatever reason
    if (!this.state.session) {
      navigation.dispatch({ type: "Home" });
      return;
    }


    // prevent double taps
    if (this.submitting) {
      return;
    }
    this.submitting = true;
    this.setState({submitting: true});
    this.submitRateCall(rateInformation)
      .then((response) => {
        navigation.dispatch({ type: "Home" });
      })
      .catch((err) => {
        this.submitting = false;
        this.setState({submitting: false}, () => {
          // TODO: once the app is updated to allow setting ratings
          // from other places, actually alert the error here
          // to let them retry the submission, or continue to home.
          //
          // ignoring the error here is a temporary solution
          navigation.dispatch({ type: "Home" });
        });
      });
  };

  nextSlide = () => {
    const {
      index,
    } = this.state;

    const {
      linguistProfile,
    } = this.state;
    if (index === 0) {
      this.swiperRef.scrollBy(1);
      this.setState({ enableScroll: true });
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
      callType,
      scenarioID,
      linguistProfile,
    } = this.state;

    if (linguistProfile) {
      if (callType === "help") return rating > 0 && callType && scenarioID && (thumbsUp || thumbsDown);
      return rating > 0 && callType && (thumbsUp || thumbsDown);
    }
    return rating > 0;
  };

  openSlideMenu = (type) => {
    const { openSlideMenu } = this.props;
    openSlideMenu({ type });
  };

  setRating = (rating) => {
    this.setState({ rating });
  };

  setThumbs = (Thumbs) => {
    if (Thumbs === "up") {
      this.setState({ thumbsUp: true, thumbsDown: false });
    } else {
      this.setState({ thumbsUp: false, thumbsDown: true });
    }
  };

  setCallType = (callType) => {
    if (callType === "help") return this.setState({ callType, scenarioID: null });
    return this.setState({ callType });
  };

  setScenarioID = (scenarioID) => {
    this.setState({ scenarioID });
  };

  setScenarioNote = (scenarioNote) => {
    this.setState({ scenarioNote });
  };

  setRatingComments = (ratingComments) => {
    this.setState({ comment: ratingComments });
  };

  UpdateFlags = (
    IconName,
    IconState,
    action,
    selected,
    OffState,
    Key,
  ) => {
    switch (action) {
      case "positiveFlags": {
        if (selected) {
          WhatWasGood.push(Key);
          const index = WhatCouldBetter.indexOf(Key);
          if (index !== -1) {
            WhatCouldBetter.splice(index, 1);
          }
          this.setState(OffState);
          this.setState(IconState);
        } else {
          const index = WhatWasGood.indexOf(Key);
          if (index !== -1) {
            WhatWasGood.splice(index, 1);
          }
          this.setState(IconState);
        }
        break;
      }

      case "negativeFlags": {
        if (selected) {
          WhatCouldBetter.push(Key);
          this.setState(IconState);
          this.setState(OffState);
          const index = WhatWasGood.indexOf(Key);
          if (index !== -1) {
            WhatWasGood.splice(index, 1);
          }
        } else {
          const index = WhatCouldBetter.indexOf(Key);
          if (index !== -1) {
            WhatCouldBetter.splice(index, 1);
          }
          this.setState(IconState);
        }
        break;
      }
    }
  };

  renderSwiper = () => {
    const {
      index,
      enableScroll,
      linguistProfile,
      rating,
      thumbsUp,
      thumbsDown,
      scenarioNote,
      callType,
      scenarioID,
      iconWaitTimeFirstList,
      iconProfessionalismFirstList,
      iconFriendlinessFirstList,
      iconLanguageAbilityFirstList,
      iconUnderstandFirstList,
      iconAudioQualityFirstList,
      iconWaitTimeSecondList,
      iconProfessionalismSecondList,
      iconFriendlinessSecondList,
      iconLanguageAbilitySecondList,
      iconUnderstandSecondList,
      iconConnectionSecondList,
      iconBackgroundNoiseSecondList,
      iconVoiceClaritySecondList,
      iconDistractionsSecondList,
      comment,
    } = this.state;
    const { openSlideMenu } = this.props;
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
          <RateComponent
            rating={rating}
            thumbsUp={thumbsUp}
            thumbsDown={thumbsDown}
            setRating={this.setRating}
            setThumbs={this.setThumbs}
            linguistProfile={linguistProfile}
            nextSlide={this.nextSlide}
          />
          <CallClassification
            setCallType={this.setCallType}
            openSlideMenu={openSlideMenu}
            scenarioNote={scenarioNote}
            callType={callType}
            scenarioID={scenarioID}
            linguistProfile={linguistProfile}
          />
          <CallTags
            linguistProfile={linguistProfile}
            openSlideMenu={this.openSlideMenu}
            iconWaitTimeFirstList={iconWaitTimeFirstList}
            iconProfessionalismFirstList={iconProfessionalismFirstList}
            iconFriendlinessFirstList={iconFriendlinessFirstList}
            iconLanguageAbilityFirstList={iconLanguageAbilityFirstList}
            iconUnderstandFirstList={iconUnderstandFirstList}
            iconAudioQualityFirstList={iconAudioQualityFirstList}
            iconWaitTimeSecondList={iconWaitTimeSecondList}
            iconProfessionalismSecondList={iconProfessionalismSecondList}
            iconFriendlinessSecondList={iconFriendlinessSecondList}
            iconLanguageAbilitySecondList={iconLanguageAbilitySecondList}
            iconUnderstandSecondList={iconUnderstandSecondList}
            iconConnectionSecondList={iconConnectionSecondList}
            iconBackgroundNoiseSecondList={iconBackgroundNoiseSecondList}
            iconVoiceClaritySecondList={iconVoiceClaritySecondList}
            iconDistractionsSecondList={iconDistractionsSecondList}
            UpdateFlags={this.UpdateFlags}
            ratingComments={comment}
            rating={rating}
          />
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
        <RateComponent
          rating={rating}
          thumbsUp={thumbsUp}
          thumbsDown={thumbsDown}
          setRating={this.setRating}
          setThumbs={this.setThumbs}
          nextSlide={this.nextSlide}
          linguistProfile={linguistProfile}
        />
        <CallTags
          linguistProfile={linguistProfile}
          openSlideMenu={this.openSlideMenu}
          iconWaitTimeFirstList={iconWaitTimeFirstList}
          iconProfessionalismFirstList={iconProfessionalismFirstList}
          iconFriendlinessFirstList={iconFriendlinessFirstList}
          iconLanguageAbilityFirstList={iconLanguageAbilityFirstList}
          iconUnderstandFirstList={iconUnderstandFirstList}
          iconAudioQualityFirstList={iconAudioQualityFirstList}
          iconWaitTimeSecondList={iconWaitTimeSecondList}
          iconProfessionalismSecondList={iconProfessionalismSecondList}
          iconFriendlinessSecondList={iconFriendlinessSecondList}
          iconLanguageAbilitySecondList={iconLanguageAbilitySecondList}
          iconUnderstandSecondList={iconUnderstandSecondList}
          iconConnectionSecondList={iconConnectionSecondList}
          iconBackgroundNoiseSecondList={iconBackgroundNoiseSecondList}
          iconVoiceClaritySecondList={iconVoiceClaritySecondList}
          iconDistractionsSecondList={iconDistractionsSecondList}
          UpdateFlags={this.UpdateFlags}
          ratingComments={comment}
          rating={rating}
        />
      </Swiper>
    );
  };

  renderPagination = () => {
    const { linguistProfile } = this.state;
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

  isLastSection = () => {
    const { linguistProfile } = this.state;
    const {
      index,
    } = this.state;
    if (!linguistProfile && index === 1) {
      return true;
    }
    if (index === 2) {
      return true;
    }
    return false;
  };

  render() {
    const { navigation } = this.props;
    const {
      customerName, avatarURL, comment, scenarioNote, submitting,
    } = this.state;
    return (
      <View style={styles.ratingScreenContainer}>
        <AvatarSection
          avatarURL={avatarURL}
          customerName={customerName}
          navigation={navigation}
        />
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
            disabled={submitting || !this.canContinue()}
            onPress={() => this.nextSlide()}
          >
            {submitting && (<ActivityIndicator color="#ffffff" />)}
            {!submitting && (
            <Text
              style={[
                styles.baseButtonText,
                this.canContinue() ? styles.baseButtonTextEnabled : styles.baseButtonTextDisabled]}
            >
              {this.isLastSection() ? I18n.t("actions.submit") : I18n.t("actions.next") }
            </Text>
            )}
          </TouchableOpacity>
        </View>
        <SlideUpPanel
          scenarioNote={scenarioNote}
          setScenarioNote={this.setScenarioNote}
          setScenarioID={this.setScenarioID}
          ratingComments={comment}
          setRatingComments={this.setRatingComments}
        />
      </View>
    );
  }
}

const mS = state => ({});

const mD = {
  openSlideMenu,
};

export default connect(
  mS,
  mD,
)(RatingScreen);