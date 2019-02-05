import React, { Component } from 'react';
import { View, Text, Image, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { Colors } from '../../Themes';
import { updateLocation, ensureSessionDefaults } from '../../Ducks/NewSessionReducer';
import { getGeolocationCoords } from '../../Util/Helpers';
import ViewWrapper from '../ViewWrapper/ViewWrapper';
import { clear as clearOnboarding } from '../../Ducks/OnboardingReducer';

// Styles
import styles from './Styles/PermissionViewStyles';
import PermissionButtons from './Components/PermissionButtons';
import I18n from '../../I18n/I18n';
import { moderateScale } from '../../Util/Scaling';

const JeenieLogo = require('../../Assets/Images/Landing-Jeenie-TM.png');

class LocationPermissionView extends Component {
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
              { Platform.OS === 'android' ? <Text style={styles.allSet}>
                {I18n.t('customerOnboarding.allSet')}
              </Text> : <React.Fragment />}
            </View>

            <View style={styles.backgroundImageContainer}>
              
            </View>

            
              <View style={styles.bottomButtonsContainer}>
              <Text style={styles.titleText}>{I18n.t('customerOnboarding.location.title')}</Text>
              <Text style={styles.subtitleText}>
                {I18n.t('customerOnboarding.location.description')}
              </Text>
                <PermissionButtons navigation={navigation} check={'Location'} />
              </View>
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
)(LocationPermissionView);
