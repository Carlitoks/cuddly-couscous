import React, { Component } from "react";
import { connect } from "react-redux";
import { camelCase, some, filter, isEqual, isUndefined } from "lodash";

import {
  updateSettings,
  getItems,
  updateForm
} from "../../Ducks/LinguistFormReducer";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, View, ScrollView, Image, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  SearchBar,
  List,
  ListItem,
  Button,
  Header
} from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";

import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import HeaderView from "../../Components/HeaderView/HeaderView";

import I18n from "../../I18n/I18n";
import styles from "./styles";
import { Images, Colors } from "../../Themes";

const itemMetadata = {
  languages: {
    title: I18n.t("nativeLanguage"),
    multiselection: false,
    acceptsEmptySelection: false
  },
  scenarios: {
    title: I18n.t("describeAssistance"),
    multiselection: false,
    acceptsEmptySelection: true,
    includeOthers: true,
    showSearch: false,
    continueTo: "CallConfirmationView",
    othersGoTo: "CustomScenarioView"
  },
  citizenship: {
    title: I18n.t("citizenShip"),
    multiselection: false,
    acceptsEmptySelection: false
  },
  countryFamiliarity: {
    title: I18n.t("countryFamiliarity"),
    multiselection: false,
    acceptsEmptySelection: false
  },
  cityFamiliarity: {
    title: I18n.t("countryFamiliarity"),
    multiselection: false,
    acceptsEmptySelection: false
  },
  nativeLanguage: {
    title: I18n.t("nativeLanguage"),
    multiselection: false,
    acceptsEmptySelection: false,
    showSearch: true,
    continueTo: "GenderCustomerView"
  },
  secondaryLanguages: {
    title: I18n.t("SecondaryLanguages"),
    multiselection: true,
    acceptsEmptySelection: false,
    continueTo: "LanguageSettingsView"
  },
  areasOfExpertise: {
    title: I18n.t("areasExpertise"),
    multiselection: true,
    acceptsEmptySelection: true
  }
};

class SelectListView extends Component {
  componentWillMount() {
    this.props.getItems(
      this.props.selectionItemType,
      this.props.navigation.state.params
    );
    this.props.updateSettings({
      searchQuery: "",
      selectedLanguage: null,
      selectedScenarios: []
    });
  }

  selectListItem = ({ language, selectedItemsList, selectedItemsListName }) => {
    const languageExistInList = some(selectedItemsList, language);

    const updatedSelectedItemsList = languageExistInList
      ? selectedItemsList.filter(e => {
          return !isEqual(e["3"], language["3"]);
        })
      : itemMetadata[this.props.selectionItemName].multiselection
        ? [...selectedItemsList, language]
        : [language];

    this.props.updateSettings({
      [selectedItemsListName]: updatedSelectedItemsList
    });

    return languageExistInList;
  };

  renderList = assistance => {
    const navigation = this.props.navigation;

    const selectedItemsListName = camelCase(
      `selected ${this.props.selectionItemName}`
    );

    const selectedItemsList = this.props[selectedItemsListName];

    return this.props[this.props.selectionItemType]
      .filter(language => {
        const propertyToCompare = language.name
          ? language.name
          : language.title;

        return propertyToCompare
          .toLowerCase()
          .startsWith(this.props.searchQuery.toLowerCase());
      })
      .map((language, i) => {
        return (
          <ListItem
            wrapperStyle={styles.listItem}
            hideChevron={!some(selectedItemsList, language)}
            key={i}
            title={language.name || language.title}
            rightIcon={{ name: "check" }}
            onPress={() => {
              const { continueTo } = itemMetadata[this.props.selectionItemName];

              const deselectedItem = this.selectListItem({
                language,
                selectedItemsList,
                selectedItemsListName
              });

              if (!isUndefined(continueTo) && !deselectedItem) {
                this.props.updateSettings({ selectedLanguage: language });

                navigation.dispatch({ type: continueTo });
              }
            }}
          />
        );
      });
  };

  render() {
    const { navigation, selectionItemName } = this.props;
    const selectedItemsListName = camelCase(`selected ${selectionItemName}`);
    const selectedItemsList = this.props[selectedItemsListName];
    const {
      acceptsEmptySelection,
      title,
      showSearch,
      othersGoTo
    } = itemMetadata[selectionItemName];

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          title={title}
          search={
            !!showSearch
              ? text => this.props.updateSettings({ searchQuery: text })
              : null
          }
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            alwaysBounceVertical={false}
          >
            <List style={styles.list}>
              {this.renderList()}
              {!isUndefined(othersGoTo) && (
                <ListItem
                  title={"Other"}
                  onPress={() => navigation.dispatch({ type: othersGoTo })}
                />
              )}
            </List>
          </ScrollView>
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  languages: state.linguistForm.languages,
  scenarios: state.linguistForm.scenarios,
  citizenships: state.linguistForm.citizenships,
  countryFamiliarities: state.linguistForm.countryFamiliarities,
  cityFamiliarities: state.linguistForm.cityFamiliarities,
  nativeLanguage: state.linguistForm.nativeLanguage,
  areasOfExpertise: state.linguistForm.areasOfExpertise,
  searchQuery: state.linguistForm.searchQuery,
  selectionItemType: state.linguistForm.selectionItemType,
  selectionItemName: state.linguistForm.selectionItemName,
  selectedAreasOfExpertise: state.linguistForm.selectedAreasOfExpertise,
  selectedSecondaryLanguages: state.linguistForm.selectedSecondaryLanguages,
  selectedNativeLanguage: state.linguistForm.selectedNativeLanguage,
  selectedCitizenship: state.linguistForm.selectedCitizenship,
  selectedCountryFamiliarity: state.linguistForm.selectedCountryFamiliarity,
  selectedCityFamiliarity: state.linguistForm.selectedCityFamiliarity,
  selectedScenarios: state.linguistForm.selectedScenarios
});

const mD = {
  updateSettings,
  getItems,
  updateForm
};

export default connect(mS, mD)(SelectListView);
