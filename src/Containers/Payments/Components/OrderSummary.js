import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, TouchableOpacity } from "react-native";
import Icons from "../Icons";
import CardItem from "./CardItem";
import I18n from "../../../I18n/I18n";
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
  render() {
    const { styles, navigation, haveCard, minutePackage, promoCode } = this.props;
    let cardInfo = { creditCardNumber: "", creditCardIcon: "", expDate: "" };
    return (
      <View style={styles.billContainer}>
        <View style={styles.rowTitle}>
          <Text style={styles.itemTextLeftTitle}>
          {"Credit Card"}
          </Text>
          {haveCard && 
          <Text 
            style={styles.editText} 
            onPress={() => navigation.dispatch({ type: "EditCardScreen" })}>
            {"Edit"}
          </Text>}
        </View>
        {haveCard ? <CardItem navigation={navigation} /> :
          <View style={styles.rowAddCard}>
            <Text style={styles.itemTextLeft}>
                {I18n.t("packages.checkout.needCard")}
            </Text>
          </View>
        }
        <View style={styles.rowBill}>
          <Text style={styles.itemTextLeftTitle}>
            {"Order Summary"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.itemTextLeft}>
            {minutePackage.name}
          </Text>
          <Text style={styles.itemText}>
            $ {minutePackage.cost}
          </Text>
        </View>
        { !!minutePackage.adjustedCost && minutePackage.adjustedCost < minutePackage.cost &&
          <View style={styles.row}>
            <Text style={styles.itemTextLeftSale}>
              {promoCode}
            </Text>
            <Text style={styles.itemTextSale}>
              $ {minutePackage.cost - minutePackage.adjustedCost}
            </Text>
          </View>
        }
        <View style={styles.rowLine}/>
        <View style={styles.row}>
          <Text style={styles.itemTextLeftTitle}>
          {"Total"}
          </Text>
          <Text style={styles.itemTextTitle}>
            $ {minutePackage.adjustedCost}
          </Text>
        </View>
      </View>
    );
  }
}
