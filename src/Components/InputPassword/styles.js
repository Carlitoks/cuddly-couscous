import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Themes";

const width = Dimensions.get("window").width - 20;

export default StyleSheet.create({
  viewContainer: {
    width: width
  },
  icon: {
    color: Colors.formInputIconColor,
    fontSize: 23,
    position: "absolute",
    top: 12,
    right: 15
  }
});
