import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Themes";

const width = Dimensions.get("window").width - 20;

export default StyleSheet.create({
  nextText: {
    color: Colors.primaryColor,
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 11,
    alignSelf: "flex-end",
    marginRight: 12
  }
});
