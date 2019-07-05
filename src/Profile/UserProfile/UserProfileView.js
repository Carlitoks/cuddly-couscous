import React, { Component } from "react";
import { Alert, ScrollView, View } from "react-native";
import { connect } from "react-redux";
import { List, ListItem, Avatar } from "react-native-elements";
import { Row, Grid } from "react-native-easy-grid";
import { Languages } from "../../Config/Languages";
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import UserAvatar from "../../Components/UserAvatar/UserAvatar";
import WavesBackground from "../../Components/UserAvatar/WavesBackground";

import styles from "./styles";
import _capitalize from "lodash/capitalize";
import I18n, { translateApiError, translateLanguage } from "../../I18n/I18n";
import { Images } from "../../Themes";
import Close from "../../Components/Close/Close";
import NavBar from "../../Components/NavBar/NavBar";
import {updateUserProfilePhoto} from "../../Ducks/AccountReducer";

class UserProfileView extends Component {

  uploadAvatar(avatar) {
    if (!!avatar) {
      this.props.updateUserProfilePhoto(avatar).catch((e) => {
        console.log(e);
        Alert.alert(I18n.t("error"), translateApiError(e));
      });
    }
  }

  selectImage = () => {
    return !!this.props.userAvatarURL
      ? { uri: this.props.userAvatarURL }
      : Images.avatar;
  };

  render() {
    const navigation = this.props.navigation;
    const { user, linguistProfile } = this.props;

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
                  subtitle={`${user.firstName} ${user.lastName}`}
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
                    subtitle={translateLanguage(user.nativeLangCode)}
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
                    user.gender === "decline" || user.gender === ""
                      ? I18n.t("unspecifiedGender")
                      : _capitalize(user.gender === "male" ? I18n.t("male") : I18n.t("female"))
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
  user: state.account.user,
  linguistProfile: state.account.linguistProfile,
  userAvatarURL: state.account.userAvatarURL,
});

const mD = {
  updateUserProfilePhoto,
};

export default connect(
  mS,
  mD
)(UserProfileView);
