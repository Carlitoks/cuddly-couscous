import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { createNewSession } from "../../Ducks/CurrentSessionReducer";
import { moderateScale, moderateFontSize } from "../../Util/Scaling";
import colors from "../../Themes/Colors";
import TextButton from "../../Components/Widgets/TextButton";
import I18n, { translateApiError, translateLanguage } from "../../I18n/I18n";

import { LanguagesRollover } from "../../Config/Languages";

import sharedStyles from "./styles";
import { SESSION, DURATION } from "../../Util/Constants";

export class CustomerRetryView extends Component {
  constructor(props) {
    super(props);

    this.creating = false;
    this.state = {
      creating: false,
      rollover: this.getRolloverConfig()
    };

    this.unmounting = false;
  }

  componentDidMount () {

    // automatically trigger the retry after 7s, in case the user performs no action
    setTimeout(() => {
      if (!this.unmounting) {
        this.retry();
      }
    }, 10 * DURATION.SECONDS);

  }

  componentWillUnmount() {
    this.unmounting = true;
  }

  getRolloverConfig() {
    const { session } = this.props;

    // prefer rollover for target language first
    if (session.endReason == SESSION.END.TIMEOUT) {
      if (!!LanguagesRollover[session.secondaryLangCode]) {
        return {
          exists: true,
          code: LanguagesRollover[session.secondaryLangCode],
          name: translateLanguage(LanguagesRollover[session.secondaryLangCode]),
          field: "secondary"
        };
      }

      // otherwise check for primary language
      if (!!LanguagesRollover[session.primaryLangCode]) {
        return {
          exists: true,
          code: LanguagesRollover[session.primaryLangCode],
          name: translateLanguage(LanguagesRollover[session.primaryLangCode]),
          field: "primary"
        };
      }
    }

    return {
      exists: false,
      code: "",
      name: "",
      field: ""
    };
  }

  retryReasonText() {
    const { session } = this.props;
    switch (session.endReason) {
      case SESSION.END.TIMEOUT: {
        return I18n.t("session.retry.busy");
      }
      case SESSION.END.CANCEL: {
        return I18n.t("session.retry.cancelRemote");
      }
      case SESSION.END.FAILURE_LOCAL: {
        return I18n.t("session.retry.failureLocal");
      }
      case SESSION.END.FAILURE_REMOTE: {
        return I18n.t("session.retry.failureRemote");
      }
      case SESSION.END.DISCONNECT_LOCAL: {
        return I18n.t("session.retry.disconnectLocal");
      }
      case SESSION.END.DISCONNECT_REMOTE: {
        return I18n.t("session.retry.disconnectRemote");
      }
      default: {
        return I18n.t("session.retry.busy");
      }
    }
  }

  retry() {
    const { session } = this.props;
    let startReason = null;
    switch (session.endReason) {
      case SESSION.END.TIMEOUT: {
        startReason = SESSION.START.RETRY_TIMEOUT;
        break;
      }
      case SESSION.END.CANCEL: {
        startReason = SESSION.START.RETRY_CANCEL;
        break;
      }
      case SESSION.END.FAILURE_LOCAL: {
        startReason = SESSION.START.RETRY_FAILURE;
        break;
      }
      case SESSION.END.FAILURE_REMOTE: {
        startReason = SESSION.START.RETRY_FAILURE;
        break;
      }
      case SESSION.END.DISCONNECT_LOCAL: {
        startReason = SESSION.START.RETRY_DISCONNECT;
        break;
      }
      case SESSION.END.DISCONNECT_REMOTE: {
        startReason = SESSION.START.RETRY_DISCONNECT;
        break;
      }
      default: {
        startReason = SESSION.START.RETRY_TIMEOUT;
        break;
      }
    }
    this.createSession({ reason: startReason });
  }

  retryRollover() {
    // TODO: check for retry_cancel
    const { session } = this.props;
    const { rollover } = this.state;
    const primaryLangCode = rollover.field == "primary" ? rollover.code : session.primaryLangCode;
    const secondaryLangCode =
      rollover.field == "secondary" ? rollover.code : session.secondaryLangCode;
    this.createSession({
      reason: SESSION.START.RETRY_TIMEOUT,
      primaryLangCode,
      secondaryLangCode
    });
  }

  createSession(params) {
    if (this.creating || this.unmounting) {
      return;
    }

    // TODO: check if no local network connection

    const newSessionParams = {
      ...this.props.session,
      ...params
    };

    this.creating = true;
    this.setState({ creating: true }, () => {
      this.props
        .createNewSession(newSessionParams)
        .then(() => {
          this.unmounting = true;
          this.props.navigation.dispatch({ type: "CustomerMatchingView" });
        })
        .catch(e => {
          Alert.alert(I18n.t("error"), translateApiError(e), [{ text: I18n.t("actions.ok") }]);
        })
        .finally(() => {
          this.creating = false;
          if (!this.unmoumting) {
            this.setState({ creating: false });
          }
        });
    });
  }

  cancel() {
    this.props.navigation.dispatch({ type: "Home" });
  }

  render() {
    const { rollover } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.textRow}>
            <Text style={styles.text}>{this.retryReasonText()}</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.text}>{I18n.t("session.retry.tryAgain")}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {rollover.exists && (
            <TextButton
              text={I18n.t("session.retry.tryLang", { lang: rollover.name })}
              style={styles.orangeButton}
              textStyle={sharedStyles.prominentButtonText}
              disabled={this.state.creating}
              onPress={() => {
                this.retryRollover();
              }}
            />
          )}
          <TextButton
            text={I18n.t("session.retry.retry")}
            style={styles.orangeButton}
            textStyle={sharedStyles.prominentButtonText}
            disabled={this.state.creating}
            onPress={() => {
              this.retry();
            }}
          />
          <TextButton
            text={I18n.t("session.retry.cancel")}
            style={styles.blueButton}
            textStyle={sharedStyles.prominentButtonText}
            disabled={this.state.creating}
            onPress={() => {
              this.cancel();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    backgroundColor: colors.backgroundBlue
  },
  textContainer: {
    marginTop: "33%",
    width: "100%",
    alignItems: "center",
    paddingLeft: moderateScale(30, 0),
    paddingRight: moderateScale(30, 0)
  },
  textRow: {
    width: "100%",
    height: "33%",
    zIndex: 10000,
    marginBottom: moderateScale(20, 0)
  },
  text: {
    fontSize: moderateFontSize(20),
    textAlign: "center",
    color: colors.white
  },
  buttonContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: moderateScale(30, 0)
  },
  orangeButton: {
    ...sharedStyles.prominentButtonBase,
    ...sharedStyles.prominentButtonOrange
  },
  blueButton: {
    ...sharedStyles.prominentButtonBase,
    ...sharedStyles.prominentButtonBlue
  }
});

const mS = state => {
  return {
    session: state.currentSessionReducer.session
  };
};

const mD = {
  createNewSession
};

export default connect(
  mS,
  mD
)(CustomerRetryView);