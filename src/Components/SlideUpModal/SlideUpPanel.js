import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import SlidingUpPanel from "rn-sliding-up-panel";
import styles from "./Styles/SlideUpPanelStyles";
import { Metrics, Fonts } from "../../Themes";
import { closeSlideMenu } from "../../Ducks/LogicReducer";
import Languages from './Partials/Languages';
import Comments from './Partials/Comments';
import Scenario from './Partials/Scenario';

class SlideUpPanel extends Component {
  heightForHeader = () => {
    if(Metrics.width <= 320)
      return Metrics.height * 0.45;
    if(Metrics.width >= 375)
      return Metrics.height * 0.50;
    return Metrics.height * 0.70;
  }
  render() {
    const { isSlideUpMenuVisible, closeSlideMenu, selection } = this.props;
    return (
      <SlidingUpPanel
        visible={isSlideUpMenuVisible}
        onRequestClose={() => closeSlideMenu()}
        height={selection === "scenarioSelection" ? this.heightForHeader() : Metrics.height * 0.7}
        allowDragging={false}
        draggableRange={{ top: selection === "scenarioSelection" ? Metrics.height * 0.65 : Metrics.height * 0.7, bottom: 0 }}
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
