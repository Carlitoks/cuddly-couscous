import React, { Component } from "react";
import { connect } from "react-redux";

import { clearForm, updateForm } from "../../Ducks/RegistrationCustomerReducer";
//import { loginUser } from "../../Ducks/AuthReducer";

import { View, ScrollView, Text } from "react-native";
import { Button, FormLabel, FormInput } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import InputPassword from "../../Components/InputPassword/InputPassword";

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
        <View style={styles.formContainer}>
          {/* Back Arrow */}
          <Icon
            style={styles.Icon}
            name="arrow-back"
            size={30}
            color={"#1E90FF"}
            onPress={() => navigation.dispatch({ type: "back" })}
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
          <FormInput
            style={styles.InputPassword}
            placeholder={EN["password"]}
            onChangeText={text => this.props.updateForm({ password: text })}
            value={this.props.password}
            secureTextEntry={true}
          />

          <Button
            buttonStyle={styles.Button}
            onPress={() => navigation.dispatch({ type: "CustomerProfile" })}
            title={EN["CreateAccount"]}
          />

          <Text style={{ padding: 10 }}>
            {EN["CustomerAccountText"]}
            <Text style={{ color: "blue" }}> {EN["PrivacyPolicy"]}</Text>{" "}
            {EN["And"]}{" "}
            <Text style={{ color: "blue" }}>{EN["TermConditions"]}</Text>
          </Text>

          <Button
            buttonStyle={styles.transparentButton}
            icon={{ name: "qrcode", type: "font-awesome" }}
            onPress={() => navigation.dispatch({ type: "CustomerProfile" })}
            title={EN["ScanQR"]}
          />
        </View>
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
