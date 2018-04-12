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
import ViewWrapper from "../../../Containers/ViewWrapper/ViewWrapper";
import GoBackButton from "../../../Components/GoBackButton/GoBackButton";
import InputRegular from "../../../Components/InputRegular/InputRegular";

import HeaderView from "../../../Components/HeaderView/HeaderView";
import BottomButton from "../../../Components/BottomButton/BottomButton";
import styles from "./styles";
import { Colors } from "../../../Themes";
import I18n from "../../../I18n/I18n";
import { moderateScale } from "../../../Util/Scaling";
import { CATEGORIES } from "../../../Util/Constants";

class CustomScenario extends Component {
  navigate = this.props.navigation.navigate;

  componentWillUnmount() {
    this.props.updateSettings({
      customScenario: ""
    });
    console.log("cdsc");
  }

  carouselTitleMapper = title => {
    return CATEGORIES[title];
  };

  render() {
    const navigation = this.props.navigation;
    const categorySelected =
      this.props.categoryIndex > -1 && !!this.props.categories
        ? this.carouselTitleMapper(
            this.props.categories[this.props.categoryIndex]
          )
        : null;

    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          headerCenterComponent={
            <Text style={styles.titleCall}>{categorySelected}</Text>
          }
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
              value={this.props.customScenario}
              onChangeText={text => {
                this.props.updateSettings({
                  customScenario: text
                });
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
              navigation.dispatch({ type: "CallConfirmationView" });
            }}
          />
        </HeaderView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  customScenario: state.homeFlow.customScenario,
  categoryIndex: state.homeFlow.categoryIndex,
  categories: state.homeFlow.categories
});

const mD = {
  updateSettings
};

export default connect(mS, mD)(CustomScenario);
