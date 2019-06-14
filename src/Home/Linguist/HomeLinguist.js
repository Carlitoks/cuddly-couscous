import React, { Component } from "react";
import { connect } from "react-redux";
import InCallManager from "react-native-incall-manager";
import {
  changeStatus,
  updateSettings,
  getCurrentAvailability
} from "../../Ducks/ProfileLinguistReducer";
import {
  asyncUploadAvatar,
  updateView,
  getProfileAsync
} from "../../Ducks/UserProfileReducer";
import { loadSessionScenarios } from "../../Ducks/AppConfigReducer";

import {
  updateUserProfilePhoto,
  loadLinguistCallHistory,
} from "../../Ducks/AccountReducer";

import { incomingCallNotification } from "../../Ducks/PushNotificationReducer";

import { Alert, AppState, NetInfo, ScrollView, Text, View } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import CallHistoryComponent from "../../Components/CallHistory/CallHistory";
import _isEmpty from "lodash/isEmpty";
import _isUndefined from "lodash/isUndefined";

import moment from "moment";

import styles from "./styles";
import { Images } from "../../Themes";
import I18n, { translateApiError } from "../../I18n/I18n";
import { Sessions } from "../../Api";
import { ensurePermissions } from "../../Util/Permission";
import { PERMISSIONS } from "../../Util/Constants";
import NavBar from "../../Components/NavBar/NavBar";
import UserAvatar from "../../Components/UserAvatar/UserAvatar";
import LinguistStatus from "../../Components/UserAvatar/LinguistStatus";
import CallNumber from "../../Components/UserAvatar/CallNumber";
import WavesBackground from "../../Components/UserAvatar/WavesBackground";

class Home extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      appState: AppState.currentState
    }
  }

  monitorConnectivity = connectionInfo => {
    if (connectionInfo.type !== "none") {
      this.props.getCurrentAvailability();
    }
  };

  getCurrentUnansweredCalls = async () => {
    const invitations = await Sessions.GetInvitations(
      this.props.uuid,
      this.props.token
    );
    if (invitations.data.length > 0) {
      const filteredCalls = await invitations.data.filter(call => !call.responded && !call.viewed);
      try {
        if (filteredCalls.length > 0) {
          const session = await Sessions.GetSessionInfoLinguist(
            filteredCalls[0].session.id,
            this.props.token
          );
          if (session.data.status === "unassigned") {
            this.props.incomingCallNotification(filteredCalls[0].id);
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
    NetInfo.removeEventListener("connectionChange", this.monitorConnectivity);
  }

  componentDidMount() {
    this.props.updateSettings({ loading: false });
    this.props.loadLinguistCallHistory(true);
    AppState.addEventListener("change", this._handleAppStateChange);
    NetInfo.addEventListener("connectionChange", this.monitorConnectivity);
    InCallManager.stop();

    // ensure linguist permissions are set
    ensurePermissions([PERMISSIONS.CAMERA, PERMISSIONS.MIC]).then((response) => {
      if (
        response[PERMISSIONS.CAMERA] !== 'authorized'
        || response[PERMISSIONS.MIC] !== 'authorized'
      ) {
        Alert.alert(
          I18n.t('notification'),
          I18n.t('acceptAllPermissionsLinguist'),
          [{text: I18n.t('actions.ok')}]
        );
      }
    })
    
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.alertCancelled
    ) {
      Alert.alert(I18n.t("notification"), I18n.t("session.incoming.cancelled"));
    }
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.alertAssigned
    ) {
      Alert.alert(I18n.t("notification"), I18n.t("session.incoming.assigned"));
    }
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.alertFail
    ) {
      Alert.alert(I18n.t("notification"), I18n.t("session.incoming.failed"));
    }

    this.props.getCurrentAvailability();
    this.getCurrentUnansweredCalls();

  }

  uploadAvatar(avatar) {
    if (avatar) {
      const { token, uuid } = this.props;
      this.props.updateUserProfilePhoto(avatar).catch((e) => {
        Alert.alert(I18n.t("error"), translateApiError(e));
      });
      // this.props.asyncUploadAvatar(uuid, avatar, token).then(response => {
      //   this.props.getProfileAsync(uuid, token).then(response => {
      //     this.props.updateView({
      //       avatarBase64: avatar,
      //       avatarURL: response.payload.avatarURL
      //     });
      //   });
      // });
    }
  }

  _handleAppStateChange = nextAppState => {
    this.props.getCurrentAvailability();
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.getCurrentUnansweredCalls();
    }
    this.setState({ appState: nextAppState });
  };

  selectImage = () => {
    let image = this.props.avatarURL
      ? {
          uri: `${this.props.avatarURL}?time=${new Date().getUTCMilliseconds()}`
        }
      : Images.avatar;
    return this.props.avatarURL
      ? {
          uri: `${this.props.avatarURL}?time=${new Date().getMilliseconds()}`
        }
      : image;
  };

  componentWillReceiveProps(nextProps) {}

  filterAllCalls = (allCalls, userType) => {
    if (!_isEmpty(allCalls)) {
      const size = allCalls.length <= 10 ? allCalls.length : 10;
      return allCalls
        .slice(0, size)
        .sort((prev, next) =>
          moment(next.session.createdAt).diff(moment(prev.session.createdAt))
        )
        .map((item, i) => {
          let result = {};
          if (!_isUndefined(item[userType]) && !_isUndefined(item.session)) {
            result = {
              key: i,
              firstName: item[userType].firstName,
              lastInitial: item[userType].lastInitial,
              primaryLangCode: item.session.primaryLangCode,
              secondaryLangCode: item.session.secondaryLangCode,
              duration: !_isUndefined(item.session.duration)
                ? item.session.duration
                : 0,
              rating: !_isUndefined(item.rating) ? item.rating.stars : "",
              category: !_isUndefined(item.session.scenario)
                ? item.session.scenario.category
                : "",
              title: !_isUndefined(item.session.scenario)
                ? item.session.scenario.title
                : "",
              createdAt: moment(item.session.createdAt).format(
                "MMM DD, h:mm A"
              ),
              avatarURL: item[userType].avatarURL,
              chevron: false
            };
          }
          return result;
        })
        .filter(item => {
          return !_isEmpty(item);
        });
    } else {
      return [];
    }
  };

  render() {
    const {
      amount,
      numberOfCalls,
      status,
      firstName,
      lastName,
      avatarURL,
      available,
      rate,
      linguistCalls
    } = this.props;

    const allCalls = this.filterAllCalls(linguistCalls, "createdBy");

    return (
      <View style={styles.scrollContainer}>
        <NavBar
          leftComponent={
            <ShowMenuButton navigation={this.props.navigation} />
          }
          navbarTitle={firstName + " " + lastName}
        />
        <WavesBackground>
          <UserAvatar
            photoSelect={avatar => this.uploadAvatar(avatar)}
            avatarSource={this.selectImage()}
            avatarHeight={150}
            bigAvatar={true}
            stars={rate ? rate : 0}
          />
          <LinguistStatus
            status={available}
            switchOnChange={status => this.props.changeStatus(status)}
            switchValue={this.props.available}
            loading={this.props.loading}
          />
        </WavesBackground>
        <CallNumber
          calls={numberOfCalls}
          amount={amount}
        />
          <Text style={styles.recentCallsTitle}>{I18n.t("recentCalls")}</Text>
          <Grid>
            <Row>
              <ScrollView
                automaticallyAdjustContentInsets={false}
                style={styles.scrollContainer}
              >
                <View style={styles.container}>
                  <CallHistoryComponent
                    data={allCalls}
                    navigation={this.props.navigation}
                  />
                </View>
              </ScrollView>
            </Row>
          </Grid>
      </View>
    );
  }
}

const mS = state => ({
  user: state.account.user,
  linguistProfile: state.account.linguistProfile,

  available: state.profileLinguist.available,
  numberOfCalls: state.profileLinguist.numberOfCalls,
  linguistCalls: state.account.linguistCallHistory,
  amount: state.profileLinguist.amount,
  status: state.profileLinguist.status,
  loading: state.profileLinguist.loading,
  uuid: state.auth2.userID,
  token: state.auth2.userJwtToken,
  firstName: state.userProfile.firstName,
  lastName: state.userProfile.lastName,
  avatarURL: state.userProfile.avatarURL,
  linguistProfile: state.userProfile.linguistProfile,
  rate: state.userProfile.averageStarRating,
  networkInfoType: state.networkInfo.type,
  nav: state.nav
});

const mD = {
  updateUserProfilePhoto,

  updateSettings,
  asyncUploadAvatar,
  updateView,
  getProfileAsync,
  changeStatus,
  loadLinguistCallHistory,
  getCurrentAvailability,
  incomingCallNotification,
  loadSessionScenarios
};

export default connect(
  mS,
  mD
)(Home);
