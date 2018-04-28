import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./styles";

import CallButtonToggle from "./../../Components/CallButtonToggle/CallButtonToggle";
import CallButton from "../../Components/CallButton/CallButton";
import I18n from "../../I18n/I18n";
import { moderateScale, verticalScale, scale } from "../../Util/Scaling";
import { REASON, SETTINGS } from "../../Util/Constants";

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
      ref,
      closeCall,
      reason,
      linguist
    } = this.props;
    return (
      <View style={styles.containerButtons}>
        <CallButtonToggle
          onPress={() => {
            console.log(ref);
            if (typeof ref !== "string") {
              ref.switchCamera();
            }
          }}
          toggle={true}
          active={rotate}
          name={linguist ? "LinguistCamera" : "CustomerCamera"}
          icon="switch-camera"
        />
        <CallButtonToggle
          toggle={true}
          active={speaker}
          name={linguist ? "LinguistSpeaker" : "CustomerSpeaker"}
          icon="volume-up"
        />
        <CallButton
          onPress={() => closeCall(reason)}
          buttonColor="red"
          toggle={false}
          icon="call-end"
        />
        <CallButtonToggle
          toggle={true}
          active={mic}
          name={linguist ? "LinguistMute" : "CustomerMute"}
          icon="mic"
        />
        <CallButtonToggle
          toggle={true}
          active={video}
          name={linguist ? "LinguistVideo" : "CustomerVideo"}
          icon="videocam"
        />
      </View>
    );
  }
}

SessionControls.propTypes = {};

const mS = state => {
  const settings = state.userProfile.linguistProfile
    ? SETTINGS.LINGUIST
    : SETTINGS.CUSTOMER;
  return {
    mic: state[settings].mic,
    video: state[settings].video,
    rotate: state[settings].rotate,
    speaker: state[settings].speaker
  };
};

const mD = {};

export default connect(mS, mD)(SessionControls);
