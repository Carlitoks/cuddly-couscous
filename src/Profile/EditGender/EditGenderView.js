import React, { Component } from "react";
import { connect } from "react-redux";

import { clearForm, GetOptions, updateForm } from "../../Ducks/RegistrationCustomerReducer";
import { updateProfileAsync } from "../../Ducks/UserProfileReducer";

import { Alert, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native";
import ListComponent from "../../Components/ListComponent/ListComponent";
import { findIndex } from "lodash";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";

import styles from "./styles";
import { displayFormErrors } from "../../Util/Alerts";
import I18n from "../../I18n/I18n";
import NavBar from "../../Components/NavBar/NavBar";

class EditGenderView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      genderIndex: -1
    };
  }

  navigate = this.props.navigation.navigate;

  componentWillMount() {
    const genders = this.props.GetOptions();
    this.props.updateForm({ selectedGender: this.props.gender });

    const genderIndex =
      this.props.gender.length === 0
        ? 2
        : findIndex(genders, { value: this.props.gender });

    this.setState({ genderIndex });
  }

  componentWillUnmount() {
    this.props.clearForm();
  }

  validateForm() {
    let updates = {};
    let valid = true;

    if (!this.props.formGender) {
      updates = {
        ...updates,
        GenderErrorMessage: I18n.t("selectGender")
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      displayFormErrors(updates.GenderErrorMessage);
    }

    this.props.updateForm(updates);
    return valid;
  }

  changeSelected(index) {
    this.setState({ genderIndex: index });
  }

  updateGender(gender) {
    this.props.updateForm({ selectedGender: gender.value });
  }

  submit() {
    const { formGender, token, uuid } = this.props;
    const data = {
      gender: formGender
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

  render() {
    const genders = this.props.GetOptions();
    const { formGender } = this.props;

    return (
      <View style={styles.scrollContainer}>
        <NavBar
          leftComponent={
            <GoBackButton navigation={this.props.navigation}/>
          }
          navbarTitle={I18n.t("genderName")}
        />
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
          alwaysBounceVertical={false}
        >
          <ListComponent
            data={genders}
            selected={this.state.genderIndex}
            onPress={index => {
              this.updateGender(genders[index]);
            }}
            titleProperty={"label"}
            changeSelected={index => {
              this.changeSelected(index);
            }}
            leftText
            noFlex
          />
          <TouchableWithoutFeedback
            onPress={() => {
              Alert.alert("", I18n.t("genderAlert"));
            }}
          >
            <View style={styles.mainContainterText}>
              <Text style={[styles.textCenter, styles.spaceBetween]}>
                {I18n.t("genderNotice")}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        {/* Save Button */}
        <BottomButton
          bold={false}
          title={I18n.t("save")}
          onPress={() => this.submit()}
          fill
        />
      </View>
    );
  }
}

const mS = state => ({
  gender: state.userProfile.gender,
  formGender: state.registrationCustomer.selectedGender,
  token: state.auth2.userJwtToken,
  uuid: state.auth2.userID
});

const mD = {
  GetOptions,
  updateForm,
  clearForm,
  updateProfileAsync
};

export default connect(
  mS,
  mD
)(EditGenderView);
