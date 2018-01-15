import React, { Component } from "react";
import { connect } from "react-redux";

import { GetOptions, updateForm } from "../../Ducks/LinguistFormReducer";

import { View, Text, ScrollView, Alert } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import {
  Button,
  FormLabel,
  FormInput,
  Header,
  List,
  ListItem
} from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import styles from "./styles";
import { Images, Colors } from "../../Themes";
import EN from "../../I18n/en";

class GenderLinguist extends Component {
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
      navigation.dispatch({ type: "PhoneLinguistView" });
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
                  <Text style={styles.mainTitle}>{EN["genderName"]}</Text>
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
                      this.props.selectedGender !== "" ? (
                        { name: "check" }
                      ) : (
                        undefined
                      )
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
  selectedGender: state.linguistForm.selectedGender
});

const mD = {
  GetOptions,
  updateForm
};

export default connect(mS, mD)(GenderLinguist);
