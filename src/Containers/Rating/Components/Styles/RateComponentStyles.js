import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Fonts } from "../../../../Themes";
import metrics from "../../../../Themes/Metrics";
import { moderateScale } from "../../../../Util/Scaling";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  flexEndCenter: { justifyContent: 'flex-end', alignItems: 'center'},
  baseText: {
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(20, 0),
    textAlign: "center",
    color: "#000",
    paddingBottom: metrics.height * 0.02
  },
  thumbsContainer: {flexDirection: 'row'},
  starRatingPadding: {paddingBottom: metrics.height * 0.10},
  thumbsPadding: {paddingLeft: 25}
});
