import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  noVideoContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
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
  },
  backgroundContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 0,
    top: 0,
    left: 0,
    alignSelf: "stretch"
  }
});
