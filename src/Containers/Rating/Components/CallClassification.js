import React, { Component } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { TagSelect } from "react-native-tag-select";
import { connect } from "react-redux";
import { CallClassification as CallClassificationIcons } from "./RateListIcons";
import I18n from "../../../I18n/I18n";
import { UpdateFlags, updateOptions } from "../../../Ducks/RateCallReducer";
// Styles
import styles from "./Styles/CallClassificationStyles";
import { Divider, Icon } from "react-native-elements";
import {moderateScaleViewports} from "../../../Util/Scaling";
import RenderPicker from "../../CustomerHome/Components/Partials/PickerSelect";
import { openSlideMenu } from "../../../Ducks/LogicReducer";


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
    if(item.value !== "help"){
      updateOptions({ callType: item.value, scenarioID: null });
    } else {
      updateOptions({ callType: item.value });
    }
  };

  openSlideMenu = (type) => {
    const { openSlideMenu } = this.props;
    return openSlideMenu({ type });
  };

  render() {
    const { callClassification } = this.state;
    const { callType, scenarioID, scenarioNote } = this.props;
    return (
      <ScrollView style={styles.paddingTop} contenContinerStyle={styles.flexEndCenter}>
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

        { callType === "help" && <View style={styles.bottomDividerContainer}>
          <Text style={styles.baseText}>{I18n.t("session.rating.scenario")}</Text>
          <RenderPicker
            openSlideMenu={this.openSlideMenu}
            title={"none"}
            placeholder={I18n.t("actions.select")}
            currentScenarioId={scenarioID}
            type="ratingsScenarioSelection"
            labelStyle={styles.renderPickerLabel}
            showDivider={false}
            selectedLabelStyle={styles.renderPickerSelectedLabel}
            icon={(
              <Icon
                color="rgba(0, 0, 0, 0.18)"
                name="chevron-right"
                type="evilicon"
                size={moderateScaleViewports(17)}
              />
            )}
            selectorContainer={styles.renderPickerSelectorContainer}
          />
        </View> }

        <View style={styles.bottomDividerContainer}>
          <Divider style={styles.divider} />
          <TouchableOpacity onPress={() => this.openSlideMenu("scenarioNote")}>
            <Text
              style={styles.addComments}
              numberOfLines={1}
            >
              { scenarioNote || `+ ${I18n.t("session.rating.addComment")}`}
            </Text>
          </TouchableOpacity>
          <Divider style={styles.divider} />
        </View>
      </ScrollView>
    );
  }
}

const mS = state => ({
  callType: state.rateCall.callType,
  scenarioID: state.rateCall.scenarioID,
  scenarioNote: state.rateCall.scenarioNote,
});

const mD = {
  UpdateFlags, updateOptions, openSlideMenu
};

export default connect(
  mS,
  mD,
)(CallClassification);
