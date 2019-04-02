import { StyleSheet } from "react-native";
import { moderateScaleViewports } from "../../../../Util/Scaling";
import { Fonts } from "../../../../Themes";
import metrics from "../../../../Themes/Metrics";

export default StyleSheet.create({
  mainInputsContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#64A901",
    borderRadius: moderateScaleViewports(10),
    marginTop: moderateScaleViewports(-165),
  },
  pricingText: {
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(13),
    color: "#fff",
    paddingTop: moderateScaleViewports(10),
    paddingBottom: moderateScaleViewports(10),
    textAlign: "center",
  },
  inputsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: moderateScaleViewports(10),
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: moderateScaleViewports(15),
    paddingLeft: moderateScaleViewports(14),
  },
  langInputs: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    minWidth: metrics.width * 0.80,
  },
  scenarioInputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    minWidth: metrics.width * 0.80,
  },
  swapLangsInput: { marginTop: moderateScaleViewports(26) },

  /**
   * RenderPickerLangStyles
   */
  renderPickerContainer: {
    flexDirection: "column",
    width: metrics.width * 0.30,
  },

  /**
   * RenderPickerStyles
   */
  renderPickerLabel: { fontFamily: Fonts.BaseFont, fontSize: moderateScaleViewports(14), color: "#848688" },
  renderPickerSelectedLabel: { fontFamily: Fonts.BaseFont, fontSize: moderateScaleViewports(13), color: "#1C1B1B" },
  renderPickerSelectorContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginTop: moderateScaleViewports(10),
    paddingTop: moderateScaleViewports(13),
    paddingBottom: moderateScaleViewports(13),
    paddingLeft: moderateScaleViewports(13),
    borderRadius: 4,
    elevation: 1,
  },

  /**
   * RenderPickerScenarioStyles
   */
  renderPickerScenarioContainer: {
    flexDirection: "column",
    marginTop: moderateScaleViewports(10),
    width: metrics.width * 0.755,
    paddingBottom: moderateScaleViewports(15),
  },

});
