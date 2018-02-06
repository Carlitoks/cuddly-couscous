//TODO: Create switch when we retrieve the categories array to add icon names
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  asyncUploadAvatar,
  getProfileAsync,
  clearView,
  updateView
} from "../../Ducks/UserProfileReducer";
import { getCategories } from "../../Ducks/HomeFlowReducer";
import PhotoUpload from "react-native-photo-upload";
import { View, Text, Image, ScrollView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Button,
  FormLabel,
  FormInput,
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
import { updateSettings as updateSelectionList } from "../../Ducks/LinguistFormReducer";

import { Sessions } from "../../Api";

import styles from "./styles";
import { Colors, Images, Fonts } from "../../Themes";
import I18n from "../../I18n/I18n";
import { IMAGE_STORAGE_URL } from "../../Config/env";
import { moderateScale } from "../../Util/Scaling";

class Home extends Component {
  componentWillMount() {
    const { firstName, lastName, getCategories } = this.props;

    if (!firstName && !lastName) {
      this.props.getProfileAsync(this.props.uuid, this.props.token);
    }

    getCategories();
  }

  componentWillUnmount() {
    // this.props.clearView();
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
        <ScrollView
          automaticallyAdjustContentInsets={true}
          alwaysBounceVertical={false} 
          style={styles.scrollContainer}
        >
          <Grid>
            <Col>
              <Col>
                {/* Linear Gradient */}
                <LinearGradient
                  colors={[
                    Colors.gradientColor.top,
                    Colors.gradientColor.middle,
                    Colors.gradientColor.bottom
                  ]}
                  style={styles.linearGradient}
                />
                <TopViewIOS/> 
                {/* Header - Navigation */}
                <Header
                  outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                  backgroundColor="transparent"
                  leftComponent={
                    <ShowMenuButton navigation={this.props.navigation} />
                  }
                  /* centerComponent={{
                    text: `${firstName} ${lastName}`,
                    style: styles.title
                  }} */
                  rightComponent={
                    <SettingsButton navigation={this.props.navigation} />
                  }
                />
                <Row style={styles.userContainer}>
                  <View style={styles.avatarContainer}>
                    <PhotoUpload
                      onPhotoSelect={avatar => this.uploadAvatar(avatar)}
                    >
                      {
                        <Image
                          style={styles.avatar}
                          resizeMode="cover"
                          source={this.selectImage()}
                        />
                      }
                    </PhotoUpload>
                    <Badge
                      value={this.props.rate}
                      textStyle={styles.badgeText}
                      containerStyle={styles.badgeContainer}
                    />
                  </View>
                  <View style={styles.starsContainer}>
                    <Text style={styles.userName}>
                      {firstName + " " + lastName}
                    </Text>

                    <View style={[styles.stars]}>
                      <StarRating
                        emptyStarColor="gray"
                        emptyStar={"ios-star-outline"}
                        fullStar={"ios-star"}
                        halfStar={"ios-star-half"}
                        iconSet={"Ionicons"}
                        disabled={true}
                        maxStars={5}
                        starSize={moderateScale(20)}
                        rating={this.props.rate}
                        starColor={Colors.primaryColor}
                      />
                    </View>
                    <Text style={styles.textStars} />
                  </View>
                </Row>
                {/* Home */}
              </Col>
              <Col>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>
                    {I18n.t("iNeedAssistanceWith")}
                  </Text>
                </View>
                <View style={styles.containerTiles}>
                  <Grid>
                    <View style={styles.tilesGrid}>
                      {this.props.categories.map((item, i) => (
                        <TileButton
                          iconName={item.icon}
                          label={item.name}
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
                              params: { category: item.name }
                            });
                          }}
                        />
                      ))}
                      <TileButton
                        iconType="font-awesome"
                        iconName="qrcode"
                        label={I18n.t("scanQR")}
                        navigation={navigation}
                        onPress={() => {
                          this.props.navigation.dispatch({
                            type: "ScanScreenView"
                          });
                        }}
                      />
                    </View>
                  </Grid>
                </View>
              </Col>
            </Col>
          </Grid>
        </ScrollView>
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
  categories: state.homeFlow.categories
});

const mD = {
  clearView,
  updateView,
  getProfileAsync,
  asyncUploadAvatar,
  updateSelectionList,
  getCategories
};

export default connect(mS, mD)(Home);