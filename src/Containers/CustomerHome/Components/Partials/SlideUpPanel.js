import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Divider, Icon } from 'react-native-elements';
import styles from './Styles/SlideUpPanelStyles';
import { Metrics, Colors } from '../../../../Themes';
import {
  closeSlideMenu,
  changeLangCode,
  modifyAdditionalDetails,
  update
} from '../../../../Ducks/NewSessionReducer';
import I18n, { translateLanguage } from '../../../../I18n/I18n';
import { AllowedLanguagePairs, FilterLangsByCodes } from '../../../../Config/Languages';

class SlideUpPanel extends Component {
  getCurrentLangPair = () => {
    const {
      langCodeSelection,
      secondaryLangCode,
      primaryLangCode,
      availableLanguages
    } = this.props;
    const availableLangPair = AllowedLanguagePairs;
    if (langCodeSelection !== null && langCodeSelection === 'primaryLang') {
      if (secondaryLangCode !== '') return FilterLangsByCodes(availableLangPair[secondaryLangCode]);
    }

    if (langCodeSelection !== null && langCodeSelection === 'secondaryLang') {
      if (primaryLangCode !== '') return FilterLangsByCodes(availableLangPair[primaryLangCode]);
    }

    return availableLanguages;
  };

  renderCheck = currentLang => {
    const { langCodeSelection, secondaryLangCode, primaryLangCode } = this.props;
    if (langCodeSelection !== null && langCodeSelection === 'primaryLang') {
      if (primaryLangCode === currentLang['3']) {
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
    if (langCodeSelection !== null && langCodeSelection === 'secondaryLang') {
      if (secondaryLangCode === currentLang['3']) {
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
    const { langCodeSelection, primaryLangCode, secondaryLangCode } = this.props;
    let ButtonStyle = {
      ...styles.availableLangText,
      color: Colors.pricingViewBlack
    };
    const currentIcon = this.renderCheck(currentLang);
    if (langCodeSelection === 'primaryLang') {
      if (primaryLangCode === currentLang['3'])
        ButtonStyle = {
          ...styles.availableLangText,
          color: Colors.gradientColor.top
        };
    }

    if (langCodeSelection === 'secondaryLang') {
      if (secondaryLangCode === currentLang['3'])
        ButtonStyle = {
          ...styles.availableLangText,
          color: Colors.gradientColor.top
        };
    }
    return (
      <React.Fragment>
        <Text style={ButtonStyle}>{translateLanguage(currentLang['3'], currentLang.name)}</Text>
        {currentIcon}
      </React.Fragment>
    );
  };

  renderAvailableLanguages = () => {
    const { langCodeSelection, availableLanguages } = this.props;
    const renderList =
      langCodeSelection === 'secondaryLang' ? this.getCurrentLangPair() : availableLanguages;
    return renderList.map((language, current) => (
      <React.Fragment key={current}>
        <TouchableOpacity
          style={styles.LangViewContainer}
          onPress={() => this.changeLangCode(language['3'])}
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
              {translateLanguage(language['3'], language.name)}
            </Text>
          </TouchableOpacity>
        </View>
        <Divider style={styles.dividerStyle} />
      </React.Fragment>
    ));
  };

  changeLangCode = langCode => {
    const { changeLangCode } = this.props;
    changeLangCode({ langCode });
  };

  renderLanguageSelection = () => {
    const { langCodeSelection } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <React.Fragment>
          <View style={styles.availableLangContainer}>
            <Text style={styles.availableLangContainerText}>
              {langCodeSelection === 'primaryLang'
                ? I18n.t('customerHome.primaryLang.label')
                : I18n.t('sessionLang.selections')}
            </Text>
          </View>
          <Divider style={styles.dividerStyle} />
          {this.renderAvailableLanguages()}
          <View style={styles.unAvailableLangContainer}>
            <Text style={styles.unAvailableLangContainerText}>
              {I18n.t('sessionLang.comingSoon')}
            </Text>
          </View>
          <Divider style={styles.dividerStyle} />
          {this.renderUnAvailableLanguages()}
        </React.Fragment>
      </ScrollView>
    );
  };

  renderAdditionalInfo = () => {
    const { update, modifyAdditionalDetails, customScenarioNote } = this.props;
    return (
      <View style={styles.aditionalInfoContainer}>
        <View style={styles.availableLangContainer}>
          <Text style={styles.availableLangContainerText}>
            {I18n.t('customerHome.customNote.description')}
          </Text>
        </View>
        <View style={styles.additionalInformationContainer}>
          <TextInput
            style={styles.additionalInformationInput}
            autoFocus
            returnKeyType="done"
            multiline
            blurOnSubmit
            onSubmitEditing={() => update({ isSlideUpMenuVisible: false })}
            onChangeText={text => modifyAdditionalDetails({ customScenarioNote: text })}
            value={customScenarioNote}
            placeholder={I18n.t('customerHome.customNote.placeholder')}
            placeholderTextColor="rgba(255,255,255,0.42)"
          />
        </View>
      </View>
    );
  };

  render() {
    const { isSlideUpMenuVisible, closeSlideMenu, langCodeSelection } = this.props;
    return (
      <SlidingUpPanel
        visible={isSlideUpMenuVisible}
        onRequestClose={() => closeSlideMenu()}
        height={Metrics.height * 0.7}
        allowDragging={false}
        draggableRange={{ top: Metrics.height * 0.7, bottom: 0 }}
      >
        <View Style={styles.backgroundContainer}>
          {langCodeSelection === 'additionalDetails'
            ? this.renderAdditionalInfo()
            : this.renderLanguageSelection()}
        </View>
      </SlidingUpPanel>
    );
  }
}

const mS = state => ({
  availableLanguages: state.newSessionReducer.availableLanguages,
  comingSoonLanguages: state.newSessionReducer.comingSoonLanguages,
  isSlideUpMenuVisible: state.newSessionReducer.isSlideUpMenuVisible,
  primaryLangCode: state.newSessionReducer.session.primaryLangCode,
  secondaryLangCode: state.newSessionReducer.session.secondaryLangCode,
  langCodeSelection: state.newSessionReducer.langCodeSelection,
  customScenarioNote: state.newSessionReducer.session.customScenarioNote
});

const mD = {
  closeSlideMenu,
  changeLangCode,
  modifyAdditionalDetails,
  update
};

export default connect(
  mS,
  mD
)(SlideUpPanel);
