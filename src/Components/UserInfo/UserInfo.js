import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import StarRating from "react-native-star-rating";
import { View, Text } from "react-native";
import { Colors } from "../../Themes";

import styles from "./styles";

const UserInfo = ({ text, rating, missedCall }) => {
  return (
      <View style={styles.containerStyle}>
        <Text style={styles.userName}>{text.split(' undefined')[0]}.</Text>
        {rating ? (
          <View style={styles.stars}>
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
            starColor={Colors.gradientColorButton.top}
            fullStarColor={Colors.gradientColorButton.top}
          />
          </View>
        ) : missedCall ? <Text style={styles.missedCallText}>Missed Call</Text> : <Text style={styles.notRatedText}>Not Rated</Text>}
      </View>
  );
};

export default UserInfo;
