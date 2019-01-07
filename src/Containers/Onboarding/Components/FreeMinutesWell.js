import React, { Component } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import I18n from "../../../I18n/I18n";
import { updateSettings as updateHomeFlow } from "../../../Ducks/HomeFlowReducer";
import PaymentModal from "../../../Home/Customer/PaymentModal/PaymentModal";

// Styles
import styles from "./Styles/FreeMinutesWellStyles";
import ClockTime from "./../../../Assets/SVG/clockTime";

class FreeMinutesWell extends Component {
  constructor(props) {
    super(props);
  }

  setPillColor = () => {
    if (this.props.navigation.state.routeName === "OnboardingView") {
      return styles.pillButtonContainer;
    }
    if (this.props.availableMinutes >= 10) {
      return styles.pillButtonContainer;
    }

    if (this.props.availableMinutes > 5 && this.props.availableMinutes < 10) {
      return { ...styles.pillButtonContainer, backgroundColor: "orange" };
    }

    if (this.props.availableMinutes > 0 && this.props.availableMinutes <= 5) {
      return { ...styles.pillButtonContainer, backgroundColor: "red" };
    }

    if (this.props.stripePaymentToken) {
      return {
        ...styles.pillButtonContainer,
        backgroundColor: "red"
      };
    } else {
      return { ...styles.pillButtonContainer, backgroundColor: "red" };
    }
  };

  setPillContent = () => {
    if (this.props.navigation.state.routeName === "OnboardingView") {
      return I18n.t("customerHome.registrationWelcome.onboardingTitle");
    }
    return I18n.t("customerHome.registrationWelcome.balance", {
      num: this.props.availableMinutes
    });
  };

  setPillTextStyle = () => {
    return styles.pillButtonText;
  };

  setIconColor = () => {
    return "#fff";
  };

  renderTitle = () => {
    if (this.props.navigation.state.routeName === "OnboardingView") {
      return (
        <Text style={styles.wellTitle}>
          {I18n.t("customerHome.registrationWelcome.title")}
        </Text>
      );
    } else {
      return <React.Fragment />;
    }
  };

  renderSubtitle = () => {
    if (this.props.availableMinutes === 0) {
      if (this.props.stripePaymentToken) {
        return I18n.t("pricingScreen.descriptions.noMinutesHasCard");
      } else {
        return I18n.t("pricingScreen.descriptions.noMinutesNoCard");
      }
    } else {
      return I18n.t("customerHome.registrationWelcome.description");
    }
  };

  onPressAction = () => {
    if (this.props.navigation.state.routeName === "OnboardingView") {
      return null;
    } else {
      return this.props.updateHomeFlow({ displayPaymentModal: true });
    }
  };
  render() {
    return (
      <React.Fragment>
        <TouchableOpacity
          activeOpacity={this.props.pointerEvents === "none" ? 1 : 0.2}
          onPress={() => this.onPressAction()}
          style={
            this.props.navigation.state.routeName === "OnboardingView"
              ? styles.freeMinutesWellContainer
              : styles.freeMinutesWellContainerHome
          }
        >
          <View style={this.setPillColor()}>
            <ClockTime width={17} height={17} />
            <Text style={this.setPillTextStyle()}>{this.setPillContent()}</Text>
          </View>
          {this.renderTitle()}
          <Text style={styles.wellSubtitle}>{this.renderSubtitle()}</Text>
        </TouchableOpacity>
        <PaymentModal
          visible={this.props.displayPaymentModal}
          closeModal={() => {
            this.props.updateHomeFlow({ displayPaymentModal: false });
          }}
          navigation={this.props.navigation}
        />
      </React.Fragment>
    );
  }
}

const mS = state => ({
  availableMinutes: state.userProfile.availableMinutes,
  displayPaymentModal: state.homeFlow.displayPaymentModal,
  stripePaymentToken: state.userProfile.stripePaymentToken,
});

const mD = {
  updateHomeFlow
};

export default connect(
  mS,
  mD
)(FreeMinutesWell);
