import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateForm
} from "../../Ducks/LinguistFormReducer";

import { View, Text, ScrollView, Alert } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, FormLabel, FormInput, Header } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";

import { EMAIL_REGEX } from "../../Util/Constants";
import styles from "./styles";
import { Images, Colors } from "../../Themes";
import EN from "../../I18n/en";

class EmailLinguist extends Component {

  validateForm() {
    const patt = new RegExp(EMAIL_REGEX);
    let updates = {};
    let valid = true;

    if (!patt.test(this.props.email)) {
      updates = {
        ...updates,
        emailErrorMessage: "Not A Valid Email"
      };
      valid = false;
    }

    if (!this.props.email) {
      updates = {
        ...updates,
        emailErrorMessage: "Please enter your email"
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      this.tempDisplayErrors(
        updates.emailErrorMessage
      );
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {

    if (this.validateForm()) {
      this.props.navigation.dispatch({ type: "GenderLinguistView" });
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
      <View style={styles.scrollContainer}>
        <ScrollView automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}>
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
                  {/* Enter your Name */}
                  <Text style={styles.mainTitle}>
                    {EN["linguistEmailTitle"]}
                  </Text>
                </Col>
              </Row>
              <View>
                <FormInput containerStyle={styles.containerInput}
                  inputStyle={styles.inputText}
                  placeholder={EN["linguistEmail"]}
                  autoCorrect={false}
                  onChangeText={text =>
                    this.props.updateForm({ email: text })
                  }
                  value={this.props.email}
                  keyboardType={"email-address"}
                />
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
      </View>
    );
  }
}

const mS = state => ({
  email: state.linguistForm.email,
  formHasErrors: state.linguistForm.formHasErrors,
});

const mD = {
  updateForm,
};

export default connect(mS, mD)(EmailLinguist);
