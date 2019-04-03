import { StyleSheet } from "react-native";
import { moderateScaleViewports } from "../../../../../Util/Scaling";
import { Fonts } from "../../../../../Themes";

export default StyleSheet.create({
  minutesLeftContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#522092",
    borderRadius: 4
  },
  addCardContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#522092", borderRadius: 4},
  addCardText: {fontFamily: Fonts.BaseFont, fontSize: moderateScaleViewports(12), color: "#FFFFFF", paddingRight: 10, paddingLeft: 10, paddingTop: 4, paddingBottom: 4, textDecorationLine: "underline" },
  minutesLeftInfoContainer: {flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#843DDC", borderRadius: 4},
  minutesLeftInfoText: {fontFamily: Fonts.BaseFont, fontSize: moderateScaleViewports(14), color: "#FFFFFF", paddingLeft: 4, paddingRight: 8, paddingTop: 4, paddingBottom: 4 },
  clockIcon: {paddingLeft: 9},
});
