import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Alert } from "react-native";
import { RkButton, RkTextInput, RkText } from "react-native-ui-kitten";
import I18n, { getLanguages } from "react-native-i18n";

import { styles } from "./style";
import Icon from "react-native-vector-icons/MaterialIcons";

export class ForgotPasswordView extends Component {
  render() {
    const navigate = this.props.navigation.navigate;

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
            onPress={() => navigate("Login")}
          />
          <RkText style={styles.title}>{I18n.t("forgotPassword")}</RkText>
          <RkTextInput placeholder={I18n.t("email")} autoCorrect={false} />
          <RkButton
            style={styles.Button}
            onPress={() => Alert.alert("Sign In")}
          >
            {I18n.t("resetpassword")}
          </RkButton>

          <RkText
            style={{ color: "blue", padding: 10 }}
            onPress={() => Alert.alert("new account")}
          >
            {I18n.t("newaccount")}
          </RkText>
          <RkText
            style={{ color: "blue", padding: 10 }}
            onPress={() => Alert.alert("troubleshoot")}
          >
            {I18n.t("troubleshoot")}
          </RkText>
        </View>
      </ScrollView>
    );
  }
}
