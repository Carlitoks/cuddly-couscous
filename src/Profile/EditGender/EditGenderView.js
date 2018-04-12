import React, { Component } from "react";
import { connect } from "react-redux";

import {
  GetOptions,
  updateForm,
  clearForm
} from "../../Ducks/RegistrationCustomerReducer";
import { updateProfileAsync } from "../../Ducks/UserProfileReducer";

import { View, Text, ScrollView, Alert } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, Header, List, ListItem } from "react-native-elements";
import ListComponent from "../../Components/ListComponent/ListComponent";
import { findIndex } from "lodash";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";

import styles from "./styles";
import { displayFormErrors } from "../../Util/Helpers";
import { Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

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
    this.setState({
      genderIndex: findIndex(genders, { value: this.props.gender })
    });
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
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          headerCenterComponent={
            <Text style={styles.mainTitle}>{I18n.t("genderName")}</Text>
          }
          NoWaves
        >
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
            <View style={styles.mainContainterText}>
              <Text style={styles.textCenter}>{I18n.t("genderNotice")}</Text>
            </View>
          </ScrollView>
        </HeaderView>
        {/* Save Button */}
        <BottomButton
          bold={false}
          title={I18n.t("save")}
          onPress={() => this.submit()}
          fill
        />
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  gender: state.userProfile.gender,
  formGender: state.registrationCustomer.selectedGender,
  token: state.auth.token,
  uuid: state.auth.uuid
});

const mD = {
  GetOptions,
  updateForm,
  clearForm,
  updateProfileAsync
};

export default connect(mS, mD)(EditGenderView);
