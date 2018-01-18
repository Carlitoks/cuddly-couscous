import React, { Component } from "react";
import { connect } from "react-redux";

import { updateForm, clearForm } from "../../Ducks/RegistrationCustomerReducer";

import { View, Text, ScrollView, Alert } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, FormInput, Header } from "react-native-elements";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import styles from "./styles";
import { Images, Colors } from "../../Themes";
import EN from "../../I18n/en";

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
        passwordErrorMessage: "Empty Password"
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
                    {EN["linguistPasswordTitle"]}
                  </Text>
                </Col>
              </Row>
              <View>
                {/* Password */}
                <FormInput
                  containerStyle={styles.containerInput}
                  inputStyle={styles.inputText}
                  placeholder={EN["linguistPassword"]}
                  onChangeText={text =>
                    this.props.updateForm({ password: text })
                  }
                  autoCorrect={false}
                  secureTextEntry={true}
                />
                <Text style={styles.formText}>
                  {EN["passwordLinguistText"]}{" "}
                  <Text style={styles.links}>{EN["privacyPolicy"]}</Text>{" "}
                  {EN["passwordAnd"]}{" "}
                  <Text style={styles.links}>{EN["termsConditions"]}</Text>
                </Text>
              </View>
            </Col>
          </Grid>
        </ScrollView>
        <View style={styles.containerBottom}>
          {/* Next Button */}
          <Button
            buttonStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
            title="Next"
            onPress={() => this.submit()}
          />
        </View>
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
