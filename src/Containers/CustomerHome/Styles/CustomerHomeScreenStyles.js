import { StyleSheet, Platform } from "react-native";
import { Metrics, ApplicationStyles } from "../../../Themes";
import metrics from "../../../Themes/Metrics";
import { moderateScale } from "../../../Util/Scaling";
import { Iphone5, iPhoneXModels } from "../../../Util/Devices";

const iOS = Platform.OS === "ios";
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: "contain"
  },
  centered: {
    alignItems: "center"
  },
  fullWidth: { flex: 1 },
  wrapperContainer: {
    backgroundColor: "white",
    height: "100%"
  },
  swapArrows: {
    position: "absolute",
    left: metrics.width * 0.88,
    top: Iphone5 //check if the device is an Iphone5
      ? moderateScale(347)
      : iPhoneXModels //check if the device is an IphoneX model
      ? moderateScale(420)
      : iOS && !(iPhoneXModels || Iphone5) //check if the device is an iOS devices different from the iPhone5 or iPhoneX
      ? moderateScale(408)
      : moderateScale(432),
    zIndex: 2000
  }
});
