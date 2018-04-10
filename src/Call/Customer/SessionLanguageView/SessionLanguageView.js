import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ActivityIndicator, Keyboard, Text } from "react-native";
import { filter, findIndex } from "lodash";

import { updateSettings } from "../../../Ducks/ContactLinguistReducer";

import GoBackButton from "../../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../../Components/BottomButton/BottomButton";
import HeaderView from "../../../Components/HeaderView/HeaderView";
import ListComponent from "../../../Components/ListComponent/ListComponent";
import SearchBar from "../../../Components/SearchBar/SearchBar";

import ViewWrapper from "../../../Containers/ViewWrapper/ViewWrapper";

import { displayFormErrors } from "../../../Util/Helpers";
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
      loading: true
    };
  }

  componentWillMount() {
    const { primaryLangCode, secundaryLangCode } = this.props;
    const languagesMapper = { eng: "cmn", cnm: "eng" };

    const langString = languagesMapper["primaryLangCode"]
      ? languagesMapper[primaryLangCode]
      : secundaryLangCode;

    const index = findIndex(languages, language => language[3] === langString);

    this.setState({
      selectedIndex: index,
      selectedLanguage: languages[index]
    });
  }

  filterList() {
    return languages.filter(language => {
      return language.name
        .toLowerCase()
        .startsWith(this.state.searchQuery.toLowerCase());
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

    return `${primaryLanguage.name} & ${secondaryLanguage.name}`;
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

  submit() {
    const { navigation } = this.props;
    navigation.dispatch({ type: "back" });
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
          title={I18n.t("languages")}
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
            title={I18n.t("ok")}
            relative
            onPress={() => this.submit()}
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
  primaryLangCode: state.contactLinguist.primaryLangCode,
  secundaryLangCode: state.contactLinguist.secundaryLangCode
});

// MAP DISPATCH TO PROPS HERE
const mD = { updateSettings };

// EXPORT DEFAULT HERE AT THE BOTTOM
export default connect(mS, mD)(SessionLanguageView);