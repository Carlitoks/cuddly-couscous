import React, { Component } from "react";
import { connect } from "react-redux";

import { clearForm, updateForm } from "../../Ducks/RegistrationCustomerReducer";
//import { loginUser } from "../../Ducks/AuthReducer";

import { View, ScrollView } from "react-native";
import { RkButton, RkTextInput, RkText, rkType } from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/MaterialIcons";
import InputPassword from "../../Components/InputPassword/InputPassword";

import { styles } from "./styles";

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
          <RkText style={styles.title}> {EN["CustomerAccount"]} </RkText>

          {/* Email */}
          <RkTextInput
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

          <RkButton
            style={styles.Button}
            onPress={() => navigation.dispatch({ type: "CustomerProfile" })}
          >
            {EN["CreateAccount"]}
          </RkButton>

          <RkText style={{ padding: 10 }}>
            {EN["CustomerAccountText"]}
            <RkText style={{ color: "blue" }}> {EN["PrivacyPolicy"]}</RkText>
            {EN["And"]}
            <RkText style={{ color: "blue" }}>{EN["TermConditions"]}</RkText>
          </RkText>

          <RkButton
            style={styles.transparentButton}
            rkType="outline"
            onPress={() => navigation.dispatch({ type: "CustomerProfile" })}
          >
            {EN["ScanQR"]}
          </RkButton>
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
