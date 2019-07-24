import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Text, ScrollView, Alert } from "react-native";
import { Col, Grid } from "react-native-easy-grid";

import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import BottomButton from "../../Components/BottomButton/BottomButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
import {updateUser} from "../../Ducks/AccountReducer";

import styles from "./styles";
import { displayFormErrors } from "../../Util/Alerts";

import I18n from "../../I18n/I18n";
import { onlyLetters } from "../../Util/Helpers";
import NavBar from "../../Components/NavBar/NavBar";

class EditNameView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formFirstName: props.user.firstName,
      formLastName: props.user.lastName,
      formPreferredName: props.user.preferredName,
      saving: false
    };

  }

  isDisabled() {
    return !this.state.formFirstName > 0 || !this.state.formLastName > 0;
  }

  validateForm() {
    let updates = {};
    let valid = true;

    if (!this.state.formFirstName) {
      updates = {
        ...updates,
        FirstnameErrorMessage: I18n.t("enterNameField")
      };
      valid = false;
    }

    if (!this.state.formLastName) {
      updates = {
        ...updates,
        LastnameErrorMessage: I18n.t("enterLastNameField")
      };
      valid = false;
    }

    if (onlyLetters(this.props.formFirstName)) {
      updates = {
        ...updates,
        FirstnameErrorMessage: I18n.t("errorLetters")
      };
      valid = false;
    }

    if (onlyLetters(this.props.formLastName)) {
      updates = {
        ...updates,
        LastnameErrorMessage: I18n.t("errorLetters")
      };
      valid = false;
    }

    updates = {
      ...updates,
      formHasErrors: !valid
    };

    if (!valid) {
      if (updates.FirstnameErrorMessage && updates.LastnameErrorMessage) {
        displayFormErrors(updates.FirstnameErrorMessage);
      } else {
        displayFormErrors(
          updates.FirstnameErrorMessage,
          updates.LastnameErrorMessage
        );
      }
    }

    // this.props.updateForm(updates);
    return valid;
  }

  submit() {
    const {
      formFirstName,
      formLastName,
      formPreferredName,
    } = this.state;
    const data = {
      firstName: formFirstName,
      lastName: formLastName,
      preferredName: formPreferredName
    };
    if (this.validateForm()) {
      this.setState({saving: true});
      this.props.updateUser(data)
      .then((response) => {
        this.props.navigation.dispatch({ type: "back" });
      })
      .catch((e) => {
        this.setState({saving: false});
        Alert.alert(I18n.t('error'), translateApiError(e));
      });
    }
  }

  getSubtitle = () => {
    let subtitle = `${I18n.t("youWillBeKnown")}.... ${I18n.t(
      "toOthersOnPlatform"
    )} `;
    if (this.props.firstName && this.props.lastName) {
      subtitle = `${I18n.t("youWillBeKnown")} ${
        this.props.firstName
        } ${this.props.lastName.charAt(0)}. ${I18n.t("toOthersOnPlatform")}`;
      return subtitle;
    } else {
      return subtitle;
    }
  };

  renderName() {
    const { user } = this.props;
    const { formFirstName, formLastName } =  this.state;
    if (!!formFirstName && !!formLastName) {
      return `${formFirstName} ${formLastName}`;
    }
    if (!!user.firstName && !!user.lastName) {
      return `${user.firstName} ${user.lastName}`     
    }
    return user.firstName;
  }
  
  render() {
    const { formFirstName, formLastName, formPreferredName } = this.state;

    return (
      <View style={styles.scrollContainer}>
        <NavBar
          leftComponent={
            <GoBackButton navigation={this.props.navigation}/>
          }
          navbarTitle={this.renderName()}
        />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
          alwaysBounceVertical={false}
        >
          <Grid>
            <Col>
              <View>
                {/* Name */}
                <InputRegular
                  containerStyle={styles.containerInput}
                  placeholder={I18n.t("linguistName")}
                  onChangeText={text => {
                    if (!onlyLetters(text) || text == "") {
                      this.setState({
                        formFirstName: text
                      });
                    }
                  }}
                  maxLength={20}
                  value={formFirstName}
                  autoFocus={true}
                />
              </View>
              {/* Last Name */}
              <InputRegular
                containerStyle={styles.containerInput}
                placeholder={I18n.t("linguistLastName")}
                onChangeText={text => {
                  if (!onlyLetters(text) || text == "") {
                    this.setState({
                      formLastName: text
                    });
                  }
                }}
                maxLength={20}
                value={formLastName}
                sec
              />

              {/* Prefered Name */}
              <InputRegular
                containerStyle={styles.containerInput}
                placeholder={I18n.t("preferredName")}
                value={formPreferredName}
                onChangeText={text => {
                  if (!onlyLetters(text) || text == "") {
                    this.setState({
                      formPreferredName: text
                    });
                  }
                }}
                maxLength={20}
                sec
              />
            </Col>
          </Grid>
        </ScrollView>
        {/* Save Button */}
        <BottomButton
          title={I18n.t("save")}
          onPress={() => {
            this.submit();
          }}
          bold={false}
          disabled={this.isDisabled()}
          fill={!this.isDisabled()}
        />
      </View>
    );
  }
}

const mS = state => ({
  user: state.account.user,
});

const mD = {
  updateUser,
};

export default connect(
  mS,
  mD
)(EditNameView);
