import Sound from "react-native-sound";

//Sound.setActive(true);
///Sound.enableInSilenceMode(true);
//Sound.setCategory("Playback", true);

export default (SoundManager = {
  EndCall: new Sound("elastic_done3.wav", Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log("error loading sound", error);
      return;
    }
    //EndCall.play(() => {});
  }),
  IncomingCall: new Sound(
    "incoming_call_notification.mp3",
    Sound.MAIN_BUNDLE,
    error => {
      if (error) {
        console.log("error loading sound", error);
        return;
      }
      //IncomingCall.play();
    }
  ),
  ExtraTime: new Sound("elastic_done5.wav", Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log("error loading sound", error);
      return;
    }
  }),
  Disconnected: new Sound("Elastic_Error1.wav", Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log("error loading sound", error);
      return;
    }
  }),
  Reconnected: new Sound("Elastic_Done11.wav", Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log("error loading sound", error);
      return;
    }
  })
});
