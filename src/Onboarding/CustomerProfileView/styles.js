import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "white"
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },
  col: {
    backgroundColor: "white",
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
