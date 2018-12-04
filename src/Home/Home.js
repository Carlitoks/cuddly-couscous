import React, { Component } from "react";
import { connect } from "react-redux";
import RNAmplitude from "react-native-amplitude-analytics";
import { amplitudKey } from "../Config/env";

import { View } from "react-native";
import HomeCustomer from "./Customer/HomeCustomer";
import HomeLinguist from "./Linguist/HomeLinguist";
import LoginView from "../Onboarding/LoginView/LoginView";
import PushNotifications from "../Util/PushNotification";
import FCM, { FCMEvent } from "react-native-fcm";
import { registerFCM } from "../Ducks/PushNotificationReducer";
import { User } from "../Api";

class Home extends Component {
  componentWillMount() {
    const { isLoggedIn, navigation, uuid, token, nativeLangCode } = this.props;

    const amplitude = new RNAmplitude(amplitudKey);
    amplitude.setUserId(uuid);

    PushNotifications.getNotificationsBackground();

    if (!isLoggedIn) {
      navigation.dispatch({ type: "LoginView" });
    }

    this.updateTokenListener = FCM.on(FCMEvent.RefreshToken, FCMtoken => {
      User.updateDevice(uuid, this.props.deviceId, token, {
        notificationToken: FCMtoken
      })
        .then(res => {
          this.props.registerFCM({ tokenFCM: FCMtoken });
        })
        .catch(error => console.log(error));
    });
  }

  updateFCMToken = () => {
    FCM.getFCMToken().then(token => {
      // save token in sever
      User.updateDevice(
        this.props.uuid,
        this.props.deviceId,
        this.props.token,
        { notificationToken: token }
      )
        .then(res => {
          this.props.registerFCM({ tokenFCM: token });
        })
        .catch(error => {
          console.log(error);
        });
    });
  };

  componentDidMount() {
    this.updateFCMToken();
  }

  componentWillUnmount() {
    this.updateTokenListener.remove();
  }

  render() {
    return (
      <View>
        {this.props.linguistProfile ? (
          <HomeLinguist navigation={this.props.navigation} />
        ) : (
          <HomeCustomer navigation={this.props.navigation} />
        )}
      </View>
    );
  }
}

const mS = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
  uuid: state.auth.uuid,
  deviceId: state.auth.deviceId,
  linguistProfile: state.userProfile.linguistProfile,
  nativeLangCode: state.userProfile.nativeLangCode
});

const mD = {
  registerFCM
};

export default connect(
  mS,
  mD
)(Home);
