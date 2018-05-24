import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  avatarNameContainer: {
    marginTop: "10%",
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: Colors.transparent,
    paddingTop: 0
    // transform: [{ translate: [0, 0, 1] }]
  },
  smallAvatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5
  },
  avatarContainer: {
    marginLeft: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  callerNameText: {
    fontSize: 24,
    marginLeft: 10,
    paddingTop: 10,
    fontFamily: Fonts.BaseFont,
    color: Colors.white,
    backgroundColor: Colors.transparent,
    width: "100%"
  }
});
