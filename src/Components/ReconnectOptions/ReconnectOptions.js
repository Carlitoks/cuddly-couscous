import React, { Component } from "react";

import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Button } from "react-native-elements";

import { connect } from "react-redux";
import BottomButton from "../BottomButton/BottomButton";

import I18n from "../../I18n/I18n";
import { styles } from "./styles";

import { REASON } from "../../Util/Constants";
import { Colors } from "../../Themes";

class ReconnectOptions extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Button
          title={I18n.t("tryAgain")}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          backgroundColor={Colors.gradientColorButton.bottom}
          borderRadius={50}
          onPress={async () => {
            await this.props.closeCall(REASON.RETRY);
            await this.props.reconnectCall();
            this.props.callTimeOut();
          }}
        />
        <Button
          title={I18n.t("cancelCall")}
          buttonStyle={[styles.button, styles.noBorder, styles.cancelButton]}
          textStyle={styles.buttonText}
          backgroundColor={Colors.transparent}
          borderRadius={50}
          onPress={() => {
            this.props.closeCall("Abort");
          }}
        />
      </View>
    );
  }
}

const mS = state => ({
  visibility: state.callCustomerSettings.modalReconnect,
  sessionID: state.tokbox.sessionID,
  token: state.auth.token,
  counter: state.contactLinguist.counter,
  counterId: state.contactLinguist.counterId
});

const mD = {};

export default connect(
  mS,
  mD
)(ReconnectOptions);
