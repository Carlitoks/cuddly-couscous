import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import RenderPicker from "./PickerSelect";
import TranslationSwap from "../../../../Assets/SVG/translationSwap";
import {
  modifyAdditionalDetails,
  swapCurrentSessionLanguages
} from "../../../../Ducks/NewSessionReducer";
import { connect } from "react-redux";
import I18n from './../../../../I18n/I18n';

// Styles
import styles from "./Styles/InfoInputsStyles";
import { Metrics } from "../../../../Themes";

class InfoInputs extends Component {
  constructor(props) {
    super(props);
  }

  renderSwapArrow = () => {
    return (
      <View>
          <View style={styles.swapLanguageContainer}/>
          <TouchableOpacity
            onPress=
            {() => {
              this.props.swapCurrentSessionLanguages();
            }}
            style={styles.swapLanguageIconContainer}
            >
            <TranslationSwap
              height={100}
              width={100}
            />
          </TouchableOpacity>
      </View>
      
    );
  };

  renderAdditionalInfo = () => {
    return (
      <View style={styles.paddingBottomContainer}>
        <Text style={styles.inputTitle}>{I18n.t('customerHome.customNote.label')}</Text>
        <TextInput
          style={styles.additionalInformationInput}
          multiline={false}
          onChangeText={text =>
            this.props.modifyAdditionalDetails({ customScenarioNote: text })
          }
          value={this.props.session.additionalInfo}
          placeholder={I18n.t('customerHome.customNote.placeholder')}
          placeholderTextColor={"rgba(255,255,255,0.42)"}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.inputsContainer}>
        <View style={styles.paddingBottomContainer}>
          <RenderPicker
            openSlideMenu={this.props.openSlideMenu}
            title={I18n.t('customerHome.secondaryLang.label')}
            placeholder={I18n.t('customerHome.secondaryLang.placeholder')}
            type={"secondaryLang"}
          />
          {this.renderSwapArrow()}
        </View>
        <View style={[styles.paddingBottomContainer, styles.marginTop]}>
          <RenderPicker
            openSlideMenu={this.props.openSlideMenu}
            title={I18n.t('customerHome.primaryLang.label')}
            placeholder={I18n.t('customerHome.secondaryLang.placeholder')}
            type={"primaryLang"}
          />
        </View>

        <View style={[styles.paddingBottomContainer]}>
          <RenderPicker
            openSlideMenu={this.props.openSlideMenu}
            title={I18n.t('customerHome.customNote.label')}
            placeholder={I18n.t('customerHome.customNote.placeholder')}
            type={"additionalDetails"}
          />
        </View>
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
