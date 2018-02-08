import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import DeviceInfo from "react-native-device-info";
import { moderateScale } from "../../Util/Scaling";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const IphoneX = DeviceInfo.getModel() == "iPhone X";
const heightTab = IphoneX ? parseInt(height * 0.08) : parseInt(height * 0.04);
export const styles = StyleSheet.create({
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
    color: Colors.primaryColor,
    backgroundColor: "transparent"
  },
  tabTextStyle: {
    color: Colors.primaryLightFillColor,
    fontWeight: "bold"
  },
  tabStyle: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white"
  },
  tabsContainerStyle: {
    marginLeft: moderateScale(33),
    marginRight: moderateScale(33),
    width: "55%",
    alignSelf: "center",
    marginBottom: moderateScale(30)
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
