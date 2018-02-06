import React, { Component } from "react";
import { connect } from "react-redux";

import { updateForm, clearForm } from "../../Ducks/LinguistFormReducer";

import { View, Text, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, FormInput } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { topIOS } from "../../Util/Devices";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import Header from "../Header/Header";

import styles from "./styles";
import { Images, Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

class NameLinguist extends Component {
  componentWillUnmount() {
    this.props.clearForm();
  }

  navigate = this.props.navigation.navigate;

  validateForm() {
    let updates = {};
    let valid = true;

    if (!this.props.firstname) {
      updates = {
        ...updates,
        FirstnameErrorMessage: I18n.t("enterNameField")
      };
      valid = false;
    }

    if (!this.props.lastname) {
      updates = {
        ...updates,
        LastnameErrorMessage: I18n.t("enterLastNameField")
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      this.tempDisplayErrors(
        updates.FirstnameErrorMessage,
        updates.LastnameErrorMessage
      );
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    if (this.validateForm()) {
      this.props.navigation.dispatch({ type: "EmailLinguistView" });
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
              mainTitle={`${this.props.mainTitle} ${this.props.lastname}`}
              subtitle={I18n.t("nameLinguistText")}
              large
            />
            <View style={styles.allField}>
              <FormInput
                containerStyle={styles.containerInput}
                inputStyle={styles.inputText}
                placeholder={I18n.t("linguistName")}
                onChangeText={text =>
                  this.props.updateForm({
                    firstname: text,
                    mainTitle: text
                  })
                }
                maxLength={20}
                value={this.props.firstname}
              />
            </View>
            <View style={styles.containerView}>
              <FormInput
                containerStyle={styles.containerInput}
                inputStyle={styles.inputText}
                placeholder={I18n.t("linguistLastName")}
                onChangeText={text => this.props.updateForm({ lastname: text })}
                maxLength={20}
                value={this.props.lastname}
              />
            </View>
            <View style={styles.containerView}>
              <FormInput
                containerStyle={styles.containerInput}
                inputStyle={styles.inputText}
                placeholder={I18n.t("preferredName")}
                value={this.props.preferredName}
                onChangeText={text =>
                  this.props.updateForm({ preferredName: text })
                }
                maxLength={20}
              />
              <Text style={styles.formText}>
                {I18n.t("preferredLinguistText")}
              </Text>
            </View>
          </View>
        </ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={topIOS()}>
        <View style={styles.containerBottom}>
          {/* Next Button */}
          <Button
            buttonStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
            title={I18n.t("next")}
            onPress={() => this.submit()}
          />
        </View>
        </KeyboardAvoidingView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  firstname: state.linguistForm.firstname,
  lastname: state.linguistForm.lastname,
  formHasErrors: state.linguistForm.formHasErrors,
  preferredName: state.linguistForm.preferredName,
  mainTitle: state.linguistForm.mainTitle
});

const mD = {
  updateForm,
  clearForm
};

export default connect(mS, mD)(NameLinguist);
