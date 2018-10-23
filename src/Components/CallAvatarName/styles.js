import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale } from "./../../Util/Scaling";

export default StyleSheet.create({
  avatarNameContainer: {
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.semiTransparent,
    paddingTop: 0
    // transform: [{ translate: [0, 0, 1] }]
  },
  smallAvatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginLeft: "12%"
  },
  avatarContainer: {
    marginTop: moderateScale(12),
    backgroundColor: Colors.transparent,
    width: 75
  },
  callerNameText: {
    alignSelf: "center",
    fontSize: 23,
    fontFamily: Fonts.BaseFont,
    color: Colors.white,
    flex: 1,
    backgroundColor: Colors.transparent
  }
});
