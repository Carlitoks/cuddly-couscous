import React, { Component } from "react";
import { connect } from "react-redux";

import { updateForm, clearForm } from "../../Ducks/ResetPasswordReducer";

import { View, Text, ScrollView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, Header, FormInput } from "react-native-elements";

import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";
import BottomButton from "../../Components/BottomButton/BottomButton";

import styles from "./styles";
import { Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

class ResetPasswordView extends Component {
  navigate = this.props.navigation.navigate;

  componentWillUnmount() {
    this.props.clearForm();
  }

  validateForm() {
    let updates = {};
    let valid = true;

    if (!this.props.password) {
      updates = {
        ...updates,
        PasswordErrorMessage: I18n.t("emptyPassword")
      };
      valid = false;
    }

    if (this.props.password != this.props.confirmPassword) {
      updates = {
        ...updates,
        MatchErrorMessage: I18n.t("passwordMatch")
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      this.tempDisplayErrors(
        updates.PasswordErrorMessage,
        updates.MatchErrorMessage
      );
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    if (this.validateForm()) {
      this.props.navigation.dispatch({ type: "SelectRoleView" });
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
          headerLeftComponent={<GoBackButton navigation={this.props.navigation} />}
          title={I18n.t("resetpassword")}
        >
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
                    />
                    {/* Reset password */}
                    <Text style={styles.mainTitle}>
                      {I18n.t("resetpassword")}
                    </Text>
                  </Col>
                </Row>

                <View style={styles.containerView}>
                  <FormInput
                    containerStyle={styles.containerInput}
                    inputStyle={styles.inputText}
                    placeholder={I18n.t("enterYourPassword")}
                    onChangeText={text =>
                      this.props.updateForm({
                        password: text
                      })
                    }
                    value={this.props.password}
                    maxLength={20}
                  />
                </View>

                <View style={styles.containerView}>
                  <FormInput
                    containerStyle={styles.containerInput}
                    inputStyle={styles.inputText}
                    placeholder={I18n.t("confirmPassword")}
                    onChangeText={text =>
                      this.props.updateForm({ confirmPassword: text })
                    }
                    value={this.props.confirmPassword}
                    maxLength={20}
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
        />
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  password: state.resetPassword.password,
  confirmPassword: state.resetPassword.confirmPassword,
  formHasErrors: state.resetPassword.formHasErrors
});

const mD = {
  updateForm,
  clearForm
};

export default connect(mS, mD)(ResetPasswordView);
