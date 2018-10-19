import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale } from "./../../Util/Scaling";

export default StyleSheet.create({
  avatarNameContainer: {
    marginTop: "10%",
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.semiTransparent,
    paddingTop: 0,
    width: "45%",
    maxWidth: "50%"
    // transform: [{ translate: [0, 0, 1] }]
  },
  smallAvatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    marginLeft: "8%"
  },
  avatarContainer: {
    marginTop: moderateScale(30),
    //marginBottom: moderateScale(5),
    backgroundColor: Colors.transparent
  },
  callerNameText: {
    alignSelf: "center",
    fontSize: 23,
    paddingTop: 10,
    fontFamily: Fonts.BaseFont,
    color: Colors.white,
    flex: 1,
    backgroundColor: Colors.transparent
  }
});
