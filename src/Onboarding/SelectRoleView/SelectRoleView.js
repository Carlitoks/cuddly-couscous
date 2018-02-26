import React, { Component } from "react";
import { connect } from "react-redux";

import { Button, FormLabel, Card } from "react-native-elements";
import { View, Image, ScrollView, Text } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import { Images, Fonts } from "../../Themes";
import styles from "./styles";

// For the moment
import I18n from "../../I18n/I18n";
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
      <ViewWrapper style={{ flex: 1 }}>
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
            <ScrollView
              automaticallyAdjustContentInsets={true}
              style={styles.scrollContainer}
              alwaysBounceVertical={false}
              contentContainerStyle={styles.contentScrollContainer}
              bounce="false"
            >
              <TopViewIOS />
              {/* OnVoy Logo */}
              <Text style={[styles.logo, styles.center]} source={Images.logo}>
                Jeenie
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
                  {I18n.t("quicklyContact")}
                </Text>

                {/* Call A Linguist Button */}
                <Button
                  borderRadius={15}
                  buttonStyle={[styles.button, styles.center]}
                  onPress={() =>
                    navigation.dispatch({ type: "EmailCustomerView" })
                  }
                  title={I18n.t("callLinguist")}
                  textStyle={[styles.buttonText, styles.center]}
                />
              </Card>

              {/* Scan a QR */}
              <Button
                borderRadius={15}
                buttonStyle={[styles.buttonQR, styles.center]}
                onPress={() => navigation.dispatch({ type: "ScanScreenView" })}
                title={I18n.t("scanQR")}
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
                {I18n.t("becomeOnVoy")}
              </Text>

              {/* Sign In */}
              <Text style={[styles.textLogin, styles.center]}>
                {I18n.t("alreadyAccount")}
                <Text
                  style={[styles.linkLogin, styles.center]}
                  onPress={() => navigation.dispatch({ type: "LoginView" })}
                >
                  {" "}
                  {I18n.t("signIn")}
                </Text>
              </Text>
            </ScrollView>
          </Col>
        </Grid>
      </ViewWrapper>
    );
  }
}

ms = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(ms, null)(SelectRoleView);
