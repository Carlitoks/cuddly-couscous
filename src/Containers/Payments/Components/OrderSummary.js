import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity } from "react-native";
import Icons from "../Icons";
import CardItem from "./CardItem";
import I18n, {localizePrice} from "../../../I18n/I18n";
// Styles
//import styles from "./Styles/AddCardStyles";

export default class OrderSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCardIcon: Icons.placeholder,
      date: "",
      currentTooltipIcon: Icons.info_cvv
    };
    console.log("props OrderSummary", this.props);
  }

  onDateChange = date => {
    this.setState({ date });

  };

  renderPrice(amount, currency) {
    return localizePrice({amount, currency});
  }

  render() {
    const { styles, navigation, haveCard, minutePackage, promoCode } = this.props;
    let cardInfo = { creditCardNumber: "", creditCardIcon: "", expDate: "" };
    return (
      <View style={styles.billContainer}>
        <View style={styles.rowTitle}>
          <Text style={styles.itemTextLeftTitle}>
          {I18n.t("account.card.title")}
          </Text>
        {!haveCard && 
        <View style={styles.buttonAddContainer}>
          <TouchableOpacity
                    onPress={() => navigation.dispatch({ type: "EditCardScreen" })}
                    style={styles.addCardButton}
                  >
                    <Text style={styles.addPackageButtonText}>{I18n.t("account.card.add")}</Text>
            </TouchableOpacity>
        </View>
          }
          {haveCard && 
          <Text 
            style={styles.editText} 
            onPress={() => navigation.dispatch({ type: "EditCardScreen" })}>
            {I18n.t("account.card.edit")}
            
          </Text>}
        </View>
        {haveCard ? <CardItem navigation={navigation} /> :
          <View style={styles.rowAddCard}>
            <Text style={styles.descriptionAddCard}>
                {I18n.t("packages.checkout.needCard")}
            </Text>
          </View>
        }
        <View style={styles.rowBill}>
          <Text style={styles.itemTextLeftTitle}>
            {I18n.t("packages.checkout.summary")}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.itemTextLeft}>
            {minutePackage.name}
          </Text>
          <Text style={styles.itemText}>
            {this.renderPrice(minutePackage.cost, minutePackage.currency)}
          </Text>
        </View>
        { !!minutePackage.adjustedCost && minutePackage.adjustedCost < minutePackage.cost &&
          <View style={styles.row}>
            <Text style={styles.itemTextLeftSale}>
              {promoCode}
            </Text>
            <Text style={styles.itemTextSale}>
             - {this.renderPrice(minutePackage.cost - minutePackage.adjustedCost, minutePackage.currency)}
            </Text>
          </View>
        }
        <View style={styles.rowLine}/>
        <View style={styles.row}>
          <Text style={styles.itemTextLeftTitle}>
          {I18n.t("packages.checkout.total")}
          </Text>
          <Text style={styles.itemTextTitle}>
            {this.renderPrice(!!minutePackage.adjustedCost ? minutePackage.adjustedCost : minutePackage.cost, minutePackage.currency)}
          </Text>
        </View>
      </View>
    );
  }
}
