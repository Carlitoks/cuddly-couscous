import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StatusBar } from "react-native";
import { amplitudKey } from "../Config/env";
import HomeLinguist from "./Linguist/HomeLinguist";
import PushNotifications from "../Util/PushNotification";
import FCM, { FCMEvent } from "react-native-fcm";
import { registerFCM } from "../Ducks/PushNotificationReducer";
import { User } from "../Api";
import CustomerHomeScreenRedesign from "../Containers/CustomerHome/CustomerHomeScreen";
import { Colors } from "../Themes";
import { flushEvents } from "../Util/Forensics";

class Home extends Component {
  componentWillMount() {
    const { isLoggedIn, navigation, uuid, token, nativeLangCode } = this.props;

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
      User.updateDevice(this.props.uuid, this.props.deviceId, this.props.token, {
        notificationToken: token
      })
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
    flushEvents();
    // TODO: check for previously ended session
  }

  componentWillUnmount() {
    this.updateTokenListener.remove();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.linguistProfile ? (
          <HomeLinguist navigation={this.props.navigation} />
        ) : (
          <CustomerHomeScreenRedesign navigation={this.props.navigation} />
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
