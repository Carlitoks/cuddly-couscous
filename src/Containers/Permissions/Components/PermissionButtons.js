import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import Permissions from 'react-native-permissions';
import Reactotron from 'reactotron-react-native';
import { getGeolocationCoords } from '../../../Util/Helpers';
import { updateLocation } from '../../../Ducks/NewSessionReducer';

// Styles
import styles from './Styles/PermissionButtonsStyles';
import I18n from '../../../I18n/I18n';

class PermissionButtons extends Component {
  propmtPermission = async permission => {
    const { navigation, updateLocation } = this.props;
    const currentState = await Permissions.check(`${permission}`);
    Reactotron.log(currentState);
    if (
      currentState === 'denied' ||
      currentState === 'restricted' ||
      currentState === 'undetermined'
    ) {
      const resquestedPermission = await Permissions.request(`${permission}`);
      if (resquestedPermission === 'granted') {
        getGeolocationCoords()
          .then(response => {
            updateLocation({
              location: [response.coords.longitude, response.coords.latitude]
            });
          })
          .catch(err => {
            console.log('GeoLocation error  ', err);
          });

        if (permission === 'location') {
          if (Platform.OS === 'android') {
            navigation.dispatch({ type: 'Home' });
          } else {
            navigation.dispatch({ type: 'NotificationPermissionView' });
          }
        }
        if (permission === 'notification') {
            navigation.dispatch({ type: 'Home' });
        }
      }
    } else {
      if (permission === 'location') {
        if (Platform.OS === 'android') {
          navigation.dispatch({ type: 'Home' });
        } else {
          navigation.dispatch({ type: 'NotificationPermissionView' });
        }
      }
      if (permission === 'notification') {
        navigation.dispatch({ type: 'Home' });
    }
    }
  };

  checkPermission = async () => {
    const { check, navigation } = this.props;
    Reactotron.log(check);
    if (check === 'Location') {
      await this.propmtPermission('location');
    }

    if (check === 'Notification') {
      await this.propmtPermission('notification');
    }

    if (check === 'CameraMic') {
      await this.propmtPermission('camera');
      await this.propmtPermission('microphone');
      checkPermissions = await Permissions.checkMultiple(['camera', 'microphone']);
      Reactotron.log(checkPermissions);
      if(checkPermissions.camera === 'authorized' && checkPermissions.microphone === 'authorized'){
        navigation.dispatch({ type: 'Home' });
      }
    }
  };

  renderTitle = () => {
    const { check } = this.props;
    if (check === 'Location') {
      return I18n.t('customerOnboarding.location.button');
    }

    if (check === 'Notification') {
      return I18n.t('customerOnboarding.notification.button');
    }

    if (check === 'CameraMic') {
      return I18n.t('customerHome.sessionPermissions.button');
    }
  };

  renderSubButton = () => {
    const { check } = this.props;
    if (check != 'CameraMic') {
      return I18n.t('customerOnboarding.location.skip');
    }
    return I18n.t('customerHome.sessionPermissions.back');
  };

  render() {
    const { navigation, check } = this.props;
    const style = this.props.style || {};
    return (
      <View style={[styles.permissionButtonsContainer, ...style]}>
        <View style={styles.checkPermissionContainer}>
          <TouchableOpacity
            onPress={() => this.checkPermission()}
            style={styles.checkPermissionButton}
          >
            <Text style={styles.checkPermissionButtonText}>{this.renderTitle()}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.skipButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.dispatch({ type: 'LoginScreen' })}
            style={styles.skipButton}
          >
            <Text style={styles.skipButtonText}>{this.renderSubButton()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mS = state => ({});

const mD = {
  updateLocation
};

export default connect(
  mS,
  mD
)(PermissionButtons);
