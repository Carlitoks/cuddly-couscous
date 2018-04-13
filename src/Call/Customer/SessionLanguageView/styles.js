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
    backgroundColor: "transparent",
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
    fontFamily: Fonts.primaryBaseFont
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
    fontFamily: Fonts.primaryLightFont,
    fontSize: 16,
    color: Colors.primaryColor,
    textAlign: "center",
    backgroundColor: "transparent",
    alignSelf: "center"
  },
  subTitleCall: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 10,
    color: Colors.primaryColor,
    textAlign: "center",
    backgroundColor: "transparent"
  },
  bottom: {
    marginTop: 10
  },
  mainTitle: {
    fontSize: 18,
    color: Colors.primaryColor,
    textAlign: "center",
    fontFamily: Fonts.primaryLightFont,
    alignSelf: "center",
    width: width,
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  smallFont: {
    fontSize: 16
  },
  headerButtonCancel: {
    fontSize: 13,
    color: Colors.primaryColor
  },
  bottom: {
    marginTop: 30
  },
  bottomText: {
    fontSize: 12,
    color: Colors.primaryColor,
    textAlign: "center",
    fontFamily: Fonts.primaryLightFont,
    alignSelf: "center",
    width: width,
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  headerIcon: {
    color: Colors.white,
    fontSize: 16,
    paddingLeft: 2,
    paddingRight: 2,
    marginLeft: 2,
    marginRight: 2
  },
  titleContainer: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    top: 0,
    width: 250
  }
});
