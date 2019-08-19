import React, { Component } from "react";
import {
  ScrollView, Text, TouchableOpacity, View
} from "react-native";
import { CheckBox } from 'react-native-elements'

import { TagSelect } from "react-native-tag-select";
import { Divider } from "react-native-elements";
import { BadIcons, GoodIcons, BadConnectionOptions } from "./RateListIcons";
import I18n from "../../../I18n/I18n";
// Styles
import styles from "./Styles/CallTagsStyles";


class CallTags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whatWasGood: [],
      couldBeBetter: [],
      checked: false
    };
  }

  componentWillMount() {
    const couldBeBetter = [];
    const whatWasGood = [];
    const { linguistProfile } = this.props;
    BadIcons.map((item, i) => {
      if (linguistProfile) {
        if (
          item.IconName !== "waitTime"
          && item.IconName !== "professionalism"
          && item.IconName !== "language"
        ) {
          return couldBeBetter.push({ ...item, id: i + 1, label: I18n.t(item.i18nKey) });
        }
      }
      return couldBeBetter.push({ ...item, id: i + 1, label: I18n.t(item.i18nKey)});
    });

    GoodIcons.map((item, i) => {
      if (linguistProfile) {
        if (
          item.IconName !== "waitTime"
          && item.IconName !== "professionalism"
          && item.IconName !== "language"
        ) {
          return whatWasGood.push({ ...item, id: i + 1, label: I18n.t(item.i18nKey) });
        }
      }
      return whatWasGood.push({ ...item, id: i + 1, label: I18n.t(item.i18nKey) });
    });
    this.setState({ whatWasGood, couldBeBetter });
  }

  TagsHandle = (icon, flag) => {
    console.log("message", icon, flag);
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

  renderWhatWasGood = () => {
    const { rating } = this.props;
    const { whatWasGood } = this.state;
    if (rating > 4) {
      return (
        <View>
          <Text style={[styles.baseText, styles.paddingTop]}>{I18n.t("session.rating.questionGood")}</Text>
          <TagSelect
            data={whatWasGood}
            ref={(tag) => {
              this.tag = tag;
            }}
            max={10}
            onItemPress={item => this.TagsHandle(item, "positiveFlags")}
            itemStyle={[styles.baseTagsStyle, styles.tagUnselected]}
            itemLabelStyle={[styles.baseTagText, styles.baseTagTextUnselected]}
            itemStyleSelected={[styles.baseTagsStyle, styles.tagSelected]}
            itemLabelStyleSelected={[styles.baseTagText, styles.baseTagTextSelected]}
            containerStyle={styles.tagsContainer}
          />
        </View>
      );
    }
    return <React.Fragment />;
  };

  renderCouldBeBetter = () => {
    const { rating } = this.props;
    const { couldBeBetter } = this.state;
    if (rating <= 4) {
      return (
        <View>
          <Text style={[styles.baseText, styles.paddingTop]}>{I18n.t("session.rating.questionBetter")}</Text>
          <TagSelect
            data={couldBeBetter}
            ref={(tag) => {
              this.tag = tag;
            }}
            max={10}
            onItemPress={item => this.TagsHandle(item, "negativeFlags")}
            itemStyle={[styles.baseTagsStyle, styles.tagUnselected]}
            itemLabelStyle={[styles.baseTagText, styles.baseTagTextUnselected]}
            itemStyleSelected={[styles.baseTagsStyle, styles.tagSelected]}
            itemLabelStyleSelected={[styles.baseTagText, styles.baseTagTextSelected]}
            containerStyle={styles.tagsContainer}
          />
        </View>
      );
    }
    return <React.Fragment />;
  };

  render() {
    const { openSlideMenu, ratingComments, badConnection } = this.props;
    console.log("todo", BadConnectionOptions);
    return (
      <ScrollView contenContinerStyle={styles.flexEndCenter}>
        {this.renderWhatWasGood()}
        {this.renderCouldBeBetter()}
        { badConnection ? 
          <View style={styles.checklisContainer}>
            <Text
            style={styles.comments}
          >
            {I18n.t("session.rating.connection")}
          </Text>
          <View style={styles.container}>
            <CheckBox
              title={I18n.t("session.rating.technicalFlags.noAudio")}
              fontFamily={styles.comments.fontFamily}
              checked={this.state.checked}
              checkedIcon={"check-square"}
              uncheckedColor={"#F39100"}
              checkedColor={"#F39100"}
              textStyle={styles.checkboxText}
              onPress={() => this.setState({ checked: !this.state.checked })}
              containerStyle={styles.checkboxInputContainer}
            />
            <CheckBox
              title={I18n.t("session.rating.technicalFlags.noVideo")}
              fontFamily={styles.comments.fontFamily}
              checked={this.state.checked}
              checkedIcon={"check-square"}
              uncheckedColor={"#F39100"}
              checkedColor={"#F39100"}
              textStyle={styles.checkboxText}
              onPress={() => this.setState({ checked: !this.state.checked })}
              containerStyle={styles.checkboxInputContainer}
            />
            <CheckBox
              title={I18n.t("session.rating.technicalFlags.poorAudio")}
              fontFamily={styles.comments.fontFamily}
              checked={this.state.checked}
              checkedIcon={"check-square"}
              uncheckedColor={"#F39100"}
              checkedColor={"#F39100"}
              textStyle={styles.checkboxText}
              onPress={() => this.setState({ checked: !this.state.checked })}
              containerStyle={styles.checkboxInputContainer}
            />
            <CheckBox
              title={I18n.t("session.rating.technicalFlags.poorVideo")}
              fontFamily={styles.comments.fontFamily}
              checked={this.state.checked}
              checkedIcon={"check-square"}
              uncheckedColor={"#F39100"}
              checkedColor={"#F39100"}
              textStyle={styles.checkboxText}
              onPress={() => this.setState({ checked: !this.state.checked })}
              containerStyle={styles.checkboxInputContainer}
            />
            <CheckBox
              title={I18n.t("session.rating.technicalFlags.callDropped")}
              fontFamily={styles.comments.fontFamily}
              checked={this.state.checked}
              checkedIcon={"check-square"}
              uncheckedColor={"#F39100"}
              checkedColor={"#F39100"}
              textStyle={styles.checkboxText}
              onPress={() => this.setState({ checked: !this.state.checked })}
              containerStyle={styles.checkboxInputContainer}
            />
          </View>
          <Divider style={styles.divider} />
          <Text style={[styles.baseText, styles.paddingTop]}>{I18n.t("session.rating.questionGood")}</Text>
 
          </View>
        : 
           <View style={styles.bottomDividerContainer}>
          <Divider style={styles.divider} />
          <TouchableOpacity onPress={() => openSlideMenu("ratingComments")}>
            <Text
              style={styles.addComments}
              numberOfLines={1}
            >
              { ratingComments ? I18n.t("session.rating.comment") : `+ ${I18n.t("session.rating.addComment")}`}
            </Text>
            {ratingComments
              ? (
                <Text
                  style={styles.comments}
                >
                  {ratingComments}
                </Text>
              ) : null}

          </TouchableOpacity>
          <Divider style={styles.divider} />
        </View>}
      </ScrollView>
    );
  }
}

export default CallTags;
