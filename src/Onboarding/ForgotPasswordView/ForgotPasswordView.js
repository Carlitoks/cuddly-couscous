import React, { Component } from "react";
import { connect } from "react-redux";

import { ScrollView, View, Alert, Text, KeyboardAvoidingView } from "react-native";
import { Button, Header, FormInput } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import { resetPasswordAsync } from "../../Ducks/AuthReducer";
import { clearForm, updateForm } from "../../Ducks/ForgotPasswordReducer";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import { topIOS } from "../../Util/Devices";
import { EMAIL_REGEX } from "../../Util/Constants";
import styles from "./styles";
import { Colors } from "../../Themes";

// For the moment
import I18n from "../../I18n/I18n";

class ForgotPasswordView extends Component {
  validateForm() {
    const patt = new RegExp(EMAIL_REGEX);
    let updates = {};
    let valid = true;

    if (!patt.test(this.props.email)) {
      updates = {
        ...updates,
        emailErrorMessage: I18n.t("noValidEmail")
      };
      valid = false;
    }

    if (!this.props.email) {
      updates = {
        ...updates,
        emailErrorMessage: I18n.t("enterEmailField")
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      this.tempDisplayErrors(updates.emailErrorMessage);
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    if (this.validateForm()) {
      this.props.navigation.dispatch({ type: "CheckYourEmailView" });
      this.props.clearForm();
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
    const navigation = this.props.navigation;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          alwaysBounceVertical={false} 
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
                    outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                    backgroundColor="transparent"
                    leftComponent={
                      <GoBackButton navigation={this.props.navigation} />
                    }
                  />

                  {/* Title */}
                  <Text style={styles.title}>{I18n.t("forgotPassword")}</Text>
                </Col>
              </Row>
              {/* Email */}
              <FormInput
                containerStyle={styles.formInputContainer}
                placeholder={I18n.t("email")}
                autoCorrect={false}
                onChangeText={text => this.props.updateForm({ email: text })}
                value={this.props.email}
                keyboardType={"email-address"}
                maxLength={64}
              />

              {/* Troubleshoot Button (Comented until we have a view for this functionality)*/}
              {/* <Text
                style={styles.linksText}
                onPress={() => console.log("navigating")}
              >
                {I18n.t("troubleshoot")}
              </Text> */}
            </Col>
          </Grid>
        </ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={topIOS()}>
        <View style={styles.containerBottom}>
          {/* Forgot Password Button */}
          <Button
            buttonStyle={styles.Button}
            textStyle={styles.buttonText}
            onPress={() => this.submit()}
            title={I18n.t("resetpassword")}
          />
        </View>
        </KeyboardAvoidingView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  email: state.forgotPassword.email,
  formHasErrors: state.forgotPassword.formHasErrors
});

const mD = {
  clearForm,
  updateForm,
  resetPasswordAsync
};

export default connect(mS, mD)(ForgotPasswordView);