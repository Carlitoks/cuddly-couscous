import React, { Component } from "react";
import { connect } from "react-redux";
 
import { updateForm, clearForm } from "../../Ducks/RegistrationCustomerReducer";
import {
  asyncCreateUser,
  asyncUpdateUser
} from "../../Ducks/CustomerProfileReducer";
 
import { View, Text, ScrollView, Alert, TextInput } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, Header } from "react-native-elements";
import { topIOS } from "../../Util/Devices";
import _capitalize from "lodash/capitalize";
 
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
import InputPassword from "../../Components/InputPassword/InputPassword";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import {
  TermsConditionsURI,
  PrivacyPolicyURI
} from "../../Config/StaticViewsURIS";
import HeaderView from "../../Components/HeaderView/HeaderView";

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
 
  showError(err) {
    const errorMessage = err.payload.response.data.errors[0];
    Alert.alert("Error", _capitalize(errorMessage));
  }
 
  checkResponse(response) {
    if (response.type === "networkErrors/error") {
      throw response;
    }
  }
 
  submit() {
    const {
      navigation,
      id,
      password,
      deviceToken,
      asyncUpdateUser
    } = this.props;
 
    if (this.validateForm()) {
      // console.log(id);
 
      // // login, get token, keep going
 
      // return asyncUpdateUser({ id, password }, deviceToken)
      //   .then(response => {
      //     this.checkResponse(response);
 
      navigation.dispatch({ type: "NameCustomerView" });
      //   })
      //   .catch(err => {
      //     this.showError(err);
      //   });
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
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          title={I18n.t("linguistPasswordTitle")}
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={styles.scrollContainer}
          >
            <Grid>
              <Col>
                <View>
                  {/* Password */}
                  <InputPassword
                    containerStyle={styles.containerInput}
                    inputStyle={styles.formInput}
                    placeholder={I18n.t("linguistPassword")}
                    placeholderTextColor={Colors.placeholderColor}
                    onChangeText={text =>
                      this.props.updateForm({
                        password: text
                      })
                    }
                    autoCorrect={false}
                    maxLength={20}
                    autoFocus={true}
                    value={this.props.password}
                  />
                </View>
              </Col>
            </Grid>
          </ScrollView>
        </HeaderView>
        {/* Next Button */}
        <BottomButton
          title={I18n.t("next")}
          onPress={() => this.submit()}
          bold={false}
        />
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  password: state.registrationCustomer.password,
  email: state.registrationCustomer.email,
  formHasErrors: state.registrationCustomer.formHasErrors,
  deviceToken: state.registrationCustomer.deviceToken,
  id: state.registrationCustomer.id
});
 
const mD = {
  updateForm,
  clearForm,
  asyncUpdateUser
};
 
export default connect(mS, mD)(PasswordCustomerView);