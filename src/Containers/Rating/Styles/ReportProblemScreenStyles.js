import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../Themes";
import { moderateScale, moderateScaleViewports } from "../../../Util/Scaling";
import { isIphoneXorAbove } from "../../../Util/Devices";


export default StyleSheet.create({
  ...ApplicationStyles.screen,
  backContainer: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF"
  },
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    backgroundColor: "#fff"
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
  aditionalInfoContainer: {
    backgroundColor: '#fff',
    left: 4,
    width: Metrics.width * 0.98,
    borderRadius: 5,
    height: '40%'
  },
  availableLangContainer: {
    height: 48,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(185,185,185,0.14)'
  },
  availableLangContainerText: {
    paddingLeft: 14,
    fontWeight: '500',
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(14, 0),
    color: '#333333'
  },
  additionalInformationContainer: {
    backgroundColor: '#FFFFFF'
  },
  additionalInformationInput: {
    paddingLeft: 10,
    marginTop: 15,
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(14, 0),
    color: '#333333'
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScaleViewports(10),
    width: Metrics.width * 0.90,
    marginLeft: "5%",
    height: moderateScaleViewports(55),
    marginTop: 20,
    marginBottom: isIphoneXorAbove() ? 44 : 0,
  },
});
