import React, { Component } from "react";

//COMPONENTS
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";
import SessionControls from "../../../Components/SessionControls/SessionControls";

// STYLE AND THEMES
import styles from "./styles";
import { Images, Colors } from "../../../Themes";

// REDUCERS
import { connect } from "react-redux";
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
    const navigate = this.props.navigation.navigate;
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainerStyle}
        alwaysBounceVertical={false}
      >
        {!this.props.modalReconnect && (
          <ActivityIndicator
            size="large"
            color="white"
            style={styles.spinner}
          />
        )}

        <View style={styles.connectingMessageContainer}>
          <Text style={styles.connectingMessage}>
            {I18n.t("contactingLinguist")}
          </Text>
        </View>

        {/* Call Buttons */}
        <View style={styles.controlsContainer}>
          <SessionControls
            ref={this.ref}
            closeCall={this.props.closeCall}
            reason={REASON.CANCEL}
            switch={this.props.switch}
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
  modalReconnect: state.contactLinguist.modalReconnect
});

const mD = {};

export default connect(mS, mD)(ContactingLinguist);
