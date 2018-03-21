import React, { Component } from "react";

import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";

import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import BottomButton from "../../Components/BottomButton/BottomButton";

import Waves from "../../SVG/waves";
import WavesOrange from "../../SVG/wavesOrange";

import styles from "./styles";
import { Colors, Images } from "../../Themes";
import I18n from "../../I18n/I18n";

class WelcomeCustomerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const navigation = this.props.navigation;
    setTimeout(() => {
      this.setState({ loading: false });
      setTimeout(() => {
        navigation.dispatch({ type: "Home" });
      }, 2000);
    }, 2000);
  }
  render() {
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
          {/* Jeenie Logo */}
          <View style={[styles.logo, styles.center]} source={Images.logo}>
            <Image source={Images.jeenieLogo} style={styles.logoImage} />
          </View>
          <View style={styles.loading}>
            {this.state.loading ? (
              <ActivityIndicator
                size="large"
                color={Colors.gradientColorButton.top}
              />
            ) : (
              <Icon
                name="check-circle"
                size={140}
                color={Colors.green}
                iconStyle={styles.icon}
              />
            )}
          </View>
        </View>
      </ViewWrapper>
    );
  }
}

export default WelcomeCustomerView;
