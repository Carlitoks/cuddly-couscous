import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, moderateScaleViewports } from "../../Util/Scaling";

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  containerInformation: {
    paddingTop: 30,
    justifyContent: "space-around",
    paddingBottom: 30,
    backgroundColor: "#eeeeee"
  },
  linguistAvatar: {
    marginBottom: 30
  },
  avatarContent: {
    marginLeft: 20
  },
  linguistInformation: {
    alignItems: "flex-start"
  },
  linguistName: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.primaryColor,
    marginLeft: 30,
    marginTop: 25
  },
  linguistAddress: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primaryColor,
    flexDirection: "column",
    alignItems: "flex-end"
  },
  starContainer: {
    width: "70%"
  },
  summaryContainer: {
    top: -8,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  listItemContainer: {
    minHeight: 60,
    justifyContent: "center"
  },
  titleStyle: {
    fontSize: moderateScaleViewports(18),
    fontWeight: "bold",
    color: "#444444",
    fontFamily: Fonts.BaseFont,
    paddingBottom: moderateScaleViewports(10)
  },
  listSubtitle: {
    fontSize: moderateScale(18),
    color: "#444444",
    fontWeight: "normal",
    fontFamily: Fonts.BaseFont,
  },
  languagesContainer: {
    marginLeft: 10
  },
  languagesText: {
    fontSize: moderateScale(18),
    color: "#444444",
    fontFamily: Fonts.BaseFont,
    paddingBottom: moderateScaleViewports(10),
    fontWeight: "normal"
  },
  listRightTitleContainer: {
    flex: 0.3
  },
  listRightTitle: {
    fontSize: moderateScale(22),
    color: Colors.primaryListRightItem
  },
  userAvatarInfo: {
  },
  optionalNoteStyle: {
    fontSize: moderateScale(14),
    color: "#444444",
    fontFamily: Fonts.BaseFont,
    fontWeight: "normal",
    backgroundColor: "#F1F1F1",
    paddingLeft: moderateScaleViewports(21),
    paddingTop: moderateScaleViewports(11),
    paddingBottom: moderateScaleViewports(14),
    borderRadius: moderateScaleViewports(4)
  },
  listNoteItemContainer: {
    minHeight: 60,
    justifyContent: "flex-start",
    borderBottomWidth: 0,
  },
  avatarContainer: { flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginLeft: moderateScaleViewports(34), paddingBottom: moderateScaleViewports(47) },
  infoContainer: {marginLeft: moderateScaleViewports(20)},
  clientType: {color: "#ffffff", fontFamily: Fonts.BaseFont, fontSize: moderateScaleViewports(16)},
  displayName: {color: "#ffffff", fontFamily: Fonts.BaseFont, fontSize: moderateScaleViewports(20), paddingBottom: moderateScaleViewports(11), paddingTop: moderateScaleViewports(8)},
  starRatingContainer: {width: moderateScaleViewports(123)},
  addRatingButton: { flexDirection: "row", justifyContent: "center", alignItems: "center", width: moderateScaleViewports(126), borderRadius: moderateScaleViewports(4), backgroundColor: "#F39100", minHeight: moderateScaleViewports(28)},
  addRatingButtonText: {color: "#ffffff", fontFamily: Fonts.BaseFont, fontSize: moderateScaleViewports(14)},
  abuseReportedText: {
    color: "#F39100",
    fontFamily: Fonts.BaseFont,
    fontWeight: "bold",
    fontSize: moderateScaleViewports(14),
    paddingTop: moderateScaleViewports(10)
  },
});
