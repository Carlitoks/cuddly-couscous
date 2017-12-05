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
    backgroundColor: "#f7f7f7",
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
    backgroundColor: "#f7f7f7",
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft: 20
  },
  picker: {
    width: width,
    backgroundColor: "white",
    marginLeft: 25
  },
  headerOptions: {
    width: width,
    backgroundColor: "#f7f7f7",
    paddingTop: 30,
    paddingLeft: 20,
    paddingBottom: 20
  },
  inputStyle: {
    backgroundColor: "white"
  },
  tabStyle: {
    backgroundColor: "white",
    borderColor: "#03a6a7"
  },
  tabTextStyle: {
    color: "#03a6a7"
  },
  activeTabStyle: {
    backgroundColor: "#03a6a7"
  },
  activeTabTextStyle: {
    color: "white"
  }
});
