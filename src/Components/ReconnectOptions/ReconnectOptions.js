import React, { Component } from "react";

import { Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Button } from "react-native-elements";

import { connect } from "react-redux";
import BottomButton from "../BottomButton/BottomButton";
import { cleanCall } from "../../Ducks/ActiveSessionReducer";
import I18n, { translateLanguage } from "../../I18n/I18n";
import { styles } from "./styles";
import { clear } from "../../Ducks/ActiveSessionReducer";
import { resetConnectingMessage } from "../../Ducks/ContactLinguistReducer";
import { REASON } from "../../Util/Constants";
import { Colors } from "../../Themes";
import { switchCallLang } from '../../Ducks/NewSessionReducer';
import { LanguagesRollover } from "../../Config/Languages";

class ReconnectOptions extends Component {
  showSwitchLangButton = () => {
    if(LanguagesRollover[this.props.primaryLangCode] || LanguagesRollover[this.props.secondaryLangCode]){
      return <Button
        title={I18n.t("tryAnotherLang", {
          lang: translateLanguage(LanguagesRollover[this.props.primaryLangCode]) || translateLanguage(LanguagesRollover[this.props.secondaryLangCode])
        })}
        buttonStyle={[styles.button, {marginTop: 10}]}
        textStyle={styles.buttonText}
        backgroundColor={Colors.gradientColorButton.bottom}
        borderRadius={50}
        onPress={async () => {
          this.props.resetConnectingMessage();
          this.props.switchCallLang();
          await this.props.reconnectCall();
        }}
      />
    }
    return <React.Fragment />
  };
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
        { this.showSwitchLangButton() }
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
  counterId: state.contactLinguist.counterId,
  primaryLangCode: state.newSessionReducer.session.primaryLangCode,
  secondaryLangCode: state.newSessionReducer.session.secondaryLangCode
});

const mD = { clear, cleanCall, resetConnectingMessage, switchCallLang };

export default connect(mS, mD)(ReconnectOptions);
