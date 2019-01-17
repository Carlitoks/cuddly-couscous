import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import LinguistHeader from '../CustomerHome/Components/Header';
import AvatarSection from '../CustomerHome/Components/AvatarSection';
import CallSection from '../CustomerHome/Components/CallSection';
import { Colors } from '../../Themes';
import SlideUpPanel from '../CustomerHome/Components/Partials/SlideUpPanel';
import {
  openSlideMenu,
  updateLocation,
  ensureSessionDefaults
} from '../../Ducks/NewSessionReducer';
import { getGeolocationCoords } from '../../Util/Helpers';
import ViewWrapper from '../ViewWrapper/ViewWrapper';
import { clear as clearOnboarding } from '../../Ducks/OnboardingReducer';

// Styles
import styles from './Styles/OnboardingScreenStyles';
import OnboardingButtons from './Components/OnboardingButtons';

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

  openSlideMenu = type => {
    const { openSlideMenu } = this.props;
    openSlideMenu({ type });
  };

  render() {
    const { navigation } = this.props;
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
          <LinearGradient
            colors={[Colors.gradientColor.top, Colors.gradientColor.bottom]}
            locations={[0, 1]}
            style={styles.heightFull}
          >
            <LinguistHeader type="onboarding" navigation={navigation} />
            <ScrollView
              automaticallyAdjustContentInsets
              alwaysBounceVertical={false}
              contentContainerStyle={styles.scrollViewFlex}
            >
              <View style={styles.bottomContainer}>
                <AvatarSection pointerEvents="none" navigation={navigation} />

                <CallSection
                  navigation={navigation}
                  openSlideMenu={this.openSlideMenu}
                  type="onboarding"
                />
              </View>
              <OnboardingButtons navigation={navigation} />
            </ScrollView>
            <SlideUpPanel />
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
  openSlideMenu,
  updateLocation,
  ensureSessionDefaults,
  clearOnboarding
};

export default connect(
  mS,
  mD
)(OnboardingScreen);
