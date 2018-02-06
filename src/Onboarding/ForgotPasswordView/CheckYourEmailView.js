import React, { Component } from "react";

import { ScrollView, View, Alert, Text, KeyboardAvoidingView } from "react-native";
import { Button, Header } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { topIOS } from "../../Util/Devices";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import styles from "./styles";
import { Colors } from "../../Themes";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
// For the moment
import I18n from "../../I18n/I18n";

class CheckYourEmailView extends Component {
  render() {
    const navigation = this.props.navigation;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          alwaysBounceVertical={false} 
          style={styles.scrollContainer}
        >
          <Grid>
            <Col>
              <Row>
                {/* Linear Gradient */}
                <LinearGradient
                  colors={[
                    Colors.gradientColor.top,
                    Colors.gradientColor.middle,
                    Colors.gradientColor.bottom
                  ]}
                  style={styles.linearGradient}
                />
                <Col>
                  {/* Header - Navigation */}
                  <TopViewIOS/>  
                  <Header
                    outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                    backgroundColor="transparent"
                  />
                  {/* Title */}
                  <Text style={styles.title}>{I18n.t("forgotPassword")}</Text>
                </Col>
              </Row>
            </Col>
          </Grid>
          <View style={styles.checkEmailContainer}>
            <Text style={styles.checkEmail}>{I18n.t("checkYourEmail")}</Text>
          </View>
        </ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={topIOS()}>
        <View style={styles.containerBottom}>
          {/* Check your email Button */}
          <Button
            buttonStyle={styles.Button}
            textStyle={styles.buttonText}
            onPress={() => navigation.dispatch({ type: "SelectRoleView" })}
            title={I18n.t("next")}
          />
        </View>
        </KeyboardAvoidingView>
      </ViewWrapper>
    );
  }
}

export default CheckYourEmailView;
