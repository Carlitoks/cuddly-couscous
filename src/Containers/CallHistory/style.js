import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width
  },
  title: {
    fontSize: 30,
    marginTop: 10,
    fontFamily: "System",
    textAlign: "center",
    width: width
  },
  tabTextStyle: {
    color: "#ffffff",
    fontWeight: "bold"
  },
  tabStyle: {
    backgroundColor: "rgba(255, 255, 255,0)",
    borderWidth: 1,
    borderColor: "white"
  },
  tabsContainerStyle: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40
  }
});
