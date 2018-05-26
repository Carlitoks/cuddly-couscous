import { StyleSheet } from "react-native";
import { Fonts, Colors, Metrics } from "../../../Themes";
const fontFamily = "Arial";
const fontColor = "white";
export default StyleSheet.create({
  containerCallHiden: {
    width: "0%",
    height: "0%"
  },
  containerCall: {
    width: "100%",
    height: "100%"
  },
  publisherVideo: {
    height: 100,
    width: "100%",
    backgroundColor: "black"
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "space-between",
    alignItems: "center"
  },
  containerT: {
    flex: 1,
    position: "relative",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  containerControls: {
    flex: 1,
    flexDirection: "column",
    position: "absolute",
    bottom: 0,
    width: "100%"
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  icon: {
    color: "white",
    paddingTop: 7,
    paddingRight: 9
  },
  text: {
    color: "#ff0000"
  },
  locationText: {
    fontSize: 15,
    paddingTop: 5,
    fontFamily: fontFamily,
    color: fontColor
  },
  incomingCallText: {
    fontSize: 20,
    marginLeft: 10,
    paddingTop: 5,
    fontFamily: fontFamily,
    color: fontColor,
    textAlign: "center",
    width: "100%"
  },
  background: {
    width: "100%",
    height: "100%",
    zIndex: 0,
    alignSelf: "stretch"
  },
  backgroundContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 0,
    top: 0,
    left: 0,
    alignSelf: "stretch"
  },
  publisher: {
    height: "100%",
    width: "100%"
  },
  publisherBox: {
    height: 154,
    width: 86,
    backgroundColor: "black",
    top: "5.5%",
    right: 20,
    position: "absolute",
    transform: [{ translate: [0, 0, 1] }]
  },
  hidePublisherBox: {
    display: "none"
  },
  containerSwitch: {
    bottom: 120,
    flexDirection: "row",
    left: 10,
    position: "absolute",
    zIndex: 1
  },
  extraTime: {
    fontFamily: fontFamily,
    color: fontColor,
    fontSize: 18,
    backgroundColor: Colors.transparent
  },
  containerButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingBottom: 20
  },
  button: {
    zIndex: 1
  },
  containerHiddenCall: {
    flex: 0,
    position: "relative",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  containerTHidden: {
    width: "100%",
    height: "100%",
    flex: 1,
    position: "relative",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  containerContacting: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    zIndex: 9999
  },
  noVideoContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    zIndex: 9999,
    flex: 1,
    backgroundColor: Colors.gradientColor.top
  },
  noVideoName: {
    fontFamily: Fonts.BaseFont,
    fontSize: 30,
    position: "absolute",
    top: "21%",
    color: Colors.white,
    textAlign: "center",

    backgroundColor: Colors.transparent,
    width: "100%"
  },
  noVideoAvatarContainer: {
    position: "absolute",
    top: "31%",
    alignSelf: "center",

    width: 200,
    height: 200,

    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: Colors.white,

    backgroundColor: Colors.transparent,

    paddingHorizontal: 25,
    paddingVertical: 25
  },
  noVideoAvatar: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 8,
    borderColor: "gray"
  }
});
