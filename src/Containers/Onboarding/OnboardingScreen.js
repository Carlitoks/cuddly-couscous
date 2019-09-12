import React, { Component } from "react";
import {
  Image, Platform, Text, View, StatusBar, ScrollView
} from "react-native";
import { connect } from "react-redux";
import { clearOnboarding } from "../../Ducks/OnboardingReducer";
// Styles
import styles from "./Styles/OnboardingScreenStyles";
import OnboardingButtons from "./Components/OnboardingButtons";
import I18n, { localizePrice } from "../../I18n/I18n";
import { isIphoneXorAbove } from "../../Util/Devices";
import DotSteps from "./Components/DotSteps";
import PermissionRequestModal from "./Components/PermissionRequestModal"

const backgroundImage = () => {
  if (isIphoneXorAbove()) {
    return require("../../Assets/Images/iPhoneXintroView.png");
  }
  if (Platform.OS === "ios") {
    return require("../../Assets/Images/iPhone8introView.png");
  }
  return require("../../Assets/Images/samsunggalaxys8introView.png");
};

class OnboardingScreen extends Component {
  constructor(props) {
    super(props);
    const {
      clearOnboarding,
    } = this.props;

    this.state = {
      rate: localizePrice(props.rate),
    };
    clearOnboarding();
  }

  render() {
    const { navigation } = this.props;
    const { rate } = this.state;
    return (
      <View style={styles.wrapperContainer}>
        <ScrollView alwaysBounceVertical={false} style={styles.scroll}>
        <StatusBar
          barStyle="light-content"
          translucent
          hidden={false}
          backgroundColor="transparent"
        />
        
        <View style={[styles.mainOnboardingContainer]} collapsable={false}>
          <Image style={styles.backgroundImage} source={backgroundImage()} />
          <View style={styles.bodyContainer}>
            <View>
              <Text style={styles.titleText}>{I18n.t("newCustomerOnboarding.intro.title")}</Text>
            </View>
            <Text style={styles.subtitleText}>
              {I18n.t("newCustomerOnboarding.intro.descriptionRate", { rate })}
            </Text>
            <View>
              <OnboardingButtons navigation={navigation} />
            </View>
          </View>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const mS = state => ({
  rate: state.appConfigReducer.payAsYouGoRate,
});

const mD = {
  clearOnboarding,
};

export default connect(
  mS,
  mD,
)(OnboardingScreen);
