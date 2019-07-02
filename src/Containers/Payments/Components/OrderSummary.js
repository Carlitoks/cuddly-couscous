import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import Icons from "../Icons";
import CardItem from "./CardItem";
import I18n from "../../../I18n/I18n";
// Styles
//import styles from "./Styles/AddCardStyles";

class OrderSummary extends Component {
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
    const { loading, styles, navigation, haveCard } = this.props;
    let cardInfo = { creditCardNumber: "", creditCardIcon: "", expDate: "" };
    return (
      <View style={styles.billContainer}>
          <View style={styles.rowTitle}>
            <Text style={styles.itemTextLeftTitle}>
            {"Credit Card"}
          </Text>

          {haveCard && <Text style={styles.itemText}>
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
            {"Jeenie Value Package"}
          </Text>
          <Text style={styles.itemText}>
            {"$50"}
          </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.itemTextLeft}>
            {"JEENIE20"}
          </Text>
          <Text style={styles.itemText}>
            {"- $10"}
          </Text>
          </View>
          <View style={styles.rowLine}>
          </View>
          <View style={styles.row}>
            <Text style={styles.itemTextLeftTitle}>
            {"Total"}
          </Text>
          <Text style={styles.itemTextTitle}>
            {"$41.45"}
          </Text>
          </View>
        </View>
    );
  }
}

const mS = state => ({
});

const mD = {
};

export default connect(
  mS,
  mD
)(OrderSummary);
