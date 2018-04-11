import React, { Component } from "react";
import { connect } from "react-redux";

import { ScrollView, View, Alert, Text } from "react-native";
import { Button, Header } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import { resetPasswordAsync } from "../../Ducks/AuthReducer";
import { clearForm, updateForm } from "../../Ducks/ForgotPasswordReducer";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import BottomButton from "../../Components/BottomButton/BottomButton";
import HeaderView from "../../Components/HeaderView/HeaderView";

import { EMAIL_REGEX } from "../../Util/Constants";
import styles from "./styles";
import { displayFormErrors } from "../../Util/Helpers";
import { Colors } from "../../Themes";
import { TroubleshootURI } from "../../Config/StaticViewsURIS";

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
      displayFormErrors(updates.emailErrorMessage);
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

  validateEmail = () => {
    const patt = new RegExp(EMAIL_REGEX);
    return !patt.test(this.props.email);
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          headerCenterComponent={
            <Text style={styles.titleCall}>{I18n.t("resetpassword")}</Text>
          }
          NoWaves
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={styles.scrollContainer}
            alwaysBounceVertical={false}
          >
            <Grid>
              <Col>
                {/* Email */}
                <InputRegular
                  containerStyle={styles.formInputContainer}
                  placeholder={I18n.t("email")}
                  autoCorrect={false}
                  onChangeText={text => this.props.updateForm({ email: text })}
                  value={this.props.email}
                  keyboardType={"email-address"}
                  maxLength={64}
                  autoFocus={true}
                />
                {/* Email subtitle */}
                <Text style={styles.emailText}>{I18n.t("weSendEmail")}</Text>
                {/* Troubleshoot Button (Commented as part of the issue SOLO-74)*/}
                {/* <Text
                  style={styles.linksText}
                  onPress={() => {
                    navigation.dispatch({
                      type: "StaticView",
                      params: {
                        uri: TroubleshootURI,
                        title: I18n.t("troubleshoot")
                      }
                    });
                  }}
                >
                  {I18n.t("troubleshoot")}
                </Text> */}
              </Col>
            </Grid>
          </ScrollView>
        </HeaderView>
        {/* Forgot Password Button */}
        <BottomButton
          title={I18n.t("resetpassword")}
          onPress={() => this.submit()}
          bold={true}
          disabled={this.validateEmail()}
          fill={!this.validateEmail()}
        />
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
