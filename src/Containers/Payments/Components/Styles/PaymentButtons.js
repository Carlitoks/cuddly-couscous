import { StyleSheet } from "react-native";
import { moderateScale } from "../../../../Util/Scaling";
import { Metrics, Colors, Fonts } from "../../../../Themes";
import { iPhoneXModels, Iphone5, isIphoneXorAbove } from "../../../../Util/Devices";

const baseButton = {
  minWidth: Metrics.width * 0.65,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderRadius: 27
};

const baseText = {
  fontSize: moderateScale(17, 0),
  fontWeight: "600",
  fontFamily: Fonts.BaseFont,
  paddingTop: Metrics.width * 0.03,
  paddingBottom: Metrics.width * 0.04,
  paddingLeft: Metrics.width * 0.05,
  paddingRight: Metrics.width * 0.05
};

export default StyleSheet.create({
  paymentButtonsContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 50
  },
  addCardButton: {
    ...baseButton,
    borderColor: "#fff",
    backgroundColor: "#F39100",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  removeCardButton: {
    ...baseButton,
    borderColor: "#fff",
    backgroundColor: "#FF3B30",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  addCardButtonDisable: {
    ...baseButton,
    borderColor: "#cccccc",
    backgroundColor: "#ccc"
  },
  addCardButtonText: {
    ...baseText,
    color: "white"
  },
  addCardButtonDisabled: {
    ...baseText,
    color: "#fff"
  },
  iconPadding: { paddingLeft: Metrics.width * 0.05 }
});
