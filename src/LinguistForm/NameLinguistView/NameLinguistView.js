import React, { Component } from "react";
import { connect } from "react-redux";

import { updateForm, clearForm } from "../../Ducks/LinguistFormReducer";

import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { topIOS } from "../../Util/Devices";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";

import styles from "./styles";
import { displayFormErrors } from "../../Util/Helpers";
import { Images, Colors } from "../../Themes";
import I18n from "../../I18n/I18n";

class NameLinguist extends Component {
  componentWillUnmount() {
    this.props.clearForm();
  }

  navigate = this.props.navigation.navigate;

  validateForm() {
    let updates = {};
    let valid = true;

    if (!this.props.firstname) {
      updates = {
        ...updates,
        FirstnameErrorMessage: I18n.t("enterNameField")
      };
      valid = false;
    }

    if (!this.props.lastname) {
      updates = {
        ...updates,
        LastnameErrorMessage: I18n.t("enterLastNameField")
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      displayFormErrors(
        updates.FirstnameErrorMessage,
        updates.LastnameErrorMessage
      );
    }

    this.props.updateForm(updates);
    return valid;
  }

  submit() {
    if (this.validateForm()) {
      this.props.navigation.dispatch({ type: "EmailLinguistView" });
    }
  }

  getSubtitle = () => {
    let subtitle = `${I18n.t("youWillBeKnown")}.... ${I18n.t(
      "toOthersOnPlatform"
    )} `;
    if (this.props.firstname && this.props.lastname) {
      subtitle = `${I18n.t("youWillBeKnown")} ${
        this.props.firstname
      } ${this.props.lastname.charAt(0)}. ${I18n.t("toOthersOnPlatform")}`;
      return subtitle;
    } else {
      return subtitle;
    }
  };

  render() {
    const initialLastName = `${this.props.lastname.charAt(0)}.`;

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          title={`${this.props.mainTitle} ${this.props.lastname}`}
          subtitle={this.getSubtitle()}
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={styles.scrollContainer}
            alwaysBounceVertical={false}
          >
            <View>
              <View>
                {/* Name */}
                <InputRegular
                  containerStyle={styles.containerInput}
                  placeholder={I18n.t("linguistName")}
                  onChangeText={text =>
                    this.props.updateForm({
                      firstname: text,
                      mainTitle: text
                    })
                  }
                  maxLength={20}
                  value={this.props.firstname}
                  autoFocus={true}
                />
              </View>

              {/* Last Name */}
              <InputRegular
                containerStyle={styles.containerInput}
                placeholder={I18n.t("linguistLastName")}
                onChangeText={text => this.props.updateForm({ lastname: text })}
                maxLength={20}
                value={this.props.lastname}
                sec
              />

              {/* Prefered Name */}
              <InputRegular
                containerStyle={styles.containerInput}
                placeholder={I18n.t("preferredName")}
                value={this.props.preferredName}
                onChangeText={text =>
                  this.props.updateForm({ preferredName: text })
                }
                maxLength={20}
                sec
              />
              <Text style={styles.formText}>
                {I18n.t("preferredLinguistText")}
              </Text>
            </View>
          </ScrollView>
        </HeaderView>
        {/* Next Button */}
        <BottomButton title={I18n.t("next")} onPress={() => this.submit()} />
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  firstname: state.linguistForm.firstname,
  lastname: state.linguistForm.lastname,
  formHasErrors: state.linguistForm.formHasErrors,
  preferredName: state.linguistForm.preferredName,
  mainTitle: state.linguistForm.mainTitle
});

const mD = {
  updateForm,
  clearForm
};

export default connect(mS, mD)(NameLinguist);
