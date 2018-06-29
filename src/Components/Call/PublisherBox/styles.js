import { StyleSheet } from "react-native";
import { Fonts, Colors, Metrics } from "../../../Themes";

export default StyleSheet.create({
  publisherBox: {
    height: 154,
    width: 86,
    backgroundColor: Colors.black,
    top: "5.5%",
    right: 20,
    position: "absolute",
    zIndex: 99999999999,
    transform: [{ translate: [0, 0, 1] }]
  },
  hidePublisherBox: {
    display: "none"
  },
  publisher: {
    height: "100%",
    width: "100%"
  }
});
