import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale } from "../../Util/Scaling";

export const styles = StyleSheet.create({
  flexColumn: { flexDirection: "column", justifyContent: "center" },
  languagesContainer: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  centerIcon: {
    marginTop: 4,
    paddingLeft: 6,
    paddingRight: 6,
    marginLeft: 6,
    marginRight: 6
  },
  regularText: {
    color: Colors.textDefault,
    fontWeight: "normal",
    fontSize: moderateScale(20)
  },
  orangeTitle: {
    color: Colors.listLabelColor,
    fontWeight: "bold"
  },
  titleCall: {
    fontFamily: Fonts.LightFont,
    fontSize: 18,
    fontWeight: "500",
    color: Colors.primaryColor,
    textAlign: "center",
    backgroundColor: Colors.transparent,
    alignSelf: "center"
  },
  titleContainer: {
    marginTop: 15
  }
});
