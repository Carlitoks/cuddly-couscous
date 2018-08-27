import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../../Themes";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  backgroundImage: {
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#000"
  },
  backgroundView: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#000"
  },
  topContainer: {
    position: "absolute",
    top: "33%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  centerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonContainerLeft: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "7%"
  },
  buttonContainerRight: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: "7%"
  },
  buttonColumn: {
    flex: 1
  },
  bottomContainer: {
    flex: 1,
    marginTop: 30,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "auto"
  },
  controlsContainer: {
    backgroundColor: Colors.transparent,
    flex: 1
  },
  inlineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  spinner: {
    alignSelf: "center",
    position: "absolute",
    top: "33%"
  },
  connectingMessageContainer: {
    alignSelf: "center",
    position: "absolute",
    justifyContent: "center",
    top: "35%",
    height: 156,
    width: 280,
    backgroundColor: Colors.transparent
  },
  connectingMessage: {
    fontFamily: Fonts.primaryFont,
    fontSize: 22,
    lineHeight: 32,
    color: Colors.fontColor,
    textAlign: "center",
    backgroundColor: Colors.transparent
  },
  notificationText: {
    fontSize: 20,
    paddingTop: 5,
    fontFamily: Fonts.primaryFont,
    color: Colors.fontColor,
    textAlign: "left",
    width: width
  },
  locationText: {
    fontSize: 15,
    paddingTop: 5,
    fontFamily: Fonts.primaryFont,
    color: Colors.fontColor,
    backgroundColor: Colors.transparent
  },
  incomingCallText: {
    fontSize: 20,
    marginLeft: 10,
    paddingTop: 5,
    fontFamily: Fonts.primaryFont,
    color: Colors.fontColor,
    textAlign: "center",
    backgroundColor: Colors.transparent,
    width: width
  },
  icon: {
    color: "white",
    paddingTop: 7,
    backgroundColor: Colors.transparent,
    paddingRight: 9
  },
  smallAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  contentContainerStyle: {
    backgroundColor: Colors.gradientColor.top,
    height: "100%"
  },
  containerButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingBottom: 20
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  }
});