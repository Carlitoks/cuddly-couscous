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
  purchase() {

    console.log("val de valeria");

  }

  render() {
    const { StripePaymentSourceMeta, user, navigation } = this.props;
    console.log(user);
    return (
      <View style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
          <NavBar
            leftComponent={
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.dispatch({type: "back"})}>
                <View>
                  <Icon name="chevron-left" type="evilicon" color="white" size={50} />
                </View>
              </TouchableOpacity>
            }
            navbarTitle={I18n.t("packages.success.title")}
          />

          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
          <Image style={styles.backgroundImage} source={DoneImage} />
          <View style={styles.rowLine}>
          </View>
          </ScrollView>

            <TextBlockButton
                text = "operatingHours.ok" // the text in the button
                disabled = {false} // boolean if disabled, prevents taps and show disabled button styles
                loading = {{}} // boolean for "loading" state, in the loading state, display an ActivitySpinner instead of the button text
                style = {styles.buttonContainer} // main container style, component should provide some defaults, like width at 100%
                disabledStyle = {styles.buttonDisable} // container style object when disabled, component should provide defaults
                textStyle = {styles.buttonText} // optional text styles, component should provide defaults
                onPress = {() => this.purchase()} // function to call when pressed
            />
        </View>
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
