import { StyleSheet } from "react-native";
import { Fonts, Colors, Metrics } from "../../../Themes";

export default StyleSheet.create({
  sessionContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: Colors.black
  },
  containerCallHiden: {
    width: "0%",
    height: "0%"
  },
  containerCall: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    backgroundColor: Colors.transparent
  }
});
