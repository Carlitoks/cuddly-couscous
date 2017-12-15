import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Themes";

const width = Dimensions.get("window").width - 20;

export default StyleSheet.create({
  logo: {
    width: 160,
    height: 60,
    marginTop: 30,
    marginBottom: 40
  },
  call: {
    width: 100,
    height: 60,
    marginBottom: 10
  },
  red: {
    color: "red"
  },
  center: {
    alignSelf: "center"
  },
  background: {
    backgroundColor: "#EFEFF4",
    height: "100%"
  },
  mainButton: {
    paddingTop: "50px",
    paddingBottom: "50px",
    width: width
  },
  card: {
    width: "90%",
    borderRadius: 10,
    paddingTop: 25,
    paddingBottom: 25
  },
  button: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 30,
    width: "100%",
    height: 60
  },
  buttonQR: {
    backgroundColor: "transparent",
    borderRadius: 10,
    width: "90%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 30,
    paddingBottom: 30
  },
  textQR: {
    color: Colors.primaryColor,
    fontSize: 16
  },
  textBecome: {
    color: Colors.primaryColor,
    fontSize: 16,
    marginTop: 15,
    marginBottom: 20
  },
  textCenter: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 10
  },
  linkLogin: {
    color: Colors.primaryColor,
    padding: 10
  },
  buttonText: {
    fontSize: 17,
    color: "#ffffff"
  }
});
