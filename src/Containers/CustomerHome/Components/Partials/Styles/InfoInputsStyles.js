import { StyleSheet } from "react-native";
import { moderateScale } from "../../../../../Util/Scaling";
import { Fonts, Metrics } from "../../../../../Themes";
import metrics from "../../../../../Themes/Metrics";

const PlaceHolderText = {
  fontFamily: Fonts.BaseFont,
  fontWeight: "500",
  fontSize: moderateScale(18),
  color: "white"
};

const placeholderInput = {
  borderBottomWidth: 1,
  borderBottomColor: "#8C8C8C",
  backgroundColor: "transparent",
  width: moderateScale(298)
};

export default StyleSheet.create({
  inputsContainer: { marginTop: 30, flexDirection: 'column'},
  inputsContainerHome: { flexDirection: 'column', marginTop: moderateScale(-1)},
  inputTitle: {
    color: "#ffffff",
    fontFamily: Fonts.ItalicFont,
    fontSize: moderateScale(13),
    textAlign: "left",
    fontWeight: "300"
  },
  swapLanguageContainer: {
    position: "relative",
    alignSelf: "flex-end",
    left: 24,
    top: -1,
    width: 15,
    height: 54,
    borderColor: "#8C8C8C",
    borderStyle: "dotted",
    borderRightWidth: 1,
    borderTopWidth: 1,
    zIndex: 10
  },
  onboardingPlaceholderContainer: {
    position: "relative",
    alignSelf: "flex-end",
    height: 51
  },
  swapLanguageIconContainer: {
    position: "absolute",
    left: Metrics.width * 0.74,
    top: 18
  },
  additionalInformationInput: {
    ...PlaceHolderText,
    ...placeholderInput,
    fontWeight: "500"
  },
  paddingBottomContainer: { flexDirection: "column", paddingBottom: 5 },
  swapArrows: {
    position: "absolute",
    left: moderateScale(350),
    top: moderateScale(60),
    zIndex: 1000
  }
});
