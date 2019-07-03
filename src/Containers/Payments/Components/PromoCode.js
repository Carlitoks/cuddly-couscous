import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { connect } from "react-redux";
import I18n from "../../../I18n/I18n";
import InputRegular from "../../../Components/InputRegular/InputRegular";


// Styles
import styles from "./Styles/PromoCodeStyles";

class PromoCode extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {

    return (
      <View style={styles.promoCodeContainer}>
        <Text style={styles.promoCodeLabel}>
          {I18n.t("packages.browse.promo")}
        </Text>
        <View styles={styles.inputContainer}>
          <TextInput
            style={ styles.inputError }
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder={I18n.t("packages.browse.promoPlaceholder")}
            placeholderTextColor={"rgba(0, 0, 0, 0.65)"}
          />
          <TouchableOpacity
            style={styles.button }
          >
            <Text
              style={styles.applyText}
            >
              {I18n.t("actions.apply")}
            </Text>
          </TouchableOpacity>

        </View>
          <TouchableOpacity
            style={styles.infoContainer }
          >
        <Text style={styles.messageError}>
          {I18n.t("packages.browse.promoApplied")}
        </Text>
          <Text style={styles.remove}>
          {I18n.t("actions.remove")}
        </Text>
        </TouchableOpacity>
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
)(PromoCode);
