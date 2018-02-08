import React, { Component } from "react";
import { connect } from "react-redux";

import { GetOptions, updateForm } from "../../Ducks/LinguistFormReducer";

import { View, Text, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import {
  Button,
  FormLabel,
  List,
  ListItem
} from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { topIOS } from "../../Util/Devices";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import Header from "../Header/Header";

import styles from "./styles";
import { Images, Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

class GenderLinguist extends Component {
  navigate = this.props.navigation.navigate;

  validateForm() {
    let updates = {};
    let valid = true;

    if (!this.props.selectedGender) {
      updates = {
        ...updates,
        GenderErrorMessage: I18n.t("selectGender")
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      this.tempDisplayErrors(updates.GenderErrorMessage);
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    const { navigation } = this.props;

    if (this.validateForm()) {
      navigation.dispatch({ type: "FamiliarityView" });
    }
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
    const genders = this.props.GetOptions();

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          alwaysBounceVertical={false} 
          style={styles.scrollContainer}
        >
          <View>
            <Header
              navigation={this.props.navigation}
              mainTitle={I18n.t("genderName")}
            />
            <List containerStyle={{ borderTopWidth: 0 }}>
              {genders.map((item, i) => (
                <ListItem
                  key={i}
                  containerStyle={styles.genderItem}
                  title={item.gender}
                  hideChevron={
                    this.props.selectedGender === "" ||
                    this.props.selectedGender !== item.gender
                  }
                  titleStyle={{ fontSize: 20 }}
                  rightIcon={
                    this.props.selectedGender !== ""
                      ? { name: "check" }
                      : undefined
                  }
                  onPress={() => {
                    this.props.updateForm({ selectedGender: item.gender });
                  }}
                />
              ))}
            </List>
          </View>
        </ScrollView>
        {/* Next Button */}
        <BottomButton
          title={I18n.t("next")}
          onPress={() => this.submit()}
          color={Colors.linguistFormText}
          buttonColor={Colors.linguistFormButton}
          bold={false}
        />
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  selectedGender: state.linguistForm.selectedGender
});

const mD = {
  GetOptions,
  updateForm
};

export default connect(mS, mD)(GenderLinguist);
