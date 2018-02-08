// GENERAL TIPS
// Some comments about code style
import React, { Component } from "react";
import { connect } from "react-redux";
import { filter, isUndefined, isNull } from "lodash";

import {
  updateSettings,
  LANGUAGE_INTERPRETATION_LIST,
  PROFICIENCY_LIST
} from "../../Ducks/LinguistFormReducer";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, View, ScrollView, Image, Alert, KeyboardAvoidingView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  SearchBar,
  List,
  ListItem,
  Button,
  Header
} from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import { topIOS } from "../../Util/Devices";
import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import RightNavigationButton from "../../Components/RightNavigationButton/RightNavigationButton.js";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import I18n from "../../I18n/I18n";
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
    const { selectedLanguage } = this.props;

    const languageName =
      isUndefined(selectedLanguage) || isNull(selectedLanguage)
        ? ""
        : selectedLanguage.name;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView automaticallyAdjustContentInsets={true} alwaysBounceVertical={false} >
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
                <GoBackButton navigation={this.props.navigation} />
              }
            />

            <Text style={styles.windowTitle}>{I18n.t("languageSettings")}</Text>
          </View>

          <Text style={styles.title}>
            {I18n.t("proficiencyLevelOf")} {languageName}
          </Text>

          <List containerStyle={styles.marginBottom20}>
            {this.renderProficiencyList(PROFICIENCY_LIST)}
          </List>

          <Text style={styles.title}>
            {this.insertCurrentLanguage(
              I18n.t("languageInterpretation"),
              languageName
            )}
          </Text>
          <List>
            {this.renderLanguageInterpretationList(
              LANGUAGE_INTERPRETATION_LIST
            )}
          </List>
        </ScrollView>

        {/* Add Button */}
        <BottomButton
          title={I18n.t("add")}
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
              Alert.alert(I18n.t("selectListLanguage"));
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
          color={Colors.linguistFormText}
          buttonColor={Colors.linguistFormButton}
          bold={false}
        />
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
