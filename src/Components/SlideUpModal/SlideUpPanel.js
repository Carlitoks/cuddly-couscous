import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import SlidingUpPanel from "rn-sliding-up-panel";
import styles from "./Styles/SlideUpPanelStyles";
import { Metrics } from "../../Themes";
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
        height={Metrics.height * 0.7}
        allowDragging={false}
        draggableRange={{ top: Metrics.height * 0.7, bottom: 0 }}
      >
        <View Style={styles.backgroundContainer}>
          {selection === "additionalDetails"
            ? <Comments />
            : selection === "scenarioSelection"
            ? <Scenario />
            : <Languages /> }
        </View>
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
