import Sound from "react-native-sound";
import {SOUNDS} from "./Constants";

//Sound.setActive(true);
//Sound.enableInSilenceMode(true);
//Sound.setCategory("Playback", true);

export default (SoundManager = {
  EndCall: new Sound(SOUNDS.END_CALL, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log("error loading sound", error);
      return;
    }
    // EndCall.play(() => {});
  }),
  IncomingCall: new Sound(SOUNDS.INCOMING_CALL, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log("error loading sound", error);
      return;
    }
  }),
  ExtraTime: new Sound(SOUNDS.EXTRA_TIME, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log("error loading sound", error);
      return;
    }
  }),
  Disconnected: new Sound(SOUNDS.DISCONNECTED, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log("error loading sound", error);
      return;
    }
  }),
  Reconnected: new Sound(SOUNDS.RECONNECTED, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log("error loading sound", error);
      return;
    }
  })
});
