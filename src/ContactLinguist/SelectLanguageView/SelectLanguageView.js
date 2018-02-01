import React, { Component } from "react";
import { connect } from "react-redux";
import Languages from "../../Config/Languages";
import {
  updateSettings,
  clearSettings
} from "../../Ducks/ContactLinguistReducer";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, View, ScrollView, Alert, Image, KeyboardAvoidingView } from "react-native";
import {
  SearchBar,
  List,
  ListItem,
  Button,
  Header
} from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { topIOS } from "../../Util/Devices";
import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import I18n from "../../I18n/I18n";
import { styles } from "./styles";
import { Images, Colors } from "../../Themes";

class SelectLanguague extends Component {
  componentDidMount() {
    this.props.clearSettings();
  }

  validate() {
    if (!this.props.selectedLanguage) {
      Alert.alert(I18n.t("selectLanguage"));
    } else {
      navigation.dispatch({ type: "CallTimeView" });
    }
  }

  filterList = language => {
    return Languages.filter(lang =>
      lang.name.toLowerCase().startsWith(language.toLowerCase())
    ).map((lang, i) => (
      <ListItem
        hideChevron={
          this.props.selectedLanguage === "" ||
          this.props.selectedLanguage !== lang.name
        }
        key={i}
        title={lang.name}
        rightIcon={
          this.props.selectedLanguage === lang.name ? (
            <Icon name="check" />
          ) : (
              undefined
            )
        }
        onPress={() => {
          this.props.updateSettings({
            selectedLanguage: lang.name,
            selectedLanguageCode: lang["3"]
          });
        }}
      />
    ));
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <ViewWrapper style={{ flex: 1 }}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
          alwaysBounceVertical={false} 
          contentContainerStyle={styles.contentScrollContainer}
        >
          <View style={styles.header}>
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
              outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
              backgroundColor="transparent"
              leftComponent={
                <GoBackButton navigation={this.props.navigation} />
              }
              rightComponent={
                <SettingsButton navigation={this.props.navigation} />
              }
            />

            {/* Select the Language You Need a Linguist in */}
            <Text style={styles.mainTitle}>{I18n.t("selectLanguage")}</Text>
            <View style={styles.languages}>
              <Text style={styles.primaryLanguage}>{I18n.t("english")}</Text>
              <Icon size={30} name="swap-horiz" color="white" style={styles.iconChange} />
              <Text style={styles.secondaryLanguage}>
                {this.props.selectedLanguage}
              </Text>
            </View>

            {/* Searchbar */}
            <SearchBar
              lightTheme
              containerStyle={styles.containerSearch}
              placeholder={I18n.t("search")}
              inputStyle={styles.inputSearch}
              icon={{ name: "search" }}
              onChangeText={text =>
                this.props.updateSettings({ searchLanguage: text })}
            />
          </View>
          <List containerStyle={styles.listContainer}>
            {this.filterList(this.props.searchLanguage)}
          </List>
        </ScrollView>

        {/* Next Button */}
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={topIOS()}>
        <Button
          textStyle={styles.textStep}
          buttonStyle={styles.buttonStep}
          title={I18n.t("next")}
          onPress={() => navigation.dispatch({ type: "CallTimeView" })}
        />
        </KeyboardAvoidingView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  searchLanguage: state.contactLinguist.searchLanguage,
  selectedLanguage: state.contactLinguist.selectedLanguage,
  selectedLanguageCode: state.contactLinguist.selectedLanguageCode
});

const mD = {
  updateSettings,
  clearSettings
};

export default connect(mS, mD)(SelectLanguague);
