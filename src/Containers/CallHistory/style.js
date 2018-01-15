import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import DeviceInfo from "react-native-device-info"

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const IphoneX = DeviceInfo.getModel() == "iPhone X";
const heightTab = IphoneX ? parseInt(height*0.08) : parseInt(height*0.04);
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width
  },
  title: {
    color: Colors.primaryColor,
    fontSize: 25,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    fontFamily: Fonts.primaryBoldFont,
    textAlign: "left",
    width: width,
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
    position: "absolute",
    marginLeft: 30,
    marginRight: 30,
    width: "58%",
    alignSelf: "center",
    marginTop: heightTab
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
