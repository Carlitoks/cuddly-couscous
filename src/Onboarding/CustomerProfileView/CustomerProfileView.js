import React, { Component } from "react";
import { connect } from "react-redux";
import { clearForm, updateForm } from "../../Ducks/CustomerProfileReducer";

import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, View, ScrollView, Alert } from "react-native";
import { FormInput, Avatar, Card, Button, Header } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import NextButton from "../../Components/NextButton/NextButton";

import { Images } from "../../Themes";
import { styles } from "./styles";
import EN from "../../I18n/en";
import { USER_NAME } from "../../Util/Constants";

class CustomerProfileView extends Component {
  componentWillUnmount() {
    this.props.clearForm();
  }

  validateForm() {
    const patt = new RegExp(USER_NAME);
    let updates = {};
    let valid = true;

    if (!patt.test(this.props.firstName)) {
      updates = { ...updates, firstNameErrorMessage: "Not A Valid fist name" };
      valid = false;
    }

    if (!this.props.firstName) {
      updates = { ...updates, firstNameErrorMessage: "Empty fist name" };
      valid = false;
    }

    if (!this.props.lastName) {
      updates = { ...updates, lastNameErrorMessage: "Empty last name" };
      valid = false;
    }

    updates = { ...updates, formHasErrors: !valid };

    if (!valid) {
      this.tempDisplayErrors(
        updates.fistNameErrorMessage,
        updates.lastNameErrorMessage
      );
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    this.props.updateForm({
      performingRequest: true
    });

    if (this.validateForm()) {
      if (!this.props.formHasErrors) {
        this.props.navigation.dispatch({
          type: "Home"
        });
      } else {
        if (this.props.formHasErrors) {
          this.tempDisplayErrors(
            this.props.firstNameErrorMessage,
            this.props.lastNameErrorMessage
          );
        }
      }
    }

    this.props.updateForm({
      performingRequest: false
    });
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
      {
        text: "OK",
        onPress: () => console.log("OK Pressed")
      }
    ]);
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={styles.scrollContainer}
      >
        <Grid>
          <Col>
            {/* Header - Navigation */}
            <Header
              outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
              backgroundColor="transparent"
              leftComponent={
                <GoBackButton navigation={this.props.navigation} />
              }
              rightComponent={
                <NextButton
                  navigation={this.props.navigation}
                  onPressButton={() => {
                    this.submit();
                  }}
                />
              }
            />
            <View style={styles.avatarContainer}>
              {/* Avatar */}
              <Avatar
                xlarge
                rounded
                style={styles.avatar}
                source={require("../../Images/perfil.jpg")}
                activeOpacity={0.7}
              />
            </View>
            {/* Title */}
            <Text style={styles.personalInformation}>
              {EN["PersonalInformation"]}
            </Text>

            <FormInput
              placeholder={EN["Firstname"]}
              autoCorrect={false}
              value={this.props.firstName}
              onChangeText={text =>
                this.props.updateForm({
                  firstName: text,
                  firsNameErrorMessage: ""
                })
              }
            />
            <FormInput
              placeholder={EN["Lastname"]}
              autoCorrect={false}
              value={this.props.lastName}
              onChangeText={text =>
                this.props.updateForm({
                  lastName: text,
                  lastNameErrorMessage: ""
                })
              }
            />
          </Col>
        </Grid>
      </ScrollView>
    );
  }
}
const mS = state => ({
  firstName: state.customerProfile.firstName,
  firstNameErrorMessage: state.customerProfile.firstNameErrorMessage,
  lastName: state.customerProfile.lastName,
  lastNameErrorMessage: state.customerProfile.firstNameErrorMessage
});

const mD = {
  clearForm,
  updateForm
};

export default connect(mS, mD)(CustomerProfileView);
