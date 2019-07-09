import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../Themes";
import { moderateScale } from "../../../Util/Scaling";
import { red } from 'ansi-colors';
import { moderateScaleViewports } from "../../../Util/Scaling";
import { isIphoneXorAbove } from "../../../Util/Devices";

const baseButton = {
  flexDirection: "row",
  justifyContent: "center",
  borderRadius: moderateScaleViewports(10),
  alignItems: "center",
  borderBottomLeftRadius: isIphoneXorAbove() ? 10 : 0,
  borderBottomRightRadius: isIphoneXorAbove() ? 10 : 0,
  height: "100%",
  bottom: 0,
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
  centered: {
    alignItems: 'center'
  },
  fullWidth: { flex: 1 },
  wrapperContainer: {
    backgroundColor: 'white',
    height: '100%'
  },
  itemTextLeftTitle: { left:0, fontSize: moderateScale(15, 0), color: "#272833", position:"absolute",  fontWeight:"bold" },
  itemTextLeft: { left:0, fontSize: moderateScale(15, 0), color: "#272833", position:"absolute"},
  itemText: { fontSize: moderateScale(15, 0), color:"#272833", position:"absolute", right:0},
  itemTextTitle: { fontSize: moderateScale(15, 0), color:"#272833", position:"absolute", right:0, fontWeight:"bold"},
  textAddCard: {fontSize: moderateScale(15, 0), color: "#272833", position:"absolute", flexWrap: 'wrap', flex:1},
  itemTextLeftSale: { left:0, fontSize: moderateScale(15, 0), color: "#FF3B30", position:"absolute"},
  itemTextSale: { fontSize: moderateScale(15, 0), color:"#FF3B30", position:"absolute", right:0},

  height: { height: '100%' },
  flexEndCenter: { justifyContent: 'center', alignItems: 'flex-end' },
  rowLine:{
    paddingTop: 10,
    marginBottom: 20,
    borderBottomColor:"rgba(0, 0, 0, 0.2)",
    borderBottomWidth:1,
    width:"90%",
  },
  scrollViewFlex: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 20,
    height:"100%",
    width:"100%",
    position:"relative",
    backgroundColor: "#FFFFFF",

  },
  noCardText: { fontFamily: Fonts.BaseFont, color: Colors.gradientColor.top, fontSize: 16, marginTop: 30, textAlign: 'center' },
  billView: {
    bottom:0,
    position: "absolute",
    height:"65%",
    width:"100%",
    backgroundColor:"#FFFFFF"
  },
  whiteView: {
    left:0,
    top:0,
    height:"100%",
    width:"100%",
    opacity: 0.5,
    backgroundColor:"#FFFFFF",
    position:"absolute",
  },
  transparentView: {
  },
  backgroundImage: {
    marginTop: 31,
    width: "75%",
    height: "32%",
    resizeMode: "cover",
  },
  processingView:{
    backgroundColor:"#64A901",
    height:40,
    width:"100%",
    position:"absolute",
    top:0,
    alignItems:"center"
  },
  processingText:{
    color: "white",
    fontSize: moderateScaleViewports(15),
    fontFamily: Fonts.BaseFont,
    marginLeft: moderateScaleViewports(10),
    marginRight: moderateScaleViewports(30),
  },
  billContainer:{
    alignItems: "center",
    position:"absolute",
    width:"100%",
    flexDirection:"column"
  },
  row: {
    flex:1,
    height: 21,
    width:"90%",
    marginTop:10,
    flexDirection: "row"
  },
  rowBill: {
    flex:1,
    height: 21,
    width:"90%",
    marginTop:25,
    flexDirection: "row"
  },
  rowTitle: {
    flex:1,
    height: 21,
    width:"90%",
    marginTop:30,
    marginBottom:-30,
    flexDirection: "row"
  },
  cancelStyle: {
    marginRight: 12,
    color: "#fff",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(18, 0)
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScaleViewports(10),
    width: Metrics.width * 0.90,
    height: moderateScaleViewports(55),
    right: "5%",
    marginBottom: isIphoneXorAbove() ? 44 : 0,
    position: "absolute",
    bottom:"13%"
  },
  rowAddCard: {
    marginTop:50,
    marginBottom:10,
    marginLeft:0,
    flex:1,
    height: 21,
    width:"80%",
    flexDirection: "row",
  },

  button: {
    ...baseButton,
    backgroundColor: "#F39100",
    borderRadius: moderateScaleViewports(10),
    flex: 1
  },
  buttonDisable: {
    ...baseButton,
    backgroundColor: "#979797",
    flex: 1
  },
  buttonText: {
    color: "white",
    fontSize: moderateScaleViewports(16),
    fontFamily: Fonts.BaseFont,
    marginLeft: moderateScaleViewports(10),
    marginRight: moderateScaleViewports(30),
  },
  balanceMinutesContainer:{
    width:"80%",
    height:85,
    marginLeft:"10%",
    position:"absolute",
  },
  balanceTitle:{
    color:"rgba(255, 255, 255, 0.8)",
    fontSize: 18,
    position:"absolute",
    top:0,
    marginBottom:100,
    fontFamily: Fonts.BaseFont,
  },

  balanceMinutes:{
    color:"#FFFFFF",
    fontSize: 26,
    fontFamily: Fonts.BaseFont,
  },
  minutesLeftContainer: {
    ...baseWell,
    backgroundColor: "#522092"
  },
});
