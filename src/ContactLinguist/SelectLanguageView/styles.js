import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Themes";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    width: width,
    backgroundColor: Colors.primaryFillColor,
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
    color: Colors.primaryColor,
    lineHeight: 40
  },
  languages: {
    flex: 1,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  english: {
    fontSize: 24,
    color: Colors.primaryColor,
    marginLeft: 50
  },
  spanish: {
    fontSize: 24,
    color: Colors.primaryColor,
    marginRight: 50
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
    backgroundColor: Colors.primaryColor,
    width: width
  },
  scroll:{
     width:width
  }
});
