import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../Themes";
import { moderateScale } from "../../../Util/Scaling";
import { red } from 'ansi-colors';

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
  itemTextLeftTitle: { left:0, fontSize: moderateScale(15, 0), color: "#272833", position:"absolute", left:0 },
  itemText: { fontSize: moderateScale(15, 0), color: "rgba(0, 0, 0, 0.541327)", position:"absolute", right:0},

  height: { height: '100%' },
  flexEndCenter: { justifyContent: 'center', alignItems: 'flex-end' },
  scrollViewFlex: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    height:"100%",
    width:"100%",
    position:"relative",
    backgroundColor: "#F2F2F2"
  },
  noCardText: { fontFamily: Fonts.BaseFont, color: Colors.gradientColor.top, fontSize: 16, marginTop: 30, textAlign: 'center' },
  billView: {
    bottom:0,
    position: "absolute",
    height:"65%",
    width:"100%",
    backgroundColor:"#FFFFFF"
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
  cancelStyle: {
    marginRight: 12,
    color: "#fff",
    fontFamily: Fonts.BaseFont,
    fontSize: moderateScale(18, 0)
  },
});
