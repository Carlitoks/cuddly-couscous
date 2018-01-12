import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateForm
} from "../../Ducks/LinguistFormReducer";

import { View, Text, ScrollView, Alert, TextInput, Platform } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, FormLabel, FormInput, Header, Badge } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";

import styles from "./styles";
import { Images, Colors } from "../../Themes";
import EN from "../../I18n/en";

class PhoneLinguist extends Component {
  navigate = this.props.navigation.navigate;

  mask = number => {
    console.log(number);
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
        phoneErrorMessage: "Please enter your Phone Number"
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      this.tempDisplayErrors(
        updates.phoneErrorMessage
      );
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {

    if (this.validateForm()) {
      this.props.navigation.dispatch({ type: "VerifyPhoneLinguistView" });
    }

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
                  {/* Enter phone number */}
                  <Text style={styles.mainTitle}>
                    {EN["linguistNumber"]}
                  </Text>
                  {/* subtitle */}
                  <Text style={styles.mainSubtitle}>
                    {EN["linguistNumberText"]}
                  </Text>
                </Col>
              </Row>
              <View style={styles.phoneSection}>
                <Badge
                  value="+1"
                  containerStyle={styles.tagCode}
                  textStyle={styles.codeText}
                />
                <TextInput style={styles.containerInput}
                  onChangeText={number => {
                    const phoneNumber = this.mask(number);
                    this.props.updateForm({
                      phoneNumber
                    });
                  }}
                  placeholder="(201) 555-0132"
                  value={this.props.phoneNumber}
                  keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
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
  phoneNumber: state.linguistForm.phoneNumber,
  formHasErrors: state.linguistForm.formHasErrors,
});

const mD = {
  updateForm,
};

export default connect(mS, mD)(PhoneLinguist);
