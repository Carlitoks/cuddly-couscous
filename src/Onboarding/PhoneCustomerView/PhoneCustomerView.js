import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateForm,
  registerDevice
} from "../../Ducks/RegistrationCustomerReducer";
import { asyncCreateUser } from "../../Ducks/CustomerProfileReducer";
import { logInAsync } from "../../Ducks/AuthReducer";
import {
  View,
  Text,
  ScrollView,
  Alert,
  TextInput,
  Platform, 
  KeyboardAvoidingView
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, Header, Badge } from "react-native-elements";
import { topIOS } from "../../Util/Devices";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import { validatePhoneNumber } from "../../Util/Helpers.js";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import styles from "./styles";
import { Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

class PhoneCustomerView extends Component {
  navigate = this.props.navigation.navigate;

  mask = number => {
    let numberWithMask = number.replace(/\D/g, "");

    if (numberWithMask.length > 7) {
      // Add spaces and dashes to mask
      numberWithMask = numberWithMask.replace(
        /^(\d\d\d)(\d{3})(\d{0,4}).*/,
        "($1) $2-$3"
      );
    } else if (numberWithMask.length > 4) {
      // Add parentheses to mask
      numberWithMask = numberWithMask.replace(/^(\d\d\d)(\d{0,3})/, "($1) $2");
    }
    return numberWithMask;
  };

  validateForm() {
    let updates = {};
    let valid = true;

    if (!this.props.phoneNumber) {
      updates = {
        ...updates,
        phoneErrorMessage: I18n.t("enterPhoneField")
      };
      valid = false;
    }

    if (!validatePhoneNumber(this.props.phoneNumber)) {
      updates = {
        ...updates,
        phoneErrorMessage: I18n.t("noValidPhone")
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      this.tempDisplayErrors(updates.phoneErrorMessage);
    }

    this.props.updateForm(updates);
    return valid;
  }

  registerUser() {
    const uinfo = {
      email: this.props.email,
      password: this.props.password,
      firstName: this.props.firstname,
      lastName: this.props.lastname,
      preferredName: this.props.preferredName,
      phone: this.props.phoneNumber,
      nativeLangCode: this.props.selectedNativeLanguage[0]["3"]
    };
    return this.props.asyncCreateUser(uinfo, this.props.deviceToken);
  }

  showError(err) {
    console.log(err);
    const errorMessage = err.payload.response.data.errors[0];
    Alert.alert("error", errorMessage);
  }

  loginUser() {
    this.props
      .logInAsync(this.props.email, this.props.password)
      .then(response => {
        if (response.type !== "networkErrors/error") {
          this.props.navigation.dispatch({ type: "Home" });
        } else {
          this.showError(response);
        }
      });
  }

  submit() {
    this.props.updateForm({
      performingRequest: true
    });

    if (this.validateForm()) {
      this.registerUser().then(response => {
        if (response.type !== "networkErrors/error") {
          this.loginUser();
        } else {
          this.showError(response);
        }
      });
    }
    this.props.updateForm({
      performingRequest: false
    });
  }

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
                  <TopViewIOS/> 
                  <Header
                    outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                    backgroundColor="transparent"
                    leftComponent={
                      <GoBackButton navigation={this.props.navigation} />
                    }
                  />
                  {/* Enter phone number */}
                  <Text style={styles.mainTitle}>{I18n.t("linguistNumber")}</Text>
                  {/* subtitle */}
                  <Text style={styles.mainSubtitle}>
                    {I18n.t("linguistNumberText")}
                  </Text>
                </Col>
              </Row>
              <View style={styles.phoneSection}>
                <Badge
                  value="+1"
                  containerStyle={styles.tagCode}
                  textStyle={styles.codeText}
                />
                <TextInput
                  style={styles.containerInput}
                  onChangeText={number => {
                    const phoneNumber = this.mask(number);
                    this.props.updateForm({
                      phoneNumber
                    });
                  }}
                  placeholder="(201) 555-0132"
                  value={this.props.phoneNumber}
                  keyboardType={
                    Platform.OS === "ios" ? "number-pad" : "numeric"
                  }
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
            title={I18n.t("create")}
            onPress={() => this.submit()}
          />
        </View>
        </KeyboardAvoidingView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  firstname: state.registrationCustomer.firstname,
  lastname: state.registrationCustomer.lastname,
  preferredName: state.registrationCustomer.preferredName,
  phoneNumber: state.registrationCustomer.phoneNumber,
  formHasErrors: state.registrationCustomer.formHasErrors,
  deviceToken: state.registrationCustomer.deviceToken,
  email: state.registrationCustomer.email,
  password: state.registrationCustomer.password,
  selectedNativeLanguage: state.linguistForm.selectedNativeLanguage
});

const mD = {
  updateForm,
  registerDevice,
  asyncCreateUser,
  logInAsync
};

export default connect(mS, mD)(PhoneCustomerView);
