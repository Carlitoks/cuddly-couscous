import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getProfileAsync,
  clearView,
  updateView
} from "../../Ducks/UserProfileReducer";

import { View, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import TopViewIOS from "../TopViewIOS/TopViewIOS"

import styles from "./styles";

class MenuView extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getProfileAsync(this.props.uuid, this.props.token);
  }

  render() {
    const navigation = this.props.navigation;

    return (
      <View>
        <TopViewIOS/>
        <Image
          style={[styles.logo, styles.center]}
          source={require("../../Images/perfil.jpg")}
        />
        <Text style={styles.textName}>
          {this.props.firstName} {this.props.lastName}
        </Text>
        <Text style={styles.textCountry}>{this.props.location}</Text>
        <Text style={styles.textStars}>{this.props.rate}</Text>

        {/* Home */}
        <Button
          title="Home"
          buttonStyle={styles.Button}
          textStyle={styles.colorText}
          onPress={() => {
            navigation.dispatch({ type: "Home" });
          }}
        />

        {/* My Profile */}
        <Button
          title="My Profile"
          buttonStyle={styles.Button}
          textStyle={styles.colorText}
          onPress={() => {
           // navigation.dispatch({ type: "Profile" });
          }}
        />

        {/* History */}
        <Button
          title="History"
          buttonStyle={styles.Button}
          textStyle={styles.colorText}
          onPress={() => {
            navigation.dispatch({ type: "CallHistory" });
          }}
        />

        {/* Schedule */}
        <Button
          buttonStyle={styles.Button}
          textStyle={styles.colorText}
          title="Schedule"
          onPress={() => {
           // navigation.dispatch({ type: "Profile" });
          }}
        />

        {/* Settings */}
        <Button
          buttonStyle={styles.Button}
          textStyle={styles.colorText}
          title="Settings"
          onPress={() => {
           // navigation.dispatch({ type: "Profile" });
          }}
        />

        {/* Help */}
        <Button
          buttonStyle={styles.Button}
          textStyle={styles.colorText}
          title="Help"
          onPress={() => {
           // navigation.dispatch({ type: "Profile" });
          }}
        />
      </View>
    );
  }
}

const mS = state => ({
  firstName: state.userProfile.firstName,
  lastName: state.userProfile.lastName,
  location: state.userProfile.location,
  rate: state.userProfile.rate,
  nativeLangCode: state.userProfile.nativeLangCode,
  uuid: state.auth.uuid,
  token: state.auth.token
});

const mD = {
  clearView,
  updateView,
  getProfileAsync
};

export default connect(mS, mD)(MenuView);
