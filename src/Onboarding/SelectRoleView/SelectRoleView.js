import React, { Component } from "react";
import { connect } from "react-redux";

import { Button, FormLabel, FormInput, Card } from "react-native-elements";
import { View, Image, ScrollView, Text } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS"
import { Images, Fonts } from "../../Themes";
import styles from "./styles";

// For the moment
import EN from "../../I18n/en";
import Colors from "../../Themes/Colors";

class SelectRoleView extends Component {
  componentWillMount() {
    const { navigation, isLoggedIn } = this.props;

    if (isLoggedIn) {
      navigation.dispatch({ type: "Home" });
    }
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentScrollContainer}
        >
          <Grid>
            <Col>
              {/* Linear Gradient */}
              <LinearGradient
                colors={[
                  Colors.gradientColor.top,
                  Colors.gradientColor.middle,
                  Colors.gradientColor.bottom
                ]}
                style={styles.linearGradient}
              />

              {/* OnVoy Logo */}
              <Text style={[styles.logo, styles.center]} source={Images.logo}> 
                OnVoy 
              </Text> 

              {/* Card */}
              <Card
                containerStyle={styles.cardContainer}
                style={[styles.card, styles.center]}
              >
                {/* Call Image */}
                <Image
                  style={[styles.call, styles.center]}
                  source={Images.call}
                />

                {/* Contact Linguist Text */}
                <Text style={[styles.textCenter, styles.center]}>
                  {EN["quicklyContact"]}
                </Text>

                {/* Call A Linguist Button */}
                <Button
                  borderRadius={15}
                  buttonStyle={[styles.button, styles.center]}
                  onPress={() =>
                    navigation.dispatch({ type: "CustomerAccount" })
                  }
                  title={EN["callLinguist"]}
                  textStyle={[styles.buttonText, styles.center]}
                />
              </Card>

              {/* Scan a QR */}
              <Button
                borderRadius={15}
                buttonStyle={[styles.buttonQR, styles.center]}
                onPress={() => navigation.dispatch({ type: "ScanScreenView" })} 
                title={EN["scanQR"]}
                icon={{
                  name: "qrcode",
                  type: "font-awesome",
                  color: Colors.fontColor,
                  size: 30
                }}
                textStyle={[styles.textQR, styles.center]}
              />

              {/* Become a Linguist */}
              <Text
                onPress={() =>
                  navigation.dispatch({ type: "NameLinguistView" })
                }
                style={[styles.textBecome, styles.center]}
              >
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
            </Col>
          </Grid>
        </ScrollView>
      </View>
    );
  }
}

ms = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(ms, null)(SelectRoleView);
