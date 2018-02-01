import { StyleSheet } from "react-native";
import { Fonts, Colors, Metrics } from "../../../Themes";
const fontFamily = "Arial";
const fontColor = "white";
export default StyleSheet.create({
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
  topContainer: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingTop: 10,
    transform: [{ translate: [0, 0, 1] }]
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
    backgroundColor:"transparent"
  },
  icon: {
    color: "white",
    paddingTop: 7,
    paddingRight: 9,
    backgroundColor:"transparent"
  },
  text: {
    color: "#ff0000",
    backgroundColor:"transparent"
  },
  smallAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  inlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  callerNameText: {
    fontSize: 30,
    marginLeft: 10,
    paddingTop: 10,
    fontFamily: fontFamily,
    color: fontColor,
    textAlign: "center",
    width: "100%",
    backgroundColor:"transparent"
  },
  locationText: {
    fontSize: 15,
    paddingTop: 5,
    fontFamily: fontFamily,
    color: fontColor,
    backgroundColor:"transparent"
  },
  incomingCallText: {
    fontSize: 20,
    marginLeft: 10,
    paddingTop: 5,
    fontFamily: fontFamily,
    color: fontColor,
    textAlign: "center",
    width: "100%",
    backgroundColor:"transparent"
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
    height: 200,
    width: 150,
    backgroundColor: "black",
    bottom: 120,
    right: 10,
    position: "absolute",
    transform: [{ translate: [0, 0, 1] }]
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
  }
});
