import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles, Colors } from "../../../Themes";
import metrics from "../../../Themes/Metrics";
import { moderateScale } from "../../../Util/Scaling";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  centered: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    paddingBottom: Metrics.baseMargin,
  },
  flexEndCenter: { position: "absolute", bottom: 0, alignItems: "center", justifyContent: "flex-end" },
  fullWidth: { flex: 1 },
  height: { height: "100%" },
  imgBackground: { height: metrics.height * 0.70, resizeMode: "stretch", width: metrics.width },
  imgBackgroundContainer: {
    alignItems: "center", flexDirection: "column", flexGrow: 1, justifyContent: "space-between", width: metrics.width,
  },
  logo: {
    height: Metrics.images.logo,
    marginTop: Metrics.doubleSection,
    resizeMode: "contain",
    width: Metrics.images.logo,
  },
  mainContainerHome: { backgroundColor: "#F5F5F5", flexGrow: 1 },
  wrapperContainer: {
    backgroundColor: "white",
    height: "100%",
  },
  containerMenu: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    height: moderateScale(50, 0),
    width: moderateScale(50, 0),
    marginLeft: 15
  },
});
