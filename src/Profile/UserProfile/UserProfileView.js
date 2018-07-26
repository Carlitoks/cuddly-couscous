import React, { Component } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { connect } from "react-redux";
import {
  updateSettings,
  PROFICIENCY_LIST,
  LANGUAGE_INTERPRETATION_LIST,
  GetAreasOfExpertise,
  updateLanguages,
  deleteLanguages,
  linguistUpdate
} from "../../Ducks/LinguistFormReducer";
import {
  updateProfileAsync,
  getProfileAsync,
  updateView,
  asyncUploadAvatar,
  getNativeLang
} from "../../Ducks/UserProfileReducer";
import { List, ListItem, Avatar } from "react-native-elements";
import { Row, Grid } from "react-native-easy-grid";
import { Languages } from "../../Config/Languages";
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import BottomButton from "../../Components/BottomButton/BottomButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
import HeaderView from "../../Components/HeaderView/HeaderView";

import styles from "./styles";
import _capitalize from "lodash/capitalize";
import I18n, {translateLanguage} from "../../I18n/I18n";
import { Images } from "../../Themes";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import Close from "../../Components/Close/Close";

class UserProfileView extends Component {
  componentWillMount() {
    let secondaryLanguages = [];
    if (this.props.linguistProfile) {
      // secondaryLanguages = this.props.linguistProfile.secondaryLanguages.map(
      //   lang => {
      //     let language = this.props.getNativeLang(lang.code)[0];

      //     language["proficiency"] = PROFICIENCY_LIST.filter(proficiency => {
      //       return proficiency.code === lang.proficiency;
      //     })[0];
      //     language["interpretation"] = LANGUAGE_INTERPRETATION_LIST.filter(
      //       interpretation => {
      //         return interpretation.code === lang.interpretation;
      //       }
      //     )[0];
      //     return language;
      //   }
      // );

      let areasOfExpertise = [];
      if (this.props.linguistProfile.areasOfExpertise) {
        areasOfExpertise = this.props.linguistProfile.areasOfExpertise.map(
          area => {
            return GetAreasOfExpertise().filter(interpretation => {
              return interpretation.name === area;
            })[0];
          }
        );
        this.props.updateSettings({
          selectedAreasOfExpertise: areasOfExpertise
        });
      }
    }
    this.props.updateSettings({
      selectedNativeLanguage: this.props.getNativeLang(
        this.props.nativeLangCode
      )
    });

    if (secondaryLanguages) {
      this.props.updateSettings({
        selectedSecondaryLanguages: secondaryLanguages
      });
    }
  }

  ShowLinguistOptions = () => {
    return (
      <View>
        <Text style={styles.nativeLanguageTitle}>
          {I18n.t("SecondaryLanguages")}
        </Text>
        {this.renderSecundaryLanguagesList()}
        <Row style={styles.containerTitles}>
          <Text style={styles.titlesForm}>{I18n.t("areasExpertise")}</Text>
        </Row>

        <List>
          <ListItem
            title={I18n.t("areasExpertise")}
            onPress={() => {
              this.props.updateSettings({
                selectionItemType: "areasOfExpertise",
                selectionItemName: "areasOfExpertise"
              });
              this.props.navigation.dispatch({
                type: "SelectListView"
              });
            }}
          />
        </List>
      </View>
    );
  };

  getUserProfile = () => {
    const { token, uuid } = this.props;
    this.props.getProfileAsync(uuid, token).then(response => {
      this.props.updateView({
        linguistProfile: response.payload.linguistProfile
      });
    });
  };

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

  saveLinguistData = (uuid, token) => {
    return this.props
      .linguistUpdate(uuid, token, this.makeLinguistObject())
      .then(() => {
        const lang = this.makeListOfLanguages();
        Object.keys(lang).forEach(key => {
          if (lang[key].new && lang[key].type === "created") {
            this.addLanguage(lang[key]).then(response => {
              this.getUserProfile();
            });
          } else if (lang[key].old && lang[key].type == "deleted") {
            this.deleteLanguage(lang[key]).then(response => {
              this.getUserProfile();
            });
          } else if (lang[key].code && lang[key].code.type == "updated") {
            this.updatelanguage(lang[key]).then(() => {
              this.getUserProfile();
            });
          }
        });
      });
  };

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

    this.props.updateProfileAsync(uuid, data, token).then(response => {
      if (response.type !== "networkErrors") {
        if (this.props.linguistProfile) {
          this.saveLinguistData(uuid, token).then(() => {
            this.uploadAvatar(avatarBase64);
          });
        } else {
          this.uploadAvatar(avatarBase64);
        }
      }
    });
  };

  render() {
    const navigation = this.props.navigation;
    const {
      selectedNativeLanguage,
      firstName,
      lastName,
      gender,
      linguistProfile
    } = this.props;

    return (
      <ViewWrapper style={styles.mainContainer}>
        <HeaderView
          headerLeftComponent={
            <ShowMenuButton navigation={this.props.navigation} />
          }
          headerRightComponent={
            <Close
              action={() => {
                this.props.navigation.dispatch({ type: "Home" });
              }}
            />
          }
          navbarTitle={I18n.t("userProfile")}
          navbarType={"Basic"}
          photoSelect={avatar => this.uploadAvatar(avatar)}
          avatarSource={this.selectImage()}
          avatarHeight={150}
          bigAvatar={true}
        >
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
                        type: "EditNativeLanguageView"
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
                      : _capitalize(gender)
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
        </HeaderView>
      </ViewWrapper>
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
  selectedNativeLanguage: translateLanguage(state.userProfile.selectedNativeLanguage[3], state.userProfile.selectedNativeLanguage.name),
  selectedSecondaryLanguages: state.linguistForm.selectedSecondaryLanguages,
  selectedAreasOfExpertise: state.linguistForm.selectedAreasOfExpertise,
  avatarURL: state.userProfile.avatarURL,
  avatarBase64: state.userProfile.avatarBase64,
  currentView: state.linguistForm.currentView,
  token: state.auth.token,
  uuid: state.auth.uuid
});

const mD = {
  updateView,
  updateSettings,
  updateProfileAsync,
  GetAreasOfExpertise,
  updateLanguages,
  deleteLanguages,
  getProfileAsync,
  linguistUpdate,
  asyncUploadAvatar,
  getNativeLang
};

export default connect(
  mS,
  mD
)(UserProfileView);
