import React, { Component } from "react";
import { RkButton, RkCard, RkText } from "react-native-ui-kitten";
import { Text, Button, StyleSheet, View, Image, Alert } from "react-native";

import { Images } from "../../Themes";
import { styles } from "./styles";

// For the moment
import EN from "../../I18n/en";

export default class SelectRoleView extends Component {
  render() {
    const navigate = this.props.navigate;

    return (
      <View>
        <Image style={[styles.logo, styles.center]} source={Images.logo} />
        <RkCard style={[styles.card, styles.center]}>
          <Image style={[styles.call, styles.center]} source={Images.call} />
          <RkText style={[styles.textCenter, styles.center]}>
            {EN["quicklyContact"]}
          </RkText>
          <RkButton
            style={[styles.button, styles.center]}
            onPress={() => navigate("LaunchScreen")}
          >
            <RkText style={[styles.buttonText, styles.center]}>
              {EN["callLinguist"]}{" "}
            </RkText>
          </RkButton>
        </RkCard>
        <RkButton
          style={[styles.buttonQR, styles.center]}
          onPress={() => navigate("LaunchScreen")}
        >
          <Text style={styles.textQR}>{EN["scanQR"]}</Text>
        </RkButton>
        <Text style={[styles.textBecome, styles.center]}>
          {EN["becomeOnVoy"]}
        </Text>
        <RkText style={[styles.textLogin, styles.center]}>
          {EN["alreadyAccount"]}
          {"  "}
          <RkText
            style={[styles.linkLogin, styles.center]}
            onPress={() => navigate("Login")}
          >
            {EN["signIn"]}
          </RkText>
        </RkText>
      </View>
    );
  }
}
