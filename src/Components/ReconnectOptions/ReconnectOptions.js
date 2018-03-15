import React, { Component } from "react";

import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { connect } from "react-redux";
import BottomButton from "../BottomButton/BottomButton";

import I18n from "../../I18n/I18n";
import { styles } from "./styles";

import { REASON } from "../../Util/Constants";
import { Colors } from "../../Themes";

class ReconnectOptions extends Component {
  render() {
    return (
      <View>
        <View style={styles.optionButton}>
          <BottomButton
            title={I18n.t("tryAgain")}
            icon="search"
            transparent
            whiteText
            color={Colors.white}
            onPress={async () => {
              await this.props.closeCall(REASON.RETRY);
              await this.props.reconnectCall();
              this.props.callTimeOut();
            }}
            relative
          />
        </View>
        <View style={styles.optionButton}>
          <BottomButton
            title={I18n.t("cancelCall")}
            icon="call-end"
            transparent
            whiteText
            color={Colors.white}
            onPress={() => {
              this.props.closeCall(REASON.CANCEL);
            }}
            relative
          />
        </View>
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

export default connect(mS, mD)(ReconnectOptions);
