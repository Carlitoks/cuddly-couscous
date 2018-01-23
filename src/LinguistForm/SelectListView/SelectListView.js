import React, { Component } from "react";
import { connect } from "react-redux";
import { camelCase, some, filter, isEqual, isUndefined } from "lodash";

import { updateSettings, getItems } from "../../Ducks/LinguistFormReducer";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
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
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import EN from "../../I18n/en";
import styles from "./styles";
import { Images, Colors } from "../../Themes";

const itemMetadata = {
  languages: {
    title: EN["NativeLanguage"],
    multiselection: false,
    acceptsEmptySelection: false
  },
  citizenship: {
    title: EN["citizenship"],
    multiselection: false,
    acceptsEmptySelection: false
  },
  nativeLanguage: {
    title: EN["NativeLanguage"],
    multiselection: false,
    acceptsEmptySelection: false
  },
  secondaryLanguages: {
    title: EN["SecondaryLanguages"],
    multiselection: false,
    acceptsEmptySelection: false,
    continueTo: "LanguageSettingsView"
  },
  areasOfExpertise: {
    title: EN["AreasExpertise"],
    multiselection: true,
    acceptsEmptySelection: true
  }
};

class SelectListView extends Component {
  componentWillMount() {
    this.props.getItems(this.props.selectionItemType);
    this.props.updateSettings({
      searchQuery: ""
    });
  }

  selectListItem = ({ language, selectedItemsList, selectedItemsListName }) => {
    const updatedSelectedItemsList = some(selectedItemsList, language)
      ? selectedItemsList.filter(e => !isEqual(e, language))
      : itemMetadata[this.props.selectionItemName].multiselection
        ? [...selectedItemsList, language]
        : [language];

    this.props.updateSettings({
      [selectedItemsListName]: updatedSelectedItemsList
    });
  };

  renderList = assistance => {
    const navigation = this.props.navigation;

    const selectedItemsListName = camelCase(
      `selected ${this.props.selectionItemName}`
    );

    const selectedItemsList = this.props[selectedItemsListName];

    return this.props[this.props.selectionItemType]
      .filter(language =>
        language.name
          .toLowerCase()
          .startsWith(this.props.searchQuery.toLowerCase())
      )
      .map((language, i) => {
        return (
          <ListItem
            wrapperStyle={styles.listItem}
            hideChevron={!some(selectedItemsList, language)}
            key={i}
            title={language.name}
            rightIcon={{ name: "check" }}
            onPress={() => {
              const continueTo =
                itemMetadata[this.props.selectionItemName].continueTo;
              if (isUndefined(continueTo)) {
                this.selectListItem({
                  language,
                  selectedItemsList,
                  selectedItemsListName
                });
              } else {
                this.props.updateSettings({ selectedLanguage: language });

                navigation.dispatch({ type: continueTo });
              }
            }}
          />
        );
      });
  };

  render() {
    const navigation = this.props.navigation;

    const selectedItemsListName = camelCase(
      `selected ${this.props.selectionItemName}`
    );

    const selectedItemsList = this.props[selectedItemsListName];

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView automaticallyAdjustContentInsets={true}>
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
            <TopViewIOS/>             
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
                      !itemMetadata[this.props.selectionItemName]
                        .acceptsEmptySelection
                    ) {
                      Alert.alert("Please, select at least one item");
                    } else {
                      navigation.dispatch({ type: "back" });
                    }
                  }}
                />
              }
            />
            <Text style={styles.mainTitle}>
              {itemMetadata[this.props.selectionItemName].title}
            </Text>
            <SearchBar
              lightTheme
              containerStyle={styles.containerSearch}
              inputStyle={styles.inputSearch}
              placeholder="Search"
              icon={{ color: "rgba(255, 255, 255, 0.6)", name: "search" }}
              placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
              onChangeText={text =>
                this.props.updateSettings({ searchQuery: text })}
              onClearText={text =>
                this.props.updateSettings({ searchQuery: "" })}
              clearIcon={{ color: "rgba(255, 255, 255, 0.6)" }}
            />
          </View>

          <List style={styles.list}>{this.renderList()}</List>
        </ScrollView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  languages: state.linguistForm.languages,
  citizenchips: state.linguistForm.citizenchips,
  nativeLanguage: state.linguistForm.nativeLanguage,
  areasOfExpertise: state.linguistForm.areasOfExpertise,
  searchQuery: state.linguistForm.searchQuery,
  selectionItemType: state.linguistForm.selectionItemType,
  selectionItemName: state.linguistForm.selectionItemName,
  selectedAreasOfExpertise: state.linguistForm.selectedAreasOfExpertise,
  selectedSecondaryLanguages: state.linguistForm.selectedSecondaryLanguages,
  selectedNativeLanguage: state.linguistForm.selectedNativeLanguage,
  selectedCitizenship: state.linguistForm.selectedCitizenship
});

const mD = {
  updateSettings,
  getItems
};

export default connect(mS, mD)(SelectListView);
