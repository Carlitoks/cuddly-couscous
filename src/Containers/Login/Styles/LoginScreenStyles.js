import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../Themes";
import { moderateScale } from "../../../Util/Scaling";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  wrapperContainer: {
    backgroundColor: "white",
    height: "100%"
  },
  inputText: {
    width: Metrics.width * 0.85,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    color: "#fff",
    fontFamily: Fonts.BoldFont,
    fontSize: moderateScale(20)
  },
  loginContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: Metrics.height * 0.91,
    alignItems: "center"
  },
  inputContainer: { width: Metrics.width * 0.85, paddingTop: 50 },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  buttonWidthContainer: { paddingBottom: 30, alignItems: 'center',
  justifyContent: 'center' },
  signInButtonDisable: {
    width: Metrics.width * 0.6,
    height: Metrics.width * 0.15,
    backgroundColor: Colors.transparent,
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonEnabledText: {textAlign: 'center', color: '#fff', fontFamily: Fonts.BoldFont},
  createAccountPadding: {paddingTop: 20, width: Metrics.width},
  signInButtonEnabled: {
    width: Metrics.width * 0.6,
    height: Metrics.width * 0.15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 25,
    backgroundColor: "#F39100",
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.38,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8
  }
});
