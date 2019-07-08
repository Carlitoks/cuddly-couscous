import React, { Component } from "react";
import {ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import OrderSummary from "./Components/OrderSummary";
import MinutePackageCard from "./Components/MinutePackageCard";
import purchaseMinutePackage from "../../Ducks/AccountReducer"

// Styles
import styles from "./Styles/PackageDetailsStyles";
import stripe from "tipsi-stripe";
import { stripePublishableKey } from "../../Config/env";
import { Icon } from "react-native-elements";
import I18n from "../../I18n/I18n";
import TextBlockButton from "../../Components/Widgets/TextBlockButton";


class PackageCheckoutView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  purchase() {
    this.setState({loading:true});
    const { navigation } = this.props;
    
    const payload = {
      postUserMinutePackageReq:{
        minutePackageID: navigation.state.params.minutePackage.id,
        type: "string"
      },
      type: "object",
    }
    const payload2 = {
      minutePackageID: navigation.state.params.minutePackage.id,
      type: "string"
    }
    
    console.log('props purchase', this.props);


    let val = this.props.purchaseMinutePackage(payload)
    //.then(asd => console.log('purchase', asd));
    console.log(val);
    

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
        <MinutePackageCard 
          minutePackage = {navigation.state.params.minutePackage}
          selectable={false} // show the select button
          onSelect={ () => {} } // func to call if select button pressed
          displayReloadNotice={true} // display the reload notice or not
          reloadNoticeValue={false} // whether or not the checkbox is selected
          onReloadNoticeSelect={(val) => { alert (val)}} // func called when reload notice is selected, or unselected, `val` is a boolean
          promoCodeActive={!!this.props.minutePackagePromoCode}
          discountedPrice={navigation.state.params.minutePackage.adjustedCost != navigation.state.params.minutePackage.cost ? navigation.state.params.minutePackage.adjustedCost : false}
          special={navigation.state.params.minutePackage.public ? false : I18n.t("minutePackage.special")}
          specialColors={["#F39100", "#FCB753"]}
        />
          <View style={styles.billView}>
            <OrderSummary
              navigation={navigation}
              haveCard={!!user.stripePaymentToken} //
              styles = {styles} // main container style
              textStyle = {styles.textBill} // optional text styles, component should provide defaults
              minutePackage={navigation.state.params.minutePackage}
              promoCode={this.props.minutePackagePromoCode}
              />
            </View>
            <View style={this.state.loading?  styles.whiteView : styles.transparentView}>
              </View>
          </ScrollView>

            <TextBlockButton
                text = "packages.checkout.purchase" // the text in the button
                disabled = {false} // boolean if disabled, prevents taps and show disabled button styles
                loading = {this.state.loading} // boolean for "loading" state, in the loading state, display an ActivitySpinner instead of the button text
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
  StripePaymentSourceMeta: state.account.user.StripePaymentSourceMeta,
  user: state.account.user,
  minutePackagePromoCode: state.account.minutePackagePromoCode
});

const mD = {
  purchaseMinutePackage
 };

export default connect(
  mS,
  mD
)(PackageCheckoutView);
