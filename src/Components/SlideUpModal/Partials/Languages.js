import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Divider, Icon } from "react-native-elements";
import styles from "./Styles/LanguagesStyles";
import { Metrics, Colors } from "../../../Themes";
import {
  changeLangCode,
  modifyAdditionalDetails,
  update,
  updateSelectedScenario
} from "../../../Ducks/NewSessionReducer";
import { closeSlideMenu } from "../../../Ducks/LogicReducer";
import I18n, { translateLanguage } from "../../../I18n/I18n";
import { AllowedLanguagePairs, FilterLangsByCodes } from "../../../Config/Languages";

class Languages extends Component {
  getCurrentLangPair = () => {
    const {
      selection,
      secondaryLangCode,
      primaryLangCode,
      availableLanguages
    } = this.props;
    const availableLangPair = AllowedLanguagePairs;
    if (selection !== null && selection === "primaryLang") {
      if (secondaryLangCode !== "") return FilterLangsByCodes(availableLangPair[secondaryLangCode]);
    }

    if (selection !== null && selection === "secondaryLang") {
      if (primaryLangCode !== "") return FilterLangsByCodes(availableLangPair[primaryLangCode]);
    }

    return availableLanguages;
  };

  renderCheck = currentLang => {
    const {
      selection,
      secondaryLangCode,
      primaryLangCode,
    } = this.props;
    if (selection !== null && selection === "primaryLang") {
      if (primaryLangCode === currentLang["3"]) {
        return (
          <Icon
            color={Colors.gradientColor.top}
            containerStyle={styles.checkPadding}
            name="ios-checkmark"
            type="ionicon"
          />
        );
      }
      return <React.Fragment />;
    }
    if (selection !== null && selection === "secondaryLang") {
      if (secondaryLangCode === currentLang["3"]) {
        return (
          <Icon
            color={Colors.gradientColor.top}
            containerStyle={styles.checkPadding}
            name="ios-checkmark"
            type="ionicon"
          />
        );
      }
      return <React.Fragment />;
    }
    return <React.Fragment />;
  };

  renderButtonContent = currentLang => {
    const { selection, primaryLangCode, secondaryLangCode } = this.props;
    let ButtonStyle = {
      ...styles.availableLangText,
      color: Colors.pricingViewBlack
    };
    const currentIcon = this.renderCheck(currentLang);
    if (selection === "primaryLang") {
      if (primaryLangCode === currentLang["3"])
        ButtonStyle = {
          ...styles.availableLangText,
          color: Colors.gradientColor.top
        };
    }

    if (selection === "secondaryLang") {
      if (secondaryLangCode === currentLang["3"])
        ButtonStyle = {
          ...styles.availableLangText,
          color: Colors.gradientColor.top
        };
    }
    return (
      <React.Fragment>
        <Text style={ButtonStyle}>{translateLanguage(currentLang["3"], currentLang.name)}</Text>
        {currentIcon}
      </React.Fragment>
    );
  };

  renderAvailableLanguages = () => {
    const { selection, availableLanguages } = this.props;
    const renderList =
      selection === "secondaryLang" ? this.getCurrentLangPair() : availableLanguages;
    return renderList.map((language, current) => (
      <React.Fragment key={current}>
        <TouchableOpacity
          style={styles.LangViewContainer}
          onPress={() => this.changeLangCode(language["3"])}
        >
          <View style={styles.selectLangButton}>{this.renderButtonContent(language)}</View>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
      </React.Fragment>
    ));
  };

  renderUnAvailableLanguages = () => {
    const { comingSoonLanguages } = this.props;
    return comingSoonLanguages.map((language, index) => (
      <React.Fragment key={index}>
        <View style={styles.LangViewContainer}>
          <TouchableOpacity>
            <Text style={styles.unAvailableLangText}>
              {translateLanguage(language["3"], language.name)}
            </Text>
          </TouchableOpacity>
        </View>
        <Divider style={styles.dividerStyle} />
      </React.Fragment>
    ));
  };

  changeLangCode = langCode => {
    const { changeLangCode, selection, updateSelectedScenario, closeSlideMenu } = this.props;
    if (selection === "scenarioSelection") {
      updateSelectedScenario({ scenarioID: langCode });
    } else {
      changeLangCode({ langCode });
    }
    closeSlideMenu();
  };

  render() {
    const { selection } = this.props;
    return (
      <React.Fragment>

        <View style={styles.availableLangContainer}>
          <Text style={styles.availableLangContainerText}>
            { selection === "primaryLang"
              ? I18n.t("customerHome.primaryLang.label")
              : I18n.t("newCustomerHome.secondaryLang.label")}
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
          <React.Fragment>
            <Divider style={styles.dividerStyle} />
            {this.renderAvailableLanguages()}
            <View style={styles.unAvailableLangContainer}>
              <Text style={styles.unAvailableLangContainerText}>
                {I18n.t("sessionLang.comingSoon")}
              </Text>
            </View>
            <Divider style={styles.dividerStyle} />
            {this.renderUnAvailableLanguages()}
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
  scenariosList: state.appConfigReducer.scenarios
});

const mD = {
  closeSlideMenu,
  changeLangCode,
  modifyAdditionalDetails,
  update,
  updateSelectedScenario
};

export default connect(
  mS,
  mD
)(Languages);
