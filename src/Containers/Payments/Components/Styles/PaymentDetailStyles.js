import { StyleSheet } from "react-native";
import { Metrics, Colors, Fonts } from "../../../../Themes";
import { moderateScale, moderateScaleViewports } from "../../../../Util/Scaling";

export default StyleSheet.create({
  cardIcon: { width: 42, height: 42, marginRight: 20 },
  flexEndCenter: { marginTop: 31 },
  itemContainer: {
    //borderWidth: 1,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: moderateScaleViewports(339),
    height: moderateScale(64, 0),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  itemText: { marginLeft: 20, fontSize: moderateScale(15, 0), color: "rgba(0, 0, 0, 0.541327)" },
  imagePosition: { marginTop: Metrics.height * 0.25 },
  noCardText: {
    fontFamily: Fonts.BaseFont,
    color: Colors.gradientColor.top,
    fontSize: 16,
    marginTop: 30,
    textAlign: "center"
  },
  addCardBottomInputs: { flexDirection: "row", marginTop: 41, justifyContent: "space-between" }
});
