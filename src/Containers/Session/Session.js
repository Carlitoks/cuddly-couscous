import {Component} from 'react';
import {View} from 'react-native';

newSubscriberState = (connectionId) => {
  return {
    platform: null,           // mobile|web|sip
    legacyVersion: false,
    subscribedToMyStream: false,    // are they successfully subscribed to me?
    user: {
      firstName: "",
      lastInitial: "",
    },
    connection: {
      id: connectionId,
    },
    stream: {
      id: null,
      subscribed: false,
    },
    controls: {
      micEnabled: null,
      videoEnabled: null,
      speakerEnabled: null,
      cameraFlipEnabled: null,
    },
    app: {
      state: '', // background|foreground
    },
    heartbeat: {
      active: false,
      interval: null,
      lastReceived: null,
    }
  }
}

class Session extends Component {

  // setup initial state, received props include:
  // * isLinguist|isCustomer - role of the user in question
  // * endedViaPushNotification - if session was ended via push notification
  // * user
  // * session creation params
  // * session cnx info
  constructor(props) {
    super(props);

    // anything referenced in the template and/or passed to child
    // components as props needs to be defined in `state`
    this.state = {

      // state of session display
      display: {
        controlsVisible: true,
      },

      // user's call control state
      controls: {
        cameraFlipEnabled: false,
        micEnabled: true,
        videoEnabled: props.session.avModePreference,
        speakerEnabled: true, // todo, harder than it seems...
      },

      // state of other participants, see `newSubscriberState`, this is a map indexed by their
      // tokbox connection ID
      remoteParticipants: {},

      // state of user's connection/stream to tokbox
      connection: {
        connectionID: null, // tokbox connection ID
        initiallyConnected: false,
        currentlyConnected: false,
        reconnecting: false,
        connecting: true
      },

      // state of user's stream to tokbox
      stream: {
        id: null,
        created: false,
        published: false
      },

      // higher level Solo session state - like did we "connect" to the other person successfully at any point?
      session: {
        initiallyConnectedToParticipant: false,
      },

      // signal to send to other participants
      signal: {},

    };

    // event handlers for tokbox API
    this.otSessionHandlers = {
      signal: (e) => {

      },
    };

    this.otPublisherHandlers = {};
    this.otSubscriberHandlers = {};

    this.endingCall = false; // NOTE: probably need this in `state` as well - it's here to prevent double taps
    this.callTimer = null;
    this.initialConnectingTimer = null;

    // status of call from server
    this.status = {
      interval: null,
      polling: false,
    };

  }

  // hide/show call controls
  toggleDisplayControls () {
    this.setState({display: {controlsVisible: !this.state.display.controlsVisible}});
  }

  // to not break old apps
  sendLegacySignal() {}
  sendSignal (type, data) {
    this.setState({signal: {type, data}});
  }

  toggleVideo () {
    const enabled = !this.state.controls.videoEnabled;
    this.setState({controls:{
      ...this.state.controls,
      videoEnabled: enabled
    }});
    this.sendSignal('videoStatus', {enabled});
  }

  toggleMic () {
    const enabled = !this.state.controls.micEnabled;
    this.setState({controls:{
      ...this.state.controls,
      micEnabled: enabled
    }});
    this.sendSignal('micStatus', {enabled});
  }

  toggleSpeaker () {
    const enabled = !this.state.controls.speakerEnabled;
    this.setState({controls:{
      ...this.state.controls,
      speakerEnabled: enabled
    }});
    this.sendSignal('speakerStatus', {enabled});
  }

  toggleCameraFlip () {
    const enabled = !this.state.controls.cameraFlipEnabled;
    this.setState({controls:{
      ...this.state.controls,
      cameraFlipEnabled: enabled
    }});
    this.sendSignal('cameraFlipStatus', {enabled});
  }

  poorConnectionAlertVisible () { return false; }
  poorConnectionAlertMessage () { return ""; }
  shouldRenderSession() { return true; }
  shouldShowReconnectionState () { return false; }
  handleConnectingTimeout () {}

  // call ended by user
  triggerEndCall () {
    this.setState({endCallLoading: true})
  }

  // call ended by other side
  handleCallEnded () {

  }

  render () {
    return (
      <TouchableWithoutFeedback onPress={ this.toggleDisplayControls() }>
        <KeepAwake />

        { this.props.isLinguist && !this.state.initiallyConnected && (
          <LinguistConnecting onTimeout={ this.handleConnectingTimeout() } />
        )}
        { this.props.isCustomer && !this.state.initiallyConnected && (
          <CustomerConnecting />
        )}

        { this.shouldShowReconnectionState() && (
          <ReconnectionState user={this.props.user} participant={ this.getDisconnectedParticipant() } />
        )}

        { this.shouldRenderSession() && (
          <Session session={ this.props.session }>
            {/* Publisher renders audio mode screen */}
            <Publisher publisher={ this.publisher }></Publisher>
            <Subscriber></Subscriber>
          </Session>
        )}

        { this.poorConnectionAlertVisible() && (
          <PoorConnectionWarning message={ this.poorConnectionAlertMessage () } />
        )}

        <SessionControls
          cameraFlipEnabled={ this.state.controls.cameraFlipEnabled }
          onCameraFlipPressed= { this.toggleCameraFlip() }
          speakerEnabled = { this.state.controls.speakerEnabled}
          onSpeakerPressed = { this.toggleSpeaker() }
          micEnabled = { this.state.controls.micEnabled }
          onMicPressed =  { this.toggleMic() }
          videoEnabled = { this.state.controls.videoEnabled }
          onVideoPressed = { this.toggleVideo() }
          endingCall = { this.state.endingCall }
          onEndCallPressed = { this.triggerEndCall() }
        />

      </TouchableWithoutFeedback>
    );
  }
}
