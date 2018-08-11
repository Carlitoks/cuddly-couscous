import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView } from "react-native";

import { updateSettings } from "../../../Ducks/ContactLinguistReducer";

import GoBackButton from "../../../Components/GoBackButton/GoBackButton";
import Close from "../../../Components/Close/Close";
import BottomButton from "../../../Components/BottomButton/BottomButton";
import HeaderView from "../../../Components/HeaderView/HeaderView";
import ListComponent from "../../../Components/ListComponent/ListComponent";
import SearchBar from "../../../Components/SearchBar/SearchBar";
import LanguageSelection from "../../../Components/LanguageSelection/LanguageSelection";
import { updateSettings as updateContactLinguist } from "../../../Ducks/ContactLinguistReducer";
import ViewWrapper from "../../../Containers/ViewWrapper/ViewWrapper";
import I18n, { translateLanguage, translateProperty } from "../../../I18n/I18n";
import { styles } from "./styles";
import SupportedLanguagesList from "./SupportedLanguagesList";
import ComingSoonLanguagesList from "./ComingSoonLanguagesList";
import {
  SUPPORTED_LANGS,
  getLocalizedCategories
} from "../../../Util/Constants";

import { Languages } from "../../../Config/Languages";
class SessionLanguageView extends Component {
  submit(navigation) {
    navigation.dispatch({ type: "CallConfirmationView" });
  }

  componentWillMount() {
    const verifyLang = !!this.props.primaryLangCode;
    if (!verifyLang) {
      this.setLanguages();
    }
  }

  setLanguages = () => {
    const { nativeLangCode, updateContactLinguist } = this.props;
    const languagesMapper = { eng: "cmn", cmn: "eng", yue: "eng" };
    const userNativeLangIsSupported =
      SUPPORTED_LANGS.indexOf(nativeLangCode) >= 0;

    const primaryLanguageCode = userNativeLangIsSupported
      ? nativeLangCode
      : "eng";

    const primaryLanguage = Languages.find(
      lang => lang[3] === primaryLanguageCode
    );

    const secondaryLanguageCode = languagesMapper[primaryLanguageCode];

    const secondaryLanguage = Languages.find(
      lang => lang[3] === secondaryLanguageCode
    );

    updateContactLinguist({
      primaryLangCode: primaryLanguage[3],
      selectedLanguageFrom: translateLanguage(
        primaryLanguage[3],
        primaryLanguage["name"]
      ),
      secundaryLangCode: secondaryLanguage[3],
      selectedLanguage: translateLanguage(
        secondaryLanguage[3],
        secondaryLanguage["name"]
      )
    });
  };

  render() {
    const { navigation } = this.props;

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
          <ScrollView style={styles.scrollContainer}>
            {/* <SearchBar
              ref={search => (this.search = search)}
              onChangeText={text => this.setState({ searchQuery: text })}
              onClearText={text => this.setState({ searchQuery: "" })}
            /> */}

            <SupportedLanguagesList
              render={({ languages, indexSelected, changeLanguage }) => {
                return (
                  <ListComponent
                    data={languages}
                    titleFunc={item => {
                      return translateLanguage(item[3], item["name"]);
                    }}
                    selected={indexSelected}
                    onPress={changeLanguage}
                    gradient
                    leftText
                    noFlex
                    disableScroll
                  />
                );
              }}
            />

            <ComingSoonLanguagesList />
          </ScrollView>

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
  nativeLangCode: state.userProfile.nativeLangCode,
  primaryLangCode: state.contactLinguist.primaryLangCode,
  secundaryLangCode: state.contactLinguist.secundaryLangCode,
  routes: state.nav.routes[0].routes[0].routes,
  nativeLanguage: state.userProfile.selectedNativeLanguage,
  selectedLanguageFrom: state.contactLinguist.selectedLanguageFrom,
  selectedLanguage: state.contactLinguist.selectedLanguage
});

// MAP DISPATCH TO PROPS HERE
const mD = {
  updateSettings,
  updateContactLinguist
};

// EXPORT DEFAULT HERE AT THE BOTTOM
export default connect(
  mS,
  mD
)(SessionLanguageView);
