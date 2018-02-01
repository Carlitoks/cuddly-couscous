import React, { Component } from "react";
import { connect } from "react-redux";

import {
  asyncUploadAvatar,
  getProfileAsync,
  clearView,
  updateView
} from "../../Ducks/UserProfileReducer";
import PhotoUpload from "react-native-photo-upload";
import { View, Text, Image, ScrollView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Button,
  FormLabel,
  FormInput,
  Header,
  Badge,
  Rating
} from "react-native-elements";
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";

import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import { Sessions } from "../../Api";

import styles from "./styles";
import { Colors, Images } from "../../Themes";
import I18n from "../../I18n/I18n";
import { IMAGE_STORAGE_URL } from "../../Config/env";

class Home extends Component {
  componentWillMount() {
    const { firstName, lastName } = this.props;

    if (!firstName && !lastName) {
      this.props.getProfileAsync(this.props.uuid, this.props.token);
    }
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
      <ViewWrapper style={styles.scrollContainer}>
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
                {/* Header - Navigation */}
                <Header
                  outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                  backgroundColor="transparent"
                  leftComponent={
                    <ShowMenuButton navigation={this.props.navigation} />
                  }
                  centerComponent={{
                    text: `${firstName} ${lastName}`,
                    style: styles.title
                  }}
                  rightComponent={
                    <SettingsButton navigation={this.props.navigation} />
                  }
                />
                <View>
                  <View style={styles.containerAvatar}>
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
                  </View>
                  <Badge
                    value={this.props.rate}
                    textStyle={styles.badgeText}
                    containerStyle={styles.badgeContainer}
                  />
                </View>
                <View style={styles.starsContainer}>
                  <View style={[styles.stars, styles.center]}>
                    <StarRating
                      emptyStarColor="gray"
                      emptyStar={"ios-star-outline"}
                      fullStar={"ios-star"}
                      halfStar={"ios-star-half"}
                      iconSet={"Ionicons"}
                      disabled={true}
                      maxStars={5}
                      starSize={18}
                      rating={this.props.rate}
                      starColor={Colors.primaryColor}
                    />
                  </View>
                  <Text style={styles.textStars} />
                </View>

                {/* Home */}
              </Col>
              <Col>
                <View style={styles.containerButtons}>
                  <View>
                    <Button
                      borderRadius={15}
                      containerViewStyle={styles.callLinguistContainer}
                      buttonStyle={styles.button}
                      onPress={() =>
                        this.props.navigation.dispatch({
                          type: "ContactLinguist"
                        })
                      }
                      textStyle={[styles.buttonText, styles.center]}
                      title={I18n.t("callLinguist")}
                      icon={{
                        name: "videocam",
                        size: 35,
                        color: Colors.primaryAltFontColor
                      }}
                    />
                  </View>

                  <Button
                    buttonStyle={[styles.buttonQR, styles.center]}
                    onPress={() =>
                      navigation.dispatch({ type: "ScanScreenView" })
                    }
                    icon={{ name: "dashboard", size: 30, color: "gray" }}
                    textStyle={[styles.buttonTextSecondary, styles.center]}
                    title={I18n.t("scanQRCode")}
                  />
                  {/* <Button
                    buttonStyle={[styles.buttonQR, styles.center]}
                    onPress={() => console.log("navigating")}
                    icon={{ name: "today", size: 30, color: "gray" }}
                    title="Schedule a Linguist"
                    textStyle={[styles.buttonTextSecondary, styles.center]}
                  /> */}
                  {/* <Button
                    buttonStyle={[styles.buttonQR, styles.center]}
                    onPress={() => console.log("navigating")}
                    title="Favorites"
                    textStyle={[styles.buttonTextSecondary, styles.center]}
                    icon={{ name: "favorite", size: 30, color: "gray" }}
                    iconStyle={styles.icon}
                  >
                    <View style={styles.callLinguistContainer}>
                      <Icon
                        style={styles.iconV}
                        name="favorite"
                        size={30}
                        color={"#9391f7"}
                        onPress={() =>
                          this.props.navigation.dispatch({
                            type: "LandingContainer"
                          })}
                      />
                      <Text style={[styles.buttonTextSecondary, styles.center]}>
                        Favorites
                      </Text>
                      <View style={styles.box3} />
                    </View>
                  </Button> */}
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
  rate: state.userProfile.averageStarRating
});

const mD = {
  clearView,
  updateView,
  getProfileAsync,
  asyncUploadAvatar
};

export default connect(mS, mD)(Home);