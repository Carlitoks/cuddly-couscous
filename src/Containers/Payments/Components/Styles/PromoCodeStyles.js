import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../../Themes";
import { moderateScaleViewports } from "../../../../Util/Scaling";
import metrics from "../../../../Themes/Metrics";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  promoCodeContainer: {
    width: metrics.width * 0.9,
  },
  promoCodeLabel: {
    fontFamily: Fonts.BaseFont,
    fontSize: 14,
    alignItems: 'center',
    color: 'black',
  },

  apply: {
    width: 73,
    height: 40,
    color: '#401674',
  },
  inputContainer:{
    backgroundColor: 'red',
    height: 40,
    width: "90%",
    flexDirection: 'row',
    justifyContent: 'center',
    position:"relative"
    
  },
  button:{
    flexDirection: 'column',
    justifyContent: 'center',
    width: moderateScaleViewports(73),
    height: moderateScaleViewports(40),
    backgroundColor: '#401674',
    borderTopRightRadius: moderateScaleViewports(10),
    borderBottomRightRadius: moderateScaleViewports(10),
    position:"absolute",
    right:0,
  },
  applyText:{
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  input:{
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    width: '80%',
    backgroundColor: "#F5F5F5",
    position:"absolute",
    left:0
  }
});
