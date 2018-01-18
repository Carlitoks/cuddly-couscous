import React, { Component } from "react";
import { connect } from "react-redux";

import { updateSettings } from "../../Ducks/LinguistFormReducer";
import { updateForm } from "../../Ducks/RegistrationCustomerReducer";
import { asyncCreateUser } from "../../Ducks/CustomerProfileReducer";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, View, ScrollView, Image, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  SearchBar,
  List,
  ListItem,
  Button,
  Header
} from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";

import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import NextButton from "../../Components/NextButton/NextButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import EN from "../../I18n/en";
import styles from "./styles";
import { Images, Colors } from "../../Themes";

class LanguageCustomerView extends Component {
  componentWillMount() {
    const selectedNativeLanguage = [
      {
        name: "English",
        code: "eng",
        proficiency: "Intermediate"
      }
    ];

    this.props.updateSettings({ selectedNativeLanguage });
  }

  // Will be changed according the designs
  tempDisplayErrors(...errors) {
    const errorStr = errors.reduce((last, current) => {
      curr = "";
      if (current) {
        curr = `- ${current}\n`;
      }
      return last.concat(curr);
    }, "");

    Alert.alert("Errors", errorStr, [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]);
  }

  render() {
    const navigation = this.props.navigation;
    const { selectedNativeLanguage } = this.props;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView automaticallyAdjustContentInsets={true}>
          <View style={styles.headerContainer}>
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
              outerContainerStyles={styles.header}
              backgroundColor="transparent"
              leftComponent={
                <GoBackButton navigation={this.props.navigation} />
              }
            />
            <Text style={styles.windowTitle}>{EN["Languages"]}</Text>
          </View>

          {/* Native Language */}
          <Text style={styles.nativeLanguageTitle}>{EN["NativeLanguage"]}</Text>

          <List containerStyle={styles.marginBottom10}>
            {this.props.selectedNativeLanguage[0] && (
              <ListItem
                key={selectedNativeLanguage[0].code}
                title={selectedNativeLanguage[0].name}
                onPress={() => {
                  this.props.updateSettings({
                    selectionItemType: "languages",
                    selectionItemName: "nativeLanguage"
                  });
                  this.props.navigation.dispatch({ type: "SelectListView" });
                }}
              />
            )}
          </List>
        </ScrollView>
        <View style={styles.containerBottom}>
          {/* Next Button */}
          <Button
            buttonStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
            title="Next"
            onPress={() => navigation.dispatch({ type: "PhoneCustomerView" })}
          />
        </View>
      </ViewWrapper>
    );
  }
}

// MAP STATE TO PROPS HERE
const mS = state => ({
  selectedNativeLanguage: state.linguistForm.selectedNativeLanguage
});

// MAP DISPATCH TO PROPS HERE
const mD = {
  updateSettings,
  asyncCreateUser,
  updateForm
};

// EXPORT DEFAULT HERE AT THE BOTTOM
export default connect(mS, mD)(LanguageCustomerView);
