import React from "react";
import { View, Text, Button, Image } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { RkButton, RkTextInput, RkText } from "react-native-ui-kitten";
import Profile from "./../../Profile";
const MenuView = props => {
  const navigate = props.navigation.navigate;
  styles = StyleSheet.create({
    Button: {
      width: "90%",
      backgroundColor: "#FFFFFF",
      borderBottomWidth: 1,
      borderBottomColor: "#D3D3D3",
      borderRadius: 0,
      paddingLeft: 0,
      marginLeft: "10%",
      paddingTop: 25,
      paddingBottom: 25
    },
    colorText: {
      color: "#000000",
      fontSize: 18,
      textAlign: "left",
      alignContent: "flex-start",
      width: "100%",
      marginLeft: 0,
      paddingLeft: 0,
      paddingTop: 12,
      paddingBottom: 12
    },
    center: {
      alignSelf: "center"
    },
    logo: {
      marginTop: 20,
      marginBottom: 10,
      width: 120,
      height: 120,
      borderRadius: 60
    },
    textName: {
      fontSize: 20,
      fontWeight: "300",
      alignSelf: "center"
    },
    textCountry: {
      fontSize: 15,
      alignSelf: "center",
      color: "#A9A9A9"
    },
    textStars: {
      fontSize: 18,
      alignSelf: "center",
      fontWeight: "bold",
      marginBottom: 15
    }
  });
  return (
    <View>
      <Image
        style={[styles.logo, styles.center]}
        source={require("../../Images/perfil.jpg")}
      />
      <RkText style={styles.textName}>Adele Gordon</RkText>
      <RkText style={styles.textCountry}>Oman</RkText>
      <RkText style={styles.textStars}>4.3</RkText>
      <RkButton
        style={styles.Button}
        onPress={() => navigate("LandingContainer")}
      >
        <Text style={styles.colorText}>Home</Text>
      </RkButton>
      <RkButton style={styles.Button} onPress={() => navigate("Profile")}>
        <RkText style={styles.colorText}>My Profile</RkText>
      </RkButton>
      <RkButton style={styles.Button} onPress={() => navigate("Profile")}>
        <RkText style={styles.colorText}>History</RkText>
      </RkButton>
      <RkButton style={styles.Button} onPress={() => navigate("Profile")}>
        <RkText style={styles.colorText}>Schedule</RkText>
      </RkButton>
      <RkButton style={styles.Button} onPress={() => navigate("Profile")}>
        <RkText style={styles.colorText}>Settings</RkText>
      </RkButton>
      <RkButton style={styles.Button} onPress={() => navigate("Profile")}>
        <RkText style={styles.colorText}>Help</RkText>
      </RkButton>
    </View>
  );
};

export default MenuView;
