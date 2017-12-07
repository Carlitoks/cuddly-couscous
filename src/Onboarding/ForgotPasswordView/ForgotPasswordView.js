import React, { Component } from "react";
import { connect } from "react-redux";

import { ScrollView, View, Alert } from "react-native";
import { RkButton, RkTextInput, RkText } from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/MaterialIcons";

import { clearForm, updateForm } from "../../Ducks/ForgotPassowrdReducer";
//import { loginUser } from "../../Ducks/AuthReducer";

import { styles } from "./styles";

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
          <RkText style={styles.title}>{EN["forgotPassword"]}</RkText>

          {/* Email */}
          <RkTextInput
            placeholder={EN["email"]}
            autoCorrect={false}
            onChangeText={text => this.props.updateForm({ email: text })}
            value={this.props.email}
            keyboardType={"email-address"}
          />

          {/* Forgot Password Button */}
          <RkButton
            style={styles.Button}
            onPress={() => Alert.alert("ForgotPassword")}
          >
            {EN["resetpassword"]}
          </RkButton>

          {/* Register */}
          <RkText
            style={{ color: "blue", padding: 10 }}
            onPress={() => Alert.alert("new account")}
          >
            {EN["newaccount"]}
          </RkText>

          {/* Troubleshoot Button */}
          <RkText
            style={{ color: "blue", padding: 10 }}
            onPress={() => Alert.alert("troubleshoot")}
          >
            {EN["troubleshoot"]}
          </RkText>
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
