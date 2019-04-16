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
import HeaderView from "../../Components/HeaderView/HeaderView";

import styles from "./styles";
import { displayFormErrors } from "../../Util/Alerts";
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
      displayFormErrors(
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

  render() {
    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          title={I18n.t("preferredName")}
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={styles.scrollContainer}
            alwaysBounceVertical={false}
          >
            <Grid>
              <Col>
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
  formHasErrors: state.registrationCustomer.formHasErrors,
  preferredName: state.registrationCustomer.preferredName
});

const mD = {
  updateForm,
  clearForm,
  registerDevice
};

export default connect(mS, mD)(NameCustomerView);
