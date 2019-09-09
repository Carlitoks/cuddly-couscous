import { StyleSheet } from "react-native";
import { moderateScaleViewports, setTextProperties } from "../../../../Util/Scaling";
import { Metrics, Colors, Fonts } from "../../../../Themes";

const primaryButton = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderRadius: 4,
};

export default StyleSheet.create({
  callButtonContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: moderateScaleViewports(10),
    maxHeight: Metrics.height * 0.8,
    padding: moderateScaleViewports(20),
  },
  title: {
    fontFamily: Fonts.BaseFont, 
    fontSize: 20,
    fontWeight: 'bold',
  },
  perms:{
    marginTop: moderateScaleViewports(20),
    flexDirection: 'row',
  },
  permsContent:{
    marginLeft: moderateScaleViewports(20),
    flexDirection: 'column',
  },
  permsTitle:{
    fontFamily: Fonts.BaseFont, 
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: moderateScaleViewports(10)
  },
  permsDescription: {
    fontFamily: Fonts.BaseFont, 
    fontSize: 13,
    marginRight: 20,
    paddingRight: 20,
    paddingBottom: 20,

  },
  icon:{
  },
  scrollViewFlex: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingBottom: 20,
    height: '80%'
  },
  buttonsContainer:{
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: 'center',
  },
  continueButtonContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  continueButton: {
    ...primaryButton,
    backgroundColor: "#391367",
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.38,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 8,
    paddingRight: moderateScaleViewports(15),
    paddingLeft: moderateScaleViewports(15),
  },
  continueButtonText: {
    ...setTextProperties('#fff', Fonts.BaseFont, moderateScaleViewports(16), '600'),
    paddingTop: moderateScaleViewports(10),
    paddingBottom: moderateScaleViewports(10),
  },
  askLater:{
    ...setTextProperties('#fff', Fonts.BaseFont, moderateScaleViewports(16), '600'),
    color: "#401674"

  }
});
