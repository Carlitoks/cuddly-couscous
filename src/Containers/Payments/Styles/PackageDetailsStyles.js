import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../Themes";
import { moderateScale } from "../../../Util/Scaling";
import { moderateScaleViewports } from "../../../Util/Scaling";
import { isIphoneXorAbove } from "../../../Util/Devices";

const baseButton = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: moderateScaleViewports(10),
  height: "100%",
  bottom: 0,
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
  itemTextLeftTitle: {left:0, fontSize: moderateScale(15, 0), color: "#272833",  fontWeight:"bold" },
  itemTextLeft: {width:'75%', left:0, fontSize: moderateScale(15, 0), color: "#272833"},
  itemText: {textAlign:"right", flex:1, fontSize: moderateScale(15, 0), color:"#272833"},
  itemTextTitle: {textAlign:"right", flex:1, fontSize: moderateScale(15, 0), color:"#272833", fontWeight:"bold"},
  textAddCard: {textAlign:"right",fontSize: moderateScale(15, 0), color: "#272833", flexWrap: 'wrap', flex:1},
  itemTextLeftSale: { left:0, fontSize: moderateScale(15, 0), color: "#FF3B30"},
  itemTextSale: {textAlign:"right",flex:1, fontSize: moderateScale(15, 0), color:"#FF3B30"},
  editText: {textAlign:"right",flex:1, fontSize: moderateScale(15, 0), color:"#007AFF"},
  descriptionAddCard: { height:'100%', flex:1, flexWrap:"wrap", fontSize: moderateScale(15, 0), color: "#272833"},

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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 20,
    backgroundColor: "#F2F2F2"

  },
  noCardText: { fontFamily: Fonts.BaseFont, color: Colors.gradientColor.top, fontSize: 16, marginTop: 30, textAlign: 'center' },
  billView: {
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
    marginTop:30,
    paddingTop:20,
    paddingBottom:20,
    width:"100%",
    height:"100%",
    backgroundColor:"#FFF",
  },
  row: {
    width:"90%",
    marginTop:10,
    flexDirection: "row"
  },
  rowBill: {
    width:"90%",
    marginTop:25,
    flexDirection: "row"
  },
  rowTitle: {
    width:"90%",
    flexDirection: "row",
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
    marginTop: 15,
  },
  rowAddCard: {
    marginTop:14,
    marginBottom:5,
    marginLeft:0,
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
    fontSize: moderateScaleViewports(10),
    fontFamily: Fonts.BaseFont,
    marginLeft: moderateScaleViewports(10),
    marginRight: moderateScaleViewports(30),
  },
  addCardButton: {
    ...baseButton,
    backgroundColor: "#F39100",
    borderRadius: moderateScaleViewports(5),
    borderBottomLeftRadius: moderateScaleViewports(5),
    borderBottomRightRadius: moderateScaleViewports(5),
    height: moderateScaleViewports(20),
    width:moderateScaleViewports(100),
    flex: 1
  },
  addPackageButtonText:{
    color: "#FFF",
    fontSize: moderateScale(12, 0),
    fontFamily: Fonts.BaseFont,
  },
  buttonAddContainer: {
    height: moderateScaleViewports(30),
    position: "absolute",
    right:0,
  },
});
