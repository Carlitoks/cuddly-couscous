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
  Icon: {
    width: width
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 10
  },
  mainTitle: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 15,
    marginTop: 10,
    color: Colors.primaryColor,
    lineHeight: 40
  },
  containerSearch: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginTop: 20
  },
  inputSearch: {
    backgroundColor: "#ffffff",
    borderRadius: 10
  },
  buttonStep: {
    backgroundColor: Colors.primaryColor,
    width: width
  },
  containerBottom: {
    alignItems: "flex-end",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
