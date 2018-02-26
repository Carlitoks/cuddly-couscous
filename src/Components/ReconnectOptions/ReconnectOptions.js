import React, { Component } from "react";

import { Text, View, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import { connect } from "react-redux";

import I18n from "../../I18n/I18n";
import { styles } from "./styles";

import { REASON } from "../../Util/Constants";

class ReconnectOptions extends Component {
  render() {
    return (
      <View>
        <View style={styles.optionButton}>
          <TouchableWithoutFeedback
            onPress={async () => {
              await this.props.closeCall(REASON.RETRY);
              await this.props.reconnectCall();
              this.props.callTimeOut();
            }}
          >
            <Icon.Button
              name="search"
              backgroundColor="transparent"
              size={25}
              iconStyle={styles.iconStyle}
            >
              <Text style={styles.textStyle}>
                {I18n.t("callAnotherLinguist")}
              </Text>
            </Icon.Button>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.optionButton}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.props.closeCall(REASON.CANCEL);
            }}
          >
            <Icon.Button
              name="call-end"
              backgroundColor="transparent"
              size={25}
              iconStyle={styles.iconStyle}
            >
              <Text style={styles.textStyle}>{I18n.t("endCall")}</Text>
            </Icon.Button>
          </TouchableWithoutFeedback>
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
