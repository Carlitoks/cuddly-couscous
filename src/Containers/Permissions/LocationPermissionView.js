import React, {Component} from 'react';
import {View, Text, Image, Platform, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {Colors} from '../../Themes';
import ViewWrapper from '../ViewWrapper/ViewWrapper';
import { update as updateOnboarding } from '../../Ducks/OnboardingReducer';
import Permission from 'react-native-permissions';

// Styles
import styles from './Styles/PermissionViewStyles';
import PermissionButtons from './Components/PermissionButtons';
import I18n from '../../I18n/I18n';
import Permissions from "react-native-permissions";

const JeenieLogo = require('../../Assets/Images/Landing-Jeenie-TM.png');
const backgroundImage = require('../../Assets/Images/LocationViewBackground.png');

class LocationPermissionView extends Component {

  componentWillMount(){
    this.checkCurrentPermissions();
  }

  checkCurrentPermissions = async () => {
    const { navigation, updateOnboarding} = this.props;
    const checkPermissions = await Permissions.check('location');
    if(checkPermissions === 'authorized'){
      updateOnboarding({completedLocation: true});
      if (Platform.OS === 'android') {
        updateOnboarding({completedNotification: true});
        return navigation.dispatch({ type: 'Home' });
      } else {
        const notificationPermission = await Permission.check('notification');
        if(notificationPermission === 'undetermined'){
          return navigation.dispatch({ type: 'Home' });
        }
        return navigation.dispatch({ type: 'Home' });
      }
    }
  };

  render() {
    const {navigation} = this.props;
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
            <View style={styles.backgroundImageContainer} collapsable={false}>
              <Image style={styles.backgroundImage} source={backgroundImage}/>
            </View>
              <View style={styles.topLogoContainer}>
                <Image source={JeenieLogo}/>
                {Platform.OS === 'android' ? <Text style={styles.allSet}>
                  {I18n.t('customerOnboarding.allSet')}
                </Text> : <React.Fragment/>}
              </View>
              <View style={styles.bottomButtonsContainer}>
                <Text style={styles.titleText}>{I18n.t('customerOnboarding.location.title')}</Text>
                <Text style={styles.subtitleText}>
                  {I18n.t('customerOnboarding.location.description')}
                </Text>
                <PermissionButtons navigation={navigation} check={'Location'}/>
              </View>
        </View>
      </ViewWrapper>
    );
  }
}

const mS = state => ({});

const mD = {
  updateOnboarding
};

export default connect(
  mS,
  mD
)(LocationPermissionView);
