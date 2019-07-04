import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import I18n from "../../../I18n/I18n";
import CardItem from "./CardItem";
import Icons from "../Icons";
// Styles
import styles from "./Styles/CreditCardSectionStyles";
const creditCardImage = require("../../../Assets/Images/creditCardLeft.png");
const packageImage = require("../../../Assets/Images/packageImage.png");
class CreditCardSection extends Component {
  constructor(props) {
    super(props);
    /* this.state = {
      creditCardIcon: Icons.placeholder,
      date: "",
      currentTooltipIcon: Icons.info_cvv
    };*/
  }
  render() {
    const { StripePaymentSourceMeta, navigation, haveCard } = this.props;

    return (
      <View style={styles.creditCardContainer}>  
      <View style={styles.row}>  
      <Text style={styles.creditCardTitle}>{I18n.t("account.card.title")}</Text>
      <View style={styles.buttonContainer}>  
      <TouchableOpacity
        onPress={() => {this.props.addCard()}}
        style={styles.addCardButton }
      >
        <Text
          style={styles.addCarduttonText}
        >
          {I18n.t("newCustomerHome.addCard")}
        </Text>
      </TouchableOpacity>
      </View>

      </View>
      <View style={styles.rowDescription}>  
      {haveCard ?  
      <CardItem navigation={navigation} />
      : 
      <React.Fragment>

      <Image style={styles.backgroundImage} source={creditCardImage} />
        <Text
          style={styles.description}
        >
          {I18n.t("account.card.description", { rate: "US$1" })}
        </Text>
      </React.Fragment>}

      </View>
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
)(CreditCardSection);
