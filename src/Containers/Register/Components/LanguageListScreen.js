import React, { Component } from "react";
import { ScrollView, View, Alert, Text, TouchableOpacity } from "react-native";
import { Metrics, Colors, Fonts } from "../../../Themes";
import { Divider, Icon } from "react-native-elements";
import { connect } from "react-redux";
import Header from "../../CustomerHome/Components/Header";
import ViewWrapper from "../../ViewWrapper/ViewWrapper";
import I18n, { translateLanguage } from "../../../I18n/I18n";
import { update as updateOnboarding } from "../../../Ducks/OnboardingReducer";
import { updateView, updateProfileAsync } from "../../../Ducks/UserProfileReducer";
import { primaryCodes } from "../../../Config/Languages";
// Styles
import styles from "./Styles/LanguageListScreenStyles";

class LanguageListScreen extends Component {
  componentWillMount() {}

  renderButtonContent = currentLang => {
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
        <Text style={ButtonStyle}>{translateLanguage(currentLang)}</Text>
      </React.Fragment>
    );
  };

  changeLangCode = langCode => {
    const {
      updateOnboarding,
      navigation,
      isLoggedIn,
      updateView,
      updateProfileAsync,
      token,
      uuid,
      nativeLanguageCode
    } = this.props;
    if (isLoggedIn) {
      const data = {
        nativeLangCode: langCode
      };
      updateProfileAsync(uuid, data, token).then(response => {
        const {
          payload,
          payload: { nativeLangCode }
        } = response;

        if (response.type !== "networkErrors/error") {
          updateView({
            nativeLanguageCode: langCode
          });
          return navigation.dispatch({ type: "back" });
        } else {
          const errorMessage = response.payload.response.data.errors[0];
          Alert.alert("error", errorMessage);
        }
      });
    } else {
      updateOnboarding({ nativeLangCode: langCode });
      return navigation.dispatch({ type: "back" });
    }
  };

  renderAvailableLanguages = () => {
    const { nativeLangCode } = this.props;

    return primaryCodes.map((language, current) => {
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
          <TouchableOpacity style={containerStyle} onPress={() => this.changeLangCode(language)}>
            <View style={styles.selectLangButton}>{this.renderButtonContent(language)}</View>
          </TouchableOpacity>
          {!selected ? <Divider style={styles.dividerStyle} /> : <React.Fragment />}
        </React.Fragment>
      );
    });
  };

  renderList = () => {
    return (
      <React.Fragment>
        <View style={styles.availableLangContainer}>
          <View style={styles.availableLangTitleContainer}>
            <Text style={styles.availableLangContainerText}>{I18n.t("nativeLanguage")}</Text>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
            <React.Fragment>{this.renderAvailableLanguages()}</React.Fragment>
          </ScrollView>
        </View>
      </React.Fragment>
    );
  };

  render() {
    const { navigation } = this.props;

    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
          <Header navigation={navigation} />
          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
            {this.renderList()}
          </ScrollView>
        </View>
      </ViewWrapper>
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
  nativeLangCode: state.onboardingReducer.nativeLangCode,
  nativeLanguageCode: state.userProfile.nativeLangCode,
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
  uuid: state.auth.uuid
});

const mD = { updateOnboarding, updateView, updateProfileAsync };

export default connect(
  mS,
  mD
)(LanguageListScreen);
