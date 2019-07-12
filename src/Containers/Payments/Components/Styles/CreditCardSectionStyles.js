import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Fonts, Colors }  from "../../../../Themes";
import { moderateScale, moderateScaleViewports } from "../../../../Util/Scaling";

import { isIphoneXorAbove } from "../../../../Util/Devices";


const baseButton = {
  flexDirection: "row",
  justifyContent: "center",
  borderRadius: moderateScaleViewports(10),
  alignItems: "center",
  height:"100%"
};

const baseWell = {
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "#522092",
  borderRadius: 4,
  paddingLeft: 4,
};

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
    flexDirection: "row",
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
  balanceHeader:{
    height:"17%",
    width:"100%",
    backgroundColor:"#3F1674"
  },
  balanceContainer:{
    width:"30%",
  },
  balanceContainerWhite:{
    width:"60%",
  },
  balanceMinutesContainer:{
    width:"80%",
    height:85,
    marginLeft:"10%",
    position:"relative",
  },
  balanceTitle:{
    color:"rgba(255, 255, 255, 0.8)",
    fontSize: 18,
    fontFamily: Fonts.BaseFont,
  },
  balanceMinutes:{
    color:"#FFFFFF",
    fontSize: 26,
    fontFamily: Fonts.BaseFont,
  },
  unlimited:{
    color:"#FFFFFF",
    fontSize: 26,
    fontFamily: Fonts.BaseFont,
    fontWeight: "bold"
  },
  balanceDescription:{
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: moderateScale(12, 0),
    fontFamily: Fonts.BaseFont,
  },
  creditCardContainer:{
    marginTop:30,
    width:"100%",
    height:"35%",
    backgroundColor:"#FFF",
  },
  row:{
    flexDirection:"row",
    width:"90%",
    paddingTop:20,
    marginLeft:20,
    position:"relative"    
  },
  creditCardTitle:{
    color: "#272833",
    fontSize: 18,
    fontFamily: Fonts.BaseFont,
  },
  backgroundImage: {
    width: moderateScaleViewports(120),
    height: moderateScaleViewports(80),
    resizeMode: "stretch",
  },
  addCardButton: {
    ...baseButton,
    backgroundColor: "#F39100",
    borderRadius: moderateScaleViewports(5),
    height: moderateScaleViewports(20),
    width:moderateScaleViewports(100),
    flex: 1
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: moderateScaleViewports(30),
    position: "absolute",
    right:0,
    marginTop: 20,
  },
  addCardButtonText:{
    color: "#FFF",
    fontSize: moderateScale(13, 0),
    fontFamily: Fonts.BaseFont,
  },
  addPackageButtonText:{
    color: "#FFF",
    fontSize: moderateScale(12, 0),
    fontFamily: Fonts.BaseFont,
  },
  description:{
    color: "#272833",
    fontSize: moderateScale(14, 0),
    fontFamily: Fonts.BaseFont,
    flexWrap:"wrap",
    paddingLeft: 10,
    flex:1,
  },
  rowDescription:{
    flexDirection:"row",
    width:"95%",
    height:"100%",
    marginTop:20,
    marginLeft:15,
    marginRight: 15,
    position:"relative"    
  },
  packageContainer:{
    marginTop:30,
    width:"100%",
    height:"35%",
    backgroundColor:"#FFF",
  },
  editText:{
      color:"#007AFF",
      fontSize: 14,
      fontFamily: Fonts.BaseFont,
      position:"absolute",
      right:0,
      marginTop:moderateScale(20, 0),
  },
  fewMinutesLeftContainer: {
    ...baseWell,
    backgroundColor: "#F39100"
  },
  outOfMinutesContainer: {
    ...baseWell,
    backgroundColor: "#FF3B30"
  },
  minutesLeftContainer: {
    ...baseWell,
    backgroundColor: "transparent"
  },
});
