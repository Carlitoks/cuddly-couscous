import React from "react";
import {View, Button, StyleSheet} from "react-native";

import TextButton from "../../../Components/Widgets/TextButton";

export const SessionControls = (props) => {
  return (
    <View style={styles.container}>
      <TextButton
        text = "Camera"
        onPress = {()=> { props.onCameraFlipPressed() }}
        style = { buttonStyle(props.cameraFlipEnabled) }
        textStyle = { styles.buttonText }
      />
      <TextButton
        text = "Speaker"
        onPress = {()=> { props.onSpeakerPressed() }}
        style = { buttonStyle(props.speakerEnabled) }
        textStyle = { styles.buttonText }
      />
      <TextButton
        text = "End"
        style = {{...b, backgroundColor: "#800"}}
        onPress = {() => { props.onEndCallPressed() }}
        textStyle = { styles.buttonText }
      />
      <TextButton
        text = "Mic"
        onPress = {()=> { props.onMicPressed() }}
        style = { buttonStyle(props.micEnabled) }
        textStyle = { styles.buttonText }
      />
      <TextButton
        text = "Video"
        onPress = {()=> { props.onVideoPressed() }}
        style = { buttonStyle(props.videoEnabled) }
        textStyle = { styles.buttonText }
      />    
    </View>
  );
};

const b = {
  flex: 1,
  height: 40,
  margin: 3
}

const buttonStyle = (enabled) => {
  return {
    ...b,
    backgroundColor: enabled ? "#444488" : "#884444",
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: "100%",
    backgroundColor: 'rgba(0, 0, 0, 0.33)',
    paddingTop: 5,
    paddingBottom: 5
  },
  buttonText: {
    color: "#fff"
  }
});
