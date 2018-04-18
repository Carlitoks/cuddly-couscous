import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView } from "react-native";
import { UpdateFlags } from "../../Ducks/RateCallReducer";
import I18n from "../../I18n/I18n";
import TextButton from "../../Components/TextButton/TextButton";
import { styles } from "./styles";

import { GoodIcons } from "./RateListIcons";

class WhatWasGood extends Component {
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
          <Text style={styles.textQuestions}>{I18n.t("wasGood")}</Text>
        </View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {GoodIcons.map((item, i) => (
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
  iconWaitTimeFirstList: state.rateCall.iconWaitTimeFirstList,
  iconProfessionalismFirstList: state.rateCall.iconProfessionalismFirstList,
  iconFriendlinessFirstList: state.rateCall.iconFriendlinessFirstList,
  iconLanguageAbilityFirstList: state.rateCall.iconLanguageAbilityFirstList,
  iconUnderstandFirstList: state.rateCall.iconUnderstandFirstList,
  iconAudioQualityFirstList: state.rateCall.iconAudioQualityFirstList
});

const mD = {
  UpdateFlags
};

export default connect(mS, mD)(WhatWasGood);