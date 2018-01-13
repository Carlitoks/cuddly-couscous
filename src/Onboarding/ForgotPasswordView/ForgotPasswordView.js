import React, { Component } from "react";
import { connect } from "react-redux";

import { ScrollView, View, Alert, Text } from "react-native";
import { Button, FormLabel, FormInput, Header } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";

import { resetPasswordAsync } from "../../Ducks/AuthReducer";
import { clearForm, updateForm } from "../../Ducks/ForgotPasswordReducer";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
//import { loginUser } from "../../Ducks/AuthReducer";

import styles from "./styles";
import { Colors } from "../../Themes";

// For the moment
import EN from "../../I18n/en";

class ForgotPasswordView extends Component {
  componentWillUnmount() {
    this.props.clearForm();
  }
  submit() {
    this.props.resetPasswordAsync(this.props.email);
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <View style={styles.scrollContainer}>
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

                  {/* Title */}
                  <Text style={styles.title}>{EN["forgotPassword"]}</Text>
                </Col>
              </Row>
              {/* Email */}
              <FormInput
                containerStyle={styles.formInputContainer}
                placeholder={EN["email"]}
                autoCorrect={false}
                onChangeText={text => this.props.updateForm({ email: text })}
                value={this.props.email}
                keyboardType={"email-address"}
              />

              {/* Register */}
              <Text
                style={styles.linksText}
                onPress={() =>
                  this.props.navigation.dispatch({ type: "CustomerAccount" })
                }
              >
                {EN["newaccount"]}
              </Text>

              {/* Troubleshoot Button */}
              <Text
                style={styles.linksText}
                onPress={() => Alert.alert("troubleshoot")}
              >
                {EN["troubleshoot"]}
              </Text>
            </Col>
          </Grid>
        </ScrollView>
        <View style={styles.containerBottom}>
          {/* Forgot Password Button */}
          <Button
            buttonStyle={styles.Button}
            textStyle={styles.buttonText}
            onPress={() => this.props.resetPasswordAsync(this.props.email)}
            title={EN["resetpassword"]}
          />
        </View>
      </View>
    );
  }
}

const mS = state => ({
  email: state.forgotPassword.email,
  emailErrorMessage: state.forgotPassword.emailErrorMessage
});

const mD = {
  clearForm,
  updateForm,
  resetPasswordAsync
};

export default connect(mS, mD)(ForgotPasswordView);