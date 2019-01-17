import React, { Component } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import RenderPicker from './PickerSelect';
import {
  modifyAdditionalDetails,
  swapCurrentSessionLanguages
} from '../../../../Ducks/NewSessionReducer';
import I18n from '../../../../I18n/I18n';

// Styles
import styles from './Styles/InfoInputsStyles';
import { SwitchLangs } from '../../../../Assets/SVG';

class InfoInputs extends Component {
  renderAdditionalDetails = () => {
    const { type, openSlideMenu, swapCurrentSessionLanguages } = this.props;
    if (type === 'onboarding') {
      return <React.Fragment />;
    }
    return (
      <React.Fragment>
        <View style={[styles.paddingBottomContainer]}>
          <RenderPicker
            navType={type}
            openSlideMenu={openSlideMenu}
            title={I18n.t('customerHome.customNote.label')}
            placeholder={I18n.t('customerHome.customNote.placeholder')}
            type="additionalDetails"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            swapCurrentSessionLanguages();
          }}
          style={Platform.OS === 'android' ? styles.swapArrows : styles.swapArrowsIos}
        >
          <SwitchLangs width={18.5} height={70} />
        </TouchableOpacity>
      </React.Fragment>
    );
  };

  renderStyles() {
    const { type } = this.props;
    if (type === 'onboarding') {
      return styles.inputsContainer;
    }
    return styles.inputsContainerHome;
  }

  render() {
    const { type, openSlideMenu } = this.props;
    return (
      <View style={this.renderStyles()}>
        <View style={styles.paddingBottomContainer}>
          <RenderPicker
            navType={type}
            openSlideMenu={openSlideMenu}
            title={I18n.t('customerHome.secondaryLang.label')}
            placeholder={I18n.t('customerHome.secondaryLang.placeholder')}
            type="secondaryLang"
          />
        </View>
        <View style={[styles.paddingBottomContainer]}>
          <RenderPicker
            navType={type}
            openSlideMenu={openSlideMenu}
            title={I18n.t('customerHome.primaryLang.label')}
            placeholder={I18n.t('customerHome.secondaryLang.placeholder')}
            type="primaryLang"
          />
        </View>
        {this.renderAdditionalDetails()}
      </View>
    );
  }
}

const mS = state => ({
  session: state.newSessionReducer.session
});

const mD = {
  modifyAdditionalDetails,
  swapCurrentSessionLanguages
};

export default connect(
  mS,
  mD
)(InfoInputs);
