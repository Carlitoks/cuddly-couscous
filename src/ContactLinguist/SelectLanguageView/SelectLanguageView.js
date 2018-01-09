import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateSettings,
  LANGUAGE_LIST
} from "../../Ducks/ContactLinguistReducer";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, View, ScrollView, Alert, Image } from "react-native";
import {
  SearchBar,
  List,
  ListItem,
  Button,
  Header
} from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";

import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS"

import EN from "../../I18n/en";
import { styles } from "./styles";
import { Images, Colors } from "../../Themes";

class SelectLanguague extends Component {
  filterList = language => {
    return LANGUAGE_LIST.filter(lang =>
      lang.toLowerCase().startsWith(language.toLowerCase())
    ).map((lang, i) => (
      <ListItem
        hideChevron
        key={i}
        title={lang}
        onPress={() => {
          this.props.updateSettings({ selectedLanguage: lang });
        }}
      />
    ));
  };

  render() {
    const navigation = this.props.navigation;

    return (
            
      <View style={{ flex: 1 }}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentScrollContainer}
        >
          <Col>
            {/* Linear Gradient */}
            <TopViewIOS/>
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
            <Text style={styles.mainTitle}>{EN["selectLanguage"]}</Text>
            <View style={styles.languages}>
              <Text style={styles.english}>{EN["english"]}</Text>
              <Icon size={30} name="swap-horiz" color="white" style={styles.iconChange}/>
              <Text style={styles.spanish}>{EN["spanish"]}</Text>
            </View>

            {/* Searchbar */}
            <SearchBar
              lightTheme
              containerStyle={styles.containerSearch}
              placeholder="Search"
              inputStyle={styles.inputSearch}
              icon={{ name: "search" }}
              onChangeText={text =>
                this.props.updateSettings({ searchLanguage: text })
              }
            />
          </Col>
          <List containerStyle={styles.listContainer}>
            {this.filterList(this.props.searchLanguage)}
          </List>
        </ScrollView>

        {/* Next Button */}
        <Button
          textStyle={styles.textStep}
          buttonStyle={styles.buttonStep}
          title="Next"
          onPress={() => navigation.dispatch({ type: "CallTimeView" })}
        />
      </View>
    );
  }
}

const mS = state => ({
  searchLanguage: state.contactLinguist.searchLanguage,
  selectedLanguage: state.contactLinguist.selectedLanguage
});

const mD = {
  updateSettings
};

export default connect(mS, mD)(SelectLanguague);
