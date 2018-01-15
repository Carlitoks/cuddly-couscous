import React, { Component } from "react";
import { connect } from "react-redux";

import {
  clearForm,
  updateForm,
  errorForm,
  registerDevice
} from "../../Ducks/RegistrationCustomerReducer";

import { View, ScrollView, Text, Alert } from "react-native";
import { Button, FormLabel, FormInput, Header } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import InputPassword from "../../Components/InputPassword/InputPassword";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import { EMAIL_REGEX } from "../../Util/Constants";
import styles from "./styles";
import { Colors } from "../../Themes";

import EN from "../../I18n/en";

class CustomerAccountView extends Component {
  componentWillUnmount() {
    this.props.clearForm();
  }
  componentWillMount() {}

  validateForm() {
    const patt = new RegExp(EMAIL_REGEX);
    let updates = {};
    let valid = true;

    if (!patt.test(this.props.email)) {
      updates = {
        ...updates,
        emailErrorMessage: "Not A Valid Email"
      };
      valid = false;
    }

    if (!this.props.email) {
      updates = {
        ...updates,
        emailErrorMessage: "Empty Email"
      };
      valid = false;
    }

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
      this.tempDisplayErrors(
        updates.emailErrorMessage,
        updates.passwordErrorMessage
      );
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit = () => {
    this.props.updateForm({ performingRequest: true });

    if (this.validateForm()) {
      if (!this.props.formHasErrors) {
        this.props.registerDevice().then(response => {
          if (response.type !== "networkErrors/error") {
            this.props.navigation.dispatch({
              type: "CustomerProfile"
            });
          } else {
            const errorMessage = response.payload.response.data.errors[0];
            Alert.alert("error", errorMessage);
          }
        });
      } else {
        if (this.props.formHasErrors) {
          this.tempDisplayErrors(
            this.props.emailErrorMessage,
            this.props.passwordErrorMessage
          );
        }
      }
    }

    this.props.updateForm({ performingRequest: false });
  };

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

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
        >
          <Grid>
            <Col>
              <Row>
                {/* Linear Gradient */}
                <LinearGradient
                  colors={[
                    Colors.gradientColor.top,
                    Colors.gradientColor.middle,
                    Colors.gradientColor.bottom
                  ]}
                  style={styles.linearGradient}
                />
                <Col>
                  {/* Header - Navigation */}
                  <TopViewIOS/>   
                  <Header
                    outerContainerStyles={{ borderBottomWidth: 0, height: 50 }}
                    backgroundColor="transparent"
                    leftComponent={
                      <GoBackButton navigation={this.props.navigation} />
                    }
                  />

                  {/* Title */}
                  <Text style={styles.title}> {EN["CustomerAccount"]} </Text>
                </Col>
              </Row>
              {/* Email */}
              <FormInput
                containerStyle={styles.formInputContainer}
                style={styles.formInput}
                placeholder={EN["email"]}
                autoCorrect={false}
                onChangeText={text => this.props.updateForm({ email: text })}
                value={this.props.email}
                keyboardType={"email-address"}
              />

              {/* Password */}
              <InputPassword
                style={styles.InputPassword}
                placeholder={EN["password"]}
                onChangeText={text => this.props.updateForm({ password: text })}
                value={this.props.password}
              />

              {/* Terms */}
              <Text
                style={{
                  padding: 10,
                  textAlign: "center",
                  alignSelf: "center",
                  alignItems: "center"
                }}
              >
                {EN["CustomerAccountText"]}
                <Text style={styles.Text}> {EN["PrivacyPolicy"]}</Text>{" "}
                {EN["And"]}{" "}
                <Text style={styles.Text}>{EN["TermConditions"]}</Text>
              </Text>
            </Col>
          </Grid>
        </ScrollView>
        <View style={styles.containerBottom}>
          {/* Create */}
          <Button
            textStyle={styles.createAccountText}
            buttonStyle={styles.Button}
            onPress={this.submit}
            title={EN["CreateAccount"]}
          />
        </View>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  email: state.registrationCustomer.email,
  emailErrorMessage: state.registrationCustomer.emailErrorMessage,
  password: state.registrationCustomer.password,
  passwordErrorMessage: state.registrationCustomer.passwordErrorMessage
});

const mD = {
  clearForm,
  updateForm,
  errorForm,
  registerDevice
};

export default connect(mS, mD)(CustomerAccountView);