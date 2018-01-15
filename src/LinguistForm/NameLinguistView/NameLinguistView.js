import React, { Component } from "react";
import { connect } from "react-redux";

import { updateForm, clearForm } from "../../Ducks/LinguistFormReducer";

import { View, Text, ScrollView, Alert } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, FormLabel, FormInput, Header } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import styles from "./styles";
import { Images, Colors } from "../../Themes";
import EN from "../../I18n/en";

class NameLinguist extends Component {
  componentWillUnmount() {
    this.props.clearForm();
  }

  navigate = this.props.navigation.navigate;

  validateForm() {
    let updates = {};
    let valid = true;

    if (!this.props.firstname) {
      updates = {
        ...updates,
        FirstnameErrorMessage: "Please enter you First Name"
      };
      valid = false;
    }

    if (!this.props.lastname) {
      updates = {
        ...updates,
        LastnameErrorMessage: "Please enter you Last Name"
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      this.tempDisplayErrors(
        updates.FirstnameErrorMessage,
        updates.LastnameErrorMessage
      );
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    if (this.validateForm()) {
      this.props.navigation.dispatch({ type: "EmailLinguistView" });
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
    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
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
                  <TopViewIOS/> 
                  <Header
                    outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                    backgroundColor="transparent"
                    leftComponent={
                      <GoBackButton navigation={this.props.navigation} />
                    }
                  />
                  {/* Enter your Name */}
                  <Text style={styles.mainTitle}>
                    {this.props.mainTitle} {this.props.lastname}
                  </Text>
                  {/* subtitle */}
                  <Text style={styles.mainSubtitle}>
                    {EN["NameLinguistText"]}
                  </Text>
                </Col>
              </Row>
              <Row>
                <View>
                  <FormInput
                    containerStyle={styles.containerInput}
                    inputStyle={styles.inputText}
                    placeholder={EN["linguistName"]}
                    onChangeText={text =>
                      this.props.updateForm({
                        firstname: text,
                        mainTitle: text
                      })}
                    value={this.props.name}
                  />
                </View>
              </Row>
              <Row>
                <View>
                  <FormInput
                    containerStyle={styles.containerInput}
                    inputStyle={styles.inputText}
                    placeholder={EN["linguistLastName"]}
                    onChangeText={text =>
                      this.props.updateForm({ lastname: text })}
                    value={this.props.name}
                  />
                </View>
              </Row>

              <View>
                <FormInput
                  containerStyle={styles.containerInput}
                  inputStyle={styles.inputText}
                  placeholder={EN["preferredName"]}
                  value={this.props.preferredName}
                  onChangeText={text =>
                    this.props.updateForm({ preferredName: text })}
                />
                <Text style={styles.formText}>
                  {EN["preferredLinguistText"]}
                </Text>
              </View>
            </Col>
          </Grid>
        </ScrollView>
        <View style={styles.containerBottom}>
          {/* Next Button */}
          <Button
            buttonStyle={styles.buttonContainer}
            textStyle={styles.buttonText}
            title="Next"
            onPress={() => this.submit()}
          />
        </View>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  firstname: state.linguistForm.firstname,
  lastname: state.linguistForm.lastname,
  formHasErrors: state.linguistForm.formHasErrors,
  preferredName: state.linguistForm.preferredName,
  mainTitle: state.linguistForm.mainTitle
});

const mD = {
  updateForm,
  clearForm
};

export default connect(mS, mD)(NameLinguist);
