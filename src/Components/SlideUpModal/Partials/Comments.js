import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import styles from "./Styles/CommentsStyles";
import {
  modifyAdditionalDetails,
} from "../../../Ducks/NewSessionReducer";
import { closeSlideMenu } from "../../../Ducks/LogicReducer";
import I18n  from "../../../I18n/I18n";

class Comments extends Component {
  render() {
    const { modifyAdditionalDetails, customScenarioNote } = this.props;
    return (
      <View style={styles.aditionalInfoContainer}>
        <View style={styles.availableLangContainer}>
          <Text style={styles.availableLangContainerText}>
            {I18n.t("customerHome.customNote.description")}
          </Text>
        </View>
        <View style={styles.additionalInformationContainer}>
          <TextInput
            style={styles.additionalInformationInput}
            autoFocus
            returnKeyType="done"
            multiline
            blurOnSubmit
            onSubmitEditing={() => closeSlideMenu()}
            onChangeText={text => modifyAdditionalDetails({ customScenarioNote: text })}
            value={customScenarioNote}
            placeholder={I18n.t("customerHome.customNote.placeholder")}
            placeholderTextColor="rgba(255,255,255,0.42)"
          />
        </View>
      </View>
    );
  }
}

const mS = state => ({
  isSlideUpMenuVisible: state.LogicReducer.isSlideUpMenuVisible,
  selection: state.LogicReducer.selection,
});

const mD = {
  modifyAdditionalDetails,
  closeSlideMenu
};

export default connect(
  mS,
  mD
)(Comments);
