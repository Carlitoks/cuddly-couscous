import React, {Component} from "react";
import {View, Text, Button, StyleSheet} from "react-native";
import { connect } from "react-redux";

import {createNewSession} from "../../Ducks/CurrentSessionReducer";
import { moderateScale } from "../../Util/Scaling";
import colors from "../../Themes/Colors";
import TextButton from "../../Components/Widgets/TextButton";
import I18n, {translateApiError} from "../../I18n/I18n";
import Color from "color";

import sharedStyles from "./styles";
export class CustomerRetryView extends Component {

  constructor(props) {
    super(props);

    this.creating = false;
    this.state = {
      creating: false
    };

    this.unmounting = false;
  }

  componentWillUnmount () {
    this.unmounting = true;
  }

  retry () {
    if (this.creating || this.unmounting) {
      return;
    }
    this.creating = true;
    this.setState({creating: true}, () => {
      this.props.createNewSession({
        ...this.props.session,
        startReason: "retry_timeout"
      }).then(() => {
        this.unmounting = true;
        this.props.navigation.dispatch({type: "CustomerMatchingView"});
      }).catch((e) => {
        Alert.alert(
          I18n.t("error"),
          translateApiError(e),
          [
            {text: 'OK'},
          ],
        );
      }).finally(() => {
        this.creating = false;
        if (!this.unmoumting) {
          this.setState({creating: false});
        }
      });  
    });
  }

  cancel () {
    this.props.navigation.dispatch({type: "Home"})
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{ I18n.t("session.timeout.busy") }</Text>
          <Text style={styles.text}>{ I18n.t("session.timeout.tryAgain") }</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextButton
            text={I18n.t("session.timeout.retry")}
            style={styles.orangeButton}
            textStyle={sharedStyles.prominentButtonText}
            disabled = {this.state.creating}
            onPress = {() => { this.retry() }}
          />
          <TextButton
            text={I18n.t("session.timeout.cancel")}
            style={styles.blueButton}
            textStyle={sharedStyles.prominentButtonText}
            disabled = {this.state.creating}
            onPress = {() => { this.cancel() }}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.backgroundBlue
  },
  textContainer: {
    marginTop: "33%",
    paddingLeft: moderateScale(30, 0),
    paddingRight: moderateScale(30, 0),
  },
  text: {
    fontSize: moderateScale(20, 0),
    textAlign: "center",
    color: colors.white,
    marginBottom: moderateScale(20, 0)
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: moderateScale(30, 0),
  },
  orangeButton: {
    ...sharedStyles.prominentButtonBase,
    ...sharedStyles.prominentButtonOrange,
  },
  blueButton: {
    ...sharedStyles.prominentButtonBase,
    ...sharedStyles.prominentButtonBlue,
  },
});

const mS = (state) => {
  return {
    session: state.newSessionReducer.session
  }
};

const mD = {
  createNewSession
};

export default connect(mS, mD)(CustomerRetryView)