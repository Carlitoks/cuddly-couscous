import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import StarRating from "react-native-star-rating";
import { View, Text } from "react-native";

import Colors from "./../../Themes/Colors";
import styles from "./styles";

const UserInfo = ({ text, rating }) => {
  return (
    <View style={styles.containerText}>
      {/* Component used for call history  */}

      <Text style={styles.userName}>{text}.</Text>
      <View style={styles.containerStyle}>
        {rating ? (
          <StarRating
            emptyStar={"ios-star-outline"}
            fullStar={"ios-star"}
            halfStar={"ios-star-half"}
            iconSet={"Ionicons"}
            disabled={true}
            maxStars={5}
            starSize={18}
            rating={rating}
            emptyStarColor={Colors.emptyStarColor}
            fullStarColor={Colors.gradientColorButton.top}
          />
        ) : null}
      </View>
    </View>
  );
};

export default UserInfo;
