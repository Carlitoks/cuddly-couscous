import React, { Component } from "react";

import { View, Text, ScrollView, Dimensions, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import BottomButton from "../../Components/BottomButton/BottomButton";

import Waves from "../../SVG/waves";
import WavesOrange from "../../SVG/wavesOrange";

import styles from "./styles";
import { Colors, Images } from "../../Themes";
import I18n from "../../I18n/I18n";

class WelcomeCustomerView extends Component {
  render() {
    const navigation = this.props.navigation;
    const { width, height } = Dimensions.get("window");
    return (
      <ViewWrapper style={styles.scrollContainer}>
        {/* SVG White Waves */}
        <View style={styles.mainContainer}>
          <View style={styles.blueContainer}>
            <LinearGradient
              colors={[
                Colors.gradientColor.top,
                Colors.gradientColor.middle,
                Colors.gradientColor.bottom
              ]}
              style={styles.linearGradient}
            />
            <View style={styles.textContainer}>
              <Text style={styles.mainTitle}>{I18n.t("welcomeTo")}</Text>
              {/* Jeenie Logo */}
              <View style={[styles.logo, styles.center]} source={Images.logo}>
                <Image source={Images.jeenieLogo} style={styles.logoImage} />
              </View>
              <Text style={styles.mainTitle}>{I18n.t("thankYou")}</Text>
              <Text style={styles.subtitle}>{I18n.t("forSignup")}</Text>
            </View>
            <View style={styles.waves}>
              <Waves
                width={width}
                height={width * 80 / 750}
                viewBox={"0 0 750 80"}
              />
            </View>
          </View>
          <View style={styles.orangeContainer}>
            <View style={styles.wavesOrange}>
              <WavesOrange
                width={width}
                height={width * 71 / 750}
                viewBox={"0 0 750 71"}
              />
            </View>
            <BottomButton
              long
              fill
              customStyle={[styles.getStarted, { marginTop: width * 71 / 750 }]}
              relative
              title={I18n.t("getLanguageHelp").toUpperCase()}
              onPress={() => navigation.dispatch({ type: "Home" })}
            />
          </View>
        </View>
      </ViewWrapper>
    );
  }
}

export default WelcomeCustomerView;
