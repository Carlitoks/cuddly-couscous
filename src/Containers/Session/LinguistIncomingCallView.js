import React, {Component} from "react";
import {View, Text, Image, StyleSheet, Alert} from "react-native";
import { connect } from "react-redux";
import I18n, { translateApiError } from "../../I18n/I18n";
import moment from "moment";

import TextButton from "../../Components/Widgets/TextButton";
import LinearGradient from "react-native-linear-gradient";
import colors from "../../Themes/Colors";

import {acceptSessionInvite, declineSessionInvite} from "../../Ducks/CurrentSessionReducer";
import api from "../../Config/AxiosConfig";
import { SESSION, DURATION } from "../../Util/Constants";
import images from "../../Themes/Images";


export class LinguistIncomingCallView extends Component {

  constructor(props) {
    super(props);
    
    this.abortTimers = false;
    this.pollFailures = 0;
    this.pollIntervalID = null;
    this.countdownIntervalID = null;
    // taking 5 seconds off to encourage pickup before call actually times out on customer side.    
    this.callTimeoutAt = moment(props.session.createdAt).add((SESSION.TIME.MATCH/DURATION.SECONDS) - 5, "s");
    
    this.state = {
      linguists: null,
      seconds: this.getSecondsRemaining(),
      responding: false,
    };

    // double tap prevention
    this.resopnding = false;
  }

  componentDidMount () {
    this.pollIntervalID = setInterval(() => { this.handlePollInterval() }, 2000);
    this.countdownIntervalID = setInterval(() => { this.handleCountdownInterval() }, 250);
  }

  componentWillUnmount () {
    this.cleanup();
  }

  cleanup () {
    this.abortTimers = true;
    clearInterval(this.pollIntervalID);
    clearInterval(this.countdownIntervalID);
  }

  getSecondsRemaining () {
    const now = new Date();
    const nowSeconds = now.getTime() / 1000;
    const timeoutSeconds = this.callTimeoutAt.unix() - nowSeconds;
    const s = parseInt(timeoutSeconds, 10);
    return s >= 0 ? s : 0;
  }

  handleAccept () {
    if (this.state.responding) {
      return;
    }

    // TODO: permission checks

    this.setState({responding: true}, () => {
      this.cleanup();
  
      this.props.acceptSessionInvite()
      .then(() => {
        this.props.navigation.dispatch({type: "SessionView"});
      })
      .catch((e) => {
        Alert.alert(I18n.t("notification"), translateApiError(e, "api.errUnexpected"));
        this.props.navigation.dispatch({type: "Home"});
      })
      .finally(() => {
        this.setState({responding: false});
      });
    });
  }

  handleDecline () {
    if (this.state.responding) {
      return;
    }

    this.setState({responding: true}, () => {
      this.cleanup();
  
      this.props.declineSessionInvite()
      .finally(() => {
        this.setState({responding: false});
        this.props.navigation.dispatch({type: "Home"});
      });  
    })
  }

  handlePollInterval () {
    if (!this || this.abortTimers || this.state.responding) {
      return;
    }

    api.get(`/sessions/${this.props.sessionID}/linguist`)
    .then((res) => {
      this.pollFailures = 0;
      this.setState({linguists: res.data.queue.sent});
      switch (res.data.status) {
        case "assigned": {
          this.handleUnavailable("assigned");
          break;
        }
        case "cancelled": {
          this.handleUnavailable("cancel");
          break;
        }
      }
    })
    .catch((e) => {
      this.pollFailures++;
      if (this.pollFailures >= 3) {
        this.handleUnavailable("lostConnection");
      }
    });
  }

  handleUnavailable (reason) {
    let title = I18n.t("notification");
    let body = "Call no longer available";
    switch (reason) {
      case "assigned": {
        body = I18n.t("api.errSessionAssigned");
        break;
      }
      case "cancelled": {
        body = I18n.t("api.errSessionUnavailable");
        break;
      }
      case "lostConnection": {
        title = I18n.t("error");
        body = "Lost connection to the server." // I18n.t("err.lostConnection")
      }
    }
    this.cleanup();
    Alert.alert(title, body);
    this.props.navigation.dispatch({type: "Home"});
  }

  handleCountdownInterval () {
    if (!this || this.abortTimers) {
      return;
    }
    this.setState({
      seconds: this.getSecondsRemaining()
    });
  }

  render () {
    const {session, remoteUser} = this.props;
    const {seconds, linguists} = this.state;
    return (
      <View style = {styles.container}>
        <LinearGradient
          style={styles.backgroundGradient}
          colors={[
            colors.gradientColor.top,
            colors.gradientColor.bottom
          ]}
        />

        <View style={styles.contentContainer}>

          <View style={styles.userContainer}>
            <Image style={styles.avatarImage} source={!!remoteUser.avatarURL ? remoteUser.avatarURL : images.avatar} />
            <Text style={styles.text}>{remoteUser.firstName}</Text>
            <Text style={styles.text}>Incoming Call...</Text>
          </View>

          <View style={styles.infoContainer}>
          </View>

          <View style={styles.buttonContainer}>
            <View style = {styles.buttonRow}>
              <TextButton
                text = "Decline"
                style = {styles.declineButton}
                textStyle = {{color: "#ffffff"}}
                onPress = {() => { this.handleDecline() }}
              />
              <TextButton
                text = "Accept"
                style = {styles.acceptButton}
                textStyle = {{color: "#ffffff"}}
                onPress = {() => { this.handleAccept() }}
              />
            </View>
          </View>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  backgroundGradient: {
    ...StyleSheet.absoluteFill
  },
  contentContainer: {
    ...StyleSheet.absoluteFill,
  },
  text: {
    color: "#ffffff",
    fontSize: 20,
    marginBottom: 10
  },
  userContainer: {
    marginTop: "25%",
    marginBottom: 50,
    alignItems: "center"
  },
  infoContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  avatarImage: {
    height: 100,
    width: 100,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonRow: {
    flexDirection: 'row'
  },
  acceptButton: {
    flex: 1,
    height: 50,
    backgroundColor: "#44aa44"
  },
  declineButton: {
    flex: 1,
    height: 50,
    backgroundColor: "#aa4444"
  }
});

const mS = (state) => {
  return {
    ...state.currentSessionReducer
  }
};

const mD = {
  acceptSessionInvite,
  declineSessionInvite
};

export default connect(mS, mD)(LinguistIncomingCallView)