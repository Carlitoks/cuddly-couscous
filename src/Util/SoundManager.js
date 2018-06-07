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
    console.log("Encall");
    //EndCall.play(() => {});
  }),
  IncomingCall: new Sound(
    "incoming-call-notification.mp3",
    Sound.MAIN_BUNDLE,
    error => {
      if (error) {
        console.log("error loading sound", error);
        return;
      }
      console.log("Incomingcall");
      //IncomingCall.play();
    }
  ),
  ExtraTime: new Sound("elastic_done5.wav", Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log("error loading sound", error);
      return;
    }
  })
});
