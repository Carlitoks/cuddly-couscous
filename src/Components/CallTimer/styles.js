import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60
  },
  CallTime: {
    fontFamily: Fonts.LightFont,
    textAlign: "center",
    color: Colors.primaryColor
  },
  button: {
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    width: 125,
    height: 32,
    paddingTop: 5,
    paddingBottom: 5
  },
  text: {
    fontFamily: Fonts.LightFont,
    color: Colors.primaryColor,
    fontSize: 14
  }
});
