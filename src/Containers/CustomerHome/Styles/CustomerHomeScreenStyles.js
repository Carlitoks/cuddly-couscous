import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles } from "../../../Themes";
import metrics from "../../../Themes/Metrics";
import { moderateScale } from "../../../Util/Scaling";
import { Iphone5, iPhoneXModels } from "../../../Util/Devices";

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
    top: Iphone5
      ? moderateScale(347)
      : iPhoneXModels
      ? moderateScale(385)
      : moderateScale(418),
    zIndex: 2000
  }
});
