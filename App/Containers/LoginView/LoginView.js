import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Alert } from "react-native";
import { RkButton, RkTextInput, RkText } from "react-native-ui-kitten";
import I18n, { getLanguages } from "react-native-i18n";
import PasswordInputText from "../../Components/PasswordInputText/PasswordInputText";
import { styles } from "./style";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LaunchScreen } from "../LaunchScreen";

I18n.fallbacks = true;

// Available languages
I18n.translations = {
  en: require("../../I18n/languages/english.json"),
  es: require("../../I18n/languages/es.json")
};

export class LoginView extends Component {
  state = { languages: [] };
  componentWillMount() {
    getLanguages().then(languages => {
      this.setState({ languages });
    });
  }

  render() {
    const navigate = this.props.navigate;

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
            onPress={() => navigate("LaunchScreen")}
          />
          <RkText style={styles.title}>{I18n.t("signIn")}</RkText>
          <RkTextInput placeholder={I18n.t("email")} autoCorrect={false} />
          <PasswordInputText
            style={styles.PasswordInputText}
            placeholder={I18n.t("password")}
          />
          <RkButton
            style={styles.Button}
            onPress={() => Alert.alert("Sign In")}
          >
            {I18n.t("signIn")}
          </RkButton>
          <RkText
            style={{ color: "blue", padding: 10 }}
            onPress={() => navigate("ForgotPassword")}
          >
            {I18n.t("forgotPassword")}
          </RkText>
        </View>
      </ScrollView>
    );
  }
}
