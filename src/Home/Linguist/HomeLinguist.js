import React, { Component } from "react";
import { connect } from "react-redux";

import { updateSettings, GetOptions } from "../../Ducks/ProfileLinguistReducer";
import {
  asyncUploadAvatar,
  updateView,
  getProfileAsync
} from "../../Ducks/UserProfileReducer";
import { View, Text, Image, ScrollView, Switch } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
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

import { Sessions } from "../../Api";
import { getInvitations } from "../../Ducks/CallLinguistSettings";

import styles from "./styles";
import { Colors, Images } from "../../Themes";
import { IMAGE_STORAGE_URL } from "../../Config/env";
import I18n from "../../I18n/I18n";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
class Home extends Component {
  navigate = this.props.navigation.navigate;

  componentWillMount() {
    this.props.updateSettings({
      polling: true
    });

    if (this.props.available) {
      setTimeout(() => {
        this.props.getInvitations();
      }, 10000);
    }
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
    let image = this.props.avatarBase64
      ? { uri: `data:image/jpg;base64,${this.props.avatarBase64}` }
      : Images.avatar;
    return this.props.avatarURL
      ? {
          uri: `${IMAGE_STORAGE_URL}${
            this.props.avatarURL
          }?${new Date().getMilliseconds()}`
        }
      : image;
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.available) {
      setTimeout(() => {
        this.props.getInvitations();
      }, 10000);
    }
  }

  render() {
    const {
      amount,
      numberOfCalls,
      status,
      firstName,
      lastName,
      avatarURL,
      available,
      rate
    } = this.props;
    const languagues = this.props.GetOptions();

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
          avatarSource={this.selectImage}
          avatarHeight={150}
          bigAvatar={true}
          stars={rate ? rate : 0}
          status={available}
          switchOnChange={available =>
            this.props.updateSettings({ available: available })
          }
          switchValue={this.props.available}
          calls={numberOfCalls}
          amount={amount}
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={styles.scrollContainer}
            alwaysBounceVertical={false}
          >
            <Grid>
              <Col>
                <List containerStyle={{ borderTopWidth: 0, marginTop: 0 }}>
                  <ListItem
                    title={I18n.t("sessionInQueue")}
                    hideChevron
                    containerStyle={{ paddingBottom: 20, paddingTop: 20 }}
                    titleStyle={{ color: "#b7b7b7", fontSize: 20 }}
                  />
                  {languagues.map((item, i) => (
                    <ListItem
                      key={i}
                      title={item.language}
                      leftIcon={{ name: "swap-horiz" }}
                      titleStyle={{ fontSize: 20 }}
                      badge={{
                        value: item.translates,
                        textStyle: styles.badgeText,
                        containerStyle: { backgroundColor: "transparent" }
                      }}
                    />
                  ))}
                </List>
              </Col>
            </Grid>
          </ScrollView>
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  available: state.profileLinguist.available,
  numberOfCalls: state.profileLinguist.numberOfCalls,
  amount: state.profileLinguist.amount,
  status: state.profileLinguist.status,
  uuid: state.auth.uuid,
  token: state.auth.token,
  firstName: state.userProfile.firstName,
  lastName: state.userProfile.lastName,
  avatarURL: state.userProfile.avatarURL,
  linguistProfile: state.userProfile.linguistProfile,
  rate: state.userProfile.averageStarRating,
  avatarBase64: state.userProfile.avatarBase64
});

const mD = {
  updateSettings,
  GetOptions,
  getInvitations,
  asyncUploadAvatar,
  updateView,
  getProfileAsync
};

export default connect(mS, mD)(Home);
