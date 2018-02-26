import React, { Component } from "react";

import { View, Text, ScrollView, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import BottomButton from "../../Components/BottomButton/BottomButton";

import Waves from "../../SVG/waves";
import WavesOrange from "../../SVG/wavesOrange";

import styles from "./styles";
import { Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

class WelcomeCustomerView extends Component {
  render() {
    const navigation = this.props.navigation;
    const { width, height } = Dimensions.get("window");
    return (
      <ViewWrapper style={styles.scrollContainer}>
        {/* SVG White Waves */}
        <View style={styles.mainContainer}>
          <LinearGradient
            colors={[
              Colors.gradientColor.top,
              Colors.gradientColor.middle,
              Colors.gradientColor.bottom
            ]}
            style={styles.linearGradient}
          />
          <Text style={styles.mainTitle}>{I18n.t("welcomeTo")}</Text>
          <Text style={styles.appName}>
            <Text style={styles.firstLetter}>J</Text>
            EENIE
          </Text>
          <Text style={styles.mainTitle}>{I18n.t("thankYou")}</Text>
          <Text style={styles.subtitle}>{I18n.t("forSignup")}</Text>
          <View style={styles.waves}>
            <Waves
              width={width}
              height={width * 80 / 750}
              viewBox={"0 0 750 80"}
            />
          </View>

          <View style={styles.wavesOrange}>
            <WavesOrange
              width={width}
              height={width * 71 / 750}
              viewBox={"0 0 750 71"}
            />
          </View>
        </View>
        <BottomButton
          long
          fill
          customStyle={styles.getStarted}
          title={I18n.t("getStarted").toUpperCase()}
          onPress={() => navigation.dispatch({ type: "Home" })}
        />
      </ViewWrapper>
    );
  }
}

export default WelcomeCustomerView;
