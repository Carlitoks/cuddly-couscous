import React, { Component } from "react";

import { Button, FormLabel, FormInput, Card } from "react-native-elements";
import { View, Image, ScrollView, Text } from "react-native";

import { Images } from "../../Themes";
import styles from "./styles";

// For the moment
import EN from "../../I18n/en";

export default class SelectRoleView extends Component {
  render() {
    const navigation = this.props.navigation;

    return (
      <View>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
        >
          {/* OnVoy Logo */}
          <Image style={[styles.logo, styles.center]} source={Images.logo} />

          {/* Card */}
          <Card style={[styles.card, styles.center]}>
            {/* Call Image */}
            <Image style={[styles.call, styles.center]} source={Images.call} />

            {/* Contact Linguist Text */}
            <Text style={[styles.textCenter, styles.center]}>
              {EN["quicklyContact"]}
            </Text>

            {/* Call A Linguist Button */}
            <Button
              buttonStyle={[styles.button, styles.center]}
              onPress={() => navigation.dispatch({ type: "CustomerAccount" })}
              title={EN["callLinguist"]}
            >
              <Text style={[styles.buttonText, styles.center]} />
            </Button>
          </Card>

          {/* Scan a QR */}
          <Button
            buttonStyle={[styles.buttonQR, styles.center]}
            onPress={() => navigate("LaunchScreen")}
            title={EN["scanQR"]}
            color="#1e90ff"
            icon={{ name: "qrcode", type: "font-awesome", color: "#1e90ff" }}
          />

          {/* Become a Linguist */}
          <Text style={[styles.textBecome, styles.center]}>
            {EN["becomeOnVoy"]}
          </Text>

          {/* Sign In */}
          <Text style={[styles.textLogin, styles.center]}>
            {EN["alreadyAccount"]}
            <Text
              style={[styles.linkLogin, styles.center]}
              onPress={() => navigation.dispatch({ type: "LoginView" })}
            >
              {" "}
              {EN["signIn"]}
            </Text>
          </Text>
        </ScrollView>
      </View>
    );
  }
}
