import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";

const width = Dimensions.get("window").width - 20;

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  formContainer: {
    marginTop: 20,
    marginRight: 11,
    marginLeft: 10,
    backgroundColor: "white",
    alignItems: "center",
    width: width
  },
  title: {
    fontSize: 30,
    marginLeft: 10,
    marginTop: 15,
    fontFamily: Fonts.primaryFont,
    alignSelf: "flex-start",
    width: width
  },
  Button: {
    marginTop: 10,
    borderRadius: 25,
    backgroundColor: Colors.primaryColor,
    width: "100%",
    alignSelf: "center"
  },
  forgotPasswordText: {
    color: Colors.primaryColor,
    padding: 10,
    alignSelf: "center"
  }
});
