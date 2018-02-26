import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale } from "../../Util/Scaling";

const width = Dimensions.get("window").width - 20;

export default StyleSheet.create({
  container: {
    marginTop: moderateScale(45),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.placeholderColor,
    width: "85%",
    alignSelf: "center",
  },
  secondary:{
    borderTopWidth: 0,
    marginTop: 0,
  },
  formInput: {
    color: Colors.black,
    fontFamily: Fonts.primaryBaseFont,
    justifyContent: "center",
    height: 37,
    paddingTop:0,
    paddingLeft:0,
  }
});
