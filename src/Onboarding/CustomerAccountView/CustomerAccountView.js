import React, { Component } from "react";
import { Text, Button, View, ScrollView, Alert } from "react-native";
import { RkButton, RkTextInput, RkText, rkType } from "react-native-ui-kitten";
import InputPassword from "../../Components/InputPassword/InputPassword";
import { styles } from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";

import EN from "../../I18n/en";

export default class CustomerAccountView extends Component {
  render() {
    const navigation = this.props.navigation;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={styles.scrollContainer}
      >
        <View style={styles.formContainer}>
          <Icon
            style={styles.Icon}
            name="arrow-back"
            size={30}
            color={"#1E90FF"}
            onPress={() => navigation.dispatch({ type: "back" })}
          />
          <RkText style={styles.title}> {EN["CustomerAccount"]} </RkText>
          <RkTextInput placeholder={EN["email"]} autoCorrect={false} />
          <InputPassword
            style={styles.InputPassword}
            placeholder={EN["password"]}
          />
          <RkButton
            style={styles.Button}
            onPress={() => navigation.dispatch({ type: "CustomerProfile" })}
          >
            {EN["CreateAccount"]}
          </RkButton>
          <RkText style={{ padding: 10 }}>
            {EN["CustomerAccountText"]}
            <RkText style={{ color: "blue" }}> {EN["PrivacyPolicy"]}</RkText>
            {EN["And"]}
            <RkText style={{ color: "blue" }}>{EN["TermConditions"]}</RkText>
          </RkText>
          <RkButton
            style={styles.transparentButton}
            rkType="outline"
            onPress={() => navigation.dispatch({ type: "CustomerProfile" })}
          >
            {EN["ScanQR"]}
          </RkButton>
        </View>
      </ScrollView>
    );
  }
}
