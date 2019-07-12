import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import I18n from "../../../I18n/I18n";

// Styles
import styles from "./Styles/PromoCodeStyles";

export default class PromoCode extends Component {
  constructor(props) {
    super(props);
    this.state = { text: props.promoCode };
  }

  remove () {
    this.props.apply();
    this.setState({text: ""});
  }

  render() {
    return (
      <View style={styles.promoCodeContainer}>
        <Text style={styles.promoCodeLabel}>
          {I18n.t("packages.browse.promo")}
        </Text>
        <View styles={styles.inputContainer}>
          <TextInput
            style={ this.props.error ? styles.inputError : styles.input }
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder={I18n.t("packages.browse.promoPlaceholder")}
            placeholderTextColor={"rgba(0, 0, 0, 0.65)"}
          />
          <TouchableOpacity 
            style={this.props.error ? styles.buttonError : styles.button} 
            onPress={() => this.props.apply(this.state.text)}
            activeOpacity={0.8}
          >
            <Text style={styles.applyText}>
              {I18n.t("actions.apply")}
            </Text>
          </TouchableOpacity>
        </View>
        {this.props.applaied ? 
          <TouchableOpacity 
            style={styles.infoContainer } 
            onPress={() => {this.remove()}}
            activeOpacity={0.9}
          >
            <Text style={styles.message}>
              {I18n.t("packages.browse.promoApplied")} 
            </Text>
            <Text style={styles.remove}>
              {I18n.t("actions.remove")}
            </Text>
          </TouchableOpacity>
          : null
        }
        {this.props.error ? 
          <TouchableOpacity style={styles.infoContainer }>
            <Text style={styles.messageError}>
              {I18n.t("api.errInvalidPromoCode")}
            </Text>
          </TouchableOpacity>
          : null
        }
      </View>
    );
  }
}
