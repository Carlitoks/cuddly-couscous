import React, { Component } from "react";
import { Text, View, ScrollView, Alert, Image, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import PhotoUpload from "react-native-photo-upload";
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
  asyncUploadAvatar
} from "../../Ducks/UserProfileReducer";
import {
  FormInput,
  Button,
  Header,
  List,
  ListItem,
  Avatar
} from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import Languages from "../../Config/Languages";
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import styles from "./styles";
import { compareArrays } from "../../Util/Helpers";
import I18n from "../../I18n/I18n";
import { Images, Colors, Fonts } from "../../Themes";
import images from "../../Themes/Images";
import { IMAGE_STORAGE_URL } from "../../Config/env";
class UserProfileView extends Component {
  componentWillMount() {
    let secondaryLanguages = [];
    if (this.props.linguistProfile) {
      secondaryLanguages = this.props.linguistProfile.secondaryLanguages.map(
        lang => {
          let language = this.getNativeLangCode(lang.code)[0];

          language["proficiency"] = PROFICIENCY_LIST.filter(proficiency => {
            return proficiency.code === lang.proficiency;
          })[0];
          language["interpretation"] = LANGUAGE_INTERPRETATION_LIST.filter(
            interpretation => {
              return interpretation.code === lang.interpretation;
            }
          )[0];
          return language;
        }
      );

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
    if (this.props.selectedNativeLanguage.length === 0)
      this.props.updateSettings({
        selectedNativeLanguage: this.getNativeLangCode(
          this.props.nativeLangCode
        )
      });

    if (secondaryLanguages) {
      this.props.updateSettings({
        selectedSecondaryLanguages: secondaryLanguages
      });
    }
  }

  getNativeLangCode = code => {
    return Languages.filter(e => {
      return e["3"] === code;
    });
  };

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

  renderSecundaryLanguagesList = () => {
    const { selectedSecondaryLanguages } = this.props;

    const selectedSecondaryLanguagesList = selectedSecondaryLanguages.map(
      (language, i) => {
        const proficiency = language.proficiency
          ? language.proficiency.name
          : null;
        {
          /*Add list icon*/
        }
        return (
          <ListItem
            key={language["3"]}
            title={language.name}
            rightTitle={proficiency}
            onPress={() => {
              this.props.updateSettings({
                selectionItemType: "languages",
                selectionItemName: "secondaryLanguages",
                goTo: "UserProfileView"
              });
              this.props.navigation.dispatch({
                type: "SelectListView"
              });
            }}
          />
        );
      }
    );

    const addLanguageListItem = (
      <ListItem
        hideChevron
        titleStyle={styles.primaryColor}
        title={I18n.t("addLanguage")}
        leftIcon={{
          name: "add-circle-outline"
        }}
        onPress={() => {
          this.props.updateSettings({
            selectionItemType: "languages",
            selectionItemName: "secondaryLanguages",
            goTo: "UserProfileView"
          });
          this.props.navigation.dispatch({
            type: "SelectListView"
          });
        }}
      />
    );

    return (
      <List>
        {selectedSecondaryLanguagesList}
        {addLanguageListItem}
      </List>
    );
  };

  makeLinguistObject = () => {
    const { linguistProfile, selectedAreasOfExpertise } = this.props;
    const areasOfExpertise = selectedAreasOfExpertise.map(area => {
      return area.name;
    });
    return {
      areasOfExpertise: areasOfExpertise,
      familiarCountryCodes: linguistProfile.familiarCountryCodes,
      citiesChildhood: linguistProfile.citiesChildhood,
      citiesFamiliar: linguistProfile.citiesFamiliar,
      allowVideo: linguistProfile.allowVideo,
      available: linguistProfile.available,
      canVideo: linguistProfile.canVideo,
      maxMinutes: linguistProfile.maxMinutes
    };
  };

  makeListOfLanguages = () => {
    const linguistLangs = this.props.linguistProfile.secondaryLanguages.map(
      lang => {
        return lang;
      }
    );
    const selectedLangs = this.props.selectedSecondaryLanguages.map(lang => {
      const clang = {
        code: lang["3"],
        proficiency: !lang.proficiency ? null : lang.proficiency.code,
        interpretation: !lang.interpretation ? null : lang.interpretation.code
      };

      return clang;
    });
    return compareArrays(linguistLangs, selectedLangs);
  };

  addLanguage = lang => {
    const { token, uuid, updateLanguages } = this.props;

    let payload = {};
    if (lang.new) {
      payload = lang.new;
      delete payload.type;
    } else {
      payload = {
        code: lang.code.new,
        proficiency: lang.proficiency.new,
        interpretation: lang.interpretation.new
      };
    }

    return updateLanguages(uuid, payload.code, token, payload);
  };

  deleteLanguage = lang => {
    const { token, uuid, deleteLanguages } = this.props;
    const code = lang.old ? lang.old.code : lang.code.old;
    return deleteLanguages(uuid, code, token);
  };

  updatelanguage = lang => {
    const { token, uuid, updateLanguages, deleteLanguages } = this.props;

    const addPayLoad = {
      code: lang.code.new,
      proficiency: lang.proficiency.new,
      interpretation: lang.interpretation.new
    };
    const delCode = lang.code.old;
    return deleteLanguages(uuid, delCode, token).then(() => {
      return updateLanguages(uuid, addPayLoad.code, token, addPayLoad);
    });
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
        this.props.navigation.dispatch({
          type: "Home"
        });
      });
    } else {
      this.props.navigation.dispatch({ type: "Home" });
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
      : images.avatar;
    return this.props.avatarURL
      ? {
          uri: `${IMAGE_STORAGE_URL}${
            this.props.avatarURL
          }?${new Date().getMilliseconds()}`
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
      nativeLangCode: selectedNativeLanguage[0]["3"]
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
    const { selectedNativeLanguage } = this.props;

    return (
      <ViewWrapper style={styles.mainContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
          alwaysBounceVertical={false} 
          contentContainerStyle={styles.contentScrollContainer}
        >
          <Grid>
            <Col>
              <View>
                <Col style={{ height: 50 }}>
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
                    outerContainerStyles={{ borderBottomWidth: 0, height: 50 }}
                    backgroundColor="transparent"
                    leftComponent={
                      <ShowMenuButton navigation={this.props.navigation} />
                    }
                    centerComponent={{
                      text: I18n.t("userProfile"),
                      style: styles.title
                    }}
                  />
                </Col>
              </View>
              <View style={styles.containerAvatar}>
                <PhotoUpload
                  onPhotoSelect={avatar =>
                    this.props.updateView({ avatarBase64: avatar })
                  }
                >
                  {
                    <Image
                      style={{
                        paddingVertical: 30,
                        width: 150,
                        height: 150,
                        borderRadius: 75
                      }}
                      resizeMode="cover"
                      source={this.selectImage()}
                    />
                  }
                </PhotoUpload>
              </View>

              <Row style={styles.containerTitles}>
                <Text style={styles.titlesForm}>{I18n.t("firstname")}</Text>
              </Row>
              <Row>
                <FormInput
                  containerStyle={styles.containerInput}
                  inputStyle={styles.inputText}
                  placeholder={I18n.t("linguistName")}
                  onChangeText={text =>
                    this.props.updateView({ firstName: text })
                  }
                  value={this.props.firstName}
                />
              </Row>
              <Row style={styles.containerTitles}>
                <Text style={styles.titlesForm}>{I18n.t("lastname")}</Text>
              </Row>
              <Row>
                <FormInput
                  containerStyle={styles.containerInput}
                  inputStyle={styles.inputText}
                  placeholder={I18n.t("linguistName")}
                  onChangeText={text =>
                    this.props.updateView({ lastName: text })
                  }
                  value={this.props.lastName}
                />
              </Row>
              <Row style={styles.containerTitles}>
                <Text style={styles.titlesForm}>{I18n.t("preferedNameTitle")}</Text>
              </Row>
              <Row>
                <FormInput
                  containerStyle={styles.containerInput}
                  inputStyle={styles.inputText}
                  placeholder={I18n.t("preferredName")}
                  onChangeText={text =>
                    this.props.updateView({ preferredName: text })
                  }
                  value={this.props.preferredName}
                />
              </Row>

              <Row style={styles.containerTitles}>
                <Text style={styles.titlesForm}>{I18n.t("nativeLanguage")}</Text>
              </Row>
              {/* Native Language */}
              <List containerStyle={styles.marginBottom10}>
                {this.props.selectedNativeLanguage[0] && (
                  <ListItem
                    key={selectedNativeLanguage[0].code}
                    title={selectedNativeLanguage[0].name}
                    onPress={() => {
                      this.props.updateSettings({
                        selectionItemType: "languages",
                        selectionItemName: "nativeLanguage"
                      });
                      this.props.navigation.dispatch({
                        type: "SelectListView"
                      });
                    }}
                  />
                )}
              </List>
              {this.props.linguistProfile && this.ShowLinguistOptions()}
            </Col>
          </Grid>
        </ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={topIOS()}>
        <View style={styles.containerBottom}>
          {/* Next Button */}
          <Button
            buttonStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
            title={I18n.t("save")}
            onPress={() => {
              this.submit();
            }}
          />
        </View>
        </KeyboardAvoidingView>
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
  selectedNativeLanguage: state.linguistForm.selectedNativeLanguage,
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
  asyncUploadAvatar
};

export default connect(mS, mD)(UserProfileView);