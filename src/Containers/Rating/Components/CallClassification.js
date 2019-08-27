import React, { Component } from "react";
import {
  Text, View, TouchableOpacity, ScrollView, TextInput,
} from "react-native";
import { TagSelect } from "react-native-tag-select";
import { CheckBox, Divider } from "react-native-elements";
import { CallClassification as CallClassificationIcons } from "./RateListIcons";
import I18n, { translateProperty } from "../../../I18n/I18n";
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
    CallClassificationIcons.map((item, i) =>
      callClassification.push({ ...item, id: i + 1, label: I18n.t(item.i18nKey) }));
    this.setState({ callClassification });
  }

  TagsHandle = (item) => {
    const { setCallType } = this.props;
    setCallType(item.value);
  };

  openSlideMenu = (type) => {
    const { openSlideMenu } = this.props;
    return openSlideMenu({ type });
  };

  renderScenarioList = () => {
    const { scenarioID, setScenarioID, scenarioList } = this.props;
    return scenarioList.map(scenario => (<CheckBox
      title={translateProperty(scenario, "title")}
      fontFamily={styles.comments.fontFamily}
      checked={scenario.id === scenarioID}
      checkedIcon={"check-square"}
      uncheckedColor={"#F39100"}
      checkedColor={"#F39100"}
      textStyle={styles.checkboxText}
      onPress={() => setScenarioID(scenario.id)}
      containerStyle={styles.checkboxInputContainer}
    />));
  };

  render() {
    const { callClassification } = this.state;
    const { callType, scenarioID, scenarioNote, setScenarioID, scenarioList, setScenarioNote } = this.props;
    return (
      <ScrollView style={styles.paddingTop} contenContinerStyle={styles.flexEndCenter}>
        <Text style={styles.baseText}>{I18n.t("session.rating.classification")}</Text>
        <TagSelect
          data={callClassification}
          max={1}
          ref={(tag) => {
            this.tag = tag;
          }}
          onMaxError={error => console.log(error)}
          onItemPress={item => this.TagsHandle(item)}
          itemStyle={[styles.baseTagsStyle, styles.tagUnselected]}
          itemLabelStyle={[styles.baseTagText, styles.baseTagTextUnselected]}
          itemStyleSelected={[styles.baseTagsStyle, styles.tagSelected]}
          itemLabelStyleSelected={[styles.baseTagText, styles.baseTagTextSelected]}
          containerStyle={styles.tagsContainer}
        />

        { callType === "help" && (
          <View style={styles.checklisContainer}>
            <Text
              style={styles.comments}
            >
              {I18n.t("session.rating.scenario")}
            </Text>
            <View style={styles.container}>
              { this.renderScenarioList() }
            </View>
          </View>
        ) }
        <Divider style={styles.divider} />
        <View style={styles.bottomDividerContainer}>
          <Text style={[styles.baseText, styles.callDetails]}>{I18n.t("session.rating.about.label")}</Text>
          <TouchableOpacity onPress={() => this.openSlideMenu("scenarioNote")}>
            <Text
              style={styles.addComments}
            >
              { scenarioNote || I18n.t("session.rating.about.placeholder") }
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default (CallClassification);
