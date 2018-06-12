import React, { Component } from "react";
import { connect } from "react-redux";

import { updateSettings } from "../../Ducks/LinguistFormReducer";
import { updateForm } from "../../Ducks/RegistrationCustomerReducer";
import { asyncUpdateUser } from "../../Ducks/CustomerProfileReducer";
import { update, checkRecord } from "../../Ducks/OnboardingRecordReducer";

import { filter, findIndex } from "lodash";

import { View, ActivityIndicator, Keyboard, Text, Alert } from "react-native";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";
import ListComponent from "../../Components/ListComponent/ListComponent";
import SearchBar from "../../Components/SearchBar/SearchBar";

import {
  displayFormErrors,
  is500Response,
  displayTemporaryErrorAlert
} from "../../Util/Helpers";

import I18n from "../../I18n/I18n";
import { Colors } from "../../Themes";
import languages from "../../Config/Languages";
import styles from "./styles";
import { SUPPORTED_LANGS } from "../../Util/Constants";

class NativeLanguageView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: -1,
      selectedLanguage: {},
      loading: true
    };
  }

  componentWillUnmount() {
    try {
      Keyboard.removeAllListeners("keyboardDidHide");
    } catch (e) {
      //console.log(e);
    }
  }

  componentWillMount() {
    const {
      selectedNativeLanguage,
      update,
      email,
      emailUserProfile
    } = this.props;

    this.setState({
      selectedIndex: findIndex(languages, selectedNativeLanguage),
      selectedLanguage: selectedNativeLanguage
    });

    setTimeout(() => {
      this.setState({ loading: false });
    }, 700);

    Keyboard.addListener("keyboardDidHide", () => {
      Keyboard.dismiss();
    });

    const emailStored = email.length === 0 ? emailUserProfile : email;

    update({
      email: emailStored.toLowerCase(),
      lastStage: "NativeLanguageView"
    });
  }

  filterList() {
    return languages.filter(language => {
      return language.name
        .toLowerCase()
        .startsWith(this.props.searchQuery.toLowerCase());
    });
  }

  changeSearch(queryString) {
    this.props.updateSettings({ searchQuery: queryString });
  }

  changeSelected(index) {
    this.setState({
      selectedIndex: findIndex(languages, this.filterList()[index])
    });
  }

  changeLanguage(index) {
    const newLanguage = this.filterList()[index];

    this.search.clearText();
    this.props.updateSettings({ searchQuery: "" });
    // new index

    this.setState({
      selectedLanguage: newLanguage,
      selectedIndex: findIndex(languages, newLanguage)
    });
  }

  getSupportedLanguagesNames() {
    const supportedLanguages = new Set(SUPPORTED_LANGS);
    return (supportedLanguagesArray = languages
      .filter(language => {
        return supportedLanguages.has(language["3"]);
      })
      .map(language => {
        return language.name;
      })
      .join(", "));
  }

  submit() {
    const {
      id,
      asyncUpdateUser,
      token,
      navigation,
      checkRecord,
      email,
      emailUserProfile
    } = this.props;

    const selectedLanguage = {
      nativeLangCode: this.state.selectedLanguage["3"]
    };

    const emailStored = email.length === 0 ? emailUserProfile : email;

    const record = checkRecord(emailStored);

    const storedToken = record ? record.token : token;
    const storedId = record ? record.id : id;

    const payload = { id: storedId, ...selectedLanguage };

    const formNativeLanguage = this.state.selectedLanguage;
    const isSupportedLang = SUPPORTED_LANGS.find(item => {
      return formNativeLanguage["3"] === item;
    });
    if (!!isSupportedLang === false) {
      Alert.alert(
        "",
        `${I18n.t(
          "languageNotice1"
        )} \n\n\t${this.getSupportedLanguagesNames()} \n\n${I18n.t(
          "languageNotice2"
        )}`,
        [
          {
            text: "OK",
            onPress: () => {
              asyncUpdateUser(payload, storedToken)
                .then(response => {
                  if (response.type === "networkErrors/error") {
                    throw new Error(response.payload.data.errors);
                  }
                  this.props.updateForm({
                    selectedNativeLanguage: this.state.selectedLanguage
                  });
                  navigation.dispatch({ type: "GenderCustomerView" });
                })
                .catch(error => {
                  error.response
                    ? is500Response(error)
                      ? displayTemporaryErrorAlert()
                      : null
                    : displayFormErrors(error.response.data);
                });
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      asyncUpdateUser(payload, storedToken)
        .then(response => {
          if (response.type === "networkErrors/error") {
            throw new Error(response.payload.data.errors);
          }
          this.props.updateForm({
            selectedNativeLanguage: this.state.selectedLanguage
          });
          navigation.dispatch({ type: "GenderCustomerView" });
        })
        .catch(error => {
          error.response
            ? is500Response(error)
              ? displayTemporaryErrorAlert()
              : null
            : displayFormErrors(error.response.data);
        });
    }
  }

  render() {
    const navigation = this.props.navigation;
    const { selectedNativeLanguage } = this.props;

    return (
      <ViewWrapper style={styles.mainContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          navbarTitle={I18n.t("nativeLanguage")}
          navbarType={"Basic"}
          NoWaves
        >
          <View style={styles.scrollContainer}>
            <SearchBar
              ref={search => (this.search = search)}
              onChangeText={text => this.changeSearch(text)}
              onClearText={text => this.changeSearch("")}
            />

            {this.state.loading ? (
              <View style={styles.loading}>
                <ActivityIndicator
                  size="large"
                  color={Colors.gradientColorButton.top}
                />
              </View>
            ) : (
              <View />
            )}

            <ListComponent
              data={this.filterList()}
              titleProperty={"name"}
              selected={this.state.selectedIndex}
              onPress={index => this.changeLanguage(index)}
              changeSelected={index => this.changeSelected(index)}
              gradient
              scrollable
              leftText
              noFlex
              initial={this.state.selectedIndex}
            />
          </View>
          {/* Next Button */}
          <BottomButton
            title={I18n.t("next")}
            relative
            onPress={() => this.submit()}
            fill
            absolute
            gradient
          />
        </HeaderView>
      </ViewWrapper>
    );
  }
}

// MAP STATE TO PROPS HERE
const mS = state => ({
  id: state.customerProfile.userInfo.id,
  email: state.registrationCustomer.email,
  emailUserProfile: state.userProfile.email,
  selectedNativeLanguage: state.registrationCustomer.selectedNativeLanguage,
  searchQuery: state.linguistForm.searchQuery,
  token: state.auth.token
});

// MAP DISPATCH TO PROPS HERE
const mD = {
  updateSettings,
  asyncUpdateUser,
  updateForm,
  update,
  checkRecord
};

// EXPORT DEFAULT HERE AT THE BOTTOM
export default connect(
  mS,
  mD
)(NativeLanguageView);
