import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Text, ScrollView, Keyboard, Alert } from "react-native";

import api from "../../Config/AxiosConfig";
import { loadUser } from "../../Ducks/AccountReducer";
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import InputRegular from "../../Components/InputRegular/InputRegular";
import BottomButton from "../../Components/BottomButton/BottomButton";
import Close from "../../Components/Close/Close";
import styles from "./styles";
import I18n, { translateApiErrorString, translateApiError } from "../../I18n/I18n";
import NavBar from "../../Components/NavBar/NavBar";
import { bindActionCreators } from "redux";
import { handleEvent } from "../../Util/Events";

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
    const { dispatch, navigation } = this.props;
    Keyboard.dismiss();

    this.setState({loading: true});
    api.get(`/event-codes/${this.state.code.trim()}`)
    .then(async (res) => {
      this.setState({loading: false});
      return handleEvent(res.data, { dispatch, navigation });
    })
    .catch((e) => {
      this.setState({loading: false});
      Alert.alert(I18n.t("error"), translateApiError(e));
    });

  }

  isDisabled() {
    return !this.state.code.trim() || this.state.loading;
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
          loading={this.state.loading}
          disabled={this.isDisabled()}
          fill={!this.isDisabled()}
        />
      </View>
    );
  }
}

const mS = state => ({
});


function mD(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({
      loadUser,
    }, dispatch),
  };
}

export default connect(
  mS,
  mD
)(PromoCodeView);
