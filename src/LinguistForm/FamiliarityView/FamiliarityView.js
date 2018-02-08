import React, { Component } from "react";
import { connect } from "react-redux";
import Countries from "../../Config/countries";
import { updateSettings } from "../../Ducks/LinguistFormReducer";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, View, ScrollView, Image, Alert, KeyboardAvoidingView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SearchBar, List, ListItem, Button } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import { topIOS } from "../../Util/Devices";
import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import NextButton from "../../Components/NextButton/NextButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import Header from "../Header/Header";

import I18n from "../../I18n/I18n";
import styles from "./styles";
import { Images, Colors } from "../../Themes";

class FamiliarityView extends Component {
  componentWillMount() {
    const uuee = [
      {
        alpha2: "US",
        alpha3: "USA",
        countryCallingCodes: ["+1"],
        currencies: ["USD"],
        emoji: "🇺🇸",
        ioc: "USA",
        languages: ["eng"],
        name: "United States",
        status: "assigned"
      }
    ];
    const selectedCitizenship = uuee;
    const selectedCountryFamiliarity = uuee;
    const selectedCityFamiliarity = uuee;

    this.props.updateSettings({
      selectedCitizenship,
      selectedCityFamiliarity,
      selectedCountryFamiliarity
    });
  }

  renderSecundaryLanguagesList = () => {
    const { selectedSecondaryLanguages } = this.props;

    const selectedSecondaryLanguagesList = selectedSecondaryLanguages.map(
      (language, i) => (
        <ListItem
          key={language.code}
          title={language.name}
          rightTitle={language.proficiency}
          onPress={() => {
            this.props.updateSettings({
              selectionItemType: "languages",
              selectionItemName: "secondaryLanguages"
            });
            this.props.navigation.dispatch({ type: "SelectListView" });
          }}
        />
      )
    );

    const addLanguageListItem = (
      <ListItem
        hideChevron
        titleStyle={styles.primaryColor}
        title={I18n.t("addLanguage")}
        leftIcon={{ name: "add-circle-outline" }}
        onPress={() => {
          this.props.updateSettings({
            selectionItemType: "languages",
            selectionItemName: "secondaryLanguages"
          });
          this.props.navigation.dispatch({ type: "SelectListView" });
        }}
      />
    );

    return (
      <View>
        {selectedSecondaryLanguagesList}
        {addLanguageListItem}
      </View>
    );
  };

  render() {
    const navigation = this.props.navigation;
    const { selectedNativeLanguage, selectedSecondaryLanguages } = this.props;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView automaticallyAdjustContentInsets={true} alwaysBounceVertical={false} >
        <Header 
            navigation={this.props.navigation} 
            mainTitle={I18n.t("countryFamiliarity")} 
          /> 

          {/* Cityzenship */}
          <Text style={[styles.sectionTitle, styles.marginTop20]}>
            {I18n.t("citizenShip")} 
          </Text>

          <List containerStyle={styles.marginBottom20}>
            {this.props.selectedCitizenship[0] && (
              <ListItem
                key={this.props.selectedCitizenship[0].name}
                title={this.props.selectedCitizenship[0].name}
                onPress={() => {
                  this.props.updateSettings({
                    selectionItemType: "citizenships",
                    selectionItemName: "citizenship"
                  });
                  this.props.navigation.dispatch({ type: "SelectListView" });
                }}
              />
            )}
          </List>

          {/* Country Familiarity */}
          <Text style={styles.sectionTitle}> 
            {I18n.t("countryFamiliarity")} 
          </Text> 

          <List containerStyle={styles.marginBottom20}>
            {this.props.selectedCitizenship[0] && (
              <ListItem
                key={this.props.selectedCountryFamiliarity[0].name}
                title={this.props.selectedCountryFamiliarity[0].name}
                onPress={() => {
                  this.props.updateSettings({
                    selectionItemType: "countryFamiliarities",
                    selectionItemName: "countryFamiliarity"
                  });
                  this.props.navigation.dispatch({ type: "SelectListView" });
                }}
              />
            )}
          </List>

          {/* City Familiarity */}
          <Text style={styles.sectionTitle}>{I18n.t("cityFamiliarity")}</Text>

          <List containerStyle={styles.marginBottom20}>
            {this.props.selectedCityFamiliarity[0] && (
              <ListItem
                key={this.props.selectedCityFamiliarity[0].name}
                title={this.props.selectedCityFamiliarity[0].name}
                onPress={() => {
                  this.props.updateSettings({
                    selectionItemType: "cityFamiliarities",
                    selectionItemName: "cityFamiliarity"
                  });
                  this.props.navigation.dispatch({ type: "SelectListView" });
                }}
              />
            )}
          </List>
        </ScrollView>
        {/* Next Button */}
        <BottomButton
          title={I18n.t("next")}
          onPress={() => {
            if (
              this.props.selectedCitizenship.length < 1 ||
              this.props.selectedCountryFamiliarity.length < 1 ||
              this.props.selectedCityFamiliarity.length < 1
            ) {
              Alert.alert("Please, select at least one item in each list");
            } else {
              navigation.dispatch({ type: "PhoneLinguistView" });
            }
          }}
          color={Colors.linguistFormText}
          buttonColor={Colors.linguistFormButton}
          bold={false}
        />
      </ViewWrapper>
    );
  }
}

// MAP STATE TO PROPS HERE
const mS = state => ({
  selectedCitizenship: state.linguistForm.selectedCitizenship,
  selectedCountryFamiliarity: state.linguistForm.selectedCountryFamiliarity,
  selectedCityFamiliarity: state.linguistForm.selectedCityFamiliarity
});

// MAP DISPATCH TO PROPS HERE
const mD = {
  updateSettings
};

// EXPORT DEFAULT HERE AT THE BOTTOM
export default connect(mS, mD)(FamiliarityView);
