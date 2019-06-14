import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import SlidingUpPanel from "rn-sliding-up-panel";
import { Metrics, Fonts } from "../../Themes";
import { closeSlideMenu } from "../../Ducks/LogicReducer";
import Languages from "./Partials/Languages";
import Comments from "./Partials/Comments";
import Scenario from "./Partials/Scenario";
import NativeLang from "./Partials/NativeLang";

class SlideUpPanel extends Component {
  render() {
    const { isSlideUpMenuVisible, closeSlideMenu, selection, navigation } = this.props;
    return (
      <SlidingUpPanel
        visible={isSlideUpMenuVisible}
        onRequestClose={() => closeSlideMenu()}
        allowDragging={false}
        height={selection !== "scenarioSelection" ? Metrics.height * 0.6 : Metrics.height}
        draggableRange={{
          top: selection !== "scenarioSelection" ? Metrics.height * 0.6 : Metrics.height,
          bottom: 0
        }}
      >
        {selection === "additionalDetails" || selection === "ratingComments" || selection === "scenarioNote" ? (
          <Comments ratingComments={this.props.ratingComments}
                    setRatingComments={this.props.setRatingComments}
                    scenarioNote={this.props.scenarioNote}
                    setScenarioNote={this.props.setScenarioNote}
          />
        ) : selection === "scenarioSelection" || selection === "ratingsScenarioSelection" ? (
          <Scenario setScenarioID={this.props.setScenarioID} />
        ) : selection === "nativeLang" || selection === "nativeSupportedLang" ? (
          <NativeLang selection={selection} navigation={navigation} />
        ) : (
          <Languages />
        )}
      </SlidingUpPanel>
    );
  }
}

const mS = state => ({
  isSlideUpMenuVisible: state.LogicReducer.isSlideUpMenuVisible,
  selection: state.LogicReducer.selection,
  scenarioID: state.newSessionReducer.session.scenarioID,
  scenariosList: state.appConfigReducer.scenarios
});

const mD = {
  closeSlideMenu,
};

export default connect(
  mS,
  mD
)(SlideUpPanel);
