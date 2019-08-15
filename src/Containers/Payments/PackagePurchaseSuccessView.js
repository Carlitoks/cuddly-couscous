import React, { Component } from "react";
import {ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";

// Styles
import styles from "./Styles/PackageSuccessStyles";
import { Icon } from "react-native-elements";
import I18n from "../../I18n/I18n";
import TextBlockButton from "../../Components/Widgets/TextBlockButton";

const DoneImage = require("../../Assets/Images/Done.png");

class PackagePurchaseSuccessView extends Component {
  constructor(props) {
    super(props);
  }

  purchase() {
    const { navigation } = this.props;
    navigation.dispatch({type: "Home"})
  }

  render() {
    const { StripePaymentSourceMeta, user, navigation } = this.props;
    console.log(user);
    return (
      <View style={styles.wrapperContainer}>
        <NavBar
          navbarTitle={I18n.t("packages.success.title")}
        />
        <ScrollView
          automaticallyAdjustContentInsets
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollViewFlex}
        >
          <Image style={styles.backgroundImage} source={DoneImage} />
          <View style={styles.successContainer } >
            <Text style={styles.successTitle}>{I18n.t("packages.success.title")}!</Text>
            <Text style={styles.successDescription}>{I18n.t("packages.success.description")}</Text>
          </View>
          <View style={styles.rowLine}>
          </View>
          <View style={styles.balanceMinutesContainer}>
            <Text style={styles.balanceTitleValue}>{navigation.state.params.minutePackage.name}</Text>
            <View style={styles.packageContainer } >
              {navigation.state.params.reloadable ? 
                  <Text style={styles.reload}> {I18n.t("packages.success.withReload")} </Text>
              :
                  <Text style={styles.noReload}> {I18n.t("packages.success.withoutReload")} </Text>
              }
            </View>
            <View style={styles.balanceContainer } >
              <Text style={styles.balanceTitle}>{I18n.t("packages.success.balance")}</Text>
              <Text style={styles.balanceTitleMin}>{I18n.t("account.balanceNum", {num: user.availableMinutes})}</Text>
              <Text style={styles.noExpire}>{I18n.t("packages.noExpire")}</Text>
            </View>
          </View>
          <TextBlockButton
              text = {I18n.t("actions.ok")} // the text in the button
              disabled = {false} // boolean if disabled, prevents taps and show disabled button styles
              loading = {false} // boolean for "loading" state, in the loading state, display an ActivitySpinner instead of the button text
              style = {styles.buttonContainer} // main container style, component should provide some defaults, like width at 100%
              disabledStyle = {styles.buttonDisable} // container style object when disabled, component should provide defaults
              textStyle = {styles.buttonText} // optional text styles, component should provide defaults
              onPress = {() => this.purchase()} // function to call when pressed
          />
        </ScrollView>
      </View>
    );
  }
}

const mS = state => ({
  user: state.account.user,
});

const mD = {
 };

export default connect(
  mS,
  mD
)(PackagePurchaseSuccessView);