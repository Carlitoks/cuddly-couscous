import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../../Themes";
import { moderateScaleViewports } from "../../../../Util/Scaling";
import metrics from "../../../../Themes/Metrics";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  promoCodeContainer: {
    width: '100%',
    backgroundColor:"#FFFFFF",
    flexDirection:"column",
    padding:moderateScaleViewports(30),
    paddingTop: 10,
    marginBottom: 10,
  },
  promoCodeLabel: {
    fontFamily: Fonts.BaseFont,
    fontSize: 14,
    alignItems: 'center',
    color: 'black',
    fontWeight:"bold",
    paddingBottom:5,
  },
  apply: {
    width: 73,
    height: 40,
    color: '#401674',
  },
  inputContainer:{
    backgroundColor: 'blue',
    height: 40,
    width: "90%",
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    marginRight: 10,
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
  disabledbutton:{
    flexDirection: 'column',
    justifyContent: 'center',
    width: moderateScaleViewports(73),
    height: moderateScaleViewports(40),
    backgroundColor: '#979797',
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
    paddingLeft: moderateScaleViewports(5),
    height: moderateScaleViewports(40),
    borderTopLeftRadius: moderateScaleViewports(10),
    borderBottomLeftRadius: moderateScaleViewports(10),
    borderColor: 'gray', 
    borderWidth: 1,
    width: '80%',
    backgroundColor: "#F5F5F5",
    left:0
  },
   infoContainer:{
    flexDirection: "row",
    height:18,
    width:"95%",
    marginTop: 7,
    position:"relative",
    
  },
  remove: {
    fontFamily: Fonts.BaseFont,
    fontSize: 14,
    alignItems: 'center',
    color: '#007AFF',
    position:"absolute",
    right:0,
  },
  message: {
    fontFamily: Fonts.BaseFont,
    fontSize: 14,
    alignItems: 'center',
    color: 'rgba(0, 0, 0, 0.9);',
  },
  messageError:{
    fontFamily: Fonts.BaseFont,
    fontSize: 14,
    alignItems: 'center',
    color: '#F53333',
  },
  inputError:{
    paddingLeft: moderateScaleViewports(5),
    height: moderateScaleViewports(40), 
    borderColor: '#FF3B30', 
    borderWidth: 1,
    width: '80%',
    left:0
  },
  buttonError:{
    flexDirection: 'column',
    justifyContent: 'center',
    width: moderateScaleViewports(73),
    height: moderateScaleViewports(40),
    backgroundColor: '#FF3B30',
    borderTopRightRadius: moderateScaleViewports(10),
    borderBottomRightRadius: moderateScaleViewports(10),
    position:"absolute",
    right:0,
  }
});
