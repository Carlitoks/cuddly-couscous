import { StyleSheet } from "react-native";
import { Metrics, Fonts } from "../../../../../Themes";
import { moderateScale } from "../../../../../Util/Scaling";
import metrics from "../../../../../Themes/Metrics";

export default StyleSheet.create({
  CVVContainer: { flexDirection: "column" },
  CVVText: { color: "rgba(0, 0, 0, 0.541327)", fontFamily: Fonts.BaseFont, fontSize: 12 },
  CVVInputContainer: { flexDirection: "row" },
  CVVInput: {
    color: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(0, 0, 0, 0.42)",
    width: metrics.width * 0.35,
    padding: 1
  },
  CVVInputActive: {
    color: "#000",
    borderBottomWidth: 2,
    borderBottomColor: "#3F1674",
    width: metrics.width * 0.35,
    padding: 1
  },
  CVVIconContainer: { position: "absolute", right: 0, top: 5 },
  tooltipContainerStyle: {
    position: "absolute",
    right: 0,
    top: 50,
    width: moderateScale(278, 0),
    height: moderateScale(70, 0),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
    //backgroundColor: "red"
  },
  tooltipText: { fontSize: moderateScale(10, 0) },
  CVVIcon: { width: 25, height: 25 },
  CVVInvalidText: {
    fontFamily: Fonts.BaseFont,
    fontSize: 15,
    color: "rgba(231, 0, 0, 0.87)",
    marginTop: 3
  }
});
