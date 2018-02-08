import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";

const width = Dimensions.get("window").width - 20;

export default StyleSheet.create({
  formInput: {
    color: Colors.black,
    fontFamily: Fonts.primaryBaseFont,
    paddingBottom: 20
  }
});
