import React, { Component } from "react";
import { connect } from "react-redux";

import { updateForm } from "../../Ducks/LinguistFormReducer";

import {
  View,
  Text,
  ScrollView,
  Alert,
  TextInput,
  Platform
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, Badge } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import Header from "../Header/Header";
import { validatePhoneNumber } from "../../Util/Helpers.js";

import styles from "./styles";
import { Colors } from "../../Themes";
import EN from "../../I18n/en";

class PhoneLinguist extends Component {
  navigate = this.props.navigation.navigate;

  mask = number => {
    let numberWithMask = number.replace(/\D/g, "");

    if (numberWithMask.length > 7) {
      // Add spaces and dashes to mask
      numberWithMask = numberWithMask.replace(
        /^(\d\d\d)(\d{3})(\d{0,4}).*/,
        "($1) $2-$3"
      );
    } else if (numberWithMask.length > 4) {
      // Add parentheses to mask
      numberWithMask = numberWithMask.replace(/^(\d\d\d)(\d{0,3})/, "($1) $2");
    }
    return numberWithMask;
  };

  validateForm() {
    let updates = {};
    let valid = true;

    if (!this.props.phoneNumber) {
      updates = {
        ...updates,
        phoneErrorMessage: "Please enter your Phone Number"
      };
      valid = false;
    }

    if (!validatePhoneNumber(this.props.phoneNumber)) {
      updates = {
        ...updates,
        phoneErrorMessage: "Please enter a valid Phone Number"
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      this.tempDisplayErrors(updates.phoneErrorMessage);
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    if (this.validateForm()) {
      this.props.navigation.dispatch({ type: "SelectLanguageView" });
    }
  }

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
    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
        >
          <View>
            <Header
              navigation={this.props.navigation}
              mainTitle={EN["linguistNumber"]}
              subtitle={EN["linguistNumberText"]}
            />
            <View style={styles.phoneSection}>
              <Badge
                value="+1"
                containerStyle={styles.tagCode}
                textStyle={styles.codeText}
              />
              <TextInput
                style={styles.containerInput}
                onChangeText={number => {
                  const phoneNumber = this.mask(number);
                  this.props.updateForm({
                    phoneNumber
                  });
                }}
                placeholder="(201) 555-0132"
                maxLength={14}
                value={this.props.phoneNumber}
                keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.containerBottom}>
          {/* Next Button */}
          <Button
            buttonStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
            title="Next"
            onPress={() => this.submit()}
          />
        </View>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  phoneNumber: state.linguistForm.phoneNumber,
  formHasErrors: state.linguistForm.formHasErrors
});

const mD = {
  updateForm
};

export default connect(mS, mD)(PhoneLinguist);
