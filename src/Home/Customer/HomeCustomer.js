//TODO: Create switch when we retrieve the categories array to add icon names
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  asyncUploadAvatar,
  getProfileAsync,
  clearView,
  updateView
} from "../../Ducks/UserProfileReducer";
import {
  EndCall,
  closeOpenConnections
} from "../../Ducks/CallCustomerSettings";

import { getCategories } from "../../Ducks/HomeFlowReducer";
import PhotoUpload from "react-native-photo-upload";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Button,
  FormLabel,
  Header,
  Badge,
  Rating,
  Avatar,
  Tile
} from "react-native-elements";
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import TileButton from "../../Components/TileButton/TileButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";
import { updateSettings as updateSelectionList } from "../../Ducks/LinguistFormReducer";

import { Sessions } from "../../Api";

import styles from "./styles";
import { Colors, Images, Fonts } from "../../Themes";
import I18n from "../../I18n/I18n";
import { IMAGE_STORAGE_URL } from "../../Config/env";
import { moderateScale } from "../../Util/Scaling";
import { REASON } from "../../Util/Constants";

class Home extends Component {
  componentWillMount() {
    if (this.props.tokbox && this.props.networkInfoType !== "none") {
      this.props.closeOpenConnections();
    }
    const { firstName, lastName, getCategories } = this.props;

    if (!firstName && !lastName) {
      this.props.getProfileAsync(this.props.uuid, this.props.token);
    }

    getCategories(this.props.token);
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.networkInfoType !== "none" && this.props.sessionID) {
    //   this.props.EndCall(this.props.sessionID, REASON.CANCEL, this.props.token);
    // }
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
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
  navigate = this.props.navigation.navigate;

  render() {
    const { firstName, lastName, avatarURL, navigation } = this.props;

    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <HeaderView
          headerLeftComponent={
            <ShowMenuButton navigation={this.props.navigation} />
          }
          //headerRightComponent={<SettingsButton navigation={this.props.navigation} />}
          photoSelect={avatar => this.uploadAvatar(avatar)}
          avatarSource={this.selectImage()}
          avatarHeight={150}
          avatarTitle={`${I18n.t("hi")} ${firstName}!`}
          connectMe={true}
          navigation={navigation}
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={styles.scrollContainer}
          >
            <Grid>
              <Col>
                {/* Tiles */}
                <Col>
                  <View style={styles.containerTiles}>
                    <Grid>
                      <View style={styles.tilesGrid}>
                        {this.props.categories.map((item, i) => (
                          <TileButton
                            iconName={item}
                            label={item}
                            key={i}
                            navigation={navigation}
                            viewName="ContactLinguist"
                            onPress={() => {
                              this.props.updateSelectionList({
                                selectionItemType: "scenarios",
                                selectionItemName: "scenarios",
                                scenarios: []
                              });
                              this.props.navigation.dispatch({
                                type: "SelectListView",
                                params: { category: item }
                              });
                            }}
                          />
                        ))}
                      </View>
                    </Grid>
                  </View>
                </Col>
              </Col>
            </Grid>
          </ScrollView>
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  firstName: state.userProfile.firstName,
  lastName: state.userProfile.lastName,
  nativeLangCode: state.userProfile.nativeLangCode,
  avatarURL: state.userProfile.avatarURL,
  uuid: state.auth.uuid,
  token: state.auth.token,
  rate: state.userProfile.averageStarRating,
  categories: state.homeFlow.categories,
  sessionID: state.tokbox.sessionID,
  networkInfoType: state.networkInfo.type,
  tokbox: state.tokbox.tokboxID,
  invitationID: state.callCustomerSettings.invitationID
});

const mD = {
  clearView,
  updateView,
  getProfileAsync,
  asyncUploadAvatar,
  updateSelectionList,
  getCategories,
  EndCall,
  closeOpenConnections
};

export default connect(mS, mD)(Home);
