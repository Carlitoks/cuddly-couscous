import React, { Component } from "react";
import { Text, View, ScrollView, Alert, Image } from "react-native";
import EN from "../../I18n/en";
import { SearchBar, List, ListItem, Button } from "react-native-elements";
import { Images } from "../../Themes";
import {
  RkButton,
  RkTextInput,
  RkText,
  rkType,
  RkCardImg
} from "react-native-ui-kitten";

import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class SelectLanguague extends Component {
  render() {
    const list = [
      {
        name: "English"
      },
      {
        name: "Spanish"
      },
      {
        name: "Russian"
      },
      {
        name: "German"
      },
      {
        name: "Portugal"
      },
      {
        name: "Spanish"
      },
      {
        name: "French"
      }
    ];
    const navigation = this.props.navigation;

    handleIndexChange = index => {
      this.setState({ ...this.state, selectedIndex: index });
    };

    return (
      <View style={styles.scrollContainer}>
        <ScrollView automaticallyAdjustContentInsets={true}>
          <View style={styles.container}>
            <View style={styles.arrowBack}>
              <Icon
                name="arrow-back"
                size={30}
                color={"#7c7cad"}
                onPress={() => navigation.dispatch({ type: "back" })}
              />
            </View>
            <View style={styles.settings}>
              <Icon
                name="settings"
                size={30}
                color={"#7c7cad"}
                onPress={() => navigation.dispatch({ type: "back" })}
              />
            </View>
          </View>
          <RkText style={styles.mainTitle}>{EN["selectLanguage"]}</RkText>
          <View style={styles.languages}>
            <RkText style={styles.english}>{EN["english"]}</RkText>
            <RkText style={styles.spanish}>{EN["spanish"]}</RkText>
          </View>
          <SearchBar
            containerStyle={styles.containerSearch}
            placeholder="Search"
            inputStyle={styles.inputSearch}
            icon={{ name: "search" }}
          />
          <List>
            {list.map((item, i) => (
              <ListItem hideChevron key={i} title={item.name} />
            ))}
          </List>
        </ScrollView>
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
