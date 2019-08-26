import React, { Component } from "react";
import {
  ScrollView, Text, TouchableOpacity, View, TextInput
} from "react-native";
import { CheckBox } from 'react-native-elements'

import { TagSelect } from "react-native-tag-select";
import { Divider } from "react-native-elements";
import { BadIcons, GoodIcons, BadConnectionOptions } from "./RateListIcons";
import I18n from "../../../I18n/I18n";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Styles
import styles from "./Styles/CallTagsStyles";
import { moderateScaleViewports } from "../../../Util/Scaling";


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
          && item.IconName !== "distractions"
        ) {
          return couldBeBetter.push({ ...item, id: i + 1, label: I18n.t(item.i18nKey) });
        }
        return null;
      }
      return couldBeBetter.push({ ...item, id: i + 1, label: I18n.t(item.i18nKey)});
    });

    GoodIcons.map((item, i) => {
      if (linguistProfile) {
        if (
          item.IconName !== "waitTime"
          && item.IconName !== "professionalism"
          && item.IconName !== "language"
          && item.IconName !== "easyUnderstand"
        ) {
          return whatWasGood.push({ ...item, id: i + 1, label: I18n.t(item.i18nKey) });
        }
        return null;
      }
      return whatWasGood.push({ ...item, id: i + 1, label: I18n.t(item.i18nKey) });
    });
    this.setState({ whatWasGood, couldBeBetter });
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

  checkOptionConnection = (Key) => {
    const { checkConnectionProblem } = this.props;

    checkConnectionProblem(Key);
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
    const { openSlideMenu, ratingComments, badConnection, noVideo, noAudio, poorAudio, poorVideo,callDropped } = this.props;
    return (
      <KeyboardAwareScrollView extraScrollHeight={moderateScaleViewports(190)}>
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
                  checked={noAudio}
                  checkedIcon={"check-square"}
                  uncheckedColor={"#F39100"}
                  checkedColor={"#F39100"}
                  textStyle={styles.checkboxText}
                  onPress={() => this.checkOptionConnection("noAudio")}
                  containerStyle={styles.checkboxInputContainer}
                />
                <CheckBox
                  title={I18n.t("session.rating.technicalFlags.noVideo")}
                  fontFamily={styles.comments.fontFamily}
                  checked={noVideo}
                  checkedIcon={"check-square"}
                  uncheckedColor={"#F39100"}
                  checkedColor={"#F39100"}
                  textStyle={styles.checkboxText}
                  onPress={() => this.checkOptionConnection("noVideo")}
                  containerStyle={styles.checkboxInputContainer}
                />
                <CheckBox
                  title={I18n.t("session.rating.technicalFlags.poorAudio")}
                  fontFamily={styles.comments.fontFamily}
                  checked={poorAudio}
                  checkedIcon={"check-square"}
                  uncheckedColor={"#F39100"}
                  checkedColor={"#F39100"}
                  textStyle={styles.checkboxText}
                  onPress={() => this.checkOptionConnection("poorAudio")}
                  containerStyle={styles.checkboxInputContainer}
                />
                <CheckBox
                  title={I18n.t("session.rating.technicalFlags.poorVideo")}
                  fontFamily={styles.comments.fontFamily}
                  checked={poorVideo}
                  checkedIcon={"check-square"}
                  uncheckedColor={"#F39100"}
                  checkedColor={"#F39100"}
                  textStyle={styles.checkboxText}
                  onPress={() => this.checkOptionConnection("poorVideo")}
                  containerStyle={styles.checkboxInputContainer}
                />
                <CheckBox
                  title={I18n.t("session.rating.technicalFlags.callDropped")}
                  fontFamily={styles.comments.fontFamily}
                  checked={callDropped}
                  checkedIcon={"check-square"}
                  uncheckedColor={"#F39100"}
                  checkedColor={"#F39100"}
                  textStyle={styles.checkboxText}
                  onPress={() => {this.checkOptionConnection("callDropped")}}
                  containerStyle={styles.checkboxInputContainer}
                />
              </View>
              <Divider style={styles.divider} />
              <Text style={[styles.baseText, styles.paddingTop]}>{I18n.t("session.rating.technical.label")}</Text>
              <TextInput
                style={styles.additionalInformationInput}
                returnKeyType="done"
                multiline
                blurOnSubmit
                placeholder={ I18n.t("session.rating.technical.placeholder")}
                placeholderTextColor="rgba(0, 0, 0, 0.6);"
              />
            </View>
            :
            null}
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  }
}

export default CallTags;
