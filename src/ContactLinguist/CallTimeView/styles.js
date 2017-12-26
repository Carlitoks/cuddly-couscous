import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Themes";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  scrollContainer: {
    width: "100%",
    backgroundColor: Colors.primaryFillColor,
    height: "100%",
    flex: 1,
    flexDirection: "column"
  },
  containerContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start"
  },
  Icon: {
    width: width
  },
  container: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d0cffe"
  },
  containerBottom: {
    alignItems: "flex-end",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonAccept: {
    width: width,
    backgroundColor: Colors.primaryColor
  },
  button: {
    backgroundColor: Colors.primaryColor
  },
  mainTitle: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 15,
    marginTop: 20,
    color: Colors.primaryColor,
    lineHeight: 40,
    margin: 5
  },
  costCall: {
    fontSize: 24,
    marginBottom: 15,
    marginTop: 35,
    color: Colors.primaryColor,
    //width: "50%",
    alignItems: "center"
  },
  costCallContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  picker: {
    width: "100%",
    marginTop: 30
  }
});
