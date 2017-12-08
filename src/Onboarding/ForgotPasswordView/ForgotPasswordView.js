import React, { Component } from "react";
import { connect } from "react-redux";

import { ScrollView, View, Alert, Text } from "react-native";
import { Button, FormLabel, FormInput } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";

import { clearForm, updateForm } from "../../Ducks/ForgotPassowrdReducer";
//import { loginUser } from "../../Ducks/AuthReducer";

import styles from "./styles";

// For the moment
import EN from "../../I18n/en";

class ForgotPasswordView extends Component {
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
          <Text style={styles.title}>{EN["forgotPassword"]}</Text>

          {/* Email */}
          <FormInput
            placeholder={EN["email"]}
            autoCorrect={false}
            onChangeText={text => this.props.updateForm({ email: text })}
            value={this.props.email}
            keyboardType={"email-address"}
          />

          {/* Forgot Password Button */}
          <Button
            buttonStyle={styles.Button}
            onPress={() => Alert.alert("ForgotPassword")}
            title={EN["resetpassword"]}
          />

          {/* Register */}
          <Text
            style={styles.linksText}
            onPress={() => Alert.alert("new account")}
          >
            {EN["newaccount"]}
          </Text>

          {/* Troubleshoot Button */}
          <Text
            style={styles.linksText}
            onPress={() => Alert.alert("troubleshoot")}
          >
            {EN["troubleshoot"]}
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const mS = state => ({
  email: state.forgotPassword.email,
  emailErrorMessage: state.forgotPassword.emailErrorMessage
});

const mD = {
  clearForm,
  updateForm
};

export default connect(mS, mD)(ForgotPasswordView);
