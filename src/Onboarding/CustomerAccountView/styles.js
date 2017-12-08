import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width - 20;
const color = "#0487d4";

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
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: width
  },
  title: {
    fontSize: 30,
    fontFamily: "System",
    marginLeft: 10,
    marginTop: 20,
    alignSelf: "flex-start",
    width: width
  },
  Button: {
    marginTop: 10,
    borderRadius: 25,
    width: width,
    backgroundColor: color
  },
  Icon: {
    width: width
  },
  transparentButton: {
    borderRadius: 25,
    width: width,
    marginTop: 20
  }
});
