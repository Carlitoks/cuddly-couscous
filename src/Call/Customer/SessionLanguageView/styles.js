import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../../Themes";
import { moderateScale } from "../../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.greyBackground
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.greyBackground
  },
  searchContainer: {
    backgroundColor: Colors.transparent,
    margin: 0,
    padding: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginLeft: 4,
    width: "100%"
  },
  searchInputStyle: {
    height: 40,
    borderWidth: 0,
    marginRight: 15,
    backgroundColor: Colors.searchBackground,
    color: Colors.black,
    fontFamily: Fonts.BaseFont
  },
  searchIcon: {
    fontSize: 17,
    marginTop: 4
  },
  clearIcon: {
    marginRight: 10,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 4
  },
  loading: {
    marginTop: 70,
    paddingTop: 100,
    height: "100%",
    backgroundColor: Colors.greyBackground,
    width: "100%",
    position: "absolute",
    zIndex: 10
  },
  titleCall: {
    fontFamily: Fonts.BaseFont,
    fontSize: 18,
    textAlign: "center",
    marginBottom: moderateScale(50),
    marginTop: 38,
    color: Colors.primaryColor,
    backgroundColor: Colors.transparent,
    fontWeight: "500"
  },
  subTitleCall: {
    fontFamily: Fonts.LightFont,
    fontSize: 18,
    color: Colors.primaryColor,
    textAlign: "center",
    backgroundColor: Colors.transparent
  },
  bottom: {
    marginTop: 10
  },
  mainTitle: {
    fontSize: 18,
    color: Colors.primaryColor,
    textAlign: "center",
    fontFamily: Fonts.LightFont,
    alignSelf: "center",
    width: width,
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  smallFont: {
    fontSize: 16
  },
  bottom: {
    marginTop: 15
  },
  bottomText: {
    fontSize: moderateScale(18),
    color: Colors.primaryColor,
    textAlign: "center",
    fontFamily: Fonts.LightFont,
    alignSelf: "center",
    width: width,
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  headerIcon: {
    color: Colors.white,
    fontSize: 16,
    paddingLeft: 2,
    paddingRight: 2,
    marginLeft: 5,
    marginRight: 5
  },
  titleContainer: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    top: 0,
    width: 200
  },
  titleContainer: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    top: 0,
    width: 100
  },
  title: {
    top: 20,
    alignSelf: "center"
  },
  box: {
    backgroundColor: Colors.white,
    height: 100,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    flexWrap: "wrap",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey
  },
  boxText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.gradientColor.top
  },
  iconSize: {
    fontSize: 28
  },
  comingSoonContainer: {
    backgroundColor: "rgba(185,185,185,0.14)",
    paddingHorizontal: 10,
    paddingVertical: 20,
    height: 70,
    flexDirection: "row",
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey
  },
  comingSoonText: {
    fontFamily: Fonts.BaseFont,
    fontSize: 14,
    color: "rgba(117,117,117,1)"
  }
});
