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

import ViewWrapper from "../../../Containers/ViewWrapper/ViewWrapper";
import I18n from "../../../I18n/I18n";
import { styles } from "./styles";
import SupportedLanguagesList from "./SupportedLanguagesList";
import ComingSoonLanguagesList from "./ComingSoonLanguagesList";
class SessionLanguageView extends Component {
  submit(navigation) {
    navigation.dispatch({ type: "CallConfirmationView" });
  }

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
                    titleProperty={"name"}
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
export default connect(
  mS,
  mD
)(SessionLanguageView);
