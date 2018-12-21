import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Alert, Text } from "react-native";
import { bool, func, string } from "prop-types";
import _isUndefined from "lodash/isUndefined";

import styles from "./styles";

import CallButtonToggle from "./../../Components/CallButtonToggle/CallButtonToggle";
import CallButton from "../../Components/CallButton/CallButton";
import CallTimer from "../../Components/CallTimer/CallTimer";
import I18n from "../../I18n/I18n";
import { moderateScale, verticalScale, scale } from "../../Util/Scaling";
import { REASON, SETTINGS, TOKBOX_EVENTS } from "../../Util/Constants";

import { Colors } from "../../Themes";
import { changeStatus } from "../../Ducks/ProfileLinguistReducer";
import { modifyAVModePreference } from "../../Ducks/NewSessionReducer";

class SessionControls extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      rotate,
      speaker,
      mic,
      video,
      closeCall,
      reason,
      linguist,
      contacting
    } = this.props;
    return (
      <View
        style={[
          styles.containerButtons,
          !contacting ? { backgroundColor: "rgba(0,0,0,.26)" } : null
        ]}
      >
        <CallButtonToggle
          onPress={() => {
            if (video) {
              this.props.switch();
            }
          }}
          toggle={true}
          active={!rotate}
          name={"Camera"}
          icon="ios-reverse-camera-outline"
        />
        <CallButtonToggle
          toggle={true}
          active={speaker}
          name={"Speaker"}
          icon="ios-volume-up"
        />
        <CallButton
          onPress={() => {
            closeCall(reason);
          }}
          buttonColor="red"
          toggle={false}
          icon="call-end"
          unLock={true}
        />
        <CallButtonToggle
          toggle={true}
          active={!mic}
          name={"Mute"}
          icon="ios-mic-off"
        />
        <CallButtonToggle
          toggle={true}
          active={video}
          name={"Video"}
          icon="ios-videocam-outline"
          onPress={async () => {
            const {
              tokboxSessionID,
              TokboxEventConstant,
              video,
              linguist
            } = this.props;

            const isLinguist = !!linguist;
            this.props.modifyAVModePreference({ avModePreference: "video" });

            const eventType = isLinguist
              ? TOKBOX_EVENTS.TOGGLE_VIDEO_LINGUIST
              : TOKBOX_EVENTS.TOGGLE_VIDEO_CUSTOMER;

            // try {
            //   await OpenTok.sendSignal(
            //     tokboxSessionID,
            //     eventType,
            //     video.toString()
            //   );
            // } catch (err) {
            //   console.log(err);
            // }
          }}
        />
      </View>
    );
  }
}

SessionControls.propTypes = {
  closeCall: func.isRequired,
  reason: string.isRequired,
  linguist: bool
};

const mS = state => ({
  mic: state.activeSessionReducer.mic,
  video: state.activeSessionReducer.video,
  speaker: state.activeSessionReducer.speaker,
  rotate: state.activeSessionReducer.rotate,
  tokboxSessionID: state.activeSessionReducer.tokboxID
});

const mD = {modifyAVModePreference};

export default connect(
  mS,
  mD
)(SessionControls);
