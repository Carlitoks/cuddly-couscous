import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScaleViewports } from "../../Util/Scaling";
export default (styles = StyleSheet.create({
  containerText: {
    flexDirection: "column",
  },
  titleList: {
    marginLeft: 10
  },
  iconStart: {
    marginLeft: 20
  },
  userName: {
    marginRight: 5,
    paddingBottom: moderateScaleViewports(8),
    color: "#444444",
    fontSize: moderateScaleViewports(16),
    fontFamily: Fonts.BaseFont,
    fontWeight: "bold"
  },
  iconStyle: {
    marginLeft: 5,
    color: Colors.black
  },
  containerStyle: {
    marginLeft: 10,
    flexDirection: "column",
  },
  stars: {
    width: moderateScaleViewports(123),
    paddingBottom: moderateScaleViewports(7)
  },
  notRatedText: {
    color: "#F39100",
    fontFamily: Fonts.BaseFont,
    fontWeight: "bold",
    fontSize: moderateScaleViewports(14),
    paddingBottom: moderateScaleViewports(8)
  }
}));
