import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import SlidingUpPanel from "rn-sliding-up-panel";
import { Metrics, Fonts } from "../../Themes";
import { closeSlideMenu } from "../../Ducks/LogicReducer";
import Languages from './Partials/Languages';
import Comments from './Partials/Comments';
import Scenario from './Partials/Scenario';

class SlideUpPanel extends Component {
  render() {
    const { isSlideUpMenuVisible, closeSlideMenu, selection } = this.props;
    return (
        <SlidingUpPanel
          visible={isSlideUpMenuVisible}
          onRequestClose={() => closeSlideMenu()}
          allowDragging={false}
          draggableRange={{top: selection !== "scenarioSelection" ? Metrics.height * 0.60 : Metrics.height, bottom: 0}}
        >
            {selection === "additionalDetails"
              ? <Comments />
              : selection === "scenarioSelection"
                ? <Scenario />
                : <Languages /> }
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
  closeSlideMenu
};

export default connect(
  mS,
  mD
)(SlideUpPanel);
