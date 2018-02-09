import React, { Component } from "react";
import { connect } from "react-redux";
import { camelCase, some, filter, isEqual, isUndefined } from "lodash";

import {
  updateSettings,
  getItems,
  updateForm
} from "../../Ducks/LinguistFormReducer";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, View, ScrollView, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SearchBar, List, ListItem, Header } from "react-native-elements";

import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import I18n from "../../I18n/I18n";
import styles from "./styles";
import { Colors } from "../../Themes";

const itemMetadata = {
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
    acceptsEmptySelection: false
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

class GenericSelectListView extends Component {
  constructor(props) {
    super(props);

    const {
      title,
      multiselection,
      acceptsEmptySelection,
      selectionItemName,
      selectionItemType,
      continueTo
    } = props.navigation.state.params;

    this.state = {
      title,
      multiselection,
      acceptsEmptySelection,
      selectionItemName,
      selectionItemType,
      continueTo
    };
  }

  componentWillMount() {
    const { selectionItemType } = this.state;

    this.props.getItems(selectionItemType, this.props.navigation.state.params);
    this.props.updateSettings({
      searchQuery: "",
      selectedLanguage: null,
      selectedScenarios: []
    });
  }

  selectListItem = ({ language, selectedItemsList, selectedItemsListName }) => {
    const languageExistInList = some(selectedItemsList, language);
    const { selectionItemName, multiselection } = this.state;
    const updatedSelectedItemsList = languageExistInList
      ? selectedItemsList.filter(e => {
          return !isEqual(e["3"], language["3"]);
        })
      : multiselection ? [...selectedItemsList, language] : [language];

    this.props.updateSettings({
      [selectedItemsListName]: updatedSelectedItemsList
    });

    return languageExistInList;
  };

  renderList = assistance => {
    const navigation = this.props.navigation;
    const { selectionItemType, selectionItemName } = this.state;

    const selectedItemsListName = camelCase(`selected ${selectionItemName}`);

    // const selectedItemsList = this.props[selectedItemsListName];

    const { items, selectedItemsList } = this.props.navigation.state.params;

    return items
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
              const continueTo = this.state.continueTo;

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
    const { navigation } = this.props;
    const { selectionItemName } = this.state;

    const selectedItemsListName = camelCase(`selected ${selectionItemName}`);
    const selectedItemsList = this.props[selectedItemsListName];
    const { acceptsEmptySelection, title, showSearch, othersGoTo } = this.state;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          alwaysBounceVertical={false}
        >
          <View style={styles.headerContainer}>
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
              outerContainerStyles={styles.header}
              backgroundColor="transparent"
              leftComponent={
                <Icon
                  style={styles.GoBackButton}
                  color={"white"}
                  name="arrow-back"
                  size={30}
                  onPress={() => {
                    if (
                      selectedItemsList.length === 0 &&
                      !acceptsEmptySelection
                    ) {
                      Alert.alert("Please, select at least one item");
                    } else {
                      navigation.dispatch({ type: "back" });
                    }
                  }}
                />
              }
            />
            <Text style={styles.mainTitle}>{title}</Text>
            {!isUndefined(showSearch) &&
              showSearch && (
                <SearchBar
                  lightTheme
                  containerStyle={styles.containerSearch}
                  inputStyle={styles.inputSearch}
                  placeholder="Search"
                  icon={{ color: "rgba(255, 255, 255, 0.6)", name: "search" }}
                  placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                  onChangeText={text =>
                    this.props.updateSettings({ searchQuery: text })
                  }
                  onClearText={text =>
                    this.props.updateSettings({ searchQuery: "" })
                  }
                  clearIcon={{ color: "rgba(255, 255, 255, 0.6)" }}
                />
              )}
          </View>

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

export default connect(mS, mD)(GenericSelectListView);
