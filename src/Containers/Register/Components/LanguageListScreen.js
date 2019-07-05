import React, { Component } from "react";
import {
  ScrollView, View, Alert, Text, TouchableOpacity,
} from "react-native";
import { Divider, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { Colors, Fonts } from "../../../Themes";
import NavBar from "../../../Components/NavBar/NavBar";
import I18n, { translateLanguage, translateApiError } from "../../../I18n/I18n";
import { update as updateOnboarding } from "../../../Ducks/OnboardingReducer";
import { primaryCodes } from "../../../Config/Languages";
// Styles
import styles from "./Styles/LanguageListScreenStyles";
import { updateUser } from "../../../Ducks/AccountReducer";

class LanguageListScreen extends Component {

  renderButtonContent = (currentLang) => {
    const { nativeLangCode, user } = this.props;
    let ButtonStyle = {
      ...styles.availableLangText,
      color: Colors.pricingViewBlack,
    };

    if (
      (nativeLangCode != "" && nativeLangCode === currentLang) ||
      (!!user && user.nativeLangCode != "" && user.nativeLangCode === currentLang)
    ) {
      ButtonStyle = {
        ...styles.availableLangText,
        color: Colors.gradientColor.top,
        fontFamily: Fonts.BoldFont,
      };
    }
    return (
      <React.Fragment>
        <Text style={ButtonStyle}>{translateLanguage(currentLang)}</Text>
      </React.Fragment>
    );
  };

  changeLangCode = (langCode) => {
    const {
      updateOnboarding,
      navigation,
      isLoggedIn,
      updateUser,
    } = this.props;
    if (isLoggedIn) {
      const data = { nativeLangCode: langCode };
      updateUser(data)
        .then((res) => {
          return navigation.dispatch({ type: "back" });
        }).catch((e) => {
          Alert.alert(I18n.t("error"), translateApiError(e));
        });
    } else {
      updateOnboarding({ nativeLangCode: langCode });
      return navigation.dispatch({ type: "back" });
    }
  };

  renderAvailableLanguages = () => {
    const { nativeLangCode, user } = this.props;
    return primaryCodes.map((language, current) => {
      let selected = false;
      let containerStyle = styles.LangViewContainer;
      if (
        (nativeLangCode != "" && nativeLangCode === language) ||
        (!!user && user.nativeLangCode != "" && user.nativeLangCode === language)
      ) {
        containerStyle = {
          ...styles.LangViewContainer,
          backgroundColor: "#ECE8F1",
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

  renderList = () => (
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

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
          <NavBar
            leftComponent={(
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.dispatch({ type: "back" })}>
                <View>
                  <Icon name="chevron-left" type="evilicon" color="white" size={50} />
                </View>
              </TouchableOpacity>
)}
            navbarTitle={I18n.t("nativeLanguageTitle")}
          />
          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
            {this.renderList()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mS = state => ({
  nativeLangCode: state.onboardingReducer.nativeLangCode,
  user: state.account.user,
  isLoggedIn: state.auth2.isLoggedIn,
});

const mD = {
  updateOnboarding,
  updateUser,
};

export default connect(mS, mD)(LanguageListScreen);
