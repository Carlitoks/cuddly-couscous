import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView } from "react-native";
import { UpdateFlags } from "../../Ducks/RateCallReducer";
import I18n from "../../I18n/I18n";
import TextButton from "../../Components/TextButton/TextButton";
import { styles } from "./styles";

import { BadIcons } from "./RateListIcons";

class WhatCouldBeBetter extends Component {
  buttonsHandle = (icon, flag) => {
    this.genericToggleFunction(
      icon.IconName,
      icon.IconState,
      this.props[icon.IconState],
      flag,
      icon.OffState
    );
  };
  genericToggleFunction = (
    IconName,
    StateName,
    IconState,
    flagsStore,
    OffState
  ) => {
    const ObjectState = {};
    ObjectState[StateName] = !IconState;
    const ObjectOffState = {};
    ObjectOffState[OffState] = false;
    this.props.UpdateFlags(
      IconName,
      ObjectState,
      flagsStore,
      !IconState,
      ObjectOffState
    );
  };

  render() {
    return (
      <View style={styles.iconList}>
        <View style={{ alignSelf: "center" }}>
          <Text style={styles.textQuestions}>{I18n.t("couldBetter")}</Text>
        </View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {BadIcons.map((item, i) => (
              <View key={i} style={styles.questionIcons}>
                <TextButton
                  IconName={item.IconName}
                  StateIcon={this.props[item.IconState]}
                  onPress={() => this.buttonsHandle(item, "negativeFlags")}
                  title={item.label}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mS = state => ({
  iconWaitTimeSecondList: state.rateCall.iconWaitTimeSecondList,
  iconProfessionalismSecondList: state.rateCall.iconProfessionalismSecondList,
  iconFriendlinessSecondList: state.rateCall.iconFriendlinessSecondList,
  iconLanguageAbilitySecondList: state.rateCall.iconLanguageAbilitySecondList,
  iconUnderstandSecondList: state.rateCall.iconUnderstandSecondList,
  iconConnectionSecondList: state.rateCall.iconConnectionSecondList,
  iconBackgroundNoiseSecondList: state.rateCall.iconBackgroundNoiseSecondList,
  iconVoiceClaritySecondList: state.rateCall.iconVoiceClaritySecondList,
  iconDistractionsSecondList: state.rateCall.iconDistractionsSecondList
});

const mD = { UpdateFlags };

export default connect(mS, mD)(WhatCouldBeBetter);