import React, { Component } from "react";
import { connect } from "react-redux";

import {
  changeStatus,
  updateSettings,
  asyncGetAccountInformation
} from "../../Ducks/ProfileLinguistReducer";
import {
  asyncUploadAvatar,
  updateView,
  getProfileAsync,
  getNativeLang
} from "../../Ducks/UserProfileReducer";
import { View, Text, Image, ScrollView, Switch, Alert } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { Row, Grid } from "react-native-easy-grid";
import PhotoUpload from "react-native-photo-upload";
import {
  Button,
  FormLabel,
  Header,
  Card,
  List,
  ListItem,
  Badge
} from "react-native-elements";
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";

import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import HeaderView from "../../Components/HeaderView/HeaderView";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import CallHistoryComponent from "../../Components/CallHistory/CallHistory";

import _isEmpty from "lodash/isEmpty";
import _isUndefined from "lodash/isUndefined";
import {
  asyncGetInvitationDetail,
  clearSettings
} from "../../Ducks/CallLinguistSettings";

import moment from "moment";

import styles from "./styles";
import { Colors, Images } from "../../Themes";
import { IMAGE_STORAGE_URL } from "../../Config/env";
import I18n from "../../I18n/I18n";

class Home extends Component {
  navigate = this.props.navigation.navigate;

  componentWillMount() {
    this.props.updateSettings({ loading: false });
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.alert
    ) {
      Alert.alert(I18n.t("notification"), I18n.t("cancelCallCustomer"));
    }

    if (
      this.props.tokbox &&
      this.props.networkInfoType !== "none" &&
      this.props.invitationID
    ) {
      this.props.asyncGetInvitationDetail(
        this.props.invitationID,
        this.props.token,
        true
      );
    }
    this.props.asyncGetAccountInformation();
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.networkInfoType !== "none") {
      if (this.props.tokbox && this.props.invitationID) {
        this.props.asyncGetInvitationDetail(
          this.props.invitationID,
          this.props.token,
          true
        );
      }
    }
  }

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
              scenario: !_isUndefined(item.session.scenario)
                ? item.session.scenario.category
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
          headerCenterComponent={{
            text: firstName + " " + lastName,
            style: styles.title
          }}
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
  networkInfoType: state.networkInfo.type
});

const mD = {
  updateSettings,
  asyncUploadAvatar,
  updateView,
  getProfileAsync,
  changeStatus,
  clearSettings,
  asyncGetInvitationDetail,
  asyncGetAccountInformation
};

export default connect(mS, mD)(Home);
