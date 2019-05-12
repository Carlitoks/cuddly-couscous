import React from "react";
import {View, StyleSheet} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import colors from "../../../Themes/Colors";
import { isIphoneXorAbove } from "../../../Util/Devices";

const IconButton = ({name, enabled, onPress}) => {
  return (
    <Icon.Button
      name = {name}
      borderRadius={100}
      containerViewStyle={{
        borderRadius: 100,
        opacity: enabled ? 0.7 : 0.27,
        textAlign: "center",
      }}
      backgroundColor={ enabled ? colors.primaryColor : "rgba(255,255,255,0.27)" }
      onPress ={() => { onPress() }}
      style={{
        height: 47,
        width: 47,
        justifyContent: "center",
        borderRadius: 100
      }}
      iconStyle={{
        marginRight: 0,
      }}
      size={32}
      color={enabled ? colors.gradientColor.top : colors.primaryColor}
    />
  );
}

export const SessionControls = (props) => {
  return (
    <View style={styles.container}>

      {/* camera flip button */}
      <IconButton
        name={"ios-reverse-camera-outline"}
        enabled={props.cameraFlipEnabled}
        onPress={props.onCameraFlipPressed}
      />

      {/* speaker button */}
      <IconButton
        name={"ios-volume-up"}
        enabled={props.speakerEnabled}
        onPress={props.onSpeakerPressed}
      />

      {/* end call button */}
      <Icon.Button
        name = {'md-call'}
        borderRadius={100}
        containerViewStyle={{
          borderRadius: 100,
          textAlign: "center",
        }}
        backgroundColor={ 'red' }
        onPress ={() => { props.onEndCallPressed() }}
        style={{
          height: 60,
          width: 60,
          justifyContent: "center",
          borderRadius: 100
        }}
        iconStyle={{
          marginRight: 0,
          transform: [{rotate: '135deg'}]
        }}
        size={40}
        color={'white'}
      />

      {/* mute button */}
      <IconButton
        name={"ios-mic-off"}
        enabled={!props.micEnabled}
        onPress={props.onMicPressed}
      />

      {/* video button */}
      <IconButton
        name={"ios-videocam-outline"}
        enabled={props.videoEnabled}
        onPress={props.onVideoPressed}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: "100%",
    backgroundColor: 'rgba(0, 0, 0, 0.33)',
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: isIphoneXorAbove() ? 38 : 5,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
