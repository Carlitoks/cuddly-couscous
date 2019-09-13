import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../Themes";
import { moderateScale, moderateScaleViewports } from "../../../Util/Scaling";
import metrics from "../../../Themes/Metrics";
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  fullWidth: { flex: 1 },
  wrapperContainer: {
    backgroundColor: "#DBDBDB",
    height: '100%'
  },
  height: { height: '100%' },
  flexEndCenter: { justifyContent: 'center', alignItems: 'flex-end' },
  scrollViewFlex: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 20,
    marginTop: 30,
    backgroundColor: "#DBDBDB"
  },
  arrowContainer: {
    marginTop: 30,
    alignItems: "flex-start"
  },
  noCardText: { fontFamily: Fonts.BaseFont, color: Colors.gradientColor.top, fontSize: 16, marginTop: 30, textAlign: 'center' },
  cancelButton: {
    alignItems: "flex-end",
    justifyContent: "center"
  },
  cancelStyle: {
    marginRight: 12,
    color: "#fff",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(18, 0)
  },
  permissionTitle: {
    fontWeight: "bold",
    color: "#272833",
    fontSize: 18,
    fontFamily: Fonts.BaseFont,
  },
  permissionDescription: {
    color: "rgba(0, 0, 0, 0.7)",
    fontSize: 16,
    fontFamily: Fonts.BaseFont,
  },
  permissionsDescription: {
    color: "#272833",
    fontSize: 18,
    fontFamily: Fonts.BaseFont,
    justifyContent: "center",
    alignItems: "center"
  },
  creditCardContainer: {
    marginTop: metrics.width * 0.10,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: metrics.width * 0.40,
    marginLeft: '10%'
  },
  firstCardContainer: {
    marginTop: metrics.width * 0.10,
    width: "80%",
    justifyContent: "center",
    alignItems: "center"
  },
  cardContainer: {
    marginTop: 20,
    width: "80%",
    justifyContent: "center",
    alignItems: "center"
  },
  row: {
    flexDirection: "row",
    width: "90%",
    marginBottom: 20,
    marginLeft: 20,
    position: "relative"
  },
  column: {
    flexDirection: "column",
    width: "70%",
    marginBottom: 20,
    marginLeft: 20,
    position: "relative"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScaleViewports(10),
    width: Metrics.width * 0.90,
    height: moderateScaleViewports(55),
    marginTop: 15,
    backgroundColor: "#401674"
  },
  enabledButton: {
    alignItems: "center",
    borderRadius: moderateScaleViewports(4),
    justifyContent: "center",
    width: metrics.width * 0.70,
    height: moderateScaleViewports(55),
    backgroundColor: "#401674", borderColor: "#401674", borderWidth: 2,
  },
});
