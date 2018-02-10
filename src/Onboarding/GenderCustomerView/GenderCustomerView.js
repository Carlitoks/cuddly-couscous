import React, { Component } from "react";
import { connect } from "react-redux";

import {
  GetOptions,
  updateForm
} from "../../Ducks/RegistrationCustomerReducer";
import { asyncCreateUser } from "../../Ducks/CustomerProfileReducer";

import { logInAsync } from "../../Ducks/AuthReducer";

import { View, Text, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import {
  Button,
  Header,
  List,
  ListItem
} from "react-native-elements";
import { topIOS } from "../../Util/Devices";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import styles from "./styles";
import { Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

class GenderCustomerView extends Component {
  navigate = this.props.navigation.navigate;

  validateForm() {
    let updates = {};
    let valid = true;

    if (!this.props.selectedGender) {
      updates = {
        ...updates,
        GenderErrorMessage: "Please Select a Gender"
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      this.tempDisplayErrors(updates.GenderErrorMessage);
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    const { navigation } = this.props;

    if (this.validateForm()) {
      navigation.dispatch({ type: "LanguageCustomerView" });
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

  registerUser() {
    console.log(this.props.selectedNativeLanguage);
    const uinfo = {
      email: this.props.email,
      password: this.props.password,
      firstName: this.props.firstname,
      lastName: this.props.lastname,
      preferredName: this.props.preferredName,
      phone: this.props.phoneNumber,
      nativeLangCode: this.props.selectedNativeLanguage[0]["3"],
      gender: this.props.selectedGender
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

    this.registerUser().then(response => {
      if (response.type !== "networkErrors/error") {
        this.loginUser();
      } else {
        this.showError(response);
      }
    });
    this.props.updateForm({
      performingRequest: false
    });
  }

  render() {
    const genders = this.props.GetOptions();

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
                  {/* Enter your Name */}
                  <Text style={styles.mainTitle}>{I18n.t("genderName")}</Text>
                </Col>
              </Row>
              <List containerStyle={{ borderTopWidth: 0 }}>
                {genders.map((item, i) => (
                  <ListItem
                    key={i}
                    containerStyle={styles.genderItem}
                    title={item.gender}
                    hideChevron={
                      this.props.selectedGender === "" ||
                      this.props.selectedGender !== item.gender
                    }
                    titleStyle={{ fontSize: 20 }}
                    rightIcon={
                      this.props.selectedGender !== ""
                        ? {
                            name: "check",
                            style: styles.genderCheck
                          }
                        : undefined
                    }
                    onPress={() => {
                      this.props.updateForm({ selectedGender: item.gender });
                    }}
                  />
                ))}
              </List>
            </Col>
          </Grid>
        </ScrollView>
        {/* Next Button */}
        <BottomButton title={I18n.t("create")} onPress={() => this.submit()} />
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  selectedGender: state.registrationCustomer.selectedGender,
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
  GetOptions,
  updateForm,
  logInAsync,
  asyncCreateUser
};

export default connect(mS, mD)(GenderCustomerView);
