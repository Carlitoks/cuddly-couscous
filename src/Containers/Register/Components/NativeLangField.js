import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import I18n from "../../../I18n/I18n";
import { openSlideMenu } from "../../../Ducks/LogicReducer";
import RenderPicker from "../../CustomerHome/Components/Partials/PickerSelect";
import { moderateScaleViewports } from "../../../Util/Scaling";
// Styles
import styles from "./Styles/NativeLangFieldStyles";

class NativeLangField extends Component {
  openSlideMenu = (type) => {
    const { openSlideMenu } = this.props;
    return openSlideMenu({ type });
  };

  render() {
    return (
      <View style={styles.inputViewContainer}>
        <View style={styles.inputsErrorContainer}>
          <RenderPicker
            openSlideMenu={this.openSlideMenu}
            title={I18n.t("nativeLanguageTitle")}
            placeholder={I18n.t("nativeLanguageTitle")}
            type="nativeLang"
            contentContainerStyle={styles.renderPickerContainer}
            labelStyle={styles.renderPickerLabelPlaceHolder}
            showDivider={false}
            selectedLabelStyle={styles.renderPickerLabelTop}
            icon={(
              <Icon
                color="rgba(0, 0, 0, 0.18)"
                name="chevron-right"
                type="evilicon"
                size={moderateScaleViewports(16)}
              />
            )}
            selectorContainer={styles.renderPickerSelectorContainer}
          />
        </View>
      </View>
    );
  }
}

const mS = state => ({
  errorType: state.onboardingReducer.errorType,
  password: state.onboardingReducer.password,
  isValidPassword: state.onboardingReducer.isValidPassword
});

const mD = {
  openSlideMenu,
};

export default connect(
  mS,
  mD,
)(NativeLangField);
