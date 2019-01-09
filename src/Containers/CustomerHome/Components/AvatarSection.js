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
import { Iphone5 } from "../../../Util/Devices";
import SilhouetteWavesBackground from "./../../../Assets/SVG/SilhouetteWavesBackground";
import metrics from "./../../../Themes/Metrics";
import FreeMinutesWell from "../../Onboarding/Components/FreeMinutesWell";
export default class AvatarSection extends Component {
  renderSections = () => {
    const { firstName, home, pointerEvents, navigation } = this.props;

    return (
      <View style={[styles.columnView]}>
        <SilhouetteWavesBackground
          style={{ position: "absolute" }}
          width={metrics.width}
          height={Iphone5 ? 200 : 233}
        />
        <View
          style={{
            zIndex: 100,
            paddingLeft: 20,
            top: -200
          }}
        >
          <Questions home={home} firstName={firstName} />
        </View>
        <FreeMinutesWell
          pointerEvents={pointerEvents}
          navigation={navigation}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.avatarSectionContainer}>{this.renderSections()}</View>
    );
  }
}
