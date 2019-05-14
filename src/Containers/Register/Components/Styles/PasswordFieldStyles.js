import { Platform, StyleSheet } from "react-native";
import { Fonts } from "../../../../Themes";
import { moderateScaleViewports, moderateScale } from "../../../../Util/Scaling";

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
  CVVIconContainer: { position: "absolute", right: 0, top: 5 },
  CVVIcon: { width: 25, height: 25 },
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
  }
});
