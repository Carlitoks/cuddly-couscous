import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScaleViewports } from "../../Util/Scaling";

export default (styles = StyleSheet.create({
  containerList: {
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  listItem: {
    borderBottomWidth: 0,
    paddingBottom: moderateScaleViewports(10),
    paddingTop: moderateScaleViewports(10)
  },
  renderSeparator: {
    height: 1,
    width: "90%",
    backgroundColor: "#DCDCDC",
    marginLeft: "5%"
  },
  colorStyle: {
    color: "#444444",
    fontSize: moderateScaleViewports(16),
    fontFamily: Fonts.BaseFont,
    fontWeight: "normal",
  },
  textColor: {
    marginTop: "13%",
    color: Colors.black
  },
  notFound: {
    marginTop: 6,
    textAlign: "center",
    backgroundColor: Colors.transparent,
  },
  historyTitleStyle: {
    fontSize: moderateScaleViewports(20),
    fontFamily: Fonts.BaseFont,
    fontWeight: "normal"
  },
}));
