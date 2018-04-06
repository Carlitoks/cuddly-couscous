import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  ActivityIndicator
} from "react-native";
import { clearForm } from "../../Ducks/RegistrationCustomerReducer";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import BottomButton from "../../Components/BottomButton/BottomButton";

import Waves from "../../SVG/waves";
import WavesOrange from "../../SVG/wavesOrange";
import { SkypeIndicator } from "react-native-indicators";

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

  componentWillUnmount() {
    this.props.clearForm();
  }

  render() {
    const { width, height } = Dimensions.get("window");
    const { firstname } = this.props;
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
          <Text style={styles.subtitle}>
            {I18n.t("niceToMeetYou")}
            {firstname}!
          </Text>
          <View style={styles.loading}>
            {this.state.loading ? (
              <SkypeIndicator size={100} color="white" />
            ) : (
              <Icon
                name="ios-checkmark-circle-outline"
                size={120}
                color={Colors.white}
              />
            )}
          </View>
        </View>
      </ViewWrapper>
    );
  }
}

const mD = {
  clearForm
};

const mS = state => ({
  firstname: state.registrationCustomer.firstname
});

export default connect(mS, mD)(WelcomeCustomerView);
