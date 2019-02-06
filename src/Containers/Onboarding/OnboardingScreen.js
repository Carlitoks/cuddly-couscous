import React, {Component} from 'react';
import {Image, Platform, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {Colors} from '../../Themes';
import {ensureSessionDefaults, updateLocation} from '../../Ducks/NewSessionReducer';
import ViewWrapper from '../ViewWrapper/ViewWrapper';
import {clearOnboarding} from '../../Ducks/OnboardingReducer';
// Styles
import styles from './Styles/OnboardingScreenStyles';
import OnboardingButtons from './Components/OnboardingButtons';
import I18n from '../../I18n/I18n';

const JeenieLogo = require('../../Assets/Images/Landing-Jeenie-TM.png');
const backgroundImage = require('../../Assets/Images/zheng.png');

class OnboardingScreen extends Component {
  componentWillMount() {
    const {
      navigation,
      isLoggedIn,
      token,
      clearOnboarding,
      primaryLangCode,
      ensureSessionDefaults,
      secondaryLangCode,
      completedLocation,
      completedNotification
    } = this.props;
    clearOnboarding();
    ensureSessionDefaults({
      primaryLangCode: primaryLangCode || 'eng',
      secondaryLangCode: secondaryLangCode || ''
    });

    if (isLoggedIn && token) {
      if (completedLocation) {
        if (completedNotification) {
          navigation.dispatch({type: 'Home'});
        } else {
          if (Platform.OS === 'android') {
            navigation.dispatch({type: 'Home'});
          } else {
            navigation.dispatch({type: 'NotificationPermissionView'});
          }
        }
      } else {
        navigation.dispatch({type: 'LocationPermissionView'});
      }
    }
  }

  render() {
    const {navigation} = this.props;
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <View style={[styles.mainOnboardingContainer]}>
          <LinearGradient
            colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
            locations={[0, 1]}
            style={styles.gradientContainer}
          >
            <View style={styles.topLogoContainer}>
              <Image source={JeenieLogo}/>
              <Text style={styles.titleText}>{I18n.t('customerOnboarding.intro.title')}</Text>
              <Text style={styles.subtitleText}>
                {I18n.t('customerOnboarding.intro.description')}
              </Text>
            </View>
            <LinearGradient
              colors={[Colors.bottomOnboardingGradient.top, Colors.bottomOnboardingGradient.bottom]}
              locations={[0.067, 0.99]}
              style={styles.gradientFullWidth}
            >
              <View style={styles.bottomButtonsContainer}>
                <OnboardingButtons navigation={navigation}/>
              </View>
            </LinearGradient>
          </LinearGradient>
          <View style={styles.backgroundImageContainer}>
            <Image style={styles.backgroundImage} source={backgroundImage}/>
          </View>
        </View>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  primaryLangCode: state.newSessionReducer.session.primaryLangCode,
  secondaryLangCode: state.newSessionReducer.session.secondaryLangCode,
  token: state.auth.token,
  isLoggedIn: state.auth.isLoggedIn,
  completedLocation: state.onboardingReducer.completedLocation,
  completedNotification: state.onboardingReducer.completedNotification
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
