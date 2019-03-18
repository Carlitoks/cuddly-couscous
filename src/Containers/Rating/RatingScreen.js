import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import SlideUpPanel from "../CustomerHome/Components/Partials/SlideUpPanel";
import AvatarSection from "./Components/AvatarSection";
import RateComponent from "./Components/RateComponent";
import CallClassification from "./Components/CallClassification";
import CallTags from "./Components/CallTags";

// Styles
import styles from "./Styles/RatingsScreenStyles";
import metrics from "../../Themes/Metrics";
import Swiper from "react-native-swiper";
import reactotron from "reactotron-react-native";

class RatingScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      enableScroll: false
    };
  }

  nextSlide = () => {
    if (this.state.index === 0) {
      this.swiperRef.scrollBy(1);
      this.setState({ enableScroll: true });
    }

    if (this.state.index === 1) {
      this.swiperRef.scrollBy(2);
    }

    if (this.state.index === 2) {
      this.swiperRef.scrollBy(3);
    }

  };

  render() {
    const { firstName, navigation } = this.props;
    return (
      <View style={styles.ratingScreenContainer}>
        <AvatarSection navigation={navigation}/>
        <Swiper style={styles.swiperContainer} ref={(swiperRef) => this.swiperRef = swiperRef} index={0} scrollEnabled={this.state.enableScroll}
                loop={false} paginationStyle={styles.paginationStyle} showsButtons={false}>
            <RateComponent />
            <CallClassification />
            <CallTags />
        </Swiper>

        <View style={styles.bottomButtonContainer}>
          <Text style={styles.reportProblemText}>Report a problem by gently shaking your device</Text>
          <TouchableOpacity style={[styles.baseButton, styles.enabledButton]}
                            onPress={() => this.nextSlide()}
          >
            <Text style={[styles.baseButtonText, styles.baseButtonTextEnabled]}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
        <SlideUpPanel/>
      </View>
    );
  }
}

const mS = state => ({});

const mD = {};

export default connect(
  mS,
  mD
)(RatingScreen);
