import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";
import { Colors, Fonts } from "../../Themes";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  avatarContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(19),
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginLeft: "5%",
    marginRight: "5%"
  },
  myProfileText: {
    color: Colors.primaryAltFontColor,
    fontFamily: Fonts.BoldFont,
    textAlign: "center",
    alignSelf: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    color: Colors.primaryColor,
    fontFamily: Fonts.BoldFont
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  scrollContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: "white"
  },
  contentScrollContainer: { flexGrow: 1 },
  buttonText: {
    textAlign: "center",
    color: Colors.primaryAltFontColor,
    fontFamily: Fonts.BaseFont,
    fontSize: 16,
    fontWeight: "bold"
  },
  picker: {
    width: "40%"
  },
  pickerText: {
    color: "gray",
    fontFamily: Fonts.BoldFont,
    fontSize: 16,
    width: "50%",
    marginTop: moderateScale(16)
  },
  listSelectionTitle: {
    marginTop: moderateScale(50),
    fontSize: 17,
    fontFamily: Fonts.BoldFont
  }
});
