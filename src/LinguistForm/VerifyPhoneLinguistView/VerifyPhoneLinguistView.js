import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateForm
} from "../../Ducks/LinguistFormReducer";

import { View, Text, ScrollView, Alert, TextInput, Platform } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button, FormLabel, FormInput, Header, Badge } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";

import styles from "./styles";
import { Images, Colors } from "../../Themes";
import EN from "../../I18n/en";

class VerifyPhoneLinguist extends Component {
  navigate = this.props.navigation.navigate;

  render() {

    return (
      <View style={styles.scrollContainer}>
        <ScrollView automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}>
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
                  {/* Verify your phone */}
                  <Text style={styles.mainTitle}>
                    {EN["verifyNumber"]}
                  </Text>
                  {/* subtitle */}
                  <Text style={styles.mainSubtitle}>
                    {EN["verifyNumberText"]}
                  </Text>
                </Col>
              </Row>

              {/* 
              We need to complete this logic 
              <View style={styles.numberFields}>
                <TextInput style={styles.containerInput}
                  placeholder="1"
                  maxLength={1}
                />
                <TextInput style={styles.containerInput}
                  placeholder="2"
                  maxLength={1}
                />
                <TextInput style={styles.containerInput}
                  placeholder="3"
                  maxLength={1}
                />
                <TextInput style={styles.containerInput}
                  placeholder="4"
                  maxLength={1}
                />
                <TextInput style={styles.containerInput}
                  placeholder="5"
                  maxLength={1}
                />
                <TextInput style={styles.containerInput}
                  placeholder="6"
                  maxLength={1}
                />
              </View> */}
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
      </View>
    );
  }
}

const mS = state => ({
  VerifyPhoneNumber: state.linguistForm.VerifyPhoneNumber,
  formHasErrors: state.linguistForm.formHasErrors,
});

const mD = {
  updateForm,
};

export default connect(mS, mD)(VerifyPhoneLinguist);
