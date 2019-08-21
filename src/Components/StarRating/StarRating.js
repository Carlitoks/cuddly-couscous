import React from "react";
import StarRating from "react-native-star-rating";
import { View } from "react-native";
import styles from "./StarRatingStyles";
import { Colors } from "../../Themes";

const StarRatingComponent = ( props ) => {
  const { rating, emptyStarColor, fullStarColor, starSize, maxStars, starColor, containerStyle } = props;
        return <View style={ containerStyle || {}}>
          <StarRating
            emptyStar={"ios-star-outline"}
            fullStar={"ios-star"}
            halfStar={"ios-star-half"}
            iconSet={"Ionicons"}
            disabled={true}
            maxStars={ maxStars || 5 }
            starSize={ starSize|| 18 }
            rating={rating || 0 }
            emptyStarColor={ emptyStarColor || Colors.emptyStarColor}
            starColor={ starColor || Colors.gradientColorButton.top}
            fullStarColor={ fullStarColor || Colors.gradientColorButton.top}
          />
        </View>;
};

export default StarRatingComponent;
