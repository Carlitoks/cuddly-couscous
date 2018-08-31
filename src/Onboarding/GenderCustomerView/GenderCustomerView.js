import React, { Component } from "react";
import { connect } from "react-redux";

import {
  GetOptions,
  updateForm,
  clearForm
} from "../../Ducks/RegistrationCustomerReducer";
import { asyncUpdateUser } from "../../Ducks/CustomerProfileReducer";
import { logInAsync, registerDevice } from "../../Ducks/AuthReducer";
import {
  update,
  checkRecord,
  removeRecord
} from "../../Ducks/OnboardingRecordReducer";
import {
  getProfileAsync,
  updateView,
  getNativeLang
} from "../../Ducks/UserProfileReducer";

import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableWithoutFeedback
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, Header, List, ListItem } from "react-native-elements";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";
import ListComponent from "../../Components/ListComponent/ListComponent";

import styles from "./styles";
import {
  displayFormErrors,
  is500Response,
  displayTemporaryErrorAlert
} from "../../Util/Helpers";
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
      navigation,
      email,
      checkRecord,
      removeRecord
    } = this.props;

    await this.props.updateForm({
      performingRequest: true
    });

    const record = checkRecord(email);
    const storedToken = record ? record.token : token;
    const storedId = record ? record.id : id;

    const payload = {
      id: storedId,
      gender: selectedGender,
      countryCode: DeviceInfo.getDeviceCountry()
    };
    asyncUpdateUser(payload, storedToken)
      .then(response => {
        if (response.type === "networkErrors/error") {
          throw new Error(response.payload.data.errors);
        }

        removeRecord();
      })
      .then(() => {
        const { getProfileAsync, id, token } = this.props;
        return getProfileAsync(id, token);
      })
      .then(res => {
        return this.props.updateView({
          selectedNativeLanguage: this.props.getNativeLang(
            res.payload.nativeLangCode
          )
        });
      })
      .then(() => {
        navigation.dispatch({
          type: "PaymentsView",
          params: {
            title: I18n.t("paymentDetails"),
            messageText: I18n.t("enterPaymentOnboarding"),
            buttonText: I18n.t("continue"),
            buttonTextIfEmpty: I18n.t("skipAddLater"),
            optional: true,
            onSubmit: () => {
              navigation.dispatch({ type: "WelcomeCustomerView" });
            }
          }
        });
      })
      .catch(error => {
        this.props.updateForm({
          performingRequest: false
        });
        error.response
          ? is500Response(error)
            ? displayTemporaryErrorAlert()
            : null
          : displayFormErrors(error.response.data);
      });
  }

  componentWillMount() {
    const { email, emailUserProfile, update } = this.props;

    const emailStored = email.length === 0 ? emailUserProfile : email;

    update({
      email: emailStored.toLowerCase(),
      lastStage: "GenderCustomerView"
    });

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
          navbarTitle={I18n.t("genderName")}
          navbarType={"Basic"}
          NoWaves
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
          </View>
        </HeaderView>
        {/* Next Button */}
        <BottomButton
          disabled={
            this.props.performingRequest || this.state.genderIndex == -1
          }
          fill={!(this.props.performingRequest || this.state.genderIndex == -1)}
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
  emailUserProfile: state.userProfile.email,
  password: state.registrationCustomer.password,
  selectedNativeLanguage: state.registrationCustomer.selectedNativeLanguage,
  performingRequest: state.registrationCustomer.performingRequest
});

const mD = {
  GetOptions,
  updateForm,
  clearForm,
  logInAsync,
  registerDevice,
  asyncUpdateUser,
  update,
  checkRecord,
  removeRecord,
  getProfileAsync,
  updateView,
  getNativeLang
};

export default connect(
  mS,
  mD
)(GenderCustomerView);
