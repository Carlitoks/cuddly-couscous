import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../../I18n/I18n';
import { updateSettings as updateHomeFlow } from '../../../Ducks/HomeFlowReducer';
import PaymentModal from '../../../Home/Customer/PaymentModal/PaymentModal';

// Styles
import styles from './Styles/FreeMinutesWellStyles';
import ClockTime from '../../../Assets/SVG/clockTime';

class FreeMinutesWell extends Component {
  setPillColor = () => {
    const { navigation, availableMinutes, stripePaymentToken } = this.props;
    if (navigation.state.routeName === 'OnboardingView') {
      return styles.pillButtonContainer;
    }
    if (availableMinutes >= 10) {
      return styles.pillButtonContainer;
    }

    if (availableMinutes > 5 && availableMinutes < 10) {
      return { ...styles.pillButtonContainer, backgroundColor: 'orange' };
    }

    if (availableMinutes > 0 && availableMinutes <= 5) {
      return { ...styles.pillButtonContainer, backgroundColor: 'red' };
    }

    if (stripePaymentToken) {
      return {
        ...styles.pillButtonContainer,
        backgroundColor: '#ffffff'
      };
    }
    return { ...styles.pillButtonContainer, backgroundColor: 'red' };
  };

  setPillContent = () => {
    const { navigation, availableMinutes, stripePaymentToken } = this.props;
    if (navigation.state.routeName === 'OnboardingView') {
      return I18n.t('customerOnboarding.welcome');
    }
    if (availableMinutes > 0) {
      return I18n.t('customerHome.registrationWelcome.balance', {
        num: availableMinutes
      });
    }

    if (stripePaymentToken) {
      return I18n.t('costPerMinute');
    }
    return I18n.t('customerHome.registrationWelcome.balance', {
      num: availableMinutes
    });
  };

  setPillTextStyle = () => {
    const { availableMinutes, stripePaymentToken } = this.props;
    if (availableMinutes === 0) {
      if (stripePaymentToken) {
        return styles.pricingPillText;
      }
      return styles.pillButtonText;
    }
    return styles.pillButtonText;
  };

  setIconColor = () => {
    const { availableMinutes, stripePaymentToken } = this.props;
    if (availableMinutes > 0) {
      return '#fff';
    }
    if (stripePaymentToken) {
      return '#401674';
    }
    return '#fff';
  };

  renderTitle = () => {
    const { navigation } = this.props;
    if (navigation.state.routeName === 'OnboardingView') {
      return (
        <Text style={styles.wellTitle}>{I18n.t('customerHome.registrationWelcome.title')}</Text>
      );
    }
    return <React.Fragment />;
  };

  renderSubtitle = () => {
    if (this.props.navigation.state.routeName === "OnboardingView") {
      return <React.Fragment />;
    }
    if (this.props.availableMinutes === 0) {
      return (
        <Text style={styles.wellSubtitle}>
          {!!this.props.stripePaymentToken ?
            I18n.t("pricingScreen.descriptions.noMinutesHasCard") :
            I18n.t("pricingScreen.descriptions.noMinutesNoCard")
          }
        </Text>
      )
    } else {
      return <Text style={styles.wellSubtitle}>{I18n.t("customerHome.registrationWelcome.description")}</Text>
    }
    return I18n.t('customerHome.registrationWelcome.description');
  };

  onPressAction = () => {
    const { navigation, updateHomeFlow } = this.props;
    if (navigation.state.routeName === 'OnboardingView') {
      return null;
    }
    return updateHomeFlow({ displayPaymentModal: true });
  };

  renderClock = () => {
    const { navigation, availableMinutes } = this.props;
    if (navigation.state.routeName === 'OnboardingView') {
      return <React.Fragment />;
    }
    if (availableMinutes === 0) {
      return <React.Fragment />;
    }
    return <ClockTime width={17} height={17} />;
  };

  render() {
    const { navigation, updateHomeFlow, pointerEvents, displayPaymentModal } = this.props;
    return (
      <React.Fragment>
        <TouchableOpacity
          activeOpacity={pointerEvents === 'none' ? 1 : 0.2}
          onPress={() => this.onPressAction()}
          style={styles.freeMinutesWellContainer}
        >
          <View style={this.setPillColor()}>
            {this.renderClock()}
            <Text style={this.setPillTextStyle()}>{this.setPillContent()}</Text>
          </View>
          {this.renderTitle()}
          {this.renderSubtitle()}
        </TouchableOpacity>
        <PaymentModal
          visible={displayPaymentModal}
          closeModal={() => {
            updateHomeFlow({ displayPaymentModal: false });
          }}
          navigation={navigation}
        />
      </React.Fragment>
    );
  }
}

const mS = state => ({
  availableMinutes: state.userProfile.availableMinutes,
  displayPaymentModal: state.homeFlow.displayPaymentModal,
  stripePaymentToken: state.userProfile.stripePaymentToken
});

const mD = {
  updateHomeFlow
};

export default connect(
  mS,
  mD
)(FreeMinutesWell);
