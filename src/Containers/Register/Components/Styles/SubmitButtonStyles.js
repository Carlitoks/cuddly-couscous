import { StyleSheet } from "react-native";
import { Fonts } from "../../../../Themes";
import { moderateScaleViewports } from "../../../../Util/Scaling";

export default StyleSheet.create({
  createAccountButton: {
    flex: 1,
    backgroundColor: "#F39100",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: moderateScaleViewports(4),
    borderBottomRightRadius: moderateScaleViewports(4),
  },
  createAccountButtonDisable: {
    flex: 1,
    backgroundColor: "#979797",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: moderateScaleViewports(4),
    borderBottomRightRadius: moderateScaleViewports(4),
  },
  createAccountButtonDisableLogin: {
    flex: 1,
    backgroundColor: "#3F1674",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: moderateScaleViewports(4),
    borderBottomRightRadius: moderateScaleViewports(4),
  },
  buttonEnabledText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScaleViewports(17),
    paddingTop: moderateScaleViewports(10),
    paddingBottom: moderateScaleViewports(10),
  },
});
