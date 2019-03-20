import React, { Component } from "react";
import { Text, View } from "react-native";
import { TagSelect } from "react-native-tag-select";
import { connect } from "react-redux";
import { CallClassification as CallClassificationIcons } from "./RateListIcons";
import I18n from "../../../I18n/I18n";
import { UpdateFlags } from "../../../Ducks/RateCallReducer";
// Styles
import styles from "./Styles/CallClassificationStyles";

class CallClassification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callClassification: [],
    };
  }

  componentWillMount() {
    const callClassification = [];
    CallClassificationIcons.map(item => callClassification.push({ ...item }));
    this.setState({ callClassification });
  }

  TagsHandle = (icon, flag) => {
    this.genericToggleFunction(
      icon.IconName,
      icon.IconState,
      this.props[icon.IconState],
      flag,
      icon.OffState,
      icon.Key,
    );
  };

  genericToggleFunction = (
    IconName,
    StateName,
    IconState,
    flagsStore,
    OffState,
    Key,
  ) => {
    const { UpdateFlags } = this.props;
    const ObjectState = {};
    ObjectState[StateName] = !IconState;
    const ObjectOffState = {};
    ObjectOffState[OffState] = false;
    UpdateFlags(
      IconName,
      ObjectState,
      flagsStore,
      !IconState,
      ObjectOffState,
      Key,
    );
  };

  render() {
    const { callClassification } = this.state;
    return (
      <View style={styles.flexEndCenter}>
        <Text style={styles.baseText}>{I18n.t("session.rating.classification")}</Text>
        <TagSelect
          data={callClassification}
          max={1}
          ref={(tag) => {
            this.tag = tag;
          }}
          onItemPress={item => this.TagsHandle(item, "callClassification")}
          itemStyle={[styles.baseTagsStyle, styles.tagUnselected]}
          itemLabelStyle={[styles.baseTagText, styles.baseTagTextUnselected]}
          itemStyleSelected={[styles.baseTagsStyle, styles.tagSelected]}
          itemLabelStyleSelected={[styles.baseTagText, styles.baseTagTextSelected]}
          containerStyle={styles.tagsContainer}
        />
      </View>
    );
  }
}

const mS = state => ({
  iconTrialThirdList: state.rateCall.iconTrialThirdList,
  iconDemoThirdList: state.rateCall.iconDemoThirdList,
  iconSupportThirdList: state.rateCall.iconSupportThirdList,
  iconLangPracticeThirdList: state.rateCall.iconLangPracticeThirdList,
});

const mD = {
  UpdateFlags,
};

export default connect(
  mS,
  mD,
)(CallClassification);
