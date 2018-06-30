import React, { Component } from "react";
import { connect } from "react-redux";

//COMPONENTS
import { Text, View, ScrollView, ActivityIndicator, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";
import SessionControls from "../../../Components/SessionControls/SessionControls";

// STYLE AND THEMES
import styles from "./styles";
import { Images, Colors } from "../../../Themes";
// REDUCERS
import { closeCall } from "../../../Ducks/CallCustomerSettings";
import I18n from "../../../I18n/I18n";
import {
  setPermission,
  displayOpenSettingsAlert
} from "../../../Util/Permission";
import { REASON, STATUS_TOKBOX } from "../../../Util/Constants";
import InCallManager from "react-native-incall-manager";

class ContactingLinguist extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.callTimeOut();
    if (InCallManager.recordPermission !== "granted") {
      InCallManager.requestRecordPermission()
        .then(requestedRecordPermissionResult => {
          console.log(
            "InCallManager.requestRecordPermission() requestedRecordPermissionResult: ",
            requestedRecordPermissionResult
          );
        })
        .catch(err => {
          console.log("InCallManager.requestRecordPermission() catch: ", err);
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tokboxStatus === STATUS_TOKBOX.STREAM) {
      clearInterval(this.props.counterId);
    }
  }

  render() {
    const { closeCall, connect, callTimeOut } = this.props;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainerStyle}
        alwaysBounceVertical={false}
      >
        {this.props.modalReconnect &&
          Alert.alert(I18n.t("notLinguistAvailable"), "", [
            {
              text: I18n.t("tryAgain"),
              onPress: () => {
                closeCall(REASON.RETRY);
                connect();
                callTimeOut();
              }
            },
            {
              text: I18n.t("endCall"),
              onPress: () => {
                closeCall("Abort");
              }
            }
          ])}
        {!this.props.modalReconnect && (
          <ActivityIndicator
            size="large"
            color="white"
            style={styles.spinner}
          />
        )}

        <View style={styles.connectingMessageContainer}>
          <Text style={styles.connectingMessage}>
            {this.props.connectingMessage}
          </Text>
        </View>

        {/* Call Buttons */}
        <View style={styles.controlsContainer}>
          <SessionControls
            closeCall={closeCall}
            reason={REASON.CANCEL}
            switch={() => {}}
            contacting
          />
        </View>
      </ScrollView>
    );
  }
}

const mS = state => ({
  counterId: state.contactLinguist.counterId,
  tokboxStatus: state.tokbox.status,
  modalReconnect: state.contactLinguist.modalReconnect,
  connectingMessage: state.contactLinguist.connectingMessage
});

const mD = {
  closeCall
};

export default connect(
  mS,
  mD
)(ContactingLinguist);
