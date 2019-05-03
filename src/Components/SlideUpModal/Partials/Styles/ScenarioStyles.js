import { StyleSheet } from "react-native";
import { moderateScaleViewports } from "../../../../Util/Scaling";
import { Fonts, Metrics } from "../../../../Themes";
import { isIphoneXorAbove } from "../../../../Util/Devices";
import metrics from "../../../../Themes/Metrics";

export default StyleSheet.create({
  scenarioContainer: { position: "absolute", bottom: isIphoneXorAbove() ? 85 : 70 },
  scrollContainer: {
    backgroundColor: "#fff",
    left: Metrics.width * 0.05,
    width: Metrics.width * 0.9
  },
  availableLangContainer: {
    height: 48,
    justifyContent: "center",
    backgroundColor: "#EBEBEB",
    borderRadius: 10,
    left: Metrics.width * 0.05,
    width: Metrics.width * 0.9,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  availableLangContainerText: {
    paddingLeft: 19,
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(15, 0),
    color: '#1C1B1B'
  },
  dividerStyle: {
    backgroundColor: "rgba(90, 90, 90, 0.2)",
    height: 0.5,
    width: Metrics.width * 0.8,
    marginLeft: Metrics.width * 0.05
  },
  LangViewContainer: {
    height: 48,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingBottom: 19,
    paddingTop: 13
  },
  selectLangButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center"
  },
  selectedScenarioButton: {
    backgroundColor: "#ECE8F1",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center"
  },
  availableLangText: {
    paddingLeft: 19,
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(16),
    color: "#1C1B1B"
  },
  checkPadding: { paddingRight: 30 },
  closeScenarioList: {
    borderRadius: 10,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: -60,
    width: Metrics.width * 0.9,
    left: Metrics.width * 0.05,
    alignItems: "center"
  },
  cancelButtonText: {
    fontFamily: Fonts.BaseFont,
    color: "#3F1674",
    fontSize: 16,
    paddingTop: 16,
    paddingBottom: 16
  },
  iconNameContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 40
  },
  fullWidthOnItems: { width: metrics.width }
});
