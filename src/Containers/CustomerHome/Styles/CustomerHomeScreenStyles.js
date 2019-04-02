import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles } from "../../../Themes";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingBottom: Metrics.baseMargin,
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: "contain",
  },
  centered: {
    alignItems: "center",
  },
  fullWidth: { flex: 1 },
  wrapperContainer: {
    backgroundColor: "white",
    height: "100%",
  },
  height: { height: "100%" },
  flexEndCenter: { justifyContent: "flex-end", alignItems: "center" },
  mainContainerHome: { backgroundColor: "#F5F5F5", flexGrow: 1 },
});
