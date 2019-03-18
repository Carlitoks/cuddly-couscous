import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import ThumbsButton from "../../../Components/ThumbsButton/ThumbsButton";
import { Colors } from "../../../Themes";
import StarRating from "react-native-star-rating";

// Styles
import styles from "./Styles/RateComponentStyles.js";

export default class RateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1,
      thumbsUp: false,
      thumbsDown: false
    };
  }

  buttonThumbs(selectedIndex) {
    if (selectedIndex === 0) {
      this.toggleThumbsUp();
    } else {
      this.toggleThumbsDown();
    }
  }

  toggleThumbsUp = () => {
    this.setState({
      thumbsUp: true,
      thumbsDown: false
    });
  };

  toggleThumbsDown = () => {
    this.setState({
      thumbsUp: false,
      thumbsDown: true
    });
  };

  render() {
    return <ScrollView contentContainerStyle={styles.flexEndCenter}>
      <Text style={styles.baseText}>Rate Your Customer</Text>
      <StarRating
        emptyStar={"ios-star"}
        fullStar={"ios-star"}
        halfStar={"ios-star-half"}
        iconSet={"Ionicons"}
        disabled={false}
        rating={this.state.rating}
        selectedStar={rating => this.setState({ rating })}
        maxStars={5}
        starSize={60}
        emptyStarColor={Colors.emptyStarColor}
        fullStarColor={Colors.gradientColorButton.top}
        starColor={Colors.gradientColorButton.top}
        containerStyle={styles.starRatingPadding}
      />
      <Text style={styles.baseText}>Was your issue resolved?</Text>
      <View style={styles.thumbsContainer}>
        <ThumbsButton
          IconName="ios-thumbs-up"
          StateIcon={this.state.thumbsUp}
          onPress={() => this.buttonThumbs(0)}
          color={Colors.gradientColorButton.middle}
        />
        <View style={styles.thumbsPadding}/>
        <ThumbsButton
          IconName="ios-thumbs-down"
          StateIcon={this.state.thumbsDown}
          onPress={() => this.buttonThumbs(1)}
          color={Colors.gradientColorButton.middle}
        />
      </View>
    </ScrollView>;
  }
}
