import React, { Component } from "react";
import {ScrollView, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import OrderSummary from "./Components/OrderSummary";
// Styles
import styles from "./Styles/PackageDetailsStyles";
import stripe from "tipsi-stripe";
import { stripePublishableKey } from "../../Config/env";
import { Icon } from "react-native-elements";
import I18n from "../../I18n/I18n";
import TextBlockButton from "../../Components/Widgets/TextBlockButton";
class PackageCheckoutView extends Component {
  componentWillMount() {
    /*stripe.setOptions({
      publishableKey: stripePublishableKey
      //androidPayMode: "test" // Android only
    });*/
  }

  render() {
    const { navigation } = this.props;

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
            rightComponent={
              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.dispatch({type: "back"})}>
                <View style={styles.cancelButton}>
                  <Text style={styles.cancelStyle}>{I18n.t("cancel")}</Text>
                </View>
              </TouchableOpacity>
            }
            navbarTitle={I18n.t("packages.checkout.title")}
          />
          <ScrollView
            automaticallyAdjustContentInsets
            alwaysBounceVertical={false}
            contentContainerStyle={styles.scrollViewFlex}
          >
            <View style={styles.billView}>
            <OrderSummary
              styles = {styles} // main container style
              textStyle = {styles.textBill} // optional text styles, component should provide defaults
              />
            <TextBlockButton
                text = "fooo" // the text in the button
                disabled = {false} // boolean if disabled, prevents taps and show disabled button styles
                loading = {false} // boolean for "loading" state, in the loading state, display an ActivitySpinner instead of the button text
                style = {""} // main container style, component should provide some defaults, like width at 100%
                disabledStyle = {""} // container style object when disabled, component should provide defaults
                textStyle = {""} // optional text styles, component should provide defaults
                onPress = {() => {}} // function to call when pressed
            />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mS = state => ({
});

const mD = { };

export default connect(
  mS,
  mD
)(PackageCheckoutView);
