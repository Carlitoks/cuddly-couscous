import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";
import Icons from "../Icons";
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
    const { loading, styles } = this.props;
    let cardInfo = { creditCardNumber: "", creditCardIcon: "", expDate: "" };
    return (
      <View style={styles.billContainer}>
          <View style={styles.row}>
            <Text style={styles.itemTextLeftTitle}>
            {"Credit Card"}
          </Text>
          <Text style={styles.itemText}>
            {"Edit"}
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
