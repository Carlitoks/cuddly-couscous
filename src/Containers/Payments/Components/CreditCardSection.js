import React, { Component } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import I18n, { localizePrice } from "../../../I18n/I18n";
import CardItem from "./CardItem";
import Icons from "../Icons";
// Styles
import styles from "./Styles/CreditCardSectionStyles";
const creditCardImage = require("../../../Assets/Images/creditCardLeft.png");
export default class CreditCardSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rate: localizePrice(props.rate)
    };
  }
  render() {
    const { navigation, haveCard } = this.props;

    return (
      <View style={styles.creditCardContainer}>  
      <View style={styles.row}>  
      <Text style={styles.creditCardTitle}>{I18n.t("account.card.title")}</Text>
      {!haveCard && <View style={styles.buttonContainer}>  
      <TouchableOpacity
        onPress={() => {this.props.addCard()}}
        style={styles.addCardButton }
      >
        <Text
          style={styles.addCardButtonText}
        >
          {I18n.t("newCustomerHome.addCard")}
        </Text>
      </TouchableOpacity>
      </View>}
    {haveCard &&

      <Text
          style={styles.editText}
          onPress={() => navigation.dispatch({ type: "EditCardScreen" })}
        >
          {I18n.t("account.card.edit")}
        </Text>
        }
      </View>
      <View style={styles.rowDescription}>  
      {haveCard ?  
      <CardItem stylesContainer ={ {flexEndCenter: { marginTop: 0 }}}navigation={navigation} />
      : 
      <React.Fragment>

      <Image style={styles.backgroundImage} source={creditCardImage} />
        <Text
          style={styles.description}
        >
          {I18n.t("account.card.description", { rate: this.state.rate })}
        </Text>
      </React.Fragment>}

      </View>
    </View>
    );
  }
}
