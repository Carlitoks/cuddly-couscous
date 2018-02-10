import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";

const width = Dimensions.get("window").width - 20;

export default StyleSheet.create({
  viewContainer: {
    width: width
  },
  icon: {
    color: Colors.formInputIconColor,
    fontSize: 23,
    position: "absolute",
    top: 20,
    right: 15
  },
  formInput: {
    color: Colors.black,
    fontFamily: Fonts.primaryBaseFont,
    paddingBottom: 20
  }
});
