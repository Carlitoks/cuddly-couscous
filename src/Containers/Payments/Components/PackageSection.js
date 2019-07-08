import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import I18n from "../../../I18n/I18n";
import TextBlockButton from "../../../Components/Widgets/TextBlockButton";
import Icons from "../Icons";
// Styles
import styles from "./Styles/CreditCardSectionStyles";
const packageImage = require("../../../Assets/Images/packageImage.png");
export default class PackageSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {  navigation, userPackage } = this.props;

    return (
      <View style={styles.packageContainer}>
          <View style={styles.row}>
            <Text style={styles.creditCardTitle}>{I18n.t("account.package.title")}</Text>
            <View style={styles.buttonContainer}>
              {!userPackage && (
                <TouchableOpacity
                  onPress={() => {
                    this.props.addPackage();
                  }}
                  style={styles.addCardButton}
                >
                  <Text style={styles.addCardButtonText}>{I18n.t("account.package.add")}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        {!userPackage ? (
          <View style={styles.rowDescription}>
            <Image style={styles.backgroundImage} source={packageImage} />
            <Text style={styles.description}>
              {I18n.t("account.package.description", { rate: "US$1" })}
            </Text>
          </View>
        ) : (
          <View style={styles.rowDescription}>
            <MinutePackageCard 
              minutePackage = {userPackage}
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
          </View>
        )}
      </View>
    );
  }
}
