import React, { Component } from "react";
import { ScrollView, Text, View } from "react-native";
import { connect } from "react-redux";
import StarRating from "react-native-star-rating";
import ThumbsButton from "../../../Components/ThumbsButton/ThumbsButton";
import { Colors } from "../../../Themes";
import { updateOptions } from "../../../Ducks/RateCallReducer";
import I18n from "../../../I18n/I18n";
// Styles
import styles from "./Styles/RateComponentStyles";
import { moderateScaleViewports } from "../../../Util/Scaling";

class RateComponent extends Component {
  togglethumbsUp = () => {
    const { updateOptions } = this.props;
    updateOptions({
      thumbsUp: true,
      thumbsDown: false,
    });
  };

  togglethumbsDown = () => {
    const { updateOptions } = this.props;
    updateOptions({
      thumbsDown: true,
      thumbsUp: false,
    });
  };

  buttonThumbs = async (selectedIndex) => {
    if (selectedIndex === 0) {
      await this.togglethumbsUp();
    } else {
      await this.togglethumbsDown();
    }
    this.goToNextSlide();
  };

  renderThumbsComponents = () => {
    const {
      linguistProfile, thumbsUp, thumbsDown,
    } = this.props;
    return (<React.Fragment>
      <Text style={styles.baseText}>
        {
          linguistProfile ? I18n.t("session.rating.resolvedLinguist") : I18n.t("session.rating.resolvedCustomer")
        }
      </Text>
      <View style={styles.thumbsContainer}>
        <ThumbsButton
          IconName="ios-thumbs-up"
          StateIcon={thumbsUp}
          onPress={() => this.buttonThumbs(0)}
          color={Colors.gradientColorButton.middle}
          size={moderateScaleViewports(60)}
        />
        <View style={styles.thumbsPadding} />
        <ThumbsButton
          IconName="ios-thumbs-down"
          StateIcon={thumbsDown}
          onPress={() => this.buttonThumbs(1)}
          color={Colors.gradientColorButton.middle}
          size={moderateScaleViewports(60)}
        />
      </View>
    </React.Fragment>);
  };

  goToNextSlide = () => {
    const { linguistProfile, thumbsUp, thumbsDown, nextSlide, rating } = this.props;
    if (linguistProfile) {
      if (rating > 0 && (thumbsDown || thumbsUp)) {
        return nextSlide();
      }
    } else {
      if (rating > 0) {
        return nextSlide();
      }
    }
    return null;
  };

  render() {
    const {
      linguistProfile, rating, updateOptions,
    } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.flexEndCenter}>
        <Text style={styles.baseText}>
          {linguistProfile ? I18n.t("session.rating.rateCustomer") : I18n.t("session.rating.rateLinguist")}
        </Text>
        <StarRating
          emptyStar="ios-star"
          fullStar="ios-star"
          halfStar="ios-star-half"
          iconSet="Ionicons"
          disabled={false}
          rating={rating}
          selectedStar={async (rating) => { await updateOptions({ rating }); this.goToNextSlide(); }}
          maxStars={5}
          starSize={moderateScaleViewports(60)}
          emptyStarColor={Colors.emptyStarColor}
          fullStarColor={Colors.gradientColorButton.top}
          starColor={Colors.gradientColorButton.top}
          containerStyle={styles.starRatingPadding}
        />
        { linguistProfile && this.renderThumbsComponents() }
      </ScrollView>
    );
  }
}

const mS = state => ({
  thumbsUp: state.rateCall.thumbsUp,
  thumbsDown: state.rateCall.thumbsDown,
  rating: state.rateCall.rating,
});

const mD = { updateOptions };
export default connect(mS, mD)(RateComponent);
