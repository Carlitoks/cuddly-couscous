import React, { Component } from "react";
import { connect } from "react-redux";

import { updateForm, clearForm } from "../../Ducks/LinguistFormReducer";
import { registerDevice } from "../../Ducks/RegistrationCustomerReducer";
import { asyncCreateUser } from "../../Ducks/CustomerProfileReducer";

import { View, Text, ScrollView, Alert } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, FormLabel, FormInput } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import Header from "../Header/Header";

import styles from "./styles";
import { Images, Colors } from "../../Themes";
import EN from "../../I18n/en";

class PasswordLinguist extends Component {
  componentWillUnmount() {
    this.props.clearForm();
  }

  validateForm() {
    let updates = {};
    let valid = true;

    if (!this.props.password) {
      updates = {
        ...updates,
        passwordErrorMessage: "Empty Password"
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      this.tempDisplayErrors(updates.passwordErrorMessage);
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    if (this.validateForm()) {
      this.props.registerDevice().then(response => {
        if (response.type !== "networkErrors/error") {
          const {
            firstname,
            lastname,
            email,
            password,
            preferredName,
            deviceToken
          } = this.props;
          this.props
            .asyncCreateUser(
              {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                preferredName: preferredName
              },
              deviceToken
            )
            .then(response => {
              this.props.navigation.dispatch({
                type: "GenderLinguistView"
              });
            });
        } else {
          Alert.alert(response.data);
        }
      });
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
          style={styles.scrollContainer}
        >
          <View>
            <Header
              navigation={this.props.navigation}
              mainTitle={EN["linguistPasswordTitle"]}
            />
            <View>
              {/* Password */}
              <FormInput
                containerStyle={styles.containerInput}
                inputStyle={styles.inputText}
                placeholder={EN["linguistPassword"]}
                onChangeText={text => this.props.updateForm({ password: text })}
                autoCorrect={false}
                secureTextEntry={true}
              />
              <Text style={styles.formText}>
                {EN["passwordLinguistText"]}{" "}
                <Text style={styles.links}>{EN["privacyPolicy"]}</Text>{" "}
                {EN["passwordAnd"]}{" "}
                <Text style={styles.links}>{EN["termsConditions"]}</Text>
              </Text>
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
  password: state.linguistForm.password,
  email: state.linguistForm.email,
  firstname: state.linguistForm.firstname,
  lastname: state.linguistForm.lastname,
  preferredName: state.linguistForm.preferredName,
  formHasErrors: state.linguistForm.formHasErrors,
  deviceToken: state.registrationCustomer.deviceToken
});

const mD = {
  updateForm,
  clearForm,
  registerDevice,
  asyncCreateUser
};

export default connect(mS, mD)(PasswordLinguist);
