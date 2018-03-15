import React, { Component } from "react";
import { connect } from "react-redux";

import { updateProfileAsync } from "../../Ducks/UserProfileReducer";

import { clearForm, updateForm } from "../../Ducks/RegistrationCustomerReducer";

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
import { displayFormErrors } from "../../Util/Helpers";
import { Colors } from "../../Themes";
import I18n from "../../I18n/I18n";
import { onlyLetters } from "../../Util/Helpers";

class EditNameView extends Component {
  navigate = this.props.navigation.navigate;

  componentWillUnmount() {
    this.props.clearForm();
  }

  async componentWillMount() {
    await this.props.updateForm({
      firstname: this.props.firstName,
      lastname: this.props.lastName,
      preferredName: this.props.preferredName
    });
  }

  validateForm() {
    let updates = {};
    let valid = true;

    if (!this.props.formFirstName) {
      updates = {
        ...updates,
        FirstnameErrorMessage: I18n.t("enterNameField")
      };
      valid = false;
    }

    if (!this.props.formLastName) {
      updates = {
        ...updates,
        LastnameErrorMessage: I18n.t("enterLastNameField")
      };
      valid = false;
    }

    if (!onlyLetters(this.props.formFirstName)) {
      updates = {
        ...updates,
        FirstnameErrorMessage: I18n.t("errorLetters")
      };
      valid = false;
    }

    if (!onlyLetters(this.props.formLastName)) {
      updates = {
        ...updates,
        LastnameErrorMessage: I18n.t("errorLetters")
      };
      valid = false;
    }

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
    const {
      formFirstName,
      formLastName,
      formPreferredName,
      uuid,
      token
    } = this.props;
    const data = {
      firstName: formFirstName,
      lastName: formLastName,
      preferredName: formPreferredName
    };
    if (this.validateForm()) {
      this.props.updateProfileAsync(uuid, data, token).then(response => {
        if (response.type !== "networkErrors/error") {
          this.props.navigation.dispatch({
            type: "back"
          });
        } else {
          const errorMessage = response.payload.response.data.errors[0];
          Alert.alert("error", errorMessage);
        }
      });
    }
  }

  getSubtitle = () => {
    let subtitle = `${I18n.t("youWillBeKnown")}.... ${I18n.t(
      "toOthersOnPlatform"
    )} `;
    if (this.props.firstName && this.props.lastName) {
      subtitle = `${I18n.t("youWillBeKnown")} ${
        this.props.firstName
      } ${this.props.lastName.charAt(0)}. ${I18n.t("toOthersOnPlatform")}`;
      return subtitle;
    } else {
      return subtitle;
    }
  };

  render() {
    const navigation = this.props.navigation;
    const { formFirstName, formLastName, formPreferredName } = this.props;
    const initialLastName = `${this.props.lastName.charAt(0)}.`;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          title={
            formPreferredName
              ? `${formPreferredName} ${formLastName}`
              : formFirstName || formLastName
                ? `${formFirstName} ${formLastName}`
                : I18n.t("mainTitle")
          }
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustContentInsets={true}
            style={styles.scrollContainer}
          >
            <Grid>
              <Col>
                <View>
                  {/* Name */}
                  <InputRegular
                    containerStyle={styles.containerInput}
                    placeholder={I18n.t("linguistName")}
                    onChangeText={text => {
                      if (onlyLetters(text) || text == "") {
                        this.props.updateForm({
                          firstname: text
                        });
                      }
                    }}
                    maxLength={20}
                    value={formFirstName}
                    autoFocus={true}
                  />
                </View>
                {/* Last Name */}
                <InputRegular
                  containerStyle={styles.containerInput}
                  placeholder={I18n.t("linguistLastName")}
                  onChangeText={text => {
                    if (onlyLetters(text) || text == "") {
                      this.props.updateForm({
                        lastname: text
                      });
                    }
                  }}
                  maxLength={20}
                  value={formLastName}
                  sec
                />

                {/* Prefered Name */}
                <InputRegular
                  containerStyle={styles.containerInput}
                  placeholder={I18n.t("preferredName")}
                  value={formPreferredName}
                  onChangeText={text => {
                    if (onlyLetters(text) || text == "") {
                      this.props.updateForm({
                        preferredName: text
                      });
                    }
                  }}
                  maxLength={20}
                  sec
                />
              </Col>
            </Grid>
          </ScrollView>
        </HeaderView>
        {/* Save Button */}
        <BottomButton
          title={I18n.t("save")}
          onPress={() => {
            this.submit();
          }}
          bold={false}
        />
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  firstName: state.userProfile.firstName,
  lastName: state.userProfile.lastName,
  preferredName: state.userProfile.preferredName,
  formFirstName: state.registrationCustomer.firstname,
  formLastName: state.registrationCustomer.lastname,
  formHasErrors: state.registrationCustomer.formHasErrors,
  formPreferredName: state.registrationCustomer.preferredName,
  token: state.auth.token,
  uuid: state.auth.uuid
});

const mD = {
  updateForm,
  clearForm,
  updateProfileAsync
};

export default connect(mS, mD)(EditNameView);
