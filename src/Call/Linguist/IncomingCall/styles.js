import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../../Themes";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "black"
  },
  backgroundImage: {
    resizeMode: "cover",
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    opacity: 0.6
  },
  topContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  centerContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "15%"
  },
  bottomContainer: {
    backgroundColor: Colors.transparent,
    flex: 0.5,
    marginTop: 30,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "auto"
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
    fontFamily: Fonts.primaryFont,
    color: Colors.fontColor,
    textAlign: "center",
    width: width,
    backgroundColor: Colors.transparent
  },
  notificationText: {
    fontSize: 20,
    paddingTop: 5,
    fontFamily: Fonts.primaryFont,
    color: Colors.fontColor,
    textAlign: "left",
    width: width,
    backgroundColor: Colors.transparent
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
    width: width,
    backgroundColor: Colors.transparent
  },
  icon: {
    color: "white",
    paddingTop: 7,
    paddingRight: 9,
    backgroundColor: Colors.transparent
  },
  smallAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  contentContainerStyle: {
    height: "100%"
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  }
});
