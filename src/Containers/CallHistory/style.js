import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const width = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    width: width
  },
  mainTitle: {
    fontFamily: Fonts.primaryLightFont,
    fontSize: 24,
    textAlign: "center",
    marginBottom: moderateScale(20),
    marginTop: moderateScale(10),
    color: Colors.primaryColor
  },
  tabTextStyle: {
    fontFamily: Fonts.primaryBaseFont,
    color: Colors.primaryLightFillColor,
    fontSize: 12
  },
  tabStyle: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primaryColor
  },
  containerTab: {
    flex: 1
  },
  tabsContainerStyle: {
    marginLeft: moderateScale(33),
    marginRight: moderateScale(33),
    width: 300,
    alignSelf: "center"
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  }
});
