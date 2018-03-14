import React, { Component } from "react";
import { connect } from "react-redux";

import {
  GetOptions,
  updateForm
} from "../../Ducks/RegistrationCustomerReducer";
import { asyncUpdateUser } from "../../Ducks/CustomerProfileReducer";
import { logInAsync, registerDevice } from "../../Ducks/AuthReducer";

import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, Header, List, ListItem } from "react-native-elements";
import { topIOS } from "../../Util/Devices";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";
import ListComponent from "../../Components/ListComponent/ListComponent";

import styles from "./styles";
import { displayFormErrors } from "../../Util/Helpers";
import { Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

import DeviceInfo from "react-native-device-info";

class GenderCustomerView extends Component {
  navigate = this.props.navigation.navigate;

  constructor(props) {
    super(props);

    this.state = {
      genderIndex: -1
    };
  }

  validateForm() {
    let updates = {};
    let valid = true;

    if (!this.props.selectedGender) {
      updates = {
        ...updates,
        GenderErrorMessage: "Please Select a Gender"
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

  showError(err) {
    const errorMessage = err.payload.response.data.errors[0];
    Alert.alert(
      I18n.t("error"),
      errorMessage,
      [
        {
          text: I18n.t("ok"),
          onPress: async () => {
            this.props.navigation.dispatch({ type: "EmailCustomerView" });
          }
        }
      ],
      { cancelable: false }
    );
  }

  async submit() {
    const {
      id,
      asyncUpdateUser,
      selectedGender,
      token,
      navigation
    } = this.props;

    await this.props.updateForm({
      performingRequest: true
    });

    const payload = {
      id,
      gender: selectedGender,
      countryCode: DeviceInfo.getDeviceCountry()
    };
    asyncUpdateUser(payload, token)
      .then(response => {
        if (response.type === "networkErrors/error") {
          throw new Error(response.payload.data.errors);
        }

        navigation.dispatch({ type: "WelcomeCustomerView" });
      })
      .catch(error => {
        console.log(error);

        dispatch(networkError(error));
      });
  }

  componentWillMount() {
    this.props.updateForm({
      performingRequest: false
    });
  }

  changeSelected(index) {
    this.setState({ genderIndex: index });
  }

  updateGender(gender) {
    this.props.updateForm({ selectedGender: gender.value });
  }

  render() {
    const genders = this.props.GetOptions();

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          title={I18n.t("genderName")}
        >
          <View style={styles.scrollContainer}>
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
            />
          </View>
        </HeaderView>
        {/* Next Button */}
        <BottomButton
          disabled={
            this.props.performingRequest || this.state.genderIndex == -1
          }
          title={I18n.t("finish")}
          onPress={() => this.submit()}
          loading={this.props.performingRequest}
        />
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  id: state.customerProfile.userInfo.id,
  token: state.auth.token,
  selectedGender: state.registrationCustomer.selectedGender,
  firstname: state.registrationCustomer.firstname,
  lastname: state.registrationCustomer.lastname,
  preferredName: state.registrationCustomer.preferredName,
  phoneNumber: state.registrationCustomer.phoneNumber,
  formHasErrors: state.registrationCustomer.formHasErrors,
  deviceToken: state.registrationCustomer.deviceToken,
  email: state.registrationCustomer.email,
  password: state.registrationCustomer.password,
  selectedNativeLanguage: state.registrationCustomer.selectedNativeLanguage,
  performingRequest: state.registrationCustomer.performingRequest
});

const mD = {
  GetOptions,
  updateForm,
  logInAsync,
  registerDevice,
  asyncUpdateUser
};

export default connect(mS, mD)(GenderCustomerView);
