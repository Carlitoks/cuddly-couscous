import React, { Component } from "react";
import { connect } from "react-redux";

import { updateForm, clearForm } from "../../Ducks/LinguistFormReducer";
import { registerDevice } from "../../Ducks/AuthReducer";
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
import InputPassword from "../../Components/InputPassword/InputPassword";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";

import {
  TermsConditionsURI,
  PrivacyPolicyURI
} from "../../Config/StaticViewsURIS";

import styles from "./styles";
import { displayFormErrors } from "../../Util/Helpers";
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
      displayFormErrors(updates.passwordErrorMessage);
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
            <View>
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
                <Text style={styles.formText}>
                  {I18n.t("passwordLinguistText")}{" "}
                  <Text
                    style={styles.links}
                    onPress={() => {
                      this.props.navigation.dispatch({
                        type: "StaticView",
                        params: {
                          uri: PrivacyPolicyURI,
                          title: I18n.t("privacyPolicy")
                        }
                      });
                    }}
                  >
                    {I18n.t("privacyPolicy")}
                  </Text>{" "}
                  {I18n.t("passwordAnd")}{" "}
                </Text>
                <Text
                  style={[styles.formText, styles.links]}
                  onPress={() => {
                    this.props.navigation.dispatch({
                      type: "StaticView",
                      params: {
                        uri: TermsConditionsURI,
                        title: I18n.t("termsConditions")
                      }
                    });
                  }}
                >
                  {I18n.t("termsConditions")}
                </Text>
              </View>
            </View>
          </ScrollView>
        </HeaderView>
        {/* Next Button */}
        <BottomButton title={I18n.t("next")} onPress={() => this.submit()} />
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
