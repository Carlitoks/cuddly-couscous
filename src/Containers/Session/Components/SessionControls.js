import React from "react";
import {View, Button} from "react-native";

export const SessionControls = (props) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', height: 40}}>
      <View style={{flex: 1}}>
        <Button
          title = "Camera"
          onPress = {()=> {}}
        />
      </View>
      <View style={{flex: 1}}>
        <Button
          title = "Speaker"
          onPress = {()=> {}}
        />
      </View>
      <View style={{flex: 1}}>
        <Button
          title = "EndCall"
          onPress = {() => {props.onEndCallPressed() }}
        />
      </View>
      <View style={{flex: 1}}>
        <Button
          title = "Mic"
          onPress = {()=> {}}
        />
      </View>
      <View style={{flex: 1}}>
        <Button
          title = "Video"
          onPress = {()=> {}}
        />
      </View>
    </View>
  );
};