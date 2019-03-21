import React, { Component } from "react";
import { Text, View } from "react-native";
import { TagSelect } from "react-native-tag-select";
import { connect } from "react-redux";
import { CallClassification as CallClassificationIcons } from "./RateListIcons";
import I18n from "../../../I18n/I18n";
import { UpdateFlags, updateOptions } from "../../../Ducks/RateCallReducer";
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

  TagsHandle = (item) => {
    const { updateOptions } = this.props;
    updateOptions({ callType: item.value });
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
          onMaxError={(error) => console.log(error)}
          onItemPress={item => this.TagsHandle(item)}
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
  callType: state.rateCall.callType,
});

const mD = {
  UpdateFlags, updateOptions,
};

export default connect(
  mS,
  mD,
)(CallClassification);
