import React, {Component} from "react";
import {View, Text, Image, StyleSheet, Alert} from "react-native";
import { connect } from "react-redux";
import I18n, { translateApiError, translateLanguage, translateProperty } from "../../I18n/I18n";
import moment from "moment";
import Permissions from "react-native-permissions";
import KeepAwake from "react-native-keep-awake";

import LinearGradient from "react-native-linear-gradient";
import colors from "../../Themes/Colors";

import {viewSessionInvite, acceptSessionInvite, declineSessionInvite} from "../../Ducks/CurrentSessionReducer";
import api from "../../Config/AxiosConfig";
import { SESSION, DURATION, SOUNDS} from "../../Util/Constants";
import images from "../../Themes/Images";
import Ionicon from "react-native-vector-icons/Ionicons";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import Sound from "react-native-sound";

import { moderateScale, moderateFontSize } from "../../Util/Scaling";

const IconButton = ({backgroundColor, iconRotation, onPress, pressed}) => {
  // TODO: styles while pressed
  return (
      <Ionicon.Button
        name = {'md-call'}
        borderRadius={100}
        containerViewStyle={{
          borderRadius: 100,
          textAlign: "center",
        }}
        backgroundColor={ backgroundColor }
        onPress ={() => { onPress() }}
        style={{
          height: 60,
          width: 60,
          justifyContent: "center",
          borderRadius: 100
        }}
        iconStyle={{
          marginRight: 0,
          transform: [{rotate: iconRotation}]
        }}
        size={40}
        color={'white'}
      />
  );
}

export class LinguistIncomingCallView extends Component {

  constructor(props) {
    super(props);
    const {session} = props;
    
    this.abortTimers = false;
    this.pollFailures = 0;
    this.pollIntervalID = null;
    this.countdownIntervalID = null;
    // taking 5 seconds off to encourage pickup before call actually times out on customer side.    
    this.callTimeoutAt = moment(session.createdAt).add((SESSION.TIME.MATCH/DURATION.SECONDS) - 5, "s");
    
    this.state = {
      linguists: null,
      seconds: this.getSecondsRemaining(),
      responding: false,
      primaryLangName: translateLanguage(session.primaryLangCode),
      secondaryLangName: translateLanguage(session.secondaryLangCode),
      scenarioText: (!!session.scenario && !!session.scenario.id) ? translateProperty(session.scenario, 'title') : false,
      customScenarioText: (!!session.customScenarioNote) ? session.customScenarioNote : false,
    };

    this.incomingCallSound = new Sound(SOUNDS.INCOMING_CALL, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log("error loading sound", error);
        return;
      }
    });

    // double tap prevention
    this.resopnding = false;
    this.unmounting = false;
  }

  componentDidMount () {
    this.pollIntervalID = setInterval(() => { this.handlePollInterval() }, 2000);
    this.countdownIntervalID = setInterval(() => { this.handleCountdownInterval() }, 250);

    // TODO: forensic event
    this.props.viewSessionInvite().catch((e) => {
      console.log("failed to mark invite as viewed");
      console.log(e);
    }).then(() => {
      console.log("UPDATED INVITE AS VIEWED");
    });

    // start sound - with a delay to give it time to finish loading (?)
    setTimeout(() => {
      Sound.setCategory("Playback", false);
      Sound.setMode('Default');
      Sound.setActive(true);
      this.incomingCallSound.setNumberOfLoops(-1);
      this.incomingCallSound.play();

      // and set another timeout to ensure it doesn't play forever
      let killAfter = this.state.seconds * DURATION.SECONDS;
      if (killAfter <= 0) {
        killAfter = 30 * DURATION.SECONDS;
      }
      setTimeout(() => {
        this.incomingCallSound.stop();
        this.incomingCallSound.release();
        }, killAfter);
  
    }, 1 * DURATION.SECONDS);
  }

  componentWillUnmount () {
    this.cleanup();
  }

  cleanup () {
    this.abortTimers = true;
    this.unmounting = true;
    clearInterval(this.pollIntervalID);
    clearInterval(this.countdownIntervalID);

    // stop the sound
    if (!!this.incomingCallSound) {
      this.incomingCallSound.stop();
      this.incomingCallSound.release();
      Sound.setActive(false);  
    }
  }

  getSecondsRemaining () {
    const now = new Date();
    const nowSeconds = now.getTime() / 1000;
    const timeoutSeconds = this.callTimeoutAt.unix() - nowSeconds;
    const s = parseInt(timeoutSeconds, 10);
    return s >= 0 ? s : 0;
  }

  handleAccept () {
    if (this.responding || this.unmounting) {
      return;
    }

    // FIRST, ensure proper permissions, otherwise app will probably crash
    this.responding = true;    
    this.setState({responding: true}, () => {
      let allowed = false
      Permissions.checkMultiple(["camera", "microphone"]).then((response) => {
        if (
          response.camera == 'authorized'
          && response.microphone == 'authorized'
        ) {
          allowed = true;
        }
      })
      .finally(() => {

        // alert and return early if both camera and mic permissions are not set
        if (!allowed) {
          this.cleanup();
          Alert.alert(I18n.t("error"), I18n.t('permissions'), [
            {text: I18n.t('ok'), onPress: () => { this.props.navigation.dispatch({type: "Home"}) }}
          ]);
          return;
        }

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
          this.responding = false;
          this.setState({responding: false});
        });  
      });
    });
  }

  handleDecline () {
    if (this.responding || this.unmounting) {
      return;
    }

    this.responding = true;
    this.setState({responding: true}, () => {
      this.cleanup();
  
      this.props.declineSessionInvite()
      .finally(() => {
        this.responding = false;
        this.setState({responding: false});
        this.props.navigation.dispatch({type: "Home"});
      });  
    })
  }

  handlePollInterval () {
    if (this.abortTimers || this.state.responding) {
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
          this.handleUnavailable("cancelled");
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
        body = I18n.t("session.callCancel");
        break;
      }
      case "lostConnection": {
        title = I18n.t("error");
        body = "Lost connection to the server." // I18n.t("err.lostConnection")
      }
      case "localTimeout": {
        body = "Call no longer available.";
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

    // check for timeout
    if (this.state.seconds <= 0) {
      this.handleUnavailable('localTimeout');
    }
  }

  render () {
    const {session, remoteUser, invite} = this.props;
    const {seconds, linguists, primaryLangName, secondaryLangName, scenarioText, customScenarioText} = this.state;
    return (
      <View style = {styles.container}>
        <KeepAwake />
        <LinearGradient
          style={styles.backgroundGradient}
          colors={[
            colors.gradientColor.top,
            colors.gradientColor.bottom
          ]}
        />
        <View style={styles.contentContainer}>

          <View style={styles.userContainer}>
            <Image style={styles.avatarImage} source={!!remoteUser.avatarURL ? {uri: remoteUser.avatarURL} : images.avatar} />
            <Text style={styles.userNameText}>{remoteUser.firstName}</Text>
            <Text style={styles.incomingCallText}>{I18n.t('incomingCall')}</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoRowContainer}>
              <MDIcon name={"forum"} size={25} style={styles.infoRowIcon} />
              <Text style={styles.infoRowText}>{primaryLangName} - {secondaryLangName}</Text>
            </View>
            {!!scenarioText && (
            <View style={styles.infoRowContainer}>
              <MDIcon name={"help"} size={25} style={styles.infoRowIcon} />
              <Text style={styles.infoRowText}>{scenarioText}</Text>
            </View>
            )}
            {!!customScenarioText && (
            <View style={styles.infoRowContainer}>
              <MDIcon name={"textsms"} size={25} style={styles.infoRowIcon} />
              <Text style={styles.infoRowText}>{customScenarioText}</Text>
            </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <View style = {styles.buttonRow}>
              <IconButton
                backgroundColor={'red'}
                iconRotation={'135deg'}
                onPress={() => { this.handleDecline() }}
                pressed={this.state.responding}
              />
              <IconButton
                backgroundColor={'green'}
                iconRotation={'0deg'}
                onPress={() => { this.handleAccept() }}
                pressed={this.state.responding}
              />
            </View>
          </View>
        </View>
      </View>
    );
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
  userNameText: {
    color: "#ffffff",
    fontSize: moderateFontSize(30),
    marginBottom: 5
  },
  incomingCallText: {
    color: "#ffffff",
    fontSize: moderateFontSize(20),
  },
  userContainer: {
    marginTop: "15%",
    alignItems: "center"
  },
  infoContainer: {
    marginTop: moderateScale(40, 0)
  },
  infoRowContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: moderateScale(60, 0),
    paddingRight: moderateScale(30, 0)
  },
  infoRowIcon: {
    color: "#fff",
    marginRight: moderateScale(15, 0)
  },
  infoRowText: {
    color: "#fff",
    fontSize: moderateFontSize(15)
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
    paddingBottom: moderateScale(50, 0)
  },
  buttonRow: {
    paddingLeft: moderateScale(50, 0),
    paddingRight: moderateScale(50, 0),
    flexDirection: 'row',
    justifyContent: "space-between"
  }
});

const mS = (state) => {
  return {
    ...state.currentSessionReducer
  }
};

const mD = {
  viewSessionInvite,
  acceptSessionInvite,
  declineSessionInvite
};

export default connect(mS, mD)(LinguistIncomingCallView)