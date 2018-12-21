import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  TouchableOpacity,
  TextInput
} from "react-native";
import styles from "./Styles/SlideUpPanelStyles";
import { connect } from "react-redux";
import { Metrics, Colors } from "./../../../../Themes";
import SlidingUpPanel from "rn-sliding-up-panel";
import { Fonts } from "../../../../Themes";
import { moderateScale } from "../../../../Util/Scaling";
import { Divider, Icon } from "react-native-elements";
import {
  closeSlideMenu,
  changeLangCode,
  modifyAdditionalDetails,
  update
} from "../../../../Ducks/NewSessionReducer";
import I18n from "./../../../../I18n/I18n";
import {
  AllowedLanguagePairs,
  FilterLangsByCodes
} from "./../../../../Config/Languages";
import { filter } from "lodash";

class SlideUpPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowDragging: true,
      langPair: []
    };
  }

  getCurrentLangPair = () => {
    const availableLangPair = AllowedLanguagePairs;
    if (
      this.props.langCodeSelection !== null &&
      this.props.langCodeSelection === "primaryLang"
    ) {
      if (this.props.secondaryLangCode !== "")
        return (renderList = FilterLangsByCodes(
          availableLangPair[this.props.secondaryLangCode]
        ));
    }

    if (
      this.props.langCodeSelection !== null &&
      this.props.langCodeSelection === "secondaryLang"
    ) {
      if (this.props.primaryLangCode !== "")
        return (renderList = FilterLangsByCodes(
          availableLangPair[this.props.primaryLangCode]
        ));
    }

    return this.props.availableLanguages;
  };

  renderCheck = currentLang => {
    if (
      this.props.langCodeSelection !== null &&
      this.props.langCodeSelection === "primaryLang"
    ) {
      if (this.props.primaryLangCode === currentLang["3"]) {
        return (
          <Icon
            color={Colors.gradientColor.top}
            containerStyle={styles.checkPadding}
            name={"ios-checkmark"}
            type={"ionicon"}
          />
        );
      } else {
        return <React.Fragment />;
      }
    } else if (
      this.props.langCodeSelection !== null &&
      this.props.langCodeSelection === "secondaryLang"
    ) {
      if (this.props.secondaryLangCode === currentLang["3"]) {
        return (
          <Icon
            color={Colors.gradientColor.top}
            containerStyle={styles.checkPadding}
            name={"ios-checkmark"}
            type={"ionicon"}
          />
        );
      } else {
        return <React.Fragment />;
      }
    }
  };

  renderButtonContent = currentLang => {
    let ButtonStyle = {
      ...styles.availableLangText,
      color: Colors.pricingViewBlack
    };
    let currentIcon = this.renderCheck(currentLang);
    if (this.props.langCodeSelection === "primaryLang") {
      if (this.props.primaryLangCode === currentLang["3"])
        ButtonStyle = {
          ...styles.availableLangText,
          color: Colors.gradientColor.top
        };
    }

    if (this.props.langCodeSelection === "secondaryLang") {
      if (this.props.secondaryLangCode === currentLang["3"])
        ButtonStyle = {
          ...styles.availableLangText,
          color: Colors.gradientColor.top
        };
    }

    return (
      <React.Fragment>
        <Text style={ButtonStyle}>{currentLang.name}</Text>
        {currentIcon}
      </React.Fragment>
    );
  };

  renderAvailableLanguages = () => {
    let renderList =
      this.props.langCodeSelection === "secondaryLang"
        ? this.getCurrentLangPair()
        : this.props.availableLanguages;
    return renderList.map((language, index) => {
      return (
        <React.Fragment key={index}>
          <TouchableOpacity
            style={styles.LangViewContainer}
            onPress={() => this.changeLangCode(language["3"])}
          >
            <View style={styles.selectLangButton}>
              {this.renderButtonContent(language)}
            </View>
          </TouchableOpacity>
          <Divider style={styles.dividerStyle} />
        </React.Fragment>
      );
    });
  };

  renderUnAvailableLanguages = () => {
    return this.props.comingSoonLanguages.map((language, index) => {
      return (
        <React.Fragment key={index}>
          <View style={styles.LangViewContainer}>
            <TouchableOpacity>
              <Text style={styles.unAvailableLangText}>{language.name}</Text>
            </TouchableOpacity>
          </View>
          <Divider style={styles.dividerStyle} />
        </React.Fragment>
      );
    });
  };

  changeLangCode = langCode => {
    this.props.changeLangCode({ langCode });
  };

  renderLanguageSelection = () => {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <React.Fragment>
          <View style={styles.availableLangContainer}>
            <Text style={styles.availableLangContainerText}>
              {this.props.langCodeSelection === "primaryLang"
                ? I18n.t("customerHome.primaryLang.label")
                : I18n.t("sessionLang.selections")}
            </Text>
          </View>
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
    );
  };

  renderAdditionalInfo = () => {
    return (
      <View style={styles.aditionalInfoContainer}>
        <View style={styles.availableLangContainer}>
          <Text style={styles.availableLangContainerText}>
            {I18n.t("customerHome.customNote.description")}
          </Text>
        </View>
        <View style={styles.additionalInformationContainer}>
          <TextInput
            style={styles.additionalInformationInput}
            autoFocus={true}
            returnKeyType={'done'}
            multiline={true}
            blurOnSubmit={true}
            onSubmitEditing={() =>
              this.props.update({ isSlideUpMenuVisible: false })
            }
            onChangeText={text =>
              this.props.modifyAdditionalDetails({ customScenarioNote: text })
            }
            value={this.props.customScenarioNote}
            placeholder={I18n.t("customerHome.customNote.placeholder")}
            placeholderTextColor={"rgba(255,255,255,0.42)"}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <SlidingUpPanel
        visible={this.props.isSlideUpMenuVisible}
        onRequestClose={() => this.props.closeSlideMenu()}
        height={Metrics.height * 0.7}
        allowDragging={false}
        draggableRange={{ top: Metrics.height * 0.7, bottom: 0 }}
      >
        <View Style={styles.backgroundContainer}>
          {this.props.langCodeSelection === "additionalDetails"
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
