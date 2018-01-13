import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  Icon: {
    width: width
  },
  mainTitle: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 24,
    textAlign: "center",
    marginBottom: moderateScale(15),
    marginTop: moderateScale(20),
    color: Colors.primaryColor,
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  languages: {
    flex: 1,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  english: {
    fontFamily: Fonts.primaryBaseFont,
    fontSize: 19,
    color: Colors.primaryColor,
    marginLeft: 50,
    backgroundColor: "rgba(255, 255, 255, 0)" 
  },
  spanish: {
    fontFamily: Fonts.primaryBaseFont,
    fontSize: 19,
    color: Colors.primaryColor,
    marginRight: 50,
    backgroundColor: "rgba(255, 255, 255, 0)" 
  },
  containerSearch: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10)
  },
  inputSearch: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "red",
    borderRadius: 10
  },
  buttonStep: {
    alignSelf: "center",
    backgroundColor: Colors.primaryLightFillColor,
    width: width
  },
  textStep: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.primaryAltFontColor,
    fontFamily: Fonts.primaryBoldFont
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  scrollContainer: {
    flex: 1
  },
  contentScrollContainer: { flexGrow: 1 },
  listContainer: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  iconChange:
  {  backgroundColor: "rgba(255, 255, 255, 0)" }
});
