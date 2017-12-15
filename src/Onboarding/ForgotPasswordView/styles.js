import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";

const width = Dimensions.get("window").width - 20;

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  formContainer: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: width
  },
  title: {
    fontSize: 30,
    marginLeft: 10,
    fontFamily: Fonts.primaryFont,
    marginTop: 15,
    alignSelf: "flex-start",
    width: width
  },
  Button: {
    marginTop: 10,
    borderRadius: 25,
    width: "100%",
    backgroundColor: Colors.primaryColor
  },
  linksText: {
    color: Colors.primaryColor,
    alignSelf: "center",
    padding: 10
  }
});
