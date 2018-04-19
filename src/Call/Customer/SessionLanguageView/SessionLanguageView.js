import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ActivityIndicator, Keyboard, Text } from "react-native";
import { filter, findIndex } from "lodash";
import Icon from "react-native-vector-icons/MaterialIcons";

import { updateSettings } from "../../../Ducks/ContactLinguistReducer";

import GoBackButton from "../../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../../Components/BottomButton/BottomButton";
import HeaderView from "../../../Components/HeaderView/HeaderView";
import ListComponent from "../../../Components/ListComponent/ListComponent";
import SearchBar from "../../../Components/SearchBar/SearchBar";

import ViewWrapper from "../../../Containers/ViewWrapper/ViewWrapper";
import { Iphone5 } from "../../../Util/Devices";
import { displayFormErrors, previousView } from "../../../Util/Helpers";
import I18n from "../../../I18n/I18n";
import { Colors } from "../../../Themes";
import languages from "../../../Config/Languages";
import { styles } from "./styles";

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

    const langString =
      params && params.noautoselect
        ? params.secundaryLangCode
        : languagesMapper[userProfileNativeLangCode]
          ? languagesMapper[userProfileNativeLangCode]
          : secundaryLangCode;

    const index = findIndex(languages, language => language[3] === langString);

    updateSettings({ primaryLangCode: userProfileNativeLangCode });

    this.setState({
      selectedIndex: index,
      selectedLanguage: languages[index]
    });
  }

  filterList() {
    return languages
      .filter(language => {
        return language.name
          .toLowerCase()
          .startsWith(this.state.searchQuery.toLowerCase());
      })
      .map(language => {
        if (
          language[3] === "eng" ||
          language[3] === "cmn" ||
          language[3] === "yue"
        ) {
          language.disabled = false;
        } else {
          language.disabled = true;
        }

        return language;
      });
  }

  changeSelected(index) {
    this.setState({
      selectedIndex: findIndex(languages, this.filterList()[index])
    });
  }

  getSelectedLanguagesString(index) {
    const primaryLanguage = languages.find(
      language => language[3] === this.props.primaryLangCode
    );
    const secondaryLanguage = languages[index];

    return secondaryLanguage.name;
  }

  changeLanguage(index) {
    const newLanguage = this.filterList()[index];

    this.search.clearText();
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
          headerCenterComponent={
            <View
              style={Iphone5 ? styles.titleContainer5 : styles.titleContainer}
            >
              <Text style={styles.titleCall}>
                {this.props.nativeLanguage.name}
              </Text>
              <Icon style={styles.headerIcon} name={"compare-arrows"} />
              <Text style={styles.titleCall}>
                {this.state.selectedLanguage.name}
              </Text>
            </View>
          }
          headerRightComponent={
            <Text
              style={styles.headerButtonCancel}
              onPress={() => {
                navigation.dispatch({ type: "Home" });
              }}
            >
              {I18n.t("cancel")}
            </Text>
          }
          titleComponent={
            <View style={styles.bottom}>
              <Text style={styles.bottomText}>{I18n.t("callTimeTitle")}</Text>
              <Text style={styles.bottomText}>
                {I18n.t("callTimeSubtitle")}
              </Text>
            </View>
          }
        >
          <View style={styles.scrollContainer}>
            <SearchBar
              ref={search => (this.search = search)}
              onChangeText={text => this.setState({ searchQuery: text })}
              onClearText={text => this.setState({ searchQuery: "" })}
            />

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

            <ListComponent
              data={this.filterList()}
              titleProperty={"name"}
              selected={this.state.selectedIndex}
              onPress={index => this.changeLanguage(index)}
              changeSelected={index => this.changeSelected(index)}
              gradient
              scrollable
              leftText
              initial={this.state.selectedIndex}
            />
          </View>
          {/* Next Button */}
          <BottomButton
            title={I18n.t("next")}
            relative
            onPress={() => this.submit(navigation)}
            fill
            absolute
            gradient
            bottom
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
  nativeLanguage: state.userProfile.selectedNativeLanguage
});

// MAP DISPATCH TO PROPS HERE
const mD = { updateSettings };

// EXPORT DEFAULT HERE AT THE BOTTOM
export default connect(mS, mD)(SessionLanguageView);
