import React, { Component } from "react";
import { Text, Button, View, ScrollView, Alert } from "react-native";
import I18n, { getLanguages } from "react-native-i18n";
import { RkButton, RkTextInput, RkText, rkType } from "react-native-ui-kitten";
import PasswordInputText from "../../Components/PasswordInputText/PasswordInputText";
import { styles } from "./style";
import Icon from "react-native-vector-icons/MaterialIcons";
import { LaunchScreen } from "../LaunchScreen";

export default class LinguistAccount extends Component {
  constructor(props) {
    super(props);
  }

  state = { languages: [] };
  componentWillMount() {
    getLanguages().then(languages => {
      this.setState({ languages });
    });
  }

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
            color={"#03a6a7"}
            onPress={() => navigate("LaunchScreen")}
          />
          <RkText style={styles.title}> Create a Linguist Profile</RkText>
          <RkTextInput placeholder={I18n.t("email")} autoCorrect={false} />
          <PasswordInputText
            style={styles.PasswordInputText}
            placeholder={I18n.t("password")}
          />
          <RkButton
            style={styles.Button}
            onPress={() => Alert.alert("Create Account")}
          >
            {I18n.t("CreateAccount")}
          </RkButton>
          <RkText style={{ padding: 10 }}>
            {I18n.t("CustomerAccountText")}
            <RkText style={{ color: "#03a6a7" }}>
              {I18n.t("PrivacyPolicy")}
            </RkText>
            {I18n.t("And")}
            <RkText style={{ color: "#03a6a7" }}>
              {I18n.t("TermConditions")}
            </RkText>
          </RkText>
          <RkButton
            style={styles.transparentButton}
            rkType="outline"
            onPress={() => Alert.alert("Scan your QR code")}
          >
            {I18n.t("ScanQR")}
          </RkButton>
        </View>
      </ScrollView>
    );
  }
}
