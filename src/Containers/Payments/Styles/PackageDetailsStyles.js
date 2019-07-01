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
  itemTextLeftTitle: { left:0, fontSize: moderateScale(15, 0), color: "#272833", position:"absolute",  fontWeight:"bold" },
  itemTextLeft: { left:0, fontSize: moderateScale(15, 0), color: "#272833", position:"absolute"},
  itemText: { fontSize: moderateScale(15, 0), color:"#272833", position:"absolute", right:0},
  itemTextTitle: { fontSize: moderateScale(15, 0), color:"#272833", position:"absolute", right:0, fontWeight:"bold"},

  height: { height: '100%' },
  flexEndCenter: { justifyContent: 'center', alignItems: 'flex-end' },
  rowLine:{
    paddingTop: 10,
    borderBottomColor:"rgba(0, 0, 0, 0.2)",
    borderBottomWidth:1,
    width:"90%",
  },
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
});
