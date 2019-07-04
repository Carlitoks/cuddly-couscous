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
    justifyContent: "space-between",
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
    height:"15%",
    width:"100%",
    backgroundColor:"#3F1674"
  },
  balanceMinutesContainer:{
    flex:1,
    width:"80%",
    height:85,
    marginLeft:"10%",
    position:"relative",
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
    top: 25,
    fontSize: 26,
    fontFamily: Fonts.BaseFont,
    position:"absolute",
    backgroundColor:"rgba(255, 59, 48, 0.9);",
  },
  balanceDescription:{
    top:60,
    position:"absolute",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontFamily: Fonts.BaseFont,
  },
  creditCardContainer:{
    marginTop:30,
    width:"100%",
    height:"35%",
    backgroundColor:"#FFF"
  },
  row:{
    flexDirection:"row",
    width:"90%",
    paddingTop:20,
    marginLeft:20,
    fontWeight: "bold",
  },
  creditCardTitle:{
    color: "#272833",
    fontSize: 18,
    fontFamily: Fonts.BaseFont,
  },
  backgroundImage: {
    width: 160,
    height: 100,
    resizeMode: 'cover',
  },
});
