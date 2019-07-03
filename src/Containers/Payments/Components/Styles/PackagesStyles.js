import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../../Themes";
import { moderateScaleViewports } from "../../../../Util/Scaling";
import metrics from "../../../../Themes/Metrics";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainBorderContainer: {
    width: metrics.width * 0.9,
  },
  grandient: {
    backgroundColor: '#F39100',
    borderTopLeftRadius: moderateScaleViewports(10),
    borderTopRightRadius: moderateScaleViewports(10),
    flexDirection: 'row',
    justifyContent: 'center',
    width: "100%",
    height: moderateScaleViewports(17)
  },
  specialContainer:{
    height: 100,
    width: 100,
    backgroundColor: '#F39100',
    
    overflow: 'visible',
    alignItems: 'center',
    textAlign: 'center',
  },
  specialText: {
    color:  '#FFF',
    fontFamily: Fonts.BaseFont, 
    fontSize: 17,
    alignItems: 'center',
    textAlign: 'center',
  },
  borderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: "100%",
    height: moderateScaleViewports(31),
    alignItems: 'center',
  },
  grandient: {
    width: "100%",
    zIndex: -10,
    backgroundColor: '#F39100',
    borderTopLeftRadius: moderateScaleViewports(10),
    borderTopRightRadius: moderateScaleViewports(10),
    height: moderateScaleViewports(17)
  },
  specialContainer2:{
    zIndex: 10,
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
    backgroundColor: '#FFF',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: moderateScaleViewports(15),
    paddingLeft: moderateScaleViewports(14),
    paddingRight: moderateScaleViewports(14)
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
  },
  price: {
    fontFamily: Fonts.BaseFont, 
    fontSize: 20,
    fontWeight: 'bold',
  },
  discountedPrice:{
    fontFamily: Fonts.BaseFont, 
    fontSize: 20,
    fontWeight: 'bold',
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
    fontSize: 17,
  },

});
