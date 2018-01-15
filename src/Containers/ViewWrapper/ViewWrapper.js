import React from "react";
import { connect } from "react-redux";
import {
  AppRegistry,
  Button,
  View,
  Text,
  StyleSheet,
  Modal
} from "react-native";

import styles from "./styles";

const ViewWrapper = ({ children, status, style }) => {
  return (
    <View style={style}>
      {/* No Connection Modal*/}
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
  status: state.networkInfo.type
});

export default connect(mS)(ViewWrapper);
