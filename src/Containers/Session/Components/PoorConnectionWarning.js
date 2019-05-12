import React from "react";
import {Text, View, StyleSheet} from "react-native";
import { moderateFontSize } from "../../../Util/Scaling";
import colors from "../../../Themes/Colors";
import I18n from "../../../I18n/I18n";

export const PoorConnectionWarning = ({isCustomer, localThrottle, remoteThrottle}) => {

  let text = I18n.t('session.alertGeneralCannotSee');
  if (isCustomer) {
    if (localThrottle) {
      text = I18n.t('session.alertYouCannotSeeLinguist');
    } else if (remoteThrottle) {
      text = I18n.t('session.alertLinguistCannotSeeYou');
    }
  } else {
    if (localThrottle) {
      text = I18n.t('session.alertYouCannotSeeCustomer');
    } else if (remoteThrottle) {
      text = I18n.t('session.alertCustomerCannotSeeYou');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {/* <View style={styles.background}>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 1,
    backgroundColor: "rgba(0, 0, 0, 0.33)",
  },
  text: {
    fontSize: moderateFontSize(13),
    color: colors.white,
    textAlign: "center"
  }
});