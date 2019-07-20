import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View, Alert } from "react-native";
import I18n from "../../../I18n/I18n";
import MinutePackageCard from "./MinutePackageCard";

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
      <View style={userPackage? styles.havePackageContainer : styles.packageContainer}>
        <View style={styles.row}>
          <Text style={styles.creditCardTitle}>{I18n.t("account.package.title")}</Text>
          <View style={styles.buttonContainer}>
            {!userPackage ? (
              <TouchableOpacity
                onPress={() => {
                  this.props.addPackage();
                }}
                style={styles.addCardButton}
              >
                <Text style={styles.addPackageButtonText}>{I18n.t("account.package.add")}</Text>
              </TouchableOpacity>
            ) : 
              <Text
                style={styles.editText}
                onPress={() => this.props.remove()}
              >
                {I18n.t("actions.remove")}
              </Text>
            }
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
          <View style={styles.rowPackageDescription}>
            <MinutePackageCard 
              minutePackage = {userPackage}
              selectable={false} // show the select button
              onSelect={ () => {} } // func to call if select button pressed
              displayReloadNotice={false} // display the reload notice or not
              reloadNoticeValue={false} // whether or not the checkbox is selected
              onReloadNoticeSelect={(val) => { alert (val)}} // func called when reload notice is selected, or unselected, `val` is a boolean
              promoCodeActive={!!this.props.minutePackagePromoCode}
              discountedPrice={userPackage.adjustedCost != userPackage.cost ? userPackage.adjustedCost : false}
              special={userPackage.public ? false : I18n.t("minutePackage.special")}
              specialColors={["#F39100", "#FCB753"]}
            />
          </View>
        )}
      </View>
    );
  }
}
