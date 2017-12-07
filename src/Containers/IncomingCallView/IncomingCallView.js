import React, { Component } from "react";
import { Text, Button, View, ScrollView, Alert, Image, Avatar } from "react-native";
import { RkButton, RkTextInput, RkText, rkType } from "react-native-ui-kitten";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "./style";
import RoundedButton from "../../Components/IncomingCallButton/RoundedButton";

export default class CustomerAccount extends Component {
  constructor(props) {
    super(props);
  }

  state = {
  };


  render() {
    const navigate = this.props.navigation.navigate;

    return (
      <View style={styles.mainContainer}>
        <Image
          source={require("../../Images/backgroundImage.png")}
          style={styles.backgroundImage}
        />
        <View style={styles.topContainer}>
          <View style={styles.inlineContainer}>
            <Image
              style={styles.smallAvatar}
              source={require("../../Images/smallAvatar.png")}
            />
          </View>
          <RkText style={styles.callerNameText}> Caroline C. </RkText>

          <View style={styles.inlineContainer}>
            <Icon style={styles.icon} size={25} name="room" />
            <RkText style={styles.locationText}>San Diego, CA</RkText>
          </View>

          <View style={styles.inlineContainer}>
            <RkText style={styles.incomingCallText}>
              Incoming video call...
            </RkText>
          </View>
        </View>

        <View style={styles.centerContainer}>
        
          <View style={styles.inlineContainer}>
            <Icon style={styles.icon} size={25} name="forum" />
            <RkText style={styles.notificationText}>English, Mandarin</RkText>
          </View>
          <View style={styles.inlineContainer}>
            <Icon style={styles.icon} size={25} name="help" />
            <RkText style={styles.notificationText}>
              Airport lost and found
            </RkText>
          </View>
          <View style={styles.inlineContainer}>
            <Icon style={styles.icon} size={25} name="watch-later" />
            <RkText style={styles.notificationText}>~ 10 mins</RkText>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <RoundedButton
            style={styles.acceptButton}
            icon="call-end"
            type="rejectCall"
          />
          <RoundedButton
            style={styles.rejectButton}
            icon="call"
            type="acceptCall"
          />
        </View>
      </View>
    );
  }
}
