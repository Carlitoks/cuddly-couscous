import React, { Component } from "react";
import I18n from "../../I18n/I18n";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { Colors } from "../../Themes";
import { fmtMSS } from "../../Util/Helpers";
import styles from "./styles";

const CallTimer = ({
  time,
  red,
  showButton,
  changeVisible,
  buttonPress,
  withOut
}) => {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: withOut ? "rgba(245,51,51,.0)" : "rgba(0,0,0,.26)" }
      ]}
    >
      <Text
        style={[styles.CallTime, { fontSize: showButton ? 24 : 30 }]}
        onPress={changeVisible}
      >
        {withOut
          ? fmtMSS(time)
          : I18n.t("session.callTime", { time: fmtMSS(time) })}
      </Text>
      {showButton ? (
        <Button
          borderRadius={50}
          textStyle={styles.text}
          title={"Add 5 minutes"}
          onPress={buttonPress}
          backgroundColor={Colors.transparent}
          buttonStyle={styles.button}
        />
      ) : null}
    </View>
  );
};

export default CallTimer;
