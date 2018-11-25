import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.gradientColor.top
  },
  mainMessageContainer: {
    height: 210,
    width: 269,
    position: "absolute",
    top: "33%",

    alignSelf: "center",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  mainMessage: {
    flex: 1,
    textAlign: "center",
    fontFamily: Fonts.BaseFont,
    fontSize: 20,
    lineHeight: 20,
    color: Colors.white,
    alignSelf: "center"
  },
  modalWrapper: {
    height,
    width
  }
});
