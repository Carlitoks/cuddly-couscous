import React, { Component } from "react";
import { connect } from "react-redux";

import { updateForm, clearForm } from "../../Ducks/RegistrationCustomerReducer";
import { asyncUpdateUser } from "../../Ducks/CustomerProfileReducer";

import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, Header } from "react-native-elements";
import { topIOS } from "../../Util/Devices";
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

    if (!onlyLetters(this.props.firstname)) {
      updates = {
        ...updates,
        FirstnameErrorMessage: I18n.t("errorLetters")
      };
      valid = false;
    }

    if (!onlyLetters(this.props.lastname)) {
      updates = {
        ...updates,
        LastnameErrorMessage: I18n.t("errorLetters")
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
      id,
      asyncUpdateUser,
      firstname,
      lastname,
      preferredName,
      token
    } = this.props;
    if (this.validateForm()) {
      const payload = { id, firstname, lastname, preferredName };

      asyncUpdateUser(payload, token)
        .then(response => {
          this.props.navigation.dispatch({ type: "NativeLanguageView" });
        })
        .catch(error => {
          console.log(error);
          dispatch(networkError(error));
        });
    }
  }

  getSubtitle = () => {
    let subtitle = `${I18n.t("youWillBeKnown")}.... ${I18n.t(
      "toOthersOnPlatform"
    )} `;
    if (this.props.firstname && this.props.lastname) {
      subtitle = `${I18n.t("youWillBeKnown")} ${
        this.props.firstname
      } ${this.props.lastname.charAt(0)}. ${I18n.t("toOthersOnPlatform")}`;
      return subtitle;
    } else {
      return subtitle;
    }
  };

  isDisabled() {
    return !this.props.firstname || !this.props.lastname;
  }

  render() {
    const initialLastName = `${this.props.lastname.charAt(0)}.`;
    const { preferredName, mainTitle, lastname } = this.props;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          title={
            preferredName
              ? `${preferredName} ${lastname}`
              : mainTitle || lastname
                ? `${mainTitle} ${lastname}`
                : I18n.t("mainTitle")
          }
        >
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
                      if (onlyLetters(text) || text == "") {
                        this.props.updateForm({
                          firstname: text,
                          mainTitle: text
                        });
                      }
                    }}
                    maxLength={20}
                    value={this.props.firstname}
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
                  value={this.props.lastname}
                  sec
                />

                {/* Prefered Name */}
                <InputRegular
                  containerStyle={styles.containerInput}
                  placeholder={I18n.t("preferredName")}
                  value={this.props.preferredName}
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
        {/* Next Button */}
        <BottomButton
          title={I18n.t("next")}
          onPress={() => this.submit()}
          bold={false}
          disabled={this.isDisabled()}
        />
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  id: state.customerProfile.userInfo.id,
  firstname: state.registrationCustomer.firstname,
  lastname: state.registrationCustomer.lastname,
  formHasErrors: state.registrationCustomer.formHasErrors,
  preferredName: state.registrationCustomer.preferredName,
  mainTitle: state.registrationCustomer.mainTitle,
  token: state.auth.token
});

const mD = {
  updateForm,
  clearForm,
  asyncUpdateUser
};

export default connect(mS, mD)(NameCustomerView);
