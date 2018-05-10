import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PropTypes from "prop-types";
import { ParallaxImage } from "react-native-snap-carousel";
import styles from "./styles";
import { Images, Colors } from "../../Themes";
import LinearGradient from "react-native-linear-gradient";
import I18n from "../../I18n/I18n";

import { moderateScale, verticalScale, scale } from "../../Util/Scaling";

const CarouselEntry = ({ data, mapper, onPress }) => {
  const title = mapper ? mapper(data) : data;

  return (
    <View style={styles.carouselItemWrapper}>
      <Text style={styles.slideItemTextContainer}>{title}</Text>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.sliderInnerContainer}
        onPress={onPress}
      >
        <Image
          style={[styles.image, styles.roundedCorners]}
          source={Images[data]}
          borderRadius={3}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CarouselEntry;
