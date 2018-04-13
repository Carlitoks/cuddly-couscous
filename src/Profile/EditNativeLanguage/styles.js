import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f7f7f7"
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#f7f7f7"
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
    marginTop: 4,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center"
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
  mainTitle: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: moderateScale(26),
    textAlign: "center",
    marginBottom: moderateScale(50),
    marginTop: 38,
    color: "white",
    backgroundColor: "transparent"
  }
});
