import React, { Component } from "react";
import { connect } from "react-redux";

import { updateForm, clearForm } from "../../Ducks/RegistrationCustomerReducer";

import { View, Text, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, FormInput, Header } from "react-native-elements";
import { topIOS } from "../../Util/Devices";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import { EMAIL_REGEX } from "../../Util/Constants";
import styles from "./styles";
import { Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

class EmailCustomerView extends Component {
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
      this.props.navigation.dispatch({ type: "PasswordCustomerView" });
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
                  <Header
                    outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                    backgroundColor="transparent"
                    leftComponent={
                      <GoBackButton navigation={this.props.navigation} />
                    }
                  />
                  {/* Enter your Name */}
                  <Text style={styles.mainTitle}>
                    {I18n.t("linguistEmailTitle")}
                  </Text>
                </Col>
              </Row>
              <View>
                <FormInput
                  containerStyle={styles.containerInput}
                  inputStyle={styles.inputText}
                  placeholder={I18n.t("linguistEmail")}
                  autoCorrect={false}
                  onChangeText={text => this.props.updateForm({ email: text })}
                  value={this.props.email}
                  keyboardType={"email-address"}
                />
              </View>
            </Col>
          </Grid>
        </ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={topIOS()}>
        <View style={styles.containerBottom}>
          {/* Next Button */}
          <Button
            buttonStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
            title={I18n.t("next")}
            onPress={() => this.submit()}
          />
        </View>
        </KeyboardAvoidingView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  email: state.registrationCustomer.email,
  formHasErrors: state.registrationCustomer.formHasErrors
});

const mD = {
  updateForm,
  clearForm
};

export default connect(mS, mD)(EmailCustomerView);
