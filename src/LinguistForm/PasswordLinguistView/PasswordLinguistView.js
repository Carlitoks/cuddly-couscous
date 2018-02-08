import React, { Component } from "react";
import { connect } from "react-redux";

import { updateForm, clearForm } from "../../Ducks/LinguistFormReducer";
import { registerDevice } from "../../Ducks/RegistrationCustomerReducer";
import { asyncCreateUser } from "../../Ducks/CustomerProfileReducer";

import { View, Text, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { topIOS } from "../../Util/Devices";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import Header from "../Header/Header";

import styles from "./styles";
import { Images, Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

class PasswordLinguist extends Component {
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
      this.props.registerDevice().then(response => {
        if (response.type !== "networkErrors/error") {
          const {
            firstname,
            lastname,
            email,
            password,
            preferredName,
            deviceToken
          } = this.props;
          this.props
            .asyncCreateUser(
              {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                preferredName: preferredName
              },
              deviceToken
            )
            .then(response => {
              this.props.navigation.dispatch({
                type: "GenderLinguistView"
              });
            });
        } else {
          Alert.alert(response.data);
        }
      });
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
          <View>
            <Header
              navigation={this.props.navigation}
              mainTitle={I18n.t("linguistPasswordTitle")}
            />
            <View>
              {/* Password */}
              <InputRegular
                containerStyle={styles.containerInput}
                placeholder={I18n.t("linguistPassword")}
                onChangeText={text => this.props.updateForm({ password: text })}
                autoCorrect={false}
                secureTextEntry={true}
                maxLength={20}
                autoFocus={true}
              />
              <Text style={styles.formText}>
                {I18n.t("passwordLinguistText")}{" "}
                <Text style={styles.links}>{I18n.t("privacyPolicy")}</Text>{" "}
                {I18n.t("passwordAnd")}{" "}
                <Text style={styles.links}>{I18n.t("termsConditions")}</Text>
              </Text>
            </View>
          </View>
        </ScrollView>
        {/* Next Button */}
        <BottomButton
          title={I18n.t("next")}
          onPress={() => this.submit()}
          color={Colors.linguistFormText}
          buttonColor={Colors.linguistFormButton}
          bold={false}
        />
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  password: state.linguistForm.password,
  email: state.linguistForm.email,
  firstname: state.linguistForm.firstname,
  lastname: state.linguistForm.lastname,
  preferredName: state.linguistForm.preferredName,
  formHasErrors: state.linguistForm.formHasErrors,
  deviceToken: state.registrationCustomer.deviceToken
});

const mD = {
  updateForm,
  clearForm,
  registerDevice,
  asyncCreateUser
};

export default connect(mS, mD)(PasswordLinguist);
