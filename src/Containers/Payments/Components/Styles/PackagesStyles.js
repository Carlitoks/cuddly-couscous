import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../../Themes";
import { moderateScaleViewports } from "../../../../Util/Scaling";
import metrics from "../../../../Themes/Metrics";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  topContainer: {
    marginTop: moderateScaleViewports(10),
    alignItems: 'center',
    width: metrics.width * 0.9,
  },
  borderContainer: {
    width: "100%",
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: moderateScaleViewports(7),
  },
  grandient: {
    width: "100%",
    backgroundColor: '#F39100',
    borderTopLeftRadius: moderateScaleViewports(10),
    borderTopRightRadius: moderateScaleViewports(10),
    height: moderateScaleViewports(17)
  },
  rowContainer:{
    elevation:100,
    zIndex: 50,
    height: moderateScaleViewports(31),
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  specialContainer:{
    zIndex: 50,
    elevation:100,
    borderRadius: moderateScaleViewports(4),
    height: moderateScaleViewports(31),
    width: moderateScaleViewports(102),
    position: 'absolute',
    backgroundColor: '#F39100',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  specialText: {
    color:  '#FFF',
    fontFamily: Fonts.BaseFont, 
    fontSize: 17,
    textAlign: 'center',
  },
  mainContainer: {
    width: "100%",
    backgroundColor: '#FFF',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: moderateScaleViewports(15),
    paddingLeft: moderateScaleViewports(14),
    paddingRight: moderateScaleViewports(14),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2
  },
  headerContainer: {
    paddingTop: moderateScaleViewports(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Fonts.BaseFont, 
    fontSize: 18,
    fontWeight: 'bold',
    width:'70%'
  },
  price: {
    fontFamily: Fonts.BaseFont, 
    fontSize: 20,
    fontWeight: 'bold',
    width:'30%'

  },
  discountedPrice:{
    fontFamily: Fonts.BaseFont, 
    fontSize: 20,
    fontWeight: 'bold',
    width:'30%',
    color: 'red'
  },
  pricePromoCode:{
    fontFamily: Fonts.BaseFont, 
    fontSize: 20, 
    textAlign: 'right',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontWeight: 'bold'
  },
  select: {
    color:  '#64A901',
    fontFamily: Fonts.BaseFont, 
    fontSize: 17,
    alignItems: 'center',
    textAlign: 'center',
  },
  scenarioInputContainer:{
    paddingBottom: moderateScaleViewports(20),
    alignItems: 'flex-end',
    marginTop: 10,
  },
  button:{
    flexDirection: 'column',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#64A901',
    borderRadius: moderateScaleViewports(5),
    borderStyle: 'solid',
    width: moderateScaleViewports(108),
    height: moderateScaleViewports(30)
  },
  checkBox: {
    fontFamily: Fonts.BaseFont, 
    fontSize: 12,
    fontWeight:"normal",
  },
  checkboxContainer:{
    backgroundColor: "#FFFFFF",
    borderWidth: 0,
  },
  space:{
    height: moderateScaleViewports(30),
    width: '100%',
  },
});
