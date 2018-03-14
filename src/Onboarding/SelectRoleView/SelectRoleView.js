import React, { Component } from "react";
import { connect } from "react-redux";

import { Button, FormLabel, Card } from "react-native-elements";
import { View, Image, ScrollView, Text, Linking } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import DeviceInfo from "react-native-device-info";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import { Images, Fonts } from "../../Themes";
import styles from "./styles";
import BottomButton from "../../Components/BottomButton/BottomButton";

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
  IphoneX = DeviceInfo.getModel() == "iPhone X";
  render() {
    const navigation = this.props.navigation;

    return (
      <ViewWrapper style={{ flex: 1 }}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentScrollContainer}
          alwaysBounceVertical={false}
        >
          <Grid>
            <Col>
              {/* Linear Gradient */}

              <Image source={Images.landing} style={styles.backgroundImage} />
              {/* Jeenie Logo */}
              <View
                style={[
                  this.IphoneX ? styles.logoX : styles.logo,
                  styles.center
                ]}
                source={Images.logo}
              >
                <Image source={Images.jeenieLogo} style={styles.logoImage} />
              </View>
              <Text style={styles.textLanguageCommand}>
                {I18n.t("languageCommand")}
              </Text>
              <View style={styles.mainContainer}>
                <BottomButton
                  title={I18n.t("getStarted").toUpperCase()}
                  onPress={() =>
                    navigation.dispatch({ type: "EmailCustomerView" })
                  }
                  fill={true}
                  long={true}
                  relative
                />
                <View style={styles.mainBottomContainer}>
                  {/* Become a Linguist */}
                  <Text
                    onPress={() =>
                      Linking.openURL("https://signup.gps.network")
                    }
                    style={[
                      this.IphoneX ? styles.textBecomeX : styles.textBecome
                    ]}
                  >
                    {I18n.t("becomeLinguist")}
                  </Text>

                  {/* Sign In */}
                  <Text
                    style={[
                      this.IphoneX ? styles.textLoginX : styles.textLogin
                    ]}
                    onPress={() => navigation.dispatch({ type: "LoginView" })}
                  >
                    {I18n.t("signIn")}
                  </Text>
                </View>
              </View>
            </Col>
          </Grid>
        </ScrollView>
      </ViewWrapper>
    );
  }
}

ms = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

export default connect(ms, null)(SelectRoleView);
