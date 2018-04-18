import React, { Component } from "react";
import { connect } from "react-redux";
import StarRating from "react-native-star-rating";
import { Grid, Row, Text, View } from "react-native";
import I18n from "../../I18n/I18n";
import { updateOptions } from "../../Ducks/RateCallReducer";
import Colors from "../../Themes/Colors";
import { styles } from "./styles";

class RateExperienceStars extends Component {
  render() {
    return (
      <View style={styles.stars}>
        <Text style={styles.textQuestions}>
          {I18n.t("rateYour")}{" "}
          {this.props.linguistProfile ? I18n.t("customer") : I18n.t("linguist")}
        </Text>
        <StarRating
          emptyStar={"ios-star"}
          fullStar={"ios-star"}
          halfStar={"ios-star-half"}
          iconSet={"Ionicons"}
          disabled={false}
          rating={this.props.rating}
          selectedStar={rating => this.props.updateOptions({ rating: rating })}
          maxStars={5}
          starSize={45}
          emptyStarColor={Colors.emptyStarColor}
          fullStarColor={Colors.gradientColorButton.top}
          starColor={Colors.gradientColorButton.top}
        />
      </View>
    );
  }
}

const mS = state => ({
  rating: state.rateCall.rating,
  linguistProfile: state.userProfile.linguistProfile
});

const mD = {
  updateOptions
};
export default connect(mS, mD)(RateExperienceStars);
