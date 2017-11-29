import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width - 20;
export const styles = StyleSheet.create({
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
    marginLeft: 10,
    fontFamily: "System",

    alignSelf: "flex-start",
    width: width
  },
  Button: {
    borderRadius: 25,
    width: width
  },
  Icon: {
    width: width
  }
});
