import React, { Component } from "react";
import { connect } from "react-redux";

import {
  GetOptions,
  updateForm
} from "../../Ducks/RegistrationCustomerReducer";

import { View, Text, ScrollView, Alert, KeyboardAvoidingView } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import {
  Button,
  FormInput,
  Header,
  List,
  ListItem
} from "react-native-elements";
import { topIOS } from "../../Util/Devices";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import styles from "./styles";
import { Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

class GenderCustomerView extends Component {
  navigate = this.props.navigation.navigate;

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
      this.tempDisplayErrors(updates.GenderErrorMessage);
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    const { navigation } = this.props;

    if (this.validateForm()) {
      navigation.dispatch({ type: "LanguageCustomerView" });
    }
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
    const genders = this.props.GetOptions();

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
                  <Header
                    outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                    backgroundColor="transparent"
                    leftComponent={
                      <GoBackButton navigation={this.props.navigation} />
                    }
                  />
                  {/* Enter your Name */}
                  <Text style={styles.mainTitle}>{I18n.t("genderName")}</Text>
                </Col>
              </Row>
              <List containerStyle={{ borderTopWidth: 0 }}>
                {genders.map((item, i) => (
                  <ListItem
                    key={i}
                    containerStyle={styles.genderItem}
                    title={item.gender}
                    hideChevron={
                      this.props.selectedGender === "" ||
                      this.props.selectedGender !== item.gender
                    }
                    titleStyle={{ fontSize: 20 }}
                    rightIcon={
                      this.props.selectedGender !== ""
                        ? { name: "check" }
                        : undefined
                    }
                    onPress={() => {
                      this.props.updateForm({ selectedGender: item.gender });
                    }}
                  />
                ))}
              </List>
            </Col>
          </Grid>
        </ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={topIOS()}>
        <View style={styles.containerBottom}>
          {/* Next Button */}
          <Button
            buttonStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
            title="Next"
            onPress={() => this.submit()}
          />
        </View>
        </KeyboardAvoidingView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  selectedGender: state.registrationCustomer.selectedGender
});

const mD = {
  GetOptions,
  updateForm
};

export default connect(mS, mD)(GenderCustomerView);
