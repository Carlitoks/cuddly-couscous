import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Themes";

const width = Dimensions.get("window").width - 20;

export default StyleSheet.create({
  Icon: {
    color: Colors.primaryColor,
    marginLeft: 5,
    marginTop: 10,
    alignSelf: "flex-start"
  }
});
