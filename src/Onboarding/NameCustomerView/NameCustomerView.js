import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateForm,
  clearForm,
  registerDevice
} from "../../Ducks/RegistrationCustomerReducer";

import { View, Text, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, Header } from "react-native-elements";
import { topIOS } from "../../Util/Devices";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
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

    if (!this.props.firstname) {
      updates = {
        ...updates,
        FirstnameErrorMessage: I18n.t("enterNameField")
      };
      valid = false;
    }

    if (!this.props.lastname) {
      updates = {
        ...updates,
        LastnameErrorMessage: I18n.t("enterLastNameField")
      };
      valid = false;
    }

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
            type: "EmailCustomerView"
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
          alwaysBounceVertical={false} 
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
                  <TopViewIOS/> 
                  <Header
                    outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                    backgroundColor="transparent"
                    leftComponent={
                      <GoBackButton navigation={this.props.navigation} />
                    }
                  />
                  {/* Enter your Name */}
                  <Text style={styles.mainTitle}>
                    {this.props.mainTitle} {this.props.lastname}
                  </Text>
                  {/* subtitle */}
                  <Text style={styles.mainSubtitle}>
                    {I18n.t("nameLinguistText")}
                  </Text>
                </Col>
              </Row>

              <View style={styles.containerView}>
                {/* Name */}
                <InputRegular
                  containerStyle={styles.containerInput}
                  placeholder={I18n.t("linguistName")}
                  onChangeText={text =>
                    this.props.updateForm({
                      firstname: text,
                      mainTitle: text
                    })
                  }
                  maxLength={20}
                  value={this.props.firstname}
                  autoFocus={true}
                />
              </View>

              <View style={styles.containerView}>
                {/* Last Name */}
                <InputRegular
                  containerStyle={styles.containerInput}
                  placeholder={I18n.t("linguistLastName")}
                  onChangeText={text => this.props.updateForm({ lastname: text })}
                  maxLength={20}
                  value={this.props.lastname}
                />
              </View>

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
          color={Colors.linguistFormText}
          buttonColor={Colors.linguistFormButton}
          bold={false}
        />
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  firstname: state.registrationCustomer.firstname,
  lastname: state.registrationCustomer.lastname,
  formHasErrors: state.registrationCustomer.formHasErrors,
  preferredName: state.registrationCustomer.preferredName,
  mainTitle: state.registrationCustomer.mainTitle
});

const mD = {
  updateForm,
  clearForm,
  registerDevice
};

export default connect(mS, mD)(NameCustomerView);
