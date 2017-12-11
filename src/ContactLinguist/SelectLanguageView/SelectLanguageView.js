import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateSettings,
  LANGUAGE_LIST
} from "../../Ducks/ContactLinguistReducer";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, View, ScrollView, Alert, Image } from "react-native";
import { SearchBar, List, ListItem, Button } from "react-native-elements";

import EN from "../../I18n/en";
import { styles } from "./styles";
import { Images } from "../../Themes";

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
      <View style={styles.scrollContainer}>
        <ScrollView automaticallyAdjustContentInsets={true}>
          <View style={styles.container}>
            {/* Back Arrow */}
            <View style={styles.arrowBack}>
              <Icon
                name="arrow-back"
                size={30}
                color={"#7c7cad"}
                onPress={() => navigation.dispatch({ type: "back" })}
              />
            </View>

            {/* Settings */}
            <View style={styles.settings}>
              <Icon
                name="settings"
                size={30}
                color={"#7c7cad"}
                onPress={() => navigation.dispatch({ type: "back" })}
              />
            </View>
          </View>

          {/* Select the Language You Need a Linguist in */}
          <Text style={styles.mainTitle}>{EN["selectLanguage"]}</Text>
          <View style={styles.languages}>
            <Text style={styles.english}>{EN["english"]}</Text>
            <Text style={styles.spanish}>{EN["spanish"]}</Text>
          </View>

          {/* Searchbar */}
          <SearchBar
            containerStyle={styles.containerSearch}
            placeholder="Search"
            inputStyle={styles.inputSearch}
            icon={{ name: "search" }}
            onChangeText={text =>
              this.props.updateSettings({ searchLanguage: text })
            }
          />
          <List>{this.filterList(this.props.searchLanguage)}</List>
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
