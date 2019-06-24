import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Text, ScrollView, Keyboard, Alert } from "react-native";

import api from "../../Config/AxiosConfig";
import {loadUser} from "../../Ducks/AccountReducer";
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
import BottomButton from "../../Components/BottomButton/BottomButton";
import Close from "../../Components/Close/Close";
import styles from "./styles";
import I18n, { translateApiErrorString, translateApiError } from "../../I18n/I18n";
import NavBar from "../../Components/NavBar/NavBar";

class PromoCodeView extends Component {

  constructor (props) {
    super(props);

    this.state = {
      loading: false,
      code: ""
    };
  }

  componentWillUnmount () {
    Keyboard.dismiss();
  }

  submit() {
    Keyboard.dismiss();

    this.setState({laoding: true});
    api.get(`/event-codes/${this.state.code.trim()}`)
    .then((res) => {
      this.setState({loading: false});

      const data = res.data;

      // handle potential usage error first
      if (data.usageError) {
        Alert.alert(I18n.t("invalidCode"), translateApiErrorString(data.usageError, "api.errEventUnavailable"), [{text: I18n.t("actions.ok")}]);
        return;
      }

      // otherwise, for now we only support codes that add
      // minutes to the user account
      if (data.addMinutesToUser && data.maxMinutesPerUser > 0) {
        // reload user so the new minutes are visible
        this.props.loadUser(false);
        Alert.alert(
          I18n.t("minutesAdded"),
          I18n.t("complimentMinutes", {
            maxMinutesPerUser: data.maxMinutesPerUser,
            organizer: data.organization.name,
          }),
          [{
            text: I18n.t("actions.ok"),
            onPress: () => {
              this.props.navigation.dispatch({type: "Home"});
            }
          }]
        );
        return;
      }

      // otherwise... unexpected code
      this.props.navigation.dispatch({ type: "Home" });
    })
    .catch((e) => {
      this.setState({loading: false});
      Alert.alert(I18n.t("error"), translateApiError(e));
    });

  }

  isDisabled() {
    return !this.state.code.trim();
  }

  render() {
    return (
      <View style={styles.scrollContainer}>
        <NavBar
          leftComponent={
            <ShowMenuButton navigation={this.props.navigation} />
          }
          rightComponent={
            <Close
              action={() => {
                this.props.navigation.dispatch({ type: "Home" });
              }}
            />
          }
          navbarTitle={I18n.t("promoCodeTitle")}
        />
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={styles.scrollContainer}
          >
            <View>
              {/* Email */}
              <InputRegular
                containerStyle={styles.containerInput}
                placeholder={I18n.t("promoCodeInput")}
                autoCorrect={false}
                onChangeText={code =>
                  this.setState({ code })
                }
                value={this.state.code}
                keyboardType={"email-address"}
                maxLength={64}
                autoFocus={true}
              />
            </View>
          </ScrollView>
        {/* Next Button */}
        <BottomButton
          title={I18n.t("next")}
          onPress={() => this.submit()}
          bold={false}
          disabled={this.isDisabled()}
          fill={!this.isDisabled()}
        />
      </View>
    );
  }
}

const mS = state => ({
});

const mD = {
  loadUser
};

export default connect(
  mS,
  mD
)(PromoCodeView);
