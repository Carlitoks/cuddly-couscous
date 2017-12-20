import React, { Component } from "react";
import { connect } from "react-redux";

import { clearForm, updateForm } from "../../Ducks/RegistrationCustomerReducer";
//import { loginUser } from "../../Ducks/AuthReducer";

import { View, ScrollView, Text } from "react-native";
import { Button, FormLabel, FormInput, Header } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/MaterialIcons";

import InputPassword from "../../Components/InputPassword/InputPassword";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";

import styles from "./styles";

import EN from "../../I18n/en";

class CustomerAccountView extends Component {
  componentWillUnmount() {
    this.props.clearForm();
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
            {/* Header - Navigation */}
            <Header
              outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
              backgroundColor="transparent"
              leftComponent={
                <GoBackButton navigation={this.props.navigation} />
              }
            />

            {/* Title */}
            <Text style={styles.title}> {EN["CustomerAccount"]} </Text>

            {/* Email */}
            <FormInput
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

            {/* Create */}
            <Button
              buttonStyle={styles.Button}
              onPress={() => navigation.dispatch({ type: "CustomerProfile" })}
              title={EN["CreateAccount"]}
            />

            {/* Terms */}
            <Text style={{ padding: 10 }}>
              {EN["CustomerAccountText"]}
              <Text style={styles.Text}> {EN["PrivacyPolicy"]}</Text>{" "}
              {EN["And"]}{" "}
              <Text style={styles.Text}>{EN["TermConditions"]}</Text>
            </Text>

            {/* QR */}
            <Button
              buttonStyle={styles.transparentButton}
              icon={{ name: "qrcode", type: "font-awesome" }}
              onPress={() => navigation.dispatch({ type: "CustomerProfile" })}
              title={EN["ScanQR"]}
            />
          </Col>
        </Grid>
      </ScrollView>
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
  updateForm
};

export default connect(mS, mD)(CustomerAccountView);
