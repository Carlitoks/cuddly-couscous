import React, { Component } from "react";
import { ScrollView, View, Alert } from "react-native";
import { RkButton, RkTextInput, RkText } from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/MaterialIcons";

import InputPassword from "../../Components/InputPassword/InputPassword";

import { styles } from "./styles";

// For the moment
import EN from "../../I18n/en";

class LoginView extends Component {
  componentWillMount() {
    //
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
          <RkText style={styles.title}>{EN["signIn"]}</RkText>
          <RkTextInput placeholder={EN["email"]} autoCorrect={false} />
          <InputPassword
            style={styles.InputPassword}
            placeholder={EN["password"]}
          />
          <RkButton
            style={styles.Button}
            onPress={() => Alert.alert("Sign In")}
          >
            {EN["signIn"]}
          </RkButton>
          <RkText
            style={{ color: "blue", padding: 10 }}
            onPress={() => navigate("ForgotPassword")}
          >
            {EN["forgotPassword"]}
          </RkText>
        </View>
      </ScrollView>
    );
  }
}

export default LoginView;
