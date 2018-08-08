import React, { Component } from "react";

import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Button } from "react-native-elements";

import { connect } from "react-redux";
import BottomButton from "../BottomButton/BottomButton";
import { cleanCall } from "../../Ducks/ActiveSessionReducer";
import I18n from "../../I18n/I18n";
import { styles } from "./styles";
import { clear } from "../../Ducks/ActiveSessionReducer";
import { resetConnectingMessage } from "../../Ducks/ContactLinguistReducer";
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
            this.props.resetConnectingMessage();
            await this.props.cleanCall();
            await this.props.reconnectCall();
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
  visibility: state.activeSessionReducer.modalReconnect,
  sessionID: state.activeSessionReducer.sessionID,
  token: state.auth.token,
  counter: state.contactLinguist.counter,
  counterId: state.contactLinguist.counterId
});

const mD = { clear, cleanCall, resetConnectingMessage };

export default connect(mS, mD)(ReconnectOptions);
