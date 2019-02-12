import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../../Themes";
import { moderateScale } from "../../../../Util/Scaling";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
    redErrorAlertText: {
        color: "#FFFFFF",
        fontFamily: Fonts.ItalicFont,
        fontWeight: "500",
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 10,
        width: Metrics.width * 0.6,
        fontSize: moderateScale(15, 0)
      },
      redErrorAlertUnderlineText: {
        textDecorationLine: "underline"
      },
      redErrorAlertContainer: {
        width: Metrics.width * 0.91,
        backgroundColor: "#DB2707",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#FFFFFF",
        marginTop: moderateScale(20, 0),
        marginBottom: moderateScale(20, 0),
      }
});
