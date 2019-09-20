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

import { Alert, AppState, NetInfo, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Grid, Row } from "react-native-easy-grid";
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import CallHistoryComponent from "../../Components/CallHistory/CallHistory";
import _isEmpty from "lodash/isEmpty";
import _isUndefined from "lodash/isUndefined";
import _get from "lodash/get";


import styles from "./styles";
import { Fonts, Images } from "../../Themes";
import I18n, { translateApiError } from "../../I18n/I18n";
import { Sessions } from "../../Api";
import { ensurePermissions } from "../../Util/Permission";
import { PERMISSIONS } from "../../Util/Constants";
import NavBar from "../../Components/NavBar/NavBar";
import LinguistStatus from "../../Components/UserAvatar/LinguistStatus";
import CallNumber from "../../Components/UserAvatar/CallNumber";
import WavesBackground from "../../Components/UserAvatar/WavesBackground";
import { formatTimerSeconds } from "../../Util/Format";
import { moderateScaleViewports } from "../../Util/Scaling";
import CircularAvatar from "../../Components/CircularAvatar/CircularAvatar";
import StarRating from "../../Components/StarRating/StarRating";

import PermissionRequestModal from "../../Containers/Onboarding/Components/PermissionRequestModal"
import { modifyAdditionalDetails } from "../../Ducks/NewSessionReducer";

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
      loading: false,
      permissionsModalVisible: false,
      permissions: [],
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

    const { permissions } = this.props;

    //!permissions.location.grated && permissions.location.status === "undetermined" ? PERMISSIONS.LOCATION : 
    if(!permissions.location.grated && permissions.location.status === "undetermined"){
      this.setState({permissionsModalVisible: true, permissions: [PERMISSIONS.LOCATION]})
    }
    this.reloadUser();

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

    const permissionsToAsk = [];
    const { permissions, navigation } = this.props;

    const cameraStatus = _get(permissions,'camera.status',"undetermined");
    const camera = _get(permissions,'camera.granted',false);

    const microphoneStatus = _get(permissions,'microphone.status',"undetermined");
    const microphone = _get(permissions,'microphone.granted',false);
    
    const locationStatus = _get(permissions,'location.status',"undetermined");
    const location = _get(permissions,'location.granted',false);

    if( camera && 
        cameraStatus == "authorized" && 
        microphone && 
        microphoneStatus == "authorized" && 
        location && 
        locationStatus == "authorized"){
      this.props.updateLinguistProfile({available: status}).finally(() => {
        this.setState({loading: false});
      });
      return;
    }

    if(cameraStatus == "denied" || microphoneStatus == "denied" || locationStatus === "denied"){
      navigation.dispatch({ 
        type: "MissingRequiredPermissionsView", 
        params: { 
          camera: !camera, 
          microphone: !microphone,
          location: !location,
          isLinguist: true
        } 
      });
      this.setState({loading: false});
      return;
    }

    if(!camera && cameraStatus === "undetermined"){
      permissionsToAsk.push(PERMISSIONS.CAMERA)  
    }
    if(!microphone && microphoneStatus === "undetermined"){
      permissionsToAsk.push(PERMISSIONS.MIC)  
    }
    if(!location && locationStatus === "undetermined"){
      permissionsToAsk.push(PERMISSIONS.LOCATION)  
    }
    this.setState({permissionsModalVisible: true, permissions: permissionsToAsk, loading: false});
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
          let abuseReported = false;
          if(item.featureFlag){
            if(item.featureFlag.includes("sessions:linguist-reported-abuse") && this.props.isLinguist){
              abuseReported = true;
            }
          }
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
              ifAbuseReported: abuseReported,
              chevron: false,
              userType,
              session: item.session,
              user: this.props.user,
              isLinguist: this.props.isLinguist,
              token: this.props.token
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

  calculateAmount (calls = []) {
    let seconds = 0;
    let numberCalls = 0;
    const firstDay = moment().startOf('month').format();
    calls.forEach((call) => {
      if(moment(call.session.createdAt).isAfter(firstDay)){
        numberCalls++;
        if(call.session.duration){
          seconds += call.session.duration;
        }
      }
    });
    return { amount: formatTimerSeconds(seconds), numberCalls };
  }

  modalClose(res){
      this.setState({ permissionsModalVisible: false });

      if(res) { // do sommething
        console.log(res);
      }
  }

  render() {
    const {
      user,
      linguistProfile,
      linguistCalls,
      permissions,
    } = this.props;
    const allCalls = this.filterAllCalls(linguistCalls, "createdBy");
    const { amount, numberCalls } = this.calculateAmount(linguistCalls);
    
    return (
      <View style={styles.scrollContainer}>
        <NavBar
          leftComponent={
            <ShowMenuButton navigation={this.props.navigation} />
          }
          navbarTitle={I18n.t("home")}
        />
        <PermissionRequestModal
          visible={this.state.permissionsModalVisible} // true/false
          role='linguist' // customer|linguist
          askLater={true} // true|false
          perms={this.state.permissions} // [camera|microphone|location|notification|photo]
          onClose={(res) => this.modalClose(res)}
        />
        <WavesBackground>
          <View style={styles.avatarContainer}>
              <CircularAvatar photoSelect={avatar => this.uploadAvatar(avatar)} avatarURL={this.props.avatarURL} firstName={user.firstName} lastInitial={user.lastName} />
            <View style={styles.toggleContainer}>
              <Text style={styles.displayName}>{`${user.firstName} ${user.lastName ? user.lastName : ""}`}</Text>
              { user.averageStarRating && (
                <StarRating fullStarColor={"#F39100"} rating={user.averageStarRating} containerStyle={styles.starRatingContainer} />
              )}
              <View>
                <LinguistStatus
                  status={linguistProfile.available}
                  switchOnChange={status => this.changeStatus(status)}
                  switchValue={linguistProfile.available}
                  loading={this.state.loading}
                />
              </View>
            </View>
          </View>
        </WavesBackground>
        
        <CallNumber
          calls={numberCalls}
          amount={amount}
        />
        <View style={styles.recentCallsContainer}>
          <Text style={styles.recentCallsContainerText}>{I18n.t("recentCalls")}</Text>
        </View>
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
  linguistProfile: state.account.linguistProfile,
  avatarURL: state.account.userAvatarURL,
  linguistCalls: state.account.linguistCallHistory,
  uuid: state.auth2.userID,
  token: state.auth2.userJwtToken,
  isLinguist: state.account.isLinguist,
  user: state.account.user,
  permissions: state.appState.permissions,
});

const mD = {
  loadUser,
  updateUserProfilePhoto,
  updateLinguistProfile,
  loadLinguistCallHistory,
  incomingCallNotification,
};

export default connect(
  mS,
  mD
)(Home);
