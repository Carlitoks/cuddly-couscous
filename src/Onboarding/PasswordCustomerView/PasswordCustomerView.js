import React, { Component } from "react";
import { connect } from "react-redux";

import { updateForm, clearForm } from "../../Ducks/RegistrationCustomerReducer";

import { View, Text, ScrollView, Alert, TextInput, KeyboardAvoidingView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, Header, FormInput } from "react-native-elements";
import { topIOS } from "../../Util/Devices";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import styles from "./styles";
import { Images, Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

class PasswordCustomerView extends Component {
  componentWillUnmount() {
    this.props.clearForm();
  }
  validateForm() {
    let updates = {};
    let valid = true;

    if (!this.props.password) {
      updates = {
        ...updates,
        passwordErrorMessage: I18n.t("emptyPassword")
      };
      valid = false;
    } else if (this.props.password.length < 5) {
      updates = {
        ...updates,
        passwordErrorMessage: I18n.t("passwordLength")
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      this.tempDisplayErrors(updates.passwordErrorMessage);
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    if (this.validateForm()) {
      this.props.navigation.dispatch({ type: "GenderCustomerView" });
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
                  {/* Enter your password */}
                  <Text style={styles.mainTitle}>
                    {I18n.t("linguistPasswordTitle")}
                  </Text>
                </Col>
              </Row>
              <View>
                {/* Password */}
                <FormInput
                  containerStyle={styles.containerInput}
                  inputStyle={styles.inputText}
                  placeholder={I18n.t("linguistPassword")}
                  onChangeText={text =>
                    this.props.updateForm({ password: text })
                  }
                  autoCorrect={false}
                  secureTextEntry={true}
                  maxLength={20}
                />
                <Text style={styles.formText}>
                  {I18n.t("passwordLinguistText")}{" "}
                  <Text style={styles.links}>{I18n.t("privacyPolicy")}</Text>{" "}
                  {I18n.t("passwordAnd")}{" "}
                  <Text style={styles.links}>{I18n.t("termsConditions")}</Text>
                </Text>
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
  password: state.registrationCustomer.password,
  formHasErrors: state.registrationCustomer.formHasErrors
});

const mD = {
  updateForm,
  clearForm
};

export default connect(mS, mD)(PasswordCustomerView);
