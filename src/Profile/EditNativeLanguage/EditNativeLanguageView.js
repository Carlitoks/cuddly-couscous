import React, { Component } from "react";
import { connect } from "react-redux";

import {
  clearForm as registrationClearForm,
  updateForm
} from "../../Ducks/RegistrationCustomerReducer";
import {
  updateProfileAsync,
  updateView,
  getNativeLang
} from "../../Ducks/UserProfileReducer";
import { filter, findIndex } from "lodash";

import { View, Alert, ActivityIndicator, Keyboard, Text } from "react-native";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";
import ListComponent from "../../Components/ListComponent/ListComponent";
import SearchBar from "../../Components/SearchBar/SearchBar";

import I18n, { translateLanguage } from "../../I18n/I18n";
import { Languages } from "../../Config/Languages";
import styles from "./styles";
import { Colors } from "../../Themes";
import { SUPPORTED_LANGS } from "../../Util/Constants";
import NativeLanguageSelection from "../../Components/NativeLanguageSelection/NativeLanguageSelection";

class EditNativeLanguageView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: -1,
      formNativeLanguage: {},
      loading: true,
      searchQuery: ""
    };
  }
  componentWillUnmount() {
    this.props.registrationClearForm();
    try {
      Keyboard.removeAllListeners("keyboardDidHide");
    } catch (e) {
      //console.log(e);
    }
  }

  componentWillMount() {
    const selectedNativeLanguage = this.props.selectedNativeLanguage;

    this.setState({
      selectedIndex: findIndex(Languages, { 3: selectedNativeLanguage["3"] }),
      formNativeLanguage: selectedNativeLanguage
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 700);

    Keyboard.addListener("keyboardDidHide", () => {
      Keyboard.dismiss();
    });
  }

  changeSearch(queryString) {
    this.setState({ searchQuery: queryString });
  }

  getSupportedLanguagesNames() {
    const supportedLanguages = new Set(SUPPORTED_LANGS);
    return (supportedLanguagesArray = Languages.filter(language => {
      return supportedLanguages.has(language["3"]);
    })
      .map(language => {
        return translateLanguage(language[3], language.name);
      })
      .join(", "));
  }

  submit() {
    const {
      token,
      uuid,
      updateProfileAsync,
      updateView,
      navigation,
      getNativeLang
    } = this.props;
    const { formNativeLanguage } = this.state;
    const data = {
      nativeLangCode: formNativeLanguage["3"]
    };
    const isSupportedLang = SUPPORTED_LANGS.find(item => {
      return formNativeLanguage["3"] === item;
    });
    if (!!isSupportedLang === false) {
      // TOOD: no string concat here, move interpolation into the translated string
      Alert.alert(
        "",
        `${I18n.t(
          "languageNotice1"
        )} ${this.getSupportedLanguagesNames()} \n\n${I18n.t(
          "languageNotice2"
        )}`,
        [
          {
            text: "OK",
            onPress: () => {
              updateProfileAsync(uuid, data, token)
                .then(response => {
                  const {
                    payload,
                    payload: { nativeLangCode }
                  } = response;

                  if (response.type !== "networkErrors/error") {
                    updateView({
                      selectedNativeLanguage: getNativeLang(nativeLangCode)
                    });
                    navigation.dispatch({
                      type: "back"
                    });
                  } else {
                    const errorMessage =
                      response.payload.response.data.errors[0];
                    Alert.alert("error", errorMessage);
                  }
                })
                .then(() => {
                  this.setState({ searchQuery: "" });
                });
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      updateProfileAsync(uuid, data, token)
        .then(response => {
          const {
            payload,
            payload: { nativeLangCode }
          } = response;

          if (response.type !== "networkErrors/error") {
            updateView({
              selectedNativeLanguage: getNativeLang(nativeLangCode)
            });
            navigation.dispatch({
              type: "back"
            });
          } else {
            const errorMessage = response.payload.response.data.errors[0];
            Alert.alert("error", errorMessage);
          }
        })
        .then(() => {
          this.setState({ searchQuery: "" });
        });
    }
  }

  render() {
    const navigation = this.props.navigation;
    const { formNativeLanguage } = this.props;

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

            <NativeLanguageSelection
              searchQuery={this.state.searchQuery}
              render={({ filterList, indexSelected, changeLanguage }) => {
                return (
                  <ListComponent
                    data={filterList()}
                    titleFunc={ item => translateLanguage(item[3], item["name"]) }
                    selected={indexSelected}
                    onPress={index => {
                      changeLanguage(index);
                      this.setState({
                        formNativeLanguage: filterList()[index]
                      });
                      // this.search.clearText();
                    }}
                    gradient
                    scrollable
                    leftText
                    noFlex
                    initial={indexSelected}
                  />
                );
              }}
            />
          </View>
          {/* Save Button */}
          <BottomButton
            title={I18n.t("save")}
            onPress={() => {
              this.submit();
            }}
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
  token: state.auth.token,
  uuid: state.auth.uuid,
  selectedNativeLanguage: state.userProfile.selectedNativeLanguage,
  formSelectedNativeLanguage: state.registrationCustomer.selectedNativeLanguage
});

// MAP DISPATCH TO PROPS HERE
const mD = {
  updateProfileAsync,
  updateForm,
  registrationClearForm,
  updateView,
  getNativeLang
};

// EXPORT DEFAULT HERE AT THE BOTTOM
export default connect(
  mS,
  mD
)(EditNativeLanguageView);
