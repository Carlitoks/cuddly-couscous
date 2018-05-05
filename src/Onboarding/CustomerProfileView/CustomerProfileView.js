import React, { Component } from "react";
import { Text, View, ScrollView, Alert, Image } from "react-native";
import { connect } from "react-redux";

import {
  clearForm,
  updateForm,
  asyncCreateUser,
  asyncUploadAvatar
} from "../../Ducks/CustomerProfileReducer";
import { logInAsync, logOutAsync } from "../../Ducks/AuthReducer";

import {
  FormInput,
  Avatar,
  Card,
  Button,
  Header,
  FormLabel
} from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import NextButton from "../../Components/NextButton/NextButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import styles from "./styles";
import { displayFormErrors } from "../../Util/Helpers";
import I18n from "../../I18n/I18n";
import { Images, Colors } from "../../Themes";
import { USER_NAME } from "../../Util/Constants";

class CustomerProfileView extends Component {
  state = {
    name: ""
  };

  componentWillUnmount() {
    this.props.clearForm();
  }

  validateForm() {
    const patt = new RegExp(USER_NAME);
    let updates = {};
    let valid = true;

    if (!patt.test(this.props.firstName)) {
      updates = { ...updates, firstNameErrorMessage: "Not A Valid fist name" };
      valid = false;
    }

    if (!this.props.firstName) {
      updates = { ...updates, firstNameErrorMessage: "Empty fist name" };
      valid = false;
    }

    if (!this.props.lastName) {
      updates = { ...updates, lastNameErrorMessage: "Empty last name" };
      valid = false;
    }

    /* Finish Validations */

    updates = { ...updates, formHasErrors: !valid };

    if (!valid) {
      displayFormErrors(
        updates.fistNameErrorMessage,
        updates.lastNameErrorMessage
      );
    }

    this.props.updateForm(updates);
    return valid;
  }

  registerUser() {
    const uinfo = {
      email: this.props.email,
      password: this.props.password,
      firstName: this.props.firstName,
      lastName: this.props.lastName
    };
    return this.props.asyncCreateUser(uinfo, this.props.deviceToken);
  }

  uploadAvatar(response) {
    const uinfo = response.payload;

    return this.props.navigation.dispatch({ type: "Home" });

    /*
    this.props
      .asyncUploadAvatar(uinfo.uuid, this.props.avatar, uinfo.token)
      .then(response => {
        this.props.navigation.dispatch({ type: "Home" });
      })
      .catch(err => {
        this.props.navigation.dispatch({ type: "Home" });
      });*/
  }

  showError(err) {
    console.log(err);
    const errorMessage = err.payload.response.data.errors[0];
    Alert.alert("error", errorMessage);
  }

  loginUser() {
    this.props
      .logInAsync(this.props.email, this.props.password)
      .then(response => {
        if (response.type !== "networkErrors/error") {
          this.uploadAvatar(response);
        } else {
          this.showError(response);
        }
      });
  }

  submit() {
    this.props.updateForm({
      performingRequest: true
    });

    if (this.validateForm()) {
      if (!this.props.formHasErrors) {
        this.registerUser().then(response => {
          if (response.type !== "networkErrors/error") {
            this.loginUser();
          } else {
            this.showError(response);
          }
        });
      } else {
        if (this.props.formHasErrors) {
          displayFormErrors(
            this.props.firstNameErrorMessage,
            this.props.lastNameErrorMessage
          );
        }
      }
    }

    this.props.updateForm({
      performingRequest: false
    });
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <ViewWrapper style={{ flex: 1 }}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          alwaysBounceVertical={false} 
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentScrollContainer}
        >
          <Grid>
            <Col>
              <View style={{ backgroundColor: "red" }}>
                <Col style={{ height: 50 }}>
                  {/* Linear Gradient */}
                  <LinearGradient
                    colors={[
                      Colors.gradientColor.top,
                      Colors.gradientColor.middle,
                      Colors.gradientColor.bottom
                    ]}
                    style={styles.linearGradient}
                  />

                  {/* Header - Navigation */}
                  <TopViewIOS/>   
                  <Header
                    outerContainerStyles={{ borderBottomWidth: 0, height: 50 }}
                    backgroundColor={Colors.transparent}
                    leftComponent={
                      <GoBackButton navigation={this.props.navigation} />
                    }
                    centerComponent={{
                      text: I18n.t("myProfile"),
                      style: styles.title
                    }}
                    rightComponent={
                      <NextButton
                        navigation={this.props.navigation}
                        onPressButton={() => {
                          this.submit();
                        }}
                      />
                    }
                  />
                </Col>
              </View>
              <View style={styles.avatarContainer}>
                {/* Avatar */}
                  <Image
                    style={styles.avatar}
                    resizeMode="cover"
                    source={require("../../Images/perfil.jpg")}
                  />
              </View>
              <View>
                <FormLabel>{I18n.t("name")}</FormLabel>
                <FormInput
                  placeholder="Viola Lowe"
                  autoCorrect={false}
                  value={this.state.name}
                  onChangeText={text => {
                    this.setState({
                      name: text
                    });

                    const fullName = text.trim().split(" ");

                    this.props.updateForm({
                      firstName: fullName[0],
                      lastName: fullName[1],
                      firsNameErrorMessage: "",
                      lastNameErrorMessage: ""
                    });
                  }}
                />
              </View>
              <View>
                <FormLabel>{I18n.t("preferredName")}</FormLabel>
                <FormInput placeholder="Viola-Viola" autoCorrect={false} />
              </View>
              <View>
                <FormLabel>{I18n.t("genderName")}</FormLabel>
                <FormInput placeholder="Female" autoCorrect={false} />
              </View>
              <View>
                <FormLabel>{I18n.t("nativeLanguage")}</FormLabel>
                <FormInput placeholder="English" autoCorrect={false} />
              </View>
              <View>
                <FormLabel>{I18n.t("secondaryLanguage")}</FormLabel>
                <FormInput placeholder="Spanish, Russian" autoCorrect={false} />
              </View>
              <View>
                <FormLabel>{I18n.t("citizenShip")}</FormLabel>
                <FormInput placeholder="English" autoCorrect={false} />
              </View>
              <View>
                <FormLabel>{I18n.t("countryFamiliarity")}</FormLabel>
                <FormInput placeholder="UK, USA" autoCorrect={false} />
              </View>
              <View>
                <FormLabel>{I18n.t("cityFamiliarity")}</FormLabel>
                <FormInput
                  placeholder="London, San Diego, New York"
                  autoCorrect={false}
                />
              </View>
              <View>
                <FormLabel>{I18n.t("areasExpertise")}</FormLabel>
                <FormInput placeholder="Traveling, Sport" autoCorrect={false} />
              </View>
              <View style={styles.logoutContainer}>
                <Text
                  style={[styles.buttonText, styles.button]}
                  onPress={() => {
                    this.props.logOutAsync();
                  }}
                >
                  {I18n.t("logOut")}
                </Text>
              </View>
            </Col>
          </Grid>
        </ScrollView>
      </ViewWrapper>
    );
  }
}
const mS = state => ({
  firstName: state.customerProfile.firstName,
  firstNameErrorMessage: state.customerProfile.firstNameErrorMessage,
  lastName: state.customerProfile.lastName,
  lastNameErrorMessage: state.customerProfile.firstNameErrorMessage,
  email: state.registrationCustomer.email,
  password: state.registrationCustomer.password,
  deviceToken: state.registrationCustomer.deviceToken,
  avatar: state.customerProfile.avatar,
  token: state.auth.token,
  uuid: state.auth.uuid
});

const mD = {
  clearForm,
  updateForm,
  asyncCreateUser,
  asyncUploadAvatar,
  logInAsync,
  logOutAsync
};

export default connect(mS, mD)(CustomerProfileView);