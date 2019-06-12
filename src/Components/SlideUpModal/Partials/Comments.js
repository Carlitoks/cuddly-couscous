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
  update = text => {
    const { modifyAdditionalDetails, selection, updateOptions } = this.props;
    if(selection === "additionalDetails"){
      return modifyAdditionalDetails({ customScenarioNote: text });
    }
    if(selection === "ratingComments"){
      return updateOptions({ comments: text });
    }
    if(selection === "scenarioNote"){
      return updateOptions({ scenarioNote: text });
    }
  };

  renderText = () => {
    const { customScenarioNote, ratingComments, scenarioNote, selection } = this.props;
    if(selection === "additionalDetails"){
      return customScenarioNote;
    }
    if(selection === "ratingComments"){
      return ratingComments;
    }
    if(selection === "scenarioNote"){
      return scenarioNote;
    }
  };

  render() {
    const { selection, closeSlideMenu } = this.props;
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
            onChangeText={text => this.update(text) }
            value={this.renderText()}
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
  scenarioNote: state.rateCall.scenarioNote,
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
