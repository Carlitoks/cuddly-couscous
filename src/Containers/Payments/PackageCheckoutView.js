import React, { Component } from "react";
import {ScrollView, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import NavBar from "../../Components/NavBar/NavBar";
import OrderSummary from "./Components/OrderSummary";
import MinutePackageCard from "./Components/MinutePackageCard";

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

  render() {
    const { navigation } = this.props;
    const dummyList = [{
      id: 1, 
      name: 'Jeenie Value Package',
      price: 50,
      coin: '$',
      time: '75 Mins',
      description: 'At vero eos et accus et iusto odio dignissis praes At vero eos et accus et iusto odio dignissis praes '
      },
      { 
        id: 2,
        name: 'Conference unlimited Package',
        price: 50,
        coin: '$',
        time: 'Unlimited Usage',
        valid: 'July 1, 2019 - July 31, 2019' ,
        description: 'At vero eos et accus et iusto odio dignissis praes At vero eos et accus et iusto odio dignissis praes '
      }
    ];
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
          minutePackage = {dummyList[0]}
          selectable={true} // show the select button
          onSelect={ () => navigation.dispatch({type: "back"}) } // func to call if select button pressed
          displayReloadNotice={false} // display the reload notice or not
          reloadNoticeValue={false} // whether or not the checkbox is selected
          onReloadNoticeSelect={(val) => { alert (val)}} // func called when reload notice is selected, or unselected, `val` is a boolean
          promoCodeActive={true}
          discountedPrice={40}
          special={I18n.t("minutePackage.special")}
          specialColors={["#F39100", "#FCB753"]}
        />
          <View style={styles.billView}>
            <OrderSummary
              navigation={navigation}
              haveCard={false} //
              styles = {styles} // main container style
              textStyle = {styles.textBill} // optional text styles, component should provide defaults
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
                onPress = {() => {this.setState({loading:true})}} // function to call when pressed
            />
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
