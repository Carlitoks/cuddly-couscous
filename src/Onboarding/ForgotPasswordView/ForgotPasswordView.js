import React, { Component } from "react";
import { ScrollView, View, Alert } from "react-native";
import { RkButton, RkTextInput, RkText } from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/MaterialIcons";

import { styles } from "./styles";

// For the moment
import EN from "../../I18n/en";

class ForgotPasswordView extends Component {
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

          <RkText style={styles.title}>{EN["forgotPassword"]}</RkText>

          <RkTextInput placeholder={EN["email"]} autoCorrect={false} />

          <RkButton
            style={styles.Button}
            onPress={() => Alert.alert("Sign In")}
          >
            {EN["resetpassword"]}
          </RkButton>

          <RkText
            style={{ color: "blue", padding: 10 }}
            onPress={() => Alert.alert("new account")}
          >
            {EN["newaccount"]}
          </RkText>
          <RkText
            style={{ color: "blue", padding: 10 }}
            onPress={() => Alert.alert("troubleshoot")}
          >
            {EN["troubleshoot"]}
          </RkText>
        </View>
      </ScrollView>
    );
  }
}

export default ForgotPasswordView;
