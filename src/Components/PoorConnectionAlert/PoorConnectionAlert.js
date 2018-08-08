import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import I18n from "../../I18n/I18n";

import { styles } from "./styles";

class PoorConnectionAlert extends Component {
  constructor(props) {
    super(props);
  }

  showVideoAlert() {
    const { localVideoWarning, signalVideoWarning, isLinguist } = this.props;
    if (localVideoWarning == "ENABLED" && signalVideoWarning == "ENABLED") {
      return I18n.t("session.alertGeneralCannotSee");
    }
    if (localVideoWarning == "ENABLED") {
      return isLinguist
        ? I18n.t("session.alertYouCannotSeeCustomer")
        : I18n.t("session.alertYouCannotSeeLinguist");
    }
    if (signalVideoWarning == "ENABLED") {
      return isLinguist
        ? I18n.t("session.alertCustomerCannotSeeYou")
        : I18n.t("session.alertLinguistCannotSeeYou");
    }
  }

  render() {
    return (
      <View style={styles.alertContainer}>
        <View style={styles.alertBox}>
          <Text style={styles.alertContent}>
            {(this.props.localVideoWarning == "ENABLED" ||
              this.props.signalVideoWarning == "ENABLED") &&
              this.showVideoAlert()}
          </Text>
        </View>
      </View>
    );
  }
}

const mS = state => ({
  localVideoWarning: state.activeSessionReducer.localVideoWarning,
  signalVideoWarning: state.activeSessionReducer.signalVideoWarning
});

const mD = {};

export default connect(
  mS,
  mD
)(PoorConnectionAlert);
