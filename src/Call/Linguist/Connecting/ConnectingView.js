import React, { Component } from "react";
import { connect } from "react-redux";

//COMPONENTS
import { Text, View, ScrollView, ActivityIndicator, Alert } from "react-native";
import SessionControls from "../../../Components/SessionControls/SessionControls";
import ModalRetry from "../../../Components/ModalRerty/ModalRetry";
// STYLE AND THEMES
import styles from "./styles";
// REDUCERS
import { closeCall } from "../../../Ducks/ActiveSessionReducer";
import I18n from "../../../I18n/I18n";
import { displayEndCall } from "../../../Util/Alerts";
import { REASON, STATUS_TOKBOX } from "../../../Util/Constants";
import SoundManager from "../../../Util/SoundManager";
import { Col, Row, Grid } from "react-native-easy-grid";

class ConnectingView extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    SoundManager["IncomingCall"].stop();
    this.conectingTimer();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tokboxStatus === STATUS_TOKBOX.STREAM) {
      clearInterval(this.props.counterId);
    }
  }

  conectingTimer = () => {
    const { incrementCounter } = this.props;
    setTimeout(() => {
      console.log("Clear");
    }, 2000);
  };

  closeCallLinguist = reason => {
    displayEndCall(() => {
      SoundManager["EndCall"].play();
      this.props.closeCall(REASON.DONE);
    });
  };

  render() {
    const { closeCall, connect, callTimeOut } = this.props;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainerStyle}
        alwaysBounceVertical={false}
      >
        <Grid>
          <Col>
            <ModalRetry
              closeCall={closeCall}
              callTimeOut={callTimeOut}
              reconnectCall={connect}
            />
            {!this.props.modalReconnect && (
              <ActivityIndicator
                size="large"
                color="white"
                style={styles.spinner}
              />
            )}
            <View style={styles.connectingMessageContainer}>
              <Text style={styles.connectingMessage}>
                {I18n.t("connecting")}
              </Text>
            </View>
            {/* Call Buttons */}

            <SessionControls
              closeCall={this.closeCallLinguist}
              reason={REASON.DONE}
              switch={() => {}}
              contacting
              linguist
            />
          </Col>
        </Grid>
      </ScrollView>
    );
  }
}

const mS = state => ({
  counterId: state.contactLinguist.counterId,
  tokboxStatus: state.tokbox.status,
  modalReconnect: state.contactLinguist.modalReconnect,
  modalContact: state.contactLinguist.modalContact
});

const mD = {
  closeCall
};

export default connect(
  mS,
  mD
)(ConnectingView);
