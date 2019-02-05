import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { Colors } from '../../Themes';
import { updateLocation, ensureSessionDefaults } from '../../Ducks/NewSessionReducer';
import { getGeolocationCoords } from '../../Util/Helpers';
import ViewWrapper from '../ViewWrapper/ViewWrapper';
import { clear as clearOnboarding } from '../../Ducks/OnboardingReducer';
// Styles
import styles from './Styles/OnboardingScreenStyles';
import OnboardingButtons from './Components/OnboardingButtons';
import I18n from '../../I18n/I18n';

const JeenieLogo = require('../../Assets/Images/Landing-Jeenie-TM.png');
const backgroundImage = require('../../Assets/Images/zhang.png');

class OnboardingScreen extends Component {
  componentWillMount() {
    const {
      navigation,
      isLoggedIn,
      token,
      clearOnboarding,
      updateLocation,
      primaryLangCode,
      ensureSessionDefaults,
      secondaryLangCode
    } = this.props;
    clearOnboarding();
    getGeolocationCoords()
      .then(response => {
        updateLocation({
          location: [response.coords.longitude, response.coords.latitude]
        });
      })
      .catch(err => {
        console.log('GeoLocation error  ', err);
      });

    ensureSessionDefaults({
      primaryLangCode: primaryLangCode || 'eng',
      secondaryLangCode: secondaryLangCode || ''
    });
    if (isLoggedIn && token) {
      navigation.dispatch({ type: 'Home' });
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
          <LinearGradient
            colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
            locations={[0, 1]}
            style={styles.gradientContainer}
          >
            <View style={styles.topLogoContainer}>
              <Image source={JeenieLogo} />
              <Text style={styles.titleText}>{I18n.t('customerOnboarding.intro.title')}</Text>
              <Text style={styles.subtitleText}>
                {I18n.t('customerOnboarding.intro.description')}
              </Text>
            </View>

            <View style={styles.backgroundImageContainer}>
              <Image style={styles.backgroundImage} source={backgroundImage} />
            </View>

            <LinearGradient
              colors={[Colors.bottomOnboardingGradient.top, Colors.bottomOnboardingGradient.bottom]}
              locations={[0, 1]}
              style={styles.gradientFullWidht}
            >
              <View style={styles.bottomButtonsContainer}>
                <OnboardingButtons navigation={navigation} />
              </View>
            </LinearGradient>
          </LinearGradient>
        </View>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  primaryLangCode: state.newSessionReducer.session.primaryLangCode,
  secondaryLangCode: state.newSessionReducer.session.secondaryLangCode,
  token: state.auth.token,
  isLoggedIn: state.auth.isLoggedIn
});

const mD = {
  updateLocation,
  ensureSessionDefaults,
  clearOnboarding
};

export default connect(
  mS,
  mD
)(OnboardingScreen);
