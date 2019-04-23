import React, { Component } from "react";
import { connect } from "react-redux";

import {
  View,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Text
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { updateSettings } from "../../../Ducks/HomeFlowReducer";
import { updateSettings as updateSettingsContactLinguist} from "../../../Ducks/ContactLinguistReducer";
import ViewWrapper from "../../../Containers/ViewWrapper/ViewWrapper";
import GoBackButton from "../../../Components/GoBackButton/GoBackButton";
import InputRegular from "../../../Components/InputRegular/InputRegular";

import HeaderView from "../../../Components/HeaderView/HeaderView";
import BottomButton from "../../../Components/BottomButton/BottomButton";
import styles from "./styles";
import I18n from "../../../I18n/I18n";
import { getLocalizedCategories } from "../../../Util/Constants";

class CustomScenario extends Component {
  navigate = this.props.navigation.navigate;
  CATEGORIES = getLocalizedCategories(I18n.currentLocale());

  componentWillUnmount() {
    this.props.updateSettings({
      customScenario: ""
    });
  }

  render() {
    const {
      categoryIndex,
      navigation,
      categories,
      customScenario,
      updateSettings,
      scenarioNotes,
      updateSettingsContactLinguist
    } = this.props;

    const categoryTitle = this.CATEGORIES[categories[categoryIndex]];

    const categorySelected =
      categoryIndex > -1 && !!categories ? categoryTitle : null;
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <HeaderView
          headerLeftComponent={<GoBackButton navigation={navigation} />}
          navbarTitle={categorySelected}
          navbarType={"Basic"}
          NoWaves
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={styles.scrollContainer}
            alwaysBounceVertical={false}
          >
            {/* Custom Scenario */}
            <InputRegular
              placeholder={I18n.t("iNeedAssistanceWith")}
              value={
                scenarioNotes 
              }
              onChangeText={text => {
                updateSettingsContactLinguist({ customScenarioNote: text });
              }}
              maxLength={350}
              autoFocus={true}
              multiline
            />
          </ScrollView>
          <BottomButton
            title={I18n.t("continue")}
            onPress={() => {
              Keyboard.dismiss();
              navigation.dispatch({ type: "CallPricingView" });
            }}
            fill
          />
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  customScenario: state.homeFlow.customScenario,
  categoryIndex: state.homeFlow.categoryIndex,
  categories: state.homeFlow.categories,
  scenarioNotes: state.contactLinguist.customScenarioNote,
});

const mD = {
  updateSettings,
  updateSettingsContactLinguist
};

export default connect(
  mS,
  mD
)(CustomScenario);
