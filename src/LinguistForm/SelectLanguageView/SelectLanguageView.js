import React, { Component } from "react";
import { connect } from "react-redux";

import { updateSettings } from "../../Ducks/LinguistFormReducer";

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

import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import NextButton from "../../Components/NextButton/NextButton";

import EN from "../../I18n/en";
import styles from "./styles";
import { Images, Colors } from "../../Themes";

class SelectLanguageView extends Component {
  componentWillMount() {
    const selectedNativeLanguage = [
      {
        name: "English",
        code: "eng",
        proficiency: "Intermediate"
      }
    ];

    this.props.updateSettings({ selectedNativeLanguage });
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
        title={EN["AddLanguage"]}
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
      <View style={styles.scrollContainer}>
        <ScrollView automaticallyAdjustContentInsets={true}>
          <View style={styles.headerContainer}>
            {/* Linear Gradient */}
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
                <GoBackButton navigation={this.props.navigation} />
              }
            />
            <Text style={styles.windowTitle}>{EN["Languages"]}</Text>
          </View>

          {/* Native Language */}
          <Text style={styles.nativeLanguageTitle}>{EN["NativeLanguage"]}</Text>

          <List containerStyle={styles.marginBottom10}>
            {this.props.selectedNativeLanguage[0] && (
              <ListItem
                key={selectedNativeLanguage[0].code}
                title={selectedNativeLanguage[0].name}
                onPress={() => {
                  this.props.updateSettings({
                    selectionItemType: "languages",
                    selectionItemName: "nativeLanguage"
                  });
                  this.props.navigation.dispatch({ type: "SelectListView" });
                }}
              />
            )}
          </List>

          {/* Secondary Languages */}
          <Text style={styles.nativeLanguageTitle}>
            {EN["SecondaryLanguages"]}
          </Text>

          <List>{this.renderSecundaryLanguagesList()}</List>

          {/* Areas of expertise */}
          <List>
            <ListItem
              title={EN["AreasExpertise"]}
              onPress={() => {
                this.props.updateSettings({
                  selectionItemType: "areasOfExpertise",
                  selectionItemName: "areasOfExpertise"
                });
                this.props.navigation.dispatch({ type: "SelectListView" });
              }}
            />
          </List>
        </ScrollView>
        <View style={styles.containerBottom}>
          {/* Next Button */}
          <Button
            buttonStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
            title="Create"
            onPress={() => {
              if (this.props.selectedSecondaryLanguages.length < 1) {
                Alert.alert("Please, select at least secondary language");
              } else {
                navigation.dispatch({ type: "SelectRoleView" });
              }
            }}
          />
        </View>
      </View>
    );
  }
}

// MAP STATE TO PROPS HERE
const mS = state => ({
  selectedNativeLanguage: state.linguistForm.selectedNativeLanguage,
  selectedSecondaryLanguages: state.linguistForm.selectedSecondaryLanguages
});

// MAP DISPATCH TO PROPS HERE
const mD = {
  updateSettings
};

// EXPORT DEFAULT HERE AT THE BOTTOM
export default connect(mS, mD)(SelectLanguageView);
