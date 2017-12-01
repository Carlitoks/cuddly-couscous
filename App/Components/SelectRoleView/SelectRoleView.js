import React, { Component } from "react";
import { RkButton, RkCard, RkText } from "react-native-ui-kitten";
import I18n, { getLanguages } from "react-native-i18n";
import { Text, Button, StyleSheet, View, Image, Alert } from "react-native";
import { styles } from "./style";
import { Login } from "../../Containers/Login";

I18n.fallbacks = true;

// Available languages
I18n.translations = {
  en: require("../../I18n/languages/english.json"),
  es: require("../../I18n/languages/es.json")
};
export class SelectRoleView extends Component {
  state = { languages: [] };
  componentWillMount() {
    getLanguages().then(languages => {
      this.setState({ languages });
    });
  }
  render() {
    const navigate = this.props.navigate;

    return (
      <View>
        <Image
          style={[styles.logo, styles.center]}
          source={require("../../Images/logoTMP.png")}
        />
        <RkCard style={[styles.card, styles.center]}>
          <Image
            style={[styles.call, styles.center]}
            source={require("../../Images/call.png")}
          />
          <RkText style={[styles.textCenter, styles.center]}>
            {I18n.t("quicklyContact")}
          </RkText>
          <RkButton
            style={[styles.button, styles.center]}
            onPress={() => navigate("LaunchScreen")}
          >
            <RkText style={[styles.buttonText, styles.center]}>
              {I18n.t("callLinguist")}{" "}
            </RkText>
          </RkButton>
        </RkCard>
        <RkButton
          style={[styles.buttonQR, styles.center]}
          onPress={() => navigate("LaunchScreen")}
        >
          <Text style={styles.textQR}>{I18n.t("scanQR")}</Text>
        </RkButton>
        <Text style={[styles.textBecome, styles.center]}>
          {I18n.t("becomeOnVoy")}
        </Text>
        <RkText style={[styles.textLogin, styles.center]}>
          {I18n.t("alreadyAccount")}
          {"  "}
          <RkText
            style={[styles.linkLogin, styles.center]}
            onPress={() => navigate("Login")}
          >
            {I18n.t("signIn")}
          </RkText>
        </RkText>
      </View>
    );
  }
}
