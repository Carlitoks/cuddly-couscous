import React, { Component } from "react";

import { Text, View, ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Col, Row, Grid } from "react-native-easy-grid";

import contactLinguist from "../../Ducks/ContactLinguistReducer";
import { CallButton } from "../../Components/CallButton/CallButton";

import styles from "./styles";
import { Images } from "../../Themes";

class IncomingCall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerName: this.props.customerName,
      customerLocation: this.props.customerLocation
    };
  }

  render() {
    const navigate = this.props.navigation.navigate;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        alwaysBounceVertical={false} 
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainerStyle}
      >
        {/* Background Image */}
        <Image source={Images.backgroundCall} style={styles.backgroundImage} />
        <Grid>
          <Col style={{ justifyContent: "space-between" }}>
            {/* Top Container */}
            <Row style={styles.topContainer}>
              <Image style={styles.smallAvatar} source={Images.avatarCall} />

              <Text style={styles.callerNameText}> Caroline C. </Text>
              <View style={styles.inlineContainer}>
                <Icon style={styles.icon} size={25} name="room" />
                <Text style={styles.locationText}>San Diego, CA</Text>
              </View>
              <Text style={styles.incomingCallText}>
                Incoming video call...
              </Text>
            </Row>

            {/* Center Container */}
            <Row style={styles.centerContainer}>
              <View style={styles.inlineContainer}>
                <Icon style={styles.icon} size={25} name="forum" />
                <Text style={styles.notificationText}>English - Mandarin</Text>
              </View>
              <View style={styles.inlineContainer}>
                <Icon style={styles.icon} size={25} name="help" />
                <Text style={styles.notificationText}>
                  Airport lost and found
                </Text>
              </View>
              <View style={styles.inlineContainer}>
                <Icon style={styles.icon} size={25} name="watch-later" />
                <Text style={styles.notificationText}>~ 10 mins</Text>
              </View>
            </Row>

            {/* Call Buttons */}
            <Row style={styles.bottomContainer}>
              {/* End Call */}
              <CallButton buttonColor="red" toggle={false} icon="call-end" />
              {/* Accept Call */}
              <CallButton buttonColor="green" toggle={false} icon="call" />
            </Row>
          </Col>
        </Grid>
      </ScrollView>
    );
  }
}

export default IncomingCall;
