import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../Themes";
import { moderateScale } from "../../../Util/Scaling";

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
    backgroundColor: 'white',
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
    backgroundColor: "#F2F2F2"
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
});
