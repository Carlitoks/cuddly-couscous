import React, { Component } from "react";
import { Alert, ScrollView, View } from "react-native";
import { connect } from "react-redux";
import {
  asyncUploadAvatar,
  getNativeLang,
  updateProfileAsync,
  updateView
} from "../../Ducks/UserProfileReducer";
import { List, ListItem } from "react-native-elements";
import { Grid } from "react-native-easy-grid";
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import UserAvatar from "../../Components/UserAvatar/UserAvatar";
import WavesBackground from "../../Components/UserAvatar/WavesBackground";

import styles from "./styles";
import _capitalize from "lodash/capitalize";
import I18n, { translateApiError, translateLanguage } from "../../I18n/I18n";
import { Images } from "../../Themes";
import Close from "../../Components/Close/Close";
import NavBar from "../../Components/NavBar/NavBar";

class UserProfileView extends Component {
  componentWillMount() {}

  uploadAvatar(avatar) {
    if (avatar) {
      const { token, uuid } = this.props;
      this.props.asyncUploadAvatar(uuid, avatar, token).then(response => {
        /*this.props.navigation.dispatch({
          type: "back"
        });*/
      });
    } else {
      //this.props.navigation.dispatch({ type: "back" });
    }
  }

  selectImage = () => {
    let image = this.props.avatarBase64
      ? { uri: `data:image/jpg;base64,${this.props.avatarBase64}` }
      : Images.avatar;
    return this.props.avatarURL
      ? {
          uri: `${this.props.avatarURL}?time=${new Date().getUTCMilliseconds()}`
        }
      : image;
  };

  submit = () => {
    const {
      firstName,
      lastName,
      preferredName,
      nativeLangCode,
      selectedNativeLanguage,
      token,
      uuid,
      avatarBase64
    } = this.props;
    const data = {
      firstName,
      lastName,
      preferredName,
      nativeLangCode: selectedNativeLanguage["3"]
    };

    this.props.updateProfileAsync(uuid, data, token).catch(err => {
      Alert.alert(I18n.t("status.error"), translateApiError(err));
    });
  };

  render() {
    const navigation = this.props.navigation;
    const { selectedNativeLanguage, firstName, lastName, gender, linguistProfile } = this.props;

    return (
      <View style={styles.mainContainer}>
        <NavBar
          leftComponent={<ShowMenuButton navigation={navigation} />}
          navbarTitle={I18n.t("userProfile")}
          rightComponent={
            <Close
              action={() => {
                this.props.navigation.dispatch({ type: "Home" });
              }}
            />
          }
        />
        <WavesBackground>
          <UserAvatar
            photoSelect={avatar => this.uploadAvatar(avatar)}
            avatarSource={this.selectImage()}
            avatarHeight={150}
            bigAvatar={true}
          />
        </WavesBackground>
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={styles.scrollContainer}
            alwaysBounceVertical={false}
            contentContainerStyle={styles.contentScrollContainer}
          >
            <Grid style={styles.summaryContainer}>
              <List containerStyle={styles.listContainer}>
                {/* Name */}
                <ListItem
                  containerStyle={styles.listItemContainer}
                  title={I18n.t("name").toUpperCase()}
                  titleStyle={styles.titleStyle}
                  subtitle={`${firstName} ${lastName}`}
                  subtitleStyle={styles.listSubtitle}
                  onPress={() => {
                    navigation.dispatch({
                      type: "EditNameView"
                    });
                  }}
                />
                {/* Native Language */}
                {!linguistProfile && (
                  <ListItem
                    containerStyle={styles.listItemContainer}
                    title={I18n.t("nativeLanguageTitle").toUpperCase()}
                    titleStyle={styles.titleStyle}
                    subtitle={selectedNativeLanguage}
                    subtitleStyle={styles.listSubtitle}
                    onPress={() => {
                      navigation.dispatch({
                        type: "LanguageListScreen"
                      });
                    }}
                  />
                )}
                {/* Gender */}
                <ListItem
                  containerStyle={styles.listItemContainer}
                  title={I18n.t("gender").toUpperCase()}
                  titleStyle={styles.titleStyle}
                  subtitle={
                    gender === "decline" || gender === ""
                      ? I18n.t("unspecifiedGender")
                      : _capitalize(gender === "male" ? I18n.t("male") : I18n.t("female"))
                  }
                  subtitleStyle={styles.listSubtitle}
                  onPress={() => {
                    navigation.dispatch({
                      type: "EditGenderView"
                    });
                  }}
                />
              </List>
            </Grid>
          </ScrollView>
      </View>
    );
  }
}

const mS = state => ({
  firstName: state.userProfile.firstName,
  lastName: state.userProfile.lastName,
  nativeLangCode: state.userProfile.nativeLangCode,
  preferredName: state.userProfile.preferredName,
  linguistProfile: state.userProfile.linguistProfile,
  gender: state.userProfile.gender,
  selectedNativeLanguage: translateLanguage(state.userProfile.nativeLangCode),
  avatarURL: state.userProfile.avatarURL,
  avatarBase64: state.userProfile.avatarBase64,
  token: state.auth2.userJwtToken,
  uuid: state.auth2.userID
});

const mD = {
  updateView,
  updateProfileAsync,
  asyncUploadAvatar,
  getNativeLang
};

export default connect(
  mS,
  mD
)(UserProfileView);
