import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale } from "../../Util/Scaling";

const width = Dimensions.get("window").width - 20;

export default StyleSheet.create({
  viewContainer: {
    width: width
  },
  container: {
    borderBottomWidth: 0, 
    paddingTop: 0, 
    flex: 1, 
    height: 42
  },
  secondary:{
    borderTopWidth: 0,
    marginTop: 0,
  },
  icon: {
    color: Colors.formInputIconColor,
    fontSize: 23,
    position: "absolute",
    top: "20%",
    right: "4%"
  },
  iconSecondary: {
    top: "20%",
  },
  formInput: {
    color: Colors.black,
    fontFamily: Fonts.BaseFont,
    paddingTop: 5,
    paddingLeft: 0,
    margin: 0,
    fontSize: 16
  }, 
  viewBorder: { 
    marginTop: moderateScale(45), 
    width: "100%", 
    alignSelf: "center", 
    borderTopWidth: 1, 
    borderBottomWidth: 1, 
    borderColor: Colors.bordersLightGrey, 
    flex: 1 
  } 
});
