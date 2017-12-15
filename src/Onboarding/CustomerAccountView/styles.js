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
    fontFamily: Fonts.primaryFont,
    marginLeft: 10,
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
  transparentButton: {
    borderRadius: 25,
    width: "100%",
    marginTop: 20
  },
  Text: {
    color: Colors.primaryColor,
    textAlign: "center"
  }
});
