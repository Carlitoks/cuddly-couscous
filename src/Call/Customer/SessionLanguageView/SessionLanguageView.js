import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ActivityIndicator, Keyboard, Text } from "react-native";
import { filter, findIndex, cloneDeep } from "lodash";
import Icon from "react-native-vector-icons/MaterialIcons";

import { updateSettings } from "../../../Ducks/ContactLinguistReducer";

import GoBackButton from "../../../Components/GoBackButton/GoBackButton";
import Close from "../../../Components/Close/Close";
import BottomButton from "../../../Components/BottomButton/BottomButton";
import HeaderView from "../../../Components/HeaderView/HeaderView";
import ListComponent from "../../../Components/ListComponent/ListComponent";
import SearchBar from "../../../Components/SearchBar/SearchBar";
import LanguageSelection from "../../../Components/LanguageSelection/LanguageSelection";

import ViewWrapper from "../../../Containers/ViewWrapper/ViewWrapper";
import { Iphone5 } from "../../../Util/Devices";
import { displayFormErrors, previousView } from "../../../Util/Helpers";
import { moderateScale } from "../../../Util/Scaling";
import I18n from "../../../I18n/I18n";
import { Colors } from "../../../Themes";
import languages from "../../../Config/Languages";
import { styles } from "./styles";
import { SUPPORTED_LANGS } from "../../../Util/Constants";

class SessionLanguageView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      selectedIndex: -1,
      selectedLanguage: {},
      loading: true,
      languagesMapper: { eng: "cmn", cmn: "eng" }
    };
  }

  componentWillMount() {
    const {
      userProfileNativeLangCode,
      secundaryLangCode,
      updateSettings,
      navigation
    } = this.props;
    const { params } = navigation.state;
    const { languagesMapper } = this.state;

    const userNativeLangIsSupported =
      SUPPORTED_LANGS.indexOf(userProfileNativeLangCode) >= 0;

    const primaryLanguageCode = userNativeLangIsSupported
      ? userProfileNativeLangCode
      : "eng";

    const primaryLanguage = languages.find(
      lang => lang[3] === primaryLanguageCode
    );
    const secondaryLanguageName =
      params && params.noautoselect
        ? params.secundaryLangCode
        : languagesMapper[primaryLanguageCode]
          ? languagesMapper[primaryLanguageCode]
          : secundaryLangCode;

    const indexSecondaryLanguage = findIndex(
      languages,
      language => language[3] === secondaryLanguageName
    );

    const secondaryLanguage = languages[indexSecondaryLanguage];

    updateSettings({
      primaryLangCode: primaryLanguageCode,
      secundaryLangCode: secondaryLanguage[3],
      selectedLanguageFrom: primaryLanguage["name"],
      selectedLanguage: secondaryLanguage["name"]
    });

    this.setState({
      selectedIndex: indexSecondaryLanguage,
      selectedLanguage: secondaryLanguage
    });
  }

  filterList() {
    const { primaryLangCode } = this.props;
    return languages
      .filter(language => {
        return language.name
          .toLowerCase()
          .startsWith(this.state.searchQuery.toLowerCase());
      })
      .map(language => {
        let languageClone = cloneDeep(language);

        languageClone.disabled =
          primaryLangCode === "cmn"
            ? !(language[3] === "eng")
            : !(language[3] === "cmn");

        return languageClone;
      });
  }

  changeSelected(index) {
    if (index !== this.state.selectedIndex) {
      this.setState({
        selectedIndex: findIndex(languages, this.filterList()[index])
      });
    }
  }

  getSelectedLanguagesString(index) {
    const primaryLanguage = languages.find(
      language => language[3] === this.props.primaryLangCode
    );
    const secondaryLanguage = languages[index];

    return secondaryLanguage.name;
  }

  changeLanguage(index) {
    if (index !== this.state.selectedIndex) {
      const newLanguage = this.filterList()[index];

      this.setState({ searchQuery: "" });

      this.props.updateSettings({
        secundaryLangCode: this.filterList()[index][3],
        selectedLanguage: this.getSelectedLanguagesString(index)
      });

      this.setState({
        selectedLanguage: newLanguage,
        selectedIndex: findIndex(languages, newLanguage)
      });
    }
  }

  submit(navigation) {
    navigation.dispatch({ type: "CallConfirmationView" });
  }

  render() {
    const { navigation, selectedNativeLanguage } = this.props;

    return (
      <ViewWrapper style={styles.mainContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          navbarTitle={I18n.t("language")}
          navbarType={"Complete"}
          headerRightComponent={
            <Close
              action={() => {
                navigation.dispatch({ type: "Home" });
              }}
            />
          }
          titleComponent={
            <LanguageSelection
              firstLanguage={this.props.selectedLanguageFrom}
              secondLanguage={this.props.selectedLanguage}
              header
            />
          }
        >
          <View style={styles.scrollContainer}>
            {/* <SearchBar
              ref={search => (this.search = search)}
              onChangeText={text => this.setState({ searchQuery: text })}
              onClearText={text => this.setState({ searchQuery: "" })}
            /> */}

            {this.state.loading ? (
              <View />
            ) : (
              <View style={styles.loading}>
                <ActivityIndicator
                  size="large"
                  color={Colors.gradientColorButton.top}
                />
              </View>
            )}

            <View style={styles.box}>
              <Text style={styles.boxText}>{I18n.t("callTimeTitle")}</Text>
              <Text style={styles.boxText}>{I18n.t("callTimeSubtitle")}</Text>
            </View>

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
            title={I18n.t("continue")}
            relative
            onPress={() => this.submit(navigation)}
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
  userProfileNativeLangCode: state.userProfile.nativeLangCode,
  primaryLangCode: state.contactLinguist.primaryLangCode,
  secundaryLangCode: state.contactLinguist.secundaryLangCode,
  routes: state.nav.routes[0].routes[0].routes,
  nativeLanguage: state.userProfile.selectedNativeLanguage,
  selectedLanguageFrom: state.contactLinguist.selectedLanguageFrom,
  selectedLanguage: state.contactLinguist.selectedLanguage
});

// MAP DISPATCH TO PROPS HERE
const mD = { updateSettings };

// EXPORT DEFAULT HERE AT THE BOTTOM
export default connect(mS, mD)(SessionLanguageView);
