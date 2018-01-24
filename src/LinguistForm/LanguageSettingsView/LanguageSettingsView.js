// GENERAL TIPS
// Some comments about code style
import React, { Component } from "react";
import { connect } from "react-redux";
import { filter, isUndefined } from "lodash";

import {
  updateSettings,
  LANGUAGE_INTERPRETATION_LIST,
  PROFICIENCY_LIST
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

import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import RightNavigationButton from "../../Components/RightNavigationButton/RightNavigationButton.js";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import EN from "../../I18n/en";
import styles from "./styles";
import { Images, Colors } from "../../Themes";

class LanguageSettingsView extends Component {
  componentWillMount() {
    this.props.updateSettings({
      selectedProficiency: null,
      selectedLanguageIterpretation: null
    });
  }
  renderProficiencyList = proficiencyList => {
    return proficiencyList.map((item, i) => (
      <ListItem
        hideChevron={
          this.props.selectedProficiency === "" ||
          this.props.selectedProficiency !== item
        }
        roundAvatar
        key={i}
        title={item.name}
        rightIcon={{ name: "check" }}
        subtitle={
          <View style={styles.subtitleView}>
            <Text>{item.subtitle}</Text>
          </View>
        }
        leftIcon={
          <Image
            style={[styles.listItemAvatar, styles.center]}
            source={Images[item.avatar_url]}
          />
        }
        onPress={() => {
          this.props.updateSettings({
            selectedProficiency: item,
            selectedLanguage: {
              ...this.props.selectedLanguage,
              proficiency: item
            }
          });
        }}
      />
    ));
  };

  renderLanguageInterpretationList = interpretationList => {
    return interpretationList.map((item, i) => (
      <ListItem
        wrapperStyle={styles.interpretationItem}
        hideChevron={
          this.props.selectedLanguageIterpretation === "" ||
          this.props.selectedLanguageIterpretation !== item
        }
        key={i}
        title={item.name}
        rightIcon={{ name: "check" }}
        onPress={() => {
          this.props.updateSettings({
            selectedLanguageIterpretation: item,
            selectedLanguage: {
              ...this.props.selectedLanguage,
              interpretation: item
            }
          });
        }}
      />
    ));
  };

  insertCurrentLanguage = (text, language) => {
    return text.replace("<lang>", language);
  };

  render() {
    const navigation = this.props.navigation;

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
            <Header
              outerContainerStyles={styles.header}
              backgroundColor="transparent"
              leftComponent={
                <GoBackButton navigation={this.props.navigation} />
              }
            />

            <Text style={styles.windowTitle}>{EN["LanguageSettings"]}</Text>
          </View>

          <Text style={styles.title}>
            {EN["ProficiencyLevelOf"]} {this.props.selectedLanguage.name}
          </Text>

          <List containerStyle={styles.marginBottom20}>
            {this.renderProficiencyList(PROFICIENCY_LIST)}
          </List>

          <Text style={styles.title}>
            {this.insertCurrentLanguage(
              EN["LanguageInterpretation"],
              this.props.selectedLanguage.name
            )}
          </Text>
          <List>
            {this.renderLanguageInterpretationList(
              LANGUAGE_INTERPRETATION_LIST
            )}
          </List>
        </ScrollView>

        {/* Call Button */}
        <View style={styles.containerBottom}>
          <Button
            buttonStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
            title={EN["Add"]}
            onPress={() => {
              const {
                selectedSecondaryLanguages,
                selectedLanguage,
                back,
                goTo
              } = this.props;

              if (
                isUndefined(selectedLanguage.proficiency) ||
                isUndefined(selectedLanguage.interpretation)
              ) {
                Alert.alert("Please, select at least one item of each list");
              } else {
                const selectedSecondaryLanguagesList = selectedSecondaryLanguages.filter(
                  e => e["3"] !== selectedLanguage["3"]
                );

                this.props.updateSettings({
                  selectedSecondaryLanguages: [
                    ...selectedSecondaryLanguagesList,
                    selectedLanguage
                  ],
                  selectedProficiency: null,
                  selectedLanguageIterpretation: null
                });

                navigation.dispatch({ type: goTo });
              }
            }}
          />
        </View>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  proficiencyList: state.linguistForm.proficiencyList,
  selectedSecondaryLanguages: state.linguistForm.selectedSecondaryLanguages,
  selectedLanguage: state.linguistForm.selectedLanguage,
  selectedProficiency: state.linguistForm.selectedProficiency,
  selectedLanguageIterpretation:
    state.linguistForm.selectedLanguageIterpretation,
  goTo: state.linguistForm.goTo
});

const mD = { updateSettings };

export default connect(mS, mD)(LanguageSettingsView);
