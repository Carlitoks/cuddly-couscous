import { Platform, StyleSheet } from "react-native";
import { Fonts } from "../../../../Themes";
import { moderateScaleViewports, moderateScale, scaleFontSize } from "../../../../Util/Scaling";

const defaultInput = {
  flex: 0.9,
  borderBottomWidth: 1,
  color: "rgba(0, 0, 0, 0.54)",
  fontFamily: Fonts.BaseFont,
  fontSize: moderateScaleViewports(16),
  paddingBottom: moderateScaleViewports(5)
};

export default StyleSheet.create({
  inputViewContainer: {
    flexDirection: "column",
    paddingTop: moderateScaleViewports(0)
  },
  inputViewContainerValue: {
    flexDirection: "column",
    paddingTop: moderateScaleViewports(0)
  },
  labelText: {
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(13),
    fontWeight: "400",
    color: "#401674",
    padding: 0,
    paddingLeft: Platform.OS === "ios" ? moderateScaleViewports(15) : moderateScaleViewports(20),
    paddingTop: moderateScaleViewports(10),
    textAlign: "left"
  },
  firstInput: {
    paddingTop: moderateScaleViewports(27)
  },
  inputsErrorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: -15
  },
  invalidLabelText: {
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(12),
    fontWeight: "400",
    color: "#FF3B30",
    padding: 0,
    paddingLeft: Platform.OS === "ios" ? moderateScaleViewports(15) : moderateScaleViewports(20),
    textAlign: "left"
  },
  inputTextValid: {
    ...defaultInput,
    borderBottomColor: "rgba(151, 151, 151, 0.3)",
    paddingTop: Platform.OS === "ios" ? 15 : 15
  },
  inputTextInvalid: {
    ...defaultInput,
    borderBottomColor: "#FF3B30",
    paddingTop: Platform.OS === "ios" ? 15 : 15
  },
  CVVIconContainer: { position: "absolute", right: 10, top: moderateScale(17) },
  CVVIcon: { width: 20, height: 20 },
  tooltipContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    borderRadius: 5,
    right: moderateScale(-25, 0),
    top: moderateScale(50, 0),
    width: moderateScale(180, 0),
    backgroundColor: "#007AFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 50
  },
  tooltipTextStyle: {
    textAlign: "center",
    fontSize: 14,
    color: "white"
  },
  triangle: {
    right: moderateScale(-42, 0),
    top: moderateScale(-15, 0),
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 0,
    borderRightWidth: 5,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#007AFF",
    borderLeftColor: "transparent"
  }
});
