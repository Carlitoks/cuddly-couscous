import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import RenderPicker from "./PickerSelect";
import TranslationSwap from "../../../../Assets/SVG/translationSwap";
import {
  modifyAdditionalDetails,
  swapCurrentSessionLanguages
} from "../../../../Ducks/NewSessionReducer";
import { connect } from "react-redux";
import I18n from "./../../../../I18n/I18n";

// Styles
import styles from "./Styles/InfoInputsStyles";
import { Metrics } from "../../../../Themes";

class InfoInputs extends Component {
  constructor(props) {
    super(props);
  }
  renderAdditionalDetails = () => {
    if (this.props.type === "onboarding") {
      return <React.Fragment />;
    } else {
      return (
        <View style={[styles.paddingBottomContainer]}>
          <RenderPicker
            navType={this.props.type}
            openSlideMenu={this.props.openSlideMenu}
            title={I18n.t("customerHome.customNote.label")}
            placeholder={I18n.t("customerHome.customNote.placeholder")}
            type={"additionalDetails"}
          />
        </View>
      );
    }
  };
  render() {
    return (
      <View style={styles.inputsContainer}>
        <View style={styles.paddingBottomContainer}>
          <RenderPicker
            navType={this.props.type}
            openSlideMenu={this.props.openSlideMenu}
            title={I18n.t("customerHome.secondaryLang.label")}
            placeholder={I18n.t("customerHome.secondaryLang.placeholder")}
            type={"secondaryLang"}
          />
        </View>
        <View style={[styles.paddingBottomContainer]}>
          <RenderPicker
            navType={this.props.type}
            openSlideMenu={this.props.openSlideMenu}
            title={I18n.t("customerHome.primaryLang.label")}
            placeholder={I18n.t("customerHome.secondaryLang.placeholder")}
            type={"primaryLang"}
          />
        </View>
        {this.renderAdditionalDetails()}
      </View>
    );
  }
}

const mS = state => {
  return {
    session: state.newSessionReducer.session
  };
};

const mD = {
  modifyAdditionalDetails,
  swapCurrentSessionLanguages
};

export default connect(
  mS,
  mD
)(InfoInputs);
