import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { Icon } from "react-native-elements";
import { Fonts } from "../../../Themes";
import PickerSelect from "react-native-picker-select";
import { moderateScale } from "../../../Util/Scaling";
import InfoInputs from './Partials/InfoInputs';
import CallButtons from './Partials/CallButtons';

// Styles
import styles from "./Styles/CallSectionStyles";

export default class CallSection extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={[styles.mainContainer, styles.callSectionContainer, styles.columnView]}>
          <InfoInputs openSlideMenu={this.props.openSlideMenu}/>
          <CallButtons navigation={this.props.navigation} />
      </View>
    );
  }
}
