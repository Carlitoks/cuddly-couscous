import React, { Component } from "react";
import { Icon } from "react-native-elements";
import { View, TextInput } from "react-native";
import { Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

import styles from "./styles";

/**
 * @description Generic form input component
 *
 * Props:
    placeholder: Placeholder text to show on input. Optional (default Search), 
    onChangeText: Function to execute when text changes,
    onClearText: Function to execute when close icon is pressed,
    value: Input value
 *
 * @export
 * @class SearchBar
 * @extends {Component}
 */

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textValue: ""
    };
  }

  componentDidMount() {
    this.setState({
      textValue: !!this.props.value ? this.props.value : ""
    });
  }

  componentWillReceiveProps() {
    this.setState({
      textValue: !!this.props.value ? this.props.value : ""
    });
  }

  clearText() {
    this.input.clear();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Icon
            name={"search"}
            containerStyle={styles.iconSearchContainer}
            size={18}
            color={Colors.placeholderColor}
          />
          <TextInput
            allowFontScaling={false}
            ref={input => (this.input = input)}
            underlineColorAndroid={Colors.transparent}
            placeholder={
              !!this.props.placeholder
                ? this.props.placeholder
                : I18n.t("search")
            }
            onChangeText={this.props.onChangeText}
            value={this.props.value}
            style={styles.input}
            placeholderTextColor={Colors.placeholderColor}
            returnKeyType={"done"}
          />
          <Icon
            name={"close"}
            containerStyle={styles.iconCloseContainer}
            size={18}
            color={Colors.placeholderColor}
            onPress={() => {
              this.props.onClearText();
              this.input.clear();
            }}
            underlayColor={Colors.searchBarGrey}
          />
        </View>
      </View>
    );
  }
}

export default SearchBar;
