import React, { Component } from "react";
import { Text, Image, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Metrics, Colors } from "../../../Themes";
import FemaleSilhouette from "./Partials/FemaleSilhouette";
import SGWaves from "./Partials/Waves";
import Questions from "./Partials/Questions";

// Styles
import styles from "./Styles/AvatarSectionStyles";
import { moderateScale } from "../../../Util/Scaling";

export default class AvatarSection extends Component {
  renderSections = () => {
    const { firstName, home } = this.props;

    return (
      <View style={[styles.columnView]}>
        <View
          style={[
            styles.rowView,
            {
              marginTop: -30,
              marginLeft: home ? moderateScale(150) : 90
            }
          ]}
        >
          <View style={{ zIndex: 10 }}>
            <Questions home={home} firstName={firstName} />
          </View>
          <FemaleSilhouette home={home} />
        </View>
        <SGWaves />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.avatarSectionContainer}>
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
