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
import SilhouetteWavesBackground from "./../../../Assets/SVG/SilhouetteWavesBackground";

export default class AvatarSection extends Component {
  renderSections = () => {
    const { firstName, home } = this.props;

    return (
      <View style={[styles.columnView]}>
        <SilhouetteWavesBackground
          style={{ position: "absolute" }}
          width={375}
          height={243}
        />
        <View style={{ zIndex: 100, paddingLeft: 20, top: -200 }}>
          <Questions home={home} firstName={firstName} />
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.avatarSectionContainer}>{this.renderSections()}</View>
    );
  }
}
