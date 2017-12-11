import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#e4e4f7",
    justifyContent: "center",
    alignItems: "center"
  },
  Icon: {
    width: width
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 10
  },
  arrowBack: {
    flex: 1,
    alignItems: "flex-start"
  },
  settings: {
    flex: 1,
    alignItems: "flex-end"
  },
  mainTitle: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 15,
    marginTop: 20,
    color: "#7c7cad",
    lineHeight: 40
  },
  containerSearch: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginTop: 20,
    marginLeft: 5
  },
  inputSearch: {
    backgroundColor: "#ffffff",
    borderRadius: 10
  },
  buttonStep: {
    backgroundColor: "#a3a3df",
    width: Dimensions.get("window").width
  }
});
