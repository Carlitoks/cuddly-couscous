import React from "react";
import { View, Text, Button, Image } from "react-native";

import { RkButton, RkTextInput, RkText } from "react-native-ui-kitten";

import styles from "./styles";

const MenuView = props => {
  const navigate = props.navigation.navigate;

  return (
    <View>
      <Image
        style={[styles.logo, styles.center]}
        source={require("../../Images/perfil.jpg")}
      />
      <RkText style={styles.textName}>Adele Gordon</RkText>
      <RkText style={styles.textCountry}>Oman</RkText>
      <RkText style={styles.textStars}>4.3</RkText>

      {/* Home */}
      <RkButton
        style={styles.Button}
        onPress={() => {
          props.navigation.dispatch({ type: "Home" });
        }}
      >
        <Text style={styles.colorText}>Home</Text>
      </RkButton>

      {/* My Profile */}
      <RkButton
        style={styles.Button}
        onPress={() => {
          props.navigation.dispatch({ type: "Profile" });
        }}
      >
        <RkText style={styles.colorText}>My Profile</RkText>
      </RkButton>

      {/* History */}
      <RkButton style={styles.Button} onPress={() => navigate("CallHistory")}>
        <RkText style={styles.colorText}>History</RkText>
      </RkButton>

      {/* Schedule */}
      <RkButton style={styles.Button} onPress={() => navigate("Profile")}>
        <RkText style={styles.colorText}>Schedule</RkText>
      </RkButton>

      {/* Settings */}
      <RkButton style={styles.Button} onPress={() => navigate("Profile")}>
        <RkText style={styles.colorText}>Settings</RkText>
      </RkButton>

      {/* Help */}
      <RkButton style={styles.Button} onPress={() => navigate("Profile")}>
        <RkText style={styles.colorText}>Help</RkText>
      </RkButton>
    </View>
  );
};

export default MenuView;
