import { StyleSheet } from "react-native";
import { moderateScaleViewports, moderateScale } from "../../../../Util/Scaling";
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../../Themes";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingBottom: Metrics.baseMargin
  },
  wrapperContainer: {
    backgroundColor: "white",
    flex: 1
  },
  scrollViewFlex: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: moderateScale(80, 0),
    backgroundColor: "#fff"
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 50,

  },
  availableLangContainer: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    width: "100%"
  },
  availableLangTitleContainer: {
    backgroundColor: "#EFEFF4",
    justifyContent: "center",
    height: 30,
    width: "100%"
  },

  availableLangContainerText: {
    paddingLeft: 19,
    fontFamily: Fonts.BaseFont,
    borderWidth: 0,
    width: "100%",
    fontSize: moderateScaleViewports(13, 0),
    color: "#8e8e91"
  },
  LangViewContainer: {
    height: 48,
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    //borderBottomColor: "#C8C7CC",
    //borderBottomWidth: 0.5
  },
  selectLangButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",

  },
  dividerStyle: {
    backgroundColor: "rgba(90, 90, 90, 0.2)",
    height: 0.5,
    width: Metrics.width * 0.95,
    paddingLeft: 10
  },
  availableLangText: {
    paddingLeft: 36,
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScaleViewports(18),
    color: "#1C1B1B"
  }
});
