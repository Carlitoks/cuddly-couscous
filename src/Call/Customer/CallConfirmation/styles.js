import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../../Themes";
import { moderateScale } from "../../../Util/Scaling";

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  mainTitle: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 32,
    textAlign: "center",
    marginBottom: moderateScale(15),
    marginTop: moderateScale(10),
    backgroundColor: "transparent",
    color: Colors.primaryColor
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  summaryContainer: {
    top: -8,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  callInformation: {
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15
  },
  alignIcon: {
    alignItems: "flex-end",
    marginRight: 45
  },
  iconStyle: {
    alignItems: "flex-end"
  },
  textSize: {
    fontSize: 20
  },
  subtitleText: {
    fontSize: 10,
    fontStyle: "italic"
  },
  buttonStyle: {
    borderRadius: 15,
    height: 60,
    width: 140
  },
  buttonCall: {
    backgroundColor: Colors.callButton
  },
  buttonCancel: {
    backgroundColor: Colors.cancelButton
  },
  textButtonStyle: {
    color: Colors.black,
    fontSize: 24
  },
  footerButtons: {
    alignItems: "center",
    marginTop: 25
  },
  listItemContainer: {
    minHeight: 60,
    justifyContent: "center"
  },
  alignText: {
    alignItems: "flex-start"
  },
  fixHeight: {
    height: 25
  },
  listRightTitle: {
    fontSize: moderateScale(22),
    color: Colors.primaryListRightItem
  },
  listRightTitleContainer: {
    flex: 0.3
  },
  listSubtitle: {
    fontSize: moderateScale(20),
    fontWeight: "normal"
  },
  titleStyle: {
    fontSize: moderateScale(15),
    fontWeight: "bold",
    color: Colors.listLabelColor
  }
});
