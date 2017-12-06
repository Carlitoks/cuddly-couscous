import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width - 20;
export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#f7f7f7"
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
  Icon: {
    width: width
  },
  personalInformation: {
    width: width,
    backgroundColor: "white",
    paddingTop: 30,
    paddingLeft: 20
  }
});
