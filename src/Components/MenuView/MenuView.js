import React, { Component } from "react";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";

import {
  getProfileAsync,
  clearView,
  updateView
} from "../../Ducks/UserProfileReducer";

import { View, Text, ScrollView, Image } from "react-native";
import { Button } from "react-native-elements";
import TopViewIOS from "../TopViewIOS/TopViewIOS"
import { logOutAsync } from "../../Ducks/AuthReducer"; 
import { isCurrentView } from "../../Util/Helpers";

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
    const selectedBackground = "#EBEDFA";
    const background = "#FFFFFF";

    return (
      <ScrollView>
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
        <Icon.Button name="home" size={25} 
          backgroundColor={isCurrentView(navigation, "Home") ? selectedBackground : background}
          iconStyle={isCurrentView(navigation, "Home") ? styles.selectedOptionMenu :styles.optionMenu}
          onPress={() => {
            navigation.dispatch({ type: "Home" });
          }}>
          <Text style={styles.colorText}>Home</Text>
        </Icon.Button>

        {/* My Profile */}
        <Icon.Button name="person" size={25} 
          backgroundColor={isCurrentView(navigation, "UserProfileView") ? selectedBackground : background}
          iconStyle={isCurrentView(navigation, "UserProfileView") ? styles.selectedOptionMenu :styles.optionMenu}
          onPress={() => {
            navigation.dispatch({ type: "UserProfileView" });
          }}>

          <Text style={styles.colorText}>Profile</Text>
        </Icon.Button>

        {/* History */}
        <Icon.Button name="schedule" size={25} 
          backgroundColor={isCurrentView(navigation, "CallHistory") ? selectedBackground : background}
          iconStyle={isCurrentView(navigation, "CallHistory") ? styles.selectedOptionMenu :styles.optionMenu}
          onPress={() => {
            navigation.dispatch({ type: "CallHistory" });
          }}>
          <Text style={styles.colorText}>History</Text>
        </Icon.Button>

        {/* Schedule */}
        <Icon.Button name="event" size={25} 
          backgroundColor={isCurrentView(navigation, "Schedule") ? selectedBackground : background}
          iconStyle={isCurrentView(navigation, "Schedule") ? styles.selectedOptionMenu :styles.optionMenu}
          onPress={() => {
            navigation.dispatch({ type: "Home" });
          }}>
          <Text style={styles.colorText}>Schedule</Text>
        </Icon.Button>

        {/* Settings */}
        <Icon.Button name="settings" size={25} 
          backgroundColor={isCurrentView(navigation, "Settings") ? selectedBackground : background}
          iconStyle={isCurrentView(navigation, "Settings") ? styles.selectedOptionMenu :styles.optionMenu}
          onPress={() => {
            navigation.dispatch({ type: "Home" });
          }}>
          <Text style={styles.colorText}>Settings</Text>
        </Icon.Button>

        {/* Help */}
        <Icon.Button name="help" size={25} 
          backgroundColor={isCurrentView(navigation, "Help") ? selectedBackground : background}
          iconStyle={isCurrentView(navigation, "Help") ? styles.selectedOptionMenu :styles.optionMenu}
          onPress={() => {
            navigation.dispatch({ type: "Home" })
          }}>
          <Text style={styles.colorText}>Help</Text>
        </Icon.Button>

      </ScrollView>
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
  getProfileAsync, 
  logOutAsync 
};

export default connect(mS, mD)(MenuView);
