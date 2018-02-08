import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateSettings,
  createLinguist
} from "../../Ducks/LinguistFormReducer";
import {
  updateView,
  updateProfileAsync,
  getProfileAsync
} from "../../Ducks/UserProfileReducer";
import { logInAsync } from "../../Ducks/AuthReducer";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, View, ScrollView, Image, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SearchBar, List, ListItem, Button } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import Languages from "../../Config/Languages";
import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import NextButton from "../../Components/NextButton/NextButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import Header from "../Header/Header";
import { Sessions } from "../../Api";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import I18n from "../../I18n/I18n";
import styles from "./styles";
import { Images, Colors } from "../../Themes";

class SelectLanguageView extends Component {
  state = {
    languages: Sessions.GetLanguages()
  };
  componentWillMount() {
    let selectedNativeLanguage = [
      {
        1: "en",
        2: "eng",
        3: "eng",
        name: "English",
        local: "English",
        "2T": "eng",
        "2B": "eng"
      }
    ];

    if (this.props.isLoggedIn) {
      selectedNativeLanguage = Languages.filter(lang => {
        return lang["3"] === this.props.userProfile.nativeLangCode;
      });
    }

    this.props.updateSettings({ selectedNativeLanguage });
  }
  createLinguistProfile = (uuid, token) => {
    const linguistInfo = this.createLinguistObject();
    this.props.createLinguist(uuid, token, linguistInfo).then(response => {
      this.props.navigation.dispatch({
        type: "Home"
      });
    });
  };
  updateUserProfile = (uuid, token) => {
    this.props.updateView({
      nativeLangCode: this.props.selectedNativeLanguage[0]["3"]
    });
    const {
      firstName,
      lastName,
      nativeLangCode,
      preferredName
    } = this.props.userProfile;
    const profile = {
      firstName,
      lastName,
      nativeLangCode: this.props.selectedNativeLanguage[0]["3"],
      preferredName
    };

    this.props.updateProfileAsync(uuid, profile, token);
  };
  submit = () => {
    const { uuid, token } = this.props;
    if (this.props.isLoggedIn) {
      this.updateUserProfile(uuid, token);

      this.createLinguistProfile(uuid, token);
    } else {
      this.props
        .logInAsync(this.props.email, this.props.password)
        .then(response => {
          if (response.type !== "networkErrors") {
            this.props
              .getProfileAsync(response.payload.uuid, response.payload.token)
              .then(responseProfile => {
                this.updateUserProfile(
                  response.payload.uuid,
                  response.payload.token
                );
                this.createLinguistProfile(
                  response.payload.uuid,
                  response.payload.token
                );
              });
          } else {
            Alert.alert(response.data);
          }
        });
    }
  };

  createLinguistObject = () => {
    const {
      selectedNativeLanguage,
      selectedSecondaryLanguages,
      selectedCitizenship,
      selectedAreasOfExpertise,
      selectedCountryFamiliarity
    } = this.props;

    return {
      areasOfExpertise: selectedAreasOfExpertise.map(expertise => {
        return expertise.name;
      }),
      citiesChildhood: selectedCitizenship.map(citizen => {
        return {
          area: [],
          canonicalName: citizen.name,
          center: [],
          countryCode: citizen.alpha3,
          displayName: citizen.name,
          geoID: " "
        };
      }),

      citiesFamiliar: selectedCountryFamiliarity.map(country => {
        return {
          area: [[0]],
          canonicalName: country.name,
          center: [0],
          countryCode: country.alpha3,
          displayName: country.name,
          geoID: " "
        };
      }),
      familiarCountryCodes: selectedCountryFamiliarity.map(country => {
        return country.alpha3;
      }),
      secondaryLanguages: selectedSecondaryLanguages.map(lang => {
        return {
          code: lang["3"],
          interpretation: lang.interpretation.code,
          proficiency: lang.proficiency.code
        };
      })
    };
  };
  renderSecundaryLanguagesList = () => {
    const { selectedSecondaryLanguages } = this.props;
    const selectedSecondaryLanguagesList = selectedSecondaryLanguages.map(
      (language, i) => {
        const proficiency = language.proficiency
          ? language.proficiency.name
          : null;

        return (
          <ListItem
            key={language["3"]}
            title={language.name}
            rightTitle={proficiency}
            onPress={() => {
              this.props.navigation.dispatch({
                type: "GenericSelectListView",
                params: {
                  selectionItemType: "languages",
                  selectionItemName: "secondaryLanguages",
                  title: I18n.t("SecondaryLanguages"),
                  multiselection: true,
                  acceptsEmptySelection: false,
                  continueTo: "LanguageSettingsView"
                }
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
        leftIcon={{ name: "add-circle-outline" }}
        onPress={() => {
          this.props.navigation.dispatch({
            type: "GenericSelectListView",
            params: {
              selectionItemType: "languages",
              selectionItemName: "secondaryLanguages",
              title: I18n.t("SecondaryLanguages"),
              multiselection: true,
              acceptsEmptySelection: false,
              continueTo: "LanguageSettingsView"
            }
          });
        }}
      />
    );

    return (
      <View>
        {selectedSecondaryLanguagesList}
        {addLanguageListItem}
      </View>
    );
  };

  render() {
    const navigation = this.props.navigation;
    const { selectedNativeLanguage, selectedSecondaryLanguages } = this.props;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView automaticallyAdjustContentInsets={true} alwaysBounceVertical={false} style={styles.scrollContainer}>
          <Header
            navigation={this.props.navigation}
            mainTitle={I18n.t("languages")}
          />

          {/* Native Language */}
          <Text style={[styles.sectionTitle, styles.marginTop20]}>
            {I18n.t("nativeLanguage")}
          </Text>

          <List containerStyle={styles.marginBottom20}>
            {this.props.selectedNativeLanguage[0] && (
              <ListItem
                key={selectedNativeLanguage[0]["3"]}
                title={selectedNativeLanguage[0].name}
                onPress={() => {
                  this.props.navigation.dispatch({
                    type: "GenericSelectListView",
                    params: {
                      selectionItemType: "languages",
                      selectionItemName: "nativeLanguage",
                      items: this.state.languages,
                      selectedItem: this.props.selectedNativeLanguage,
                      title: I18n.t("nativeLanguage"),
                      multiselection: false,
                      acceptsEmptySelection: false
                    }
                  });
                }}
              />
            )}
          </List>

          {/* Secondary Languages */}
          <Text style={styles.sectionTitle}>{I18n.t("SecondaryLanguages")}</Text>

          <List>{this.renderSecundaryLanguagesList()}</List>

          {/* Areas of expertise */}
          <List>
            <ListItem
              title={I18n.t("areasExpertise")}
              onPress={() => {
                this.props.navigation.dispatch({
                  type: "GenericSelectListView",
                  params: {
                    selectionItemType: "areasOfExpertise",
                    selectionItemName: "areasOfExpertise",
                    title: I18n.t("areasExpertise"),
                    multiselection: true,
                    acceptsEmptySelection: false
                  }
                });
              }}
            />
          </List>
        </ScrollView>
        {/* Next Button */}
        <BottomButton
          title={I18n.t("create")}
          onPress={() => {
            if (this.props.selectedSecondaryLanguages.length < 1) {
              Alert.alert("Please, select at least secondary language");
            } else {
              this.submit();
            }
          }}
        />
      </ViewWrapper>
    );
  }
}

// MAP STATE TO PROPS HERE
const mS = state => ({
  firstName: state.linguistForm.firstname,
  lastName: state.linguistForm.lastname,
  preferredName: state.linguistForm.preferredName,
  phoneNumber: state.linguistForm.phoneNumber,
  selectedNativeLanguage: state.linguistForm.selectedNativeLanguage,
  selectedSecondaryLanguages: state.linguistForm.selectedSecondaryLanguages,
  selectedAreasOfExpertise: state.linguistForm.selectedAreasOfExpertise,
  selectedCitizenship: state.linguistForm.selectedCitizenship,
  selectedCountryFamiliarity: state.linguistForm.selectedCountryFamiliarity,
  email: state.linguistForm.email,
  password: state.linguistForm.password,
  token: state.auth.token,
  uuid: state.auth.uuid,
  isLoggedIn: state.auth.isLoggedIn,
  userProfile: state.userProfile
});

// MAP DISPATCH TO PROPS HERE
const mD = {
  updateSettings,
  logInAsync,
  createLinguist,
  updateView,
  updateProfileAsync,
  getProfileAsync
};

// EXPORT DEFAULT HERE AT THE BOTTOM
export default connect(mS, mD)(SelectLanguageView);
