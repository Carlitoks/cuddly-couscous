import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import I18n from "../../../I18n/I18n";
import { Icon } from "react-native-elements";

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
    const { error } = this.props;

    return (
      <View style={styles.promoCodeContainer}>
        <Text style={styles.promoCodeLabel}>
          {I18n.t("packages.browse.promo")}
        </Text>
        <View styles={styles.inputContainer}>
          <TextInput
            style={ error ? styles.inputError : styles.input }
            onChangeText={(text) => this.setState({text: text.trim()})}
            value={this.state.text}
            placeholder={I18n.t("packages.browse.promoPlaceholder")}
            placeholderTextColor={"rgba(0, 0, 0, 0.65)"}
          />
          <TouchableOpacity 
            style={
              error ? 
                (styles.buttonError) : 
                (this.state.text === "" ? 
                  styles.disabledbutton : 
                  styles.button
                )
            } 
            onPress={() => this.props.apply(this.state.text)}
            activeOpacity={0.8}
            disabled={this.state.text === ""}
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
            <Icon name="check" type="material" color="black" size={20} />
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
