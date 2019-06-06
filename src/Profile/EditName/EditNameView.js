import React, { Component } from "react";
import { connect } from "react-redux";

import { updateProfileAsync } from "../../Ducks/UserProfileReducer";

import { clearForm, updateForm } from "../../Ducks/RegistrationCustomerReducer";

import { Alert, ScrollView, View } from "react-native";
import { Col, Grid } from "react-native-easy-grid";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import InputRegular from "../../Components/InputRegular/InputRegular";

import styles from "./styles";
import { displayFormErrors } from "../../Util/Alerts";

import I18n from "../../I18n/I18n";
import { onlyLetters } from "../../Util/Helpers";
import NavBar from "../../Components/NavBar/NavBar";

class EditNameView extends Component {
  navigate = this.props.navigation.navigate;

  componentWillUnmount() {
    this.props.clearForm();
  }

  isDisabled() {
    return !this.props.formFirstName > 0 || !this.props.formLastName > 0;
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

    if (onlyLetters(this.props.formFirstName)) {
      updates = {
        ...updates,
        FirstnameErrorMessage: I18n.t("errorLetters")
      };
      valid = false;
    }

    if (onlyLetters(this.props.formLastName)) {
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
      if (updates.FirstnameErrorMessage && updates.LastnameErrorMessage) {
        displayFormErrors(updates.FirstnameErrorMessage);
      } else {
        displayFormErrors(
          updates.FirstnameErrorMessage,
          updates.LastnameErrorMessage
        );
      }
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
      <View style={styles.scrollContainer}>
        <NavBar
          leftComponent={
            <GoBackButton navigation={this.props.navigation}/>
          }
          navbarTitle={
            formPreferredName
              ? `${formPreferredName}`
              : formFirstName || formLastName
              ? `${formFirstName} ${formLastName}`
              : I18n.t("mainTitle")
          }
        />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
          alwaysBounceVertical={false}
        >
          <Grid>
            <Col>
              <View>
                {/* Name */}
                <InputRegular
                  containerStyle={styles.containerInput}
                  placeholder={I18n.t("linguistName")}
                  onChangeText={text => {
                    if (!onlyLetters(text) || text == "") {
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
                  if (!onlyLetters(text) || text == "") {
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
                  if (!onlyLetters(text) || text == "") {
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
        {/* Save Button */}
        <BottomButton
          title={I18n.t("save")}
          onPress={() => {
            this.submit();
          }}
          bold={false}
          disabled={this.isDisabled()}
          fill={!this.isDisabled()}
        />
      </View>
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
  token: state.auth2.userJwtToken,
  uuid: state.auth2.userID
});

const mD = {
  updateForm,
  clearForm,
  updateProfileAsync
};

export default connect(
  mS,
  mD
)(EditNameView);
