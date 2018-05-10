import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.primaryColor
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.primaryColor
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
    fontFamily: Fonts.LightFont,
    fontSize: moderateScale(26),
    color: Colors.primaryColor,
    textAlign: "center",
    backgroundColor: Colors.transparent
  }
});
