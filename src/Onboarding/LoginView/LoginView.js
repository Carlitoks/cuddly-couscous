import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, View, Alert } from "react-native";
import { RkButton, RkTextInput, RkText } from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/MaterialIcons";

import { clearForm, updateForm } from "../../Ducks/LoginReducer";
//import { loginUser } from "../../Ducks/AuthReducer";

import InputPassword from "../../Components/InputPassword/InputPassword";

import { styles } from "./styles";

// For the moment
import EN from "../../I18n/en";

class LoginView extends Component {
  componentWillMount() {
    //
  }

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
          <RkText style={styles.title}>{EN["signIn"]}</RkText>

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

          {/* Sign In Button */}
          <RkButton
            style={styles.Button}
            onPress={() => Alert.alert("Sign In")}
          >
            {EN["signIn"]}
          </RkButton>

          {/* Forgot Password */}
          <RkText
            style={{ color: "blue", padding: 10 }}
            onPress={() => navigation.dispatch({ type: "ForgotPasswordView" })}
          >
            {EN["forgotPassword"]}
          </RkText>
        </View>
      </ScrollView>
    );
  }
}

const mS = state => ({
  email: state.loginReducer.email,
  emailErrorMessage: state.loginReducer.emailErrorMessage,
  password: state.loginReducer.password,
  passwordErrorMessage: state.loginReducer.passwordErrorMessage
});

const mD = {
  clearForm,
  updateForm
};

export default connect(mS, mD)(LoginView);
