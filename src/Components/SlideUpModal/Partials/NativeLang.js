import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Divider, Icon } from "react-native-elements";
import styles from "./Styles/LanguagesStyles";
import { Metrics, Colors, Fonts } from "../../../Themes";
import {
  changeLangCode,
  modifyAdditionalDetails,
  update,
  updateSelectedScenario
} from "../../../Ducks/NewSessionReducer";
import { update as updateOnboarding } from "../../../Ducks/OnboardingReducer";
import { closeSlideMenu } from "../../../Ducks/LogicReducer";
import I18n, { translateLanguage } from "../../../I18n/I18n";
import { Languages, supportedLangCodes } from "../../../Config/Languages";

class NativeLang extends Component {
  renderButtonContent = currentLang => {
    const { nativeLangCode } = this.props;
    let ButtonStyle = {
      ...styles.availableLangText,
      color: Colors.pricingViewBlack
    };

    if (nativeLangCode === currentLang["3"])
      ButtonStyle = {
        ...styles.availableLangText,
        color: Colors.gradientColor.top,
        fontFamily: Fonts.BoldFont
      };
    return (
      <React.Fragment>
        <Text style={ButtonStyle}>{translateLanguage(currentLang["3"], currentLang.name)}</Text>
      </React.Fragment>
    );
  };

  renderSupportButtonContent = currentLang => {
    const { nativeLangCode } = this.props;
    let ButtonStyle = {
      ...styles.availableLangText,
      color: Colors.pricingViewBlack
    };

    if (nativeLangCode === currentLang)
      ButtonStyle = {
        ...styles.availableLangText,
        color: Colors.gradientColor.top,
        fontFamily: Fonts.BoldFont
      };
    return (
      <React.Fragment>
        { currentLang == "other"?
        <Text style={ButtonStyle}>{I18n.t("conversations")}</Text>
        :  <Text style={ButtonStyle}>{translateLanguage(currentLang)}</Text>}
      </React.Fragment>
    );
  };

  renderSupportedLanguages = () => {
    const { nativeLangCode, navigation, closeSlideMenu } = this.props;
    let supportedLang = [...supportedLangCodes];
    supportedLang.push("other");
    return supportedLang.map((language, current) => {
      let selected = false;
      let containerStyle = styles.LangViewContainer;
      if (nativeLangCode === language) {
        containerStyle = {
          ...styles.LangViewContainer,
          backgroundColor: "#ECE8F1"
        };
        selected = true;
      }
      return (
      <React.Fragment key={current}>
        <TouchableOpacity
          style={containerStyle}
          onPress={() => {
            if ("other" === language){
              closeSlideMenu();
              return navigation.dispatch({ type: "LoginView" });
            }else{
              this.changeLangCode(language)}
            }
          }
        >
          <View style={styles.selectLangButton}>{this.renderSupportButtonContent(language)}</View>
        </TouchableOpacity>
        { !selected ? <Divider style={styles.dividerStyle} /> : <React.Fragment />}
      </React.Fragment>
    )});
  };

  renderSupportButtonContent = currentLang => {
    const { nativeLangCode } = this.props;
    let ButtonStyle = {
      ...styles.availableLangText,
      color: Colors.pricingViewBlack
    };

    if (nativeLangCode === currentLang)
      ButtonStyle = {
        ...styles.availableLangText,
        color: Colors.gradientColor.top,
        fontFamily: Fonts.BoldFont
      };
    return (
      <React.Fragment>
        {currentLang == "other" ? (
          <Text style={ButtonStyle}>{I18n.t("conversations")}</Text>
        ) : (
          <Text style={ButtonStyle}>{translateLanguage(currentLang)}</Text>
        )}
      </React.Fragment>
    );
  };

  renderSupportedLanguages = () => {
    const { nativeLangCode, navigation, closeSlideMenu } = this.props;
    let supportedLang = [...supportedLangCodes];
    supportedLang.push("other");
    return supportedLang.map((language, current) => {
      let selected = false;
      let containerStyle = styles.LangViewContainer;
      if (nativeLangCode === language) {
        containerStyle = {
          ...styles.LangViewContainer,
          backgroundColor: "#ECE8F1"
        };
        selected = true;
      }
      return (
        <React.Fragment key={current}>
          <TouchableOpacity
            style={containerStyle}
            onPress={() => {
              this.changeLangCode(language);
            }}
          >
            <View style={styles.selectLangButton}>{this.renderSupportButtonContent(language)}</View>
          </TouchableOpacity>
          {!selected ? <Divider style={styles.dividerStyle} /> : <React.Fragment />}
        </React.Fragment>
      );
    });
  };

  renderAvailableLanguages = () => {
    const { nativeLangCode } = this.props;
    return Languages.map((language, current) => {
      let selected = false;
      let containerStyle = styles.LangViewContainer;
      if (nativeLangCode === language["3"]) {
        containerStyle = {
          ...styles.LangViewContainer,
          backgroundColor: "#ECE8F1"
        };
        selected = true;
      }
      return (
        <React.Fragment key={current}>
          <TouchableOpacity
            style={containerStyle}
            onPress={() => this.changeLangCode(language["3"])}
          >
            <View style={styles.selectLangButton}>{this.renderButtonContent(language)}</View>
          </TouchableOpacity>
          {!selected ? <Divider style={styles.dividerStyle} /> : <React.Fragment />}
        </React.Fragment>
      );
    });
  };

  changeLangCode = langCode => {
    const { updateOnboarding, closeSlideMenu, navigation } = this.props;

    closeSlideMenu();
    if ("other" === langCode) {
      return navigation.dispatch({ type: "LanguageListScreen" });
    } else {
      updateOnboarding({ nativeLangCode: langCode });
    }
  };

  render() {
    const { selection } = this.props;
    return (
      <React.Fragment>
        <View style={styles.availableLangContainer}>
          <Text style={styles.availableLangContainerText}>{I18n.t("fields.nativeLang.label")}</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
          <React.Fragment>
            {selection === "nativeSupportedLang"
              ? this.renderSupportedLanguages()
              : this.renderAvailableLanguages()}
          </React.Fragment>
        </ScrollView>
      </React.Fragment>
    );
  }
}

const mS = state => ({
  isSlideUpMenuVisible: state.LogicReducer.isSlideUpMenuVisible,
  selection: state.LogicReducer.selection,
  availableLanguages: state.newSessionReducer.availableLanguages,
  comingSoonLanguages: state.newSessionReducer.comingSoonLanguages,
  primaryLangCode: state.newSessionReducer.session.primaryLangCode,
  secondaryLangCode: state.newSessionReducer.session.secondaryLangCode,
  customScenarioNote: state.newSessionReducer.session.customScenarioNote,
  scenarioID: state.newSessionReducer.session.scenarioID,
  customScenarioSelected: state.newSessionReducer.session.customScenarioSelected,
  scenariosList: state.appConfigReducer.scenarios,
  nativeLangCode: state.onboardingReducer.nativeLangCode
});

const mD = {
  closeSlideMenu,
  changeLangCode,
  modifyAdditionalDetails,
  update,
  updateSelectedScenario,
  updateOnboarding
};

export default connect(
  mS,
  mD
)(NativeLang);
