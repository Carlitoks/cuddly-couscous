import React, { Component } from "react";
import { connect } from "react-redux";
import InCallManager from "react-native-incall-manager";
import {
  changeStatus,
  updateSettings,
  asyncGetAccountInformation,
  getCurrentAvailability
} from "../../Ducks/ProfileLinguistReducer";
import {
  asyncUploadAvatar,
  updateView,
  getProfileAsync
} from "../../Ducks/UserProfileReducer";

import { incomingCallNotification } from "../../Ducks/PushNotificationReducer";

import { View, Text, ScrollView, Alert, AppState, NetInfo } from "react-native";
import { Row, Grid } from "react-native-easy-grid";
import timer from "react-native-timer";
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import HeaderView from "../../Components/HeaderView/HeaderView";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import CallHistoryComponent from "../../Components/CallHistory/CallHistory";
import {
  clear,
  update as updateActiveSession
} from "../../Ducks/ActiveSessionReducer";
import _isEmpty from "lodash/isEmpty";
import _isUndefined from "lodash/isUndefined";
import {
  asyncGetInvitationDetail,
  clearSettings
} from "../../Ducks/CallLinguistSettings";

import moment from "moment";

import styles from "./styles";
import { Images } from "../../Themes";
import I18n from "../../I18n/I18n";
import { checkForAllPermissions } from "../../Util/Permission";
import { Sessions } from "../../Api";

class Home extends Component {
  navigate = this.props.navigation.navigate;

  state = {
    appState: AppState.currentState
  };

  componentWillMount() {
    this.props.updateSettings({ loading: false });
    timer.clearInterval("timer");
    timer.clearInterval("counterId");
    this.props.clear();
    this.props.asyncGetAccountInformation();
    AppState.addEventListener("change", this._handleAppStateChange);
    NetInfo.addEventListener("connectionChange", this.monitorConnectivity);
    InCallManager.stop();
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

    checkForAllPermissions(valueToUpdate => {
      this.props.updateActiveSession(valueToUpdate);
    });
  }

  uploadAvatar(avatar) {
    if (avatar) {
      const { token, uuid } = this.props;
      this.props.asyncUploadAvatar(uuid, avatar, token).then(response => {
        this.props.getProfileAsync(uuid, token).then(response => {
          this.props.updateView({
            avatarBase64: avatar,
            avatarURL: response.payload.avatarURL
          });
        });
      });
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
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <ShowMenuButton navigation={this.props.navigation} />
          }
          navbarTitle={firstName + " " + lastName}
          navbarType={"Basic"}
          photoSelect={avatar => this.uploadAvatar(avatar)}
          avatarSource={this.selectImage()}
          avatarHeight={150}
          bigAvatar={true}
          badge={false}
          stars={rate ? rate : 0}
          status={available}
          switchOnChange={status => this.props.changeStatus(status)}
          switchValue={this.props.available}
          calls={numberOfCalls}
          amount={amount}
          loading={this.props.loading}
        >
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
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  available: state.profileLinguist.available,
  numberOfCalls: state.profileLinguist.numberOfCalls,
  linguistCalls: state.callHistory.allLinguistCalls,
  amount: state.profileLinguist.amount,
  status: state.profileLinguist.status,
  loading: state.profileLinguist.loading,
  uuid: state.auth.uuid,
  token: state.auth.token,
  firstName: state.userProfile.firstName,
  lastName: state.userProfile.lastName,
  avatarURL: state.userProfile.avatarURL,
  linguistProfile: state.userProfile.linguistProfile,
  rate: state.userProfile.averageStarRating,
  tokbox: state.tokbox.tokboxID,
  invitationID: state.callLinguistSettings.invitationID,
  timer: state.activeSessionReducer.timer,
  counterId: state.activeSessionReducer.counterId,
  networkInfoType: state.networkInfo.type,
  nav: state.nav
});

const mD = {
  updateSettings,
  asyncUploadAvatar,
  updateView,
  getProfileAsync,
  changeStatus,
  asyncGetInvitationDetail,
  asyncGetAccountInformation,
  clear,
  updateActiveSession,
  getCurrentAvailability,
  incomingCallNotification
};

export default connect(
  mS,
  mD
)(Home);
