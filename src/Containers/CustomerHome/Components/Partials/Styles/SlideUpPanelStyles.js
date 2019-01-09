import { StyleSheet } from "react-native";
import { moderateScale, scaledFontSize } from "../../../../../Util/Scaling";
import { Fonts, Metrics } from "../../../../../Themes";

export default StyleSheet.create({
  unAvailableLangContainer: {
    height: 48,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "rgba(185,185,185,0.14)"
  },
  availableLangContainer: {
    height: 48,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "rgba(185,185,185,0.14)"
  },
  dividerStyle: { backgroundColor: "#CCCCCC", height: 1 },
  unAvailableLangContainerText: {
    paddingLeft: 14,
    fontWeight: "500",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(14),
    color: "#757575"
  },
  availableLangContainerText: {
    paddingLeft: 14,
    fontWeight: "500",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(14),
    color: "#333333"
  },
  scrollContainer: {
    backgroundColor: "#fff",
    left: 4,
    width: Metrics.width * 0.98,
    borderRadius: 5,
  },
  aditionalInfoContainer: {
    backgroundColor: "#fff",
    left: 4,
    width: Metrics.width * 0.98,
    borderRadius: 5,
    height: '100%',
  },
  backgroundContainer: {
    backgroundColor: "#fff",
    borderRadius: 5
  },
  container: {
    position: "absolute",
    left: 4,
    top: 185,
    width: Metrics.width * 0.98,
    borderRadius: 5,
  },
  availableLangText: {
    paddingLeft: 26,
    fontWeight: "500",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(18),
  },
  LangViewContainer: {
    height: 48,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  additionalInformationContainer: {
    backgroundColor: "#FFFFFF"
  },
  unAvailableLangText: {
    paddingLeft: 26,
    fontWeight: "500",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(18),
    color: "#9B9B9B"
  },
  selectLangButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center"
  },
  checkPadding: { paddingRight: 30 },
  additionalInformationInput: {
    paddingLeft: 10,
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(14),
    color: "#333333",
  },
});
