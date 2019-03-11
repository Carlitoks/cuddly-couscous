import React, {Component} from 'react';
import {Image, Platform, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {Colors} from '../../Themes';
import {ensureSessionDefaults, updateLocation} from '../../Ducks/NewSessionReducer';
import ViewWrapper from '../ViewWrapper/ViewWrapper';
import {clearOnboarding} from '../../Ducks/OnboardingReducer';
import Permission from 'react-native-permissions';
// Styles
import styles from './Styles/OnboardingScreenStyles';
import OnboardingButtons from './Components/OnboardingButtons';
import I18n from '../../I18n/I18n';

const JeenieLogo = require('../../Assets/Images/Landing-Jeenie-TM.png');
const backgroundImage = require('../../Assets/Images/IphonexV1.1.png');

class OnboardingScreen extends Component {
  componentWillMount = async() => {
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
          return navigation.dispatch({type: 'Home'});
        } else {
          if (Platform.OS === 'android') {
            return navigation.dispatch({type: 'Home'});
          } else {
            const NotificationPermission = await Permission.check('notification');
            if(NotificationPermission === 'undetermined'){
              return navigation.dispatch({ type: "Home" });
            }
            return navigation.dispatch({ type: "Home" });
          }
        }
      } else {
        const LocationPermission = await Permission.check('location');
        if(LocationPermission === 'undetermined'){
          return navigation.dispatch({ type: "LocationPermissionView" });
        }
        return navigation.dispatch({ type: "Home" });
      }
    }
  }

  render() {
    const {navigation} = this.props;
    return (
      <ViewWrapper style={styles.wrapperContainer}>
      <View style={[styles.mainOnboardingContainer]} collapsable={false}>
          <View style={styles.bodyContainer}>
            <View style={styles.topLogoContainer} collapsable={false}>
              <Image source={JeenieLogo}/>
            </View>
              <View style={styles.bottomButtonsContainer} collapsable={false}>
                <Text style={styles.titleText}>{I18n.t('customerOnboarding.intro.title')}</Text>
                <Text style={styles.subtitleText}>
                  {I18n.t('customerOnboarding.intro.description_onboard')}
              </Text>
                <OnboardingButtons navigation={navigation}/>
              </View>
          </View>
            <View style={styles.backgroundImageContainer} collapsable={false}>
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
