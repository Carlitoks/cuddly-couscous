import React, { Component } from "react";
import StarRating from "react-native-star-rating";
import { View, Text } from "react-native";
import { Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

import styles from "./styles";

const UserInfo = ({ text, rating, missedCall, abuseReported }) => {
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
            fullStarColor={"#F39100"}
          />
          </View>
        ) : missedCall ? <Text style={styles.missedCallText}>{I18n.t("history.missedCall")}</Text> : abuseReported ? <Text style={styles.notRatedText}>{I18n.t("history.abuseReported")}</Text> : <Text style={styles.notRatedText}>{I18n.t("history.notRated")}</Text>}
      </View>
  );
};

export default UserInfo;
