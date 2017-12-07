import React, { Component } from "react";
import { RkButton, RkCard, RkText } from "react-native-ui-kitten";
import { View, Image, ScrollView } from "react-native";

import { Images } from "../../Themes";
import { styles } from "./styles";

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
          <RkCard style={[styles.card, styles.center]}>
            {/* Call Image */}
            <Image style={[styles.call, styles.center]} source={Images.call} />

            {/* Contact Linguist Text */}
            <RkText style={[styles.textCenter, styles.center]}>
              {EN["quicklyContact"]}
            </RkText>

            {/* Call A Linguist Button */}
            <RkButton
              style={[styles.button, styles.center]}
              onPress={() => navigation.dispatch({ type: "CustomerAccount" })}
            >
              <RkText style={[styles.buttonText, styles.center]}>
                {EN["callLinguist"]}{" "}
              </RkText>
            </RkButton>
          </RkCard>

          {/* Scan a QR */}
          <RkButton
            style={[styles.buttonQR, styles.center]}
            onPress={() => navigate("LaunchScreen")}
          >
            <RkText style={styles.textQR}>{EN["scanQR"]}</RkText>
          </RkButton>

          {/* Become a Linguist */}
          <RkText style={[styles.textBecome, styles.center]}>
            {EN["becomeOnVoy"]}
          </RkText>

          {/* Sign In */}
          <RkText style={[styles.textLogin, styles.center]}>
            {EN["alreadyAccount"]}
            {"  "}
            <RkText
              style={[styles.linkLogin, styles.center]}
              onPress={() => navigation.dispatch({ type: "LoginView" })}
            >
              {EN["signIn"]}
            </RkText>
          </RkText>
        </ScrollView>
      </View>
    );
  }
}
