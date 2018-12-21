import React, { Component } from "react";
import { Text, Image, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Metrics, Colors } from "../../../Themes";
import FemaleSilhouette from "./Partials/FemaleSilhouette";
import SGWaves from "./Partials/Waves";
import Questions from "./Partials/Questions";

// Styles
import styles from "./Styles/AvatarSectionStyles";

export default class AvatarSection extends Component {
  renderSections = () => {
    return (
      <View style={styles.rowView}>
        <View>
          <Questions />
        </View>
        <FemaleSilhouette />
        <SGWaves />
      </View>
    );
  };
  render() {
    return (
      <View style={[styles.mainContainer, styles.avatarSectionContainer]}>
        <LinearGradient
          colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
          locations={[0, 1]}
        >
          {this.renderSections()}
        </LinearGradient>
      </View>
    );
  }
}
