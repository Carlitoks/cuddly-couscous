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

  buttonThumbs(selectedIndex) {
    if (selectedIndex === 0) {
      this.togglethumbsUp();
    } else {
      this.togglethumbsDown();
    }
  }

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
        />
        <View style={styles.thumbsPadding} />
        <ThumbsButton
          IconName="ios-thumbs-down"
          StateIcon={thumbsDown}
          onPress={() => this.buttonThumbs(1)}
          color={Colors.gradientColorButton.middle}
        />
      </View>
    </React.Fragment>);
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
          selectedStar={rating => updateOptions({ rating })}
          maxStars={5}
          starSize={60}
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
  linguistProfile: state.userProfile.linguistProfile,
});

const mD = { updateOptions };
export default connect(mS, mD)(RateComponent);
