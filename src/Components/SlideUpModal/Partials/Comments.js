import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import styles from "./Styles/CommentsStyles";
import {
  modifyAdditionalDetails,
} from "../../../Ducks/NewSessionReducer";
import { closeSlideMenu } from "../../../Ducks/LogicReducer";
import {
  updateOptions
} from "../../../Ducks/RateCallReducer";
import I18n  from "../../../I18n/I18n";

class Comments extends Component {
  render() {
    const { modifyAdditionalDetails, customScenarioNote, selection, updateOptions, ratingComments } = this.props;
    return (
      <View style={styles.aditionalInfoContainer}>
        <View style={styles.availableLangContainer}>
          <Text style={styles.availableLangContainerText}>
            {selection === "additionalDetails" ? I18n.t("customerHome.customNote.description") : I18n.t("session.rating.addComment")}
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
            onChangeText={text => { selection === "additionalDetails" ? modifyAdditionalDetails({ customScenarioNote: text }) : updateOptions({ comments: text }); }}
            value={selection === "additionalDetails" ? customScenarioNote : ratingComments}
            placeholder={selection === "additionalDetails" ? I18n.t("customerHome.customNote.placeholder") : I18n.t("session.rating.addComment")}
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
  ratingComments: state.rateCall.comments,
  customScenarioNote: state.newSessionReducer.session.customScenarioNote,
});

const mD = {
  modifyAdditionalDetails,
  closeSlideMenu,
  updateOptions
};

export default connect(
  mS,
  mD
)(Comments);
