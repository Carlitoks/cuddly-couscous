import React, { Component } from "react";

import {
  ScrollView,
  View,
  Alert,
  Text,
  KeyboardAvoidingView
} from "react-native";
import { Button, Header } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { topIOS } from "../../Util/Devices";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import BottomButton from "../../Components/BottomButton/BottomButton";
import HeaderView from "../../Components/HeaderView/HeaderView";

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
        <HeaderView title={I18n.t("forgotPassword")}>
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={styles.scrollContainer}
            alwaysBounceVertical={false}
          >
            <View style={styles.checkEmailContainer}>
              <Text style={styles.checkEmail}>{I18n.t("checkYourEmail")}</Text>
            </View>
          </ScrollView>
        </HeaderView>
        {/* Next Button */}
        <BottomButton
          title={I18n.t("next")}
          onPress={() => navigation.dispatch({ type: "SelectRoleView" })}
          bold={true}
        />
      </ViewWrapper>
    );
  }
}

export default CheckYourEmailView;
