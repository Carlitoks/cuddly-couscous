import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateForm,
  clearForm,
  registerDevice
} from "../../Ducks/RegistrationCustomerReducer";

import { View, Text, ScrollView, Alert } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, Header } from "react-native-elements";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import styles from "./styles";
import { Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

class NameCustomerView extends Component {
  navigate = this.props.navigation.navigate;

  componentWillUnmount() {
    this.props.clearForm();
  }

  validateForm() {
    let updates = {};
    let valid = true;

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      this.tempDisplayErrors(
        updates.FirstnameErrorMessage,
        updates.LastnameErrorMessage
      );
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    this.props.updateForm({ performingRequest: true });
    if (this.validateForm()) {
      this.props.registerDevice().then(response => {
        if (response.type !== "networkErrors/error") {
          this.props.navigation.dispatch({
            type: "LanguageCustomerView"
          });
        } else {
          const errorMessage = response.payload.response.data.errors[0];
          Alert.alert("error", errorMessage);
        }
      });
    }
    this.props.updateForm({ performingRequest: false });
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
                  <Text style={styles.mainTitle}>
                    {I18n.t("preferredName")}
                  </Text>
                  {/* subtitle */}
                  <Text style={styles.mainSubtitle}>{""}</Text>
                </Col>
              </Row>

              <View style={styles.containerView}>
                {/* Prefered Name */}
                <InputRegular
                  containerStyle={styles.containerInput}
                  placeholder={I18n.t("preferredName")}
                  value={this.props.preferredName}
                  onChangeText={text =>
                    this.props.updateForm({ preferredName: text })
                  }
                  maxLength={20}
                />
                <Text style={styles.formText}>
                  {I18n.t("preferredLinguistText")}
                </Text>
              </View>
            </Col>
          </Grid>
        </ScrollView>
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
  formHasErrors: state.registrationCustomer.formHasErrors,
  preferredName: state.registrationCustomer.preferredName
});

const mD = {
  updateForm,
  clearForm,
  registerDevice
};

export default connect(mS, mD)(NameCustomerView);
