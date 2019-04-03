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
    marginTop: moderateScaleViewports(-130),
    width: metrics.width * 0.90,
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
    paddingRight: moderateScaleViewports(14),
  },
  langInputs: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  scenarioInputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  swapLangsInput: { marginTop: moderateScaleViewports(26), paddingLeft: 12, paddingRight: 12 },

  /**
   * RenderPickerLangStyles
   */
  renderPickerContainer: {
    flexDirection: "column",
    flex: 1,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxHeight: moderateScaleViewports(42),
  },

  /**
   * RenderPickerScenarioStyles
   */
  renderPickerScenarioContainer: {
    flexDirection: "column",
    marginTop: moderateScaleViewports(10),
    paddingBottom: moderateScaleViewports(15),
    flex: 1,
  },

});
