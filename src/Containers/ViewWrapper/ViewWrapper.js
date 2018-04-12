import React from "react";
import { connect } from "react-redux";
import {
  AppRegistry,
  Button,
  View,
  Text,
  StyleSheet,
  Modal,
  StatusBar
} from "react-native";
import Instabug from "instabug-reactnative";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";

import styles from "./styles";

const ViewWrapper = ({
  children,
  status,
  style,
  firstName,
  lastName,
  preferredName,
  linguistProfile,
  email
}) => {
  const name = preferredName ? preferredName : firstName;
  const role = !!linguistProfile ? "Linguist" : "Customer";
  Instabug.startWithToken(
    "83f07c5f8dcb8496e3287f280ce6f61d",
    Instabug.invocationEvent.shake
  );
  if (email) {
    Instabug.setUserData(`${name} ${lastName} (${role})`);
    Instabug.setUserEmail(email);
  } else {
    Instabug.setUserData(`User  anonymous`);
  }
  return (
    <View style={style}>
      {/* No Connection Modal*/}
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />

      <Modal
        visible={status === "none"}
        animationType={"slide"}
        onRequestClose={() => false}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.text}>There is no internet connection</Text>
          </View>
        </View>
      </Modal>

      {/* Render Child Components */}
      {children}
    </View>
  );
};

const mS = state => ({
  status: state.networkInfo.type,
  firstName: state.userProfile.firstName,
  lastName: state.userProfile.lastName,
  preferredName: state.userProfile.preferredName,
  linguistProfile: state.userProfile.linguistProfile,
  email: state.userProfile.email
});

export default connect(mS)(ViewWrapper);
