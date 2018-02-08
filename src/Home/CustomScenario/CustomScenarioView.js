import React, { Component } from "react";
import { connect } from "react-redux";

import { View, ScrollView, TextInput, Alert, KeyboardAvoidingView, Keyboard } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { updateSettings } from "../../Ducks/HomeFlowReducer";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
import { topIOS } from "../../Util/Devices";
import Header from "./Header";
import BottomButton from "../../Components/BottomButton/BottomButton";
import styles from "./styles";
import { Colors } from "../../Themes";
import I18n from "../../I18n/I18n";
import { moderateScale } from "../../Util/Scaling";

class CustomScenario extends Component {
  navigate = this.props.navigation.navigate;

  validateCustomScenario() {
    let updates = {};
    let valid = true;

    if (!this.props.customScenario) {
      updates = {
        ...updates,
        customScenarioErrorMessage: I18n.t("enterCustomScenario")
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      this.tempDisplayErrors(updates.customScenarioErrorMessage);
    }

    this.props.updateSettings(updates);
    return valid;
  }

  submit() {
    if (this.validateCustomScenario()) {
      this.props.navigation.dispatch({
        type: "CallConfirmationView"
      });
    }
  }

  // Will be changed according the designs
  tempDisplayErrors(...errors) {
    const errorStr = errors.reduce((last, current) => {
      curr = "";
      if (current) {
        curr = `- ${current}\n`;
      }
      return last.concat(curr);
    }, "");

    Alert.alert("Errors", errorStr, [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]);
  }

  render() {
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
          alwaysBounceVertical={false} 
        >
          <Header
            mainTitle={I18n.t("iNeedAssistanceWith")}
            leftComponent={<GoBackButton navigation={this.props.navigation} />}
          />

          <View>
            {/* Email */}
            <InputRegular
              containerStyle={styles.containerInput}
              placeholder={I18n.t("iNeedAssistanceWith")}
              onChangeText={text => {
                this.props.updateSettings({
                  customScenario: text
                });
              }}
              value={this.props.customScenario}
              maxLength={70}
              autoFocus={true}
            />
          </View>
        </ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={topIOS()}>
        <BottomButton
          title={I18n.t("continue")}
          onPress={() => {
            Keyboard.dismiss();
            this.submit();
          }}
        />
         </KeyboardAvoidingView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  customScenario: state.homeFlow.customScenario
});

const mD = {
  updateSettings
};

export default connect(mS, mD)(CustomScenario);
