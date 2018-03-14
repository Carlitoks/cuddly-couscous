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
    <TouchableOpacity
      activeOpacity={1}
      style={styles.slideInnerContainer}
      onPress={onPress}
    >
      <Image
        style={[styles.image, styles.roundedCorners]}
        source={Images[data]}
        resizeMode="contain"
        borderRadius={10}
      />
      <View
        style={[
          styles.slideItemTextContainer,
          title === I18n.t("qr") ? null : styles.orangeBackground
        ]}
      >
        <Text style={[styles.slideItemText]}>{title.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CarouselEntry;
