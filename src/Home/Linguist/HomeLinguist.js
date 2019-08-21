import React, { Component } from "react";
import { connect } from "react-redux";
import InCallManager from "react-native-incall-manager";
import moment from "moment";

import {
  loadUser,
  updateUserProfilePhoto,
  loadLinguistCallHistory,
  updateLinguistProfile,
} from "../../Ducks/AccountReducer";

import { incomingCallNotification } from "../../Ducks/PushNotificationReducer";

import { Alert, AppState, NetInfo, ScrollView, Text, View } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import CallHistoryComponent from "../../Components/CallHistory/CallHistory";
import _isEmpty from "lodash/isEmpty";
import _isUndefined from "lodash/isUndefined";


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
import { formatTimerSeconds } from "../../Util/Format";

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
      loading: false
    }
  }

  monitorConnectivity = connectionInfo => {
    if (connectionInfo.type !== "none") {
      this.reloadUser();
    }
  };

  // TODO: refactor to use api directly
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
    this.props.loadLinguistCallHistory(true);
    AppState.addEventListener("change", this._handleAppStateChange);
    NetInfo.addEventListener("connectionChange", this.monitorConnectivity);
    InCallManager.stop();

    this.reloadUser();

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

    this.getCurrentUnansweredCalls();
  }

  reloadUser () {
    this.setState({loading: true})
    this.props.loadUser(false).finally(() => {
      this.setState({loading: false});
    });
  }

  changeStatus (status) {
    this.setState({loading: true})
    this.props.updateLinguistProfile({available: status}).finally(() => {
      this.setState({loading: false});
    });
  }

  uploadAvatar(avatar) {
    if (avatar) {
      this.props.updateUserProfilePhoto(avatar).catch((e) => {
        Alert.alert(I18n.t("error"), translateApiError(e));
      });
    }
  }

  _handleAppStateChange = nextAppState => {
    this.reloadUser();
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.getCurrentUnansweredCalls();
    }
    this.setState({ appState: nextAppState });
  };

  selectImage = () => {
    return this.props.avatarURL
      ? {
          uri: this.props.avatarURL
        }
      : Images.avatar;
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
              customScenarioNote: !_isUndefined(item.session.customScenarioNote)
                ? item.session.customScenarioNote
                : "",
              createdAt: moment(item.session.createdAt).format(
                "MMM DD, h:mm A"
              ),
              avatarURL: item[userType].avatarURL,
              chevron: false
            };
            console.tron.log(result);
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

  calculateAmount (calls = []) {
    let seconds = 0;
    calls.forEach((call) => {
      seconds += call.duration;
    });
    return formatTimerSeconds(seconds);
  }

  render() {
    const {
      user,
      linguistProfile,
      linguistCalls
    } = this.props;

    const allCalls = this.filterAllCalls(linguistCalls, "createdBy");
    const amount = this.calculateAmount(allCalls);

    return (
      <View style={styles.scrollContainer}>
        <NavBar
          leftComponent={
            <ShowMenuButton navigation={this.props.navigation} />
          }
          navbarTitle={user.firstName + " " + user.lastName}
        />
        <WavesBackground>
          <UserAvatar
            photoSelect={avatar => this.uploadAvatar(avatar)}
            avatarSource={this.selectImage()}
            avatarHeight={150}
            bigAvatar={true}
            stars={user.averageStarRating ? user.averageStarRating : 0}
          />
          <LinguistStatus
            status={linguistProfile.available}
            switchOnChange={status => this.changeStatus(status)}
            switchValue={linguistProfile.available}
            loading={this.state.loading}
          />
        </WavesBackground>
        <CallNumber
          calls={allCalls.length}
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
  avatarURL: state.account.userAvatarURL,
  linguistCalls: state.account.linguistCallHistory,
  uuid: state.auth2.userID,
  token: state.auth2.userJwtToken,
});

const mD = {
  loadUser,
  updateUserProfilePhoto,
  updateLinguistProfile,

  loadLinguistCallHistory,
  incomingCallNotification
};

export default connect(
  mS,
  mD
)(Home);
