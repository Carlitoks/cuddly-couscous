import React, { Component } from "react";
import { connect } from "react-redux";

import { ScrollView, View, Alert, Text } from "react-native";
import { Button, FormLabel, FormInput } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";

import { clearForm, updateForm } from "../../Ducks/LoginReducer";
import { logInAsync, haveSession } from "../../Ducks/AuthReducer";

import InputPassword from "../../Components/InputPassword/InputPassword";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";

import styles from "./styles";

// For the moment
import EN from "../../I18n/en";

class LoginView extends Component {
  componentWillMount() {
    //
  }

  componentWillUnmount() {
    this.props.clearForm();
  }

  submit() {
    if (!this.props.email) {
      // alert or toast or whatever
    }

    if (!this.props.password) {
      // alert or toast or whatever
    }

    this.props.logInAsync(this.props.email, this.props.password);
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={styles.scrollContainer}
      >
        <Grid>
          <Col>
            {/* Go Back Component */}
            <GoBackButton navigation={this.props.navigation} />

            {/* Title */}
            <Text style={styles.title}>{EN["signIn"]}</Text>

            {/* Email */}
            <FormInput
              style={styles.FormInput}
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

            {/* Sign In Button */}
            <Button
              buttonStyle={styles.Button}
              onPress={() => this.submit()}
              title={EN["signIn"]}
            />

            {/* Forgot Password */}
            <Text
              style={styles.forgotPasswordText}
              onPress={() =>
                navigation.dispatch({ type: "ForgotPasswordView" })
              }
            >
              {EN["forgotPassword"]}
            </Text>
          </Col>
        </Grid>
      </ScrollView>
    );
  }
}

const mS = state => ({
  email: state.login.email,
  emailErrorMessage: state.login.emailErrorMessage,
  password: state.login.password,
  passwordErrorMessage: state.login.passwordErrorMessage
});

const mD = {
  clearForm,
  updateForm,
  logInAsync,
  haveSession
};

export default connect(mS, mD)(LoginView);
