import React from "react";
import {View, Button} from "react-native";

const bcolor = (enabled) => {
  return enabled ? "#444488" : "#884444";
};

export const SessionControls = (props) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', height: 40}}>
      <View style={{flex: 1}}>
        <Button
          title = "Camera"
          onPress = {()=> { props.onCameraFlipPressed() }}
          color = { bcolor(props.cameraFlipEnabled) }
        />
      </View>
      <View style={{flex: 1}}>
        <Button
          title = "Speaker"
          onPress = {()=> { props.onSpeakerPressed() }}
          color = { bcolor(props.speakerEnabled) }
        />
      </View>
      <View style={{flex: 1}}>
        <Button
          title = "EndCall"
          onPress = {() => { props.onEndCallPressed() }}
        />
      </View>
      <View style={{flex: 1}}>
        <Button
          title = "Mic"
          onPress = {()=> { props.onMicPressed() }}
          color = { bcolor(props.micEnabled) }
        />
      </View>
      <View style={{flex: 1}}>
        <Button
          title = "Video"
          onPress = {()=> { props.onVideoPressed() }}
          color = { bcolor(props.videoEnabled) }
        />
      </View>
    </View>
  );
};