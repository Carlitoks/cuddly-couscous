import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width - 20;
export const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
    backgroundColor: "#e4e4f7",
    height: "100%",
    flex: 1,
    flexDirection: "column"
  },
  containerContent: {
    flex: 2,
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#d0cffe"
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
  arrowBack: {
    flex: 1,
    alignItems: "flex-start"
  },
  settings: {
    flex: 1,
    alignItems: "flex-end"
  },
  buttonAccept: {
    width: "100%",
    backgroundColor: "#a3a3df"
  },
  mainTitle: {
    fontSize: 28,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 20,
    color: "#7c7cad",
    lineHeight: 40
  },
  costCall: {
    fontSize: 24,
    marginBottom: 15,
    marginTop: 35,
    color: "#7c7cad",
    width: "35%",
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
