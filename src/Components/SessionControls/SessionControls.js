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
          name={linguist ? "LinguistCamera" : "CustomerCamera"}
          icon="ios-reverse-camera-outline"
        />
        <CallButtonToggle
          toggle={true}
          active={speaker}
          name={linguist ? "LinguistSpeaker" : "CustomerSpeaker"}
          icon="ios-volume-up"
        />
        <CallButton
          onPress={() => closeCall(reason)}
          buttonColor="red"
          toggle={false}
          icon="call-end"
        />
        <CallButtonToggle
          toggle={true}
          active={!mic}
          name={linguist ? "LinguistMute" : "CustomerMute"}
          icon="ios-mic-off"
        />
        <CallButtonToggle
          toggle={true}
          active={video}
          name={linguist ? "LinguistVideo" : "CustomerVideo"}
          icon="ios-videocam-outline"
          onPress={async () => {
            const {
              tokboxSessionID,
              TokboxEventConstant,
              video,
              linguist
            } = this.props;

            const isLinguist = !!linguist;

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

const mS = state => {
  const settings = state.userProfile.linguistProfile
    ? SETTINGS.LINGUIST
    : SETTINGS.CUSTOMER;

  return {
    mic: state[settings].mic,
    video: state[settings].video,
    rotate: state[settings].rotate,
    speaker: state[settings].speaker,
    tokboxSessionID: state.tokbox.tokboxID
  };
};

const mD = {};

export default connect(mS, mD)(SessionControls);
