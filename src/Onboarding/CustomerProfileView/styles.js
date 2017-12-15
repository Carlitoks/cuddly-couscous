import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width - 20;

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center"
  },
  col: {
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
  personalInformation: {
    fontSize: 17,
    width: width,
    paddingTop: 30,
    paddingLeft: 15
  }
});
