import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import I18n from "../../../I18n/I18n";
import TextBlockButton from "../../../Components/Widgets/TextBlockButton";
import Icons from "../Icons";
// Styles
import styles from "./Styles/CreditCardSectionStyles";
const packageImage = require("../../../Assets/Images/packageImage.png");
class PackageSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false
    };
  }

  render() {
    const { StripePaymentSourceMeta, navigation, userPackage } = this.props;

    return (
      <View style={styles.packageContainer}>

      {!userPackage && <View style={styles.row}>  
          <Text style={styles.creditCardTitle}>{I18n.t("account.package.title")}</Text>
        <View style={styles.buttonContainer}>  
          <TouchableOpacity
            onPress={() => {this.props.addPackage()}}
            style={styles.addCardButton }
          >
            <Text
              style={styles.addCardButtonText}
            >
              {I18n.t("account.package.add")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>}
      {!userPackage && <View style={styles.rowDescription}>  
        <Image style={styles.backgroundImage} source={packageImage} />
        <Text
          style={styles.description}
        >
          {I18n.t("account.package.description", { rate: "US$1" })}
        </Text>
      </View>}
      {userPackage && 
        <MinutePackageCard
        minutePackage = {minutePackage}
        selectable={true} // show the select button
        onSelect={ () => navigation.dispatch({type: "PackageCheckoutView", params: {minutePackage}}) } // func to call if select button pressed
        displayReloadNotice={false} // display the reload notice or not
        reloadNoticeValue={false} // whether or not the checkbox is selected
        onReloadNoticeSelect={(val) => {}} // func called when reload notice is selected, or unselected, `val` is a boolean
        promoCodeActive={true}
        discountedPrice={4000}
        special={I18n.t("minutePackage.special")}
        specialColors={["#F39100", "#FCB753"]}
      />
      }

          <TextBlockButton
                text = "packages.checkout.purchase" // the text in the button
                disabled = {false} // boolean if disabled, prevents taps and show disabled button styles
                loading = {this.state.loading} // boolean for "loading" state, in the loading state, display an ActivitySpinner instead of the button text
                style = {styles.buttonContainer} // main container style, component should provide some defaults, like width at 100%
                disabledStyle = {styles.buttonDisable} // container style object when disabled, component should provide defaults
                textStyle = {styles.buttonText} // optional text styles, component should provide defaults
                onPress = {() => navigation.dispatch({type: "Availablepackages"})} // function to call when pressed
            />
    </View>
    );
  }
}

const mS = state => ({
  StripePaymentSourceMeta: state.account.user.StripePaymentSourceMeta
});

const mD = {
};

export default connect(
  mS,
  mD
)(PackageSection);
