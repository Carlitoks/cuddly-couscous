import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Themes";

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  containerInformation: {
    paddingTop: 30,
    justifyContent: "space-around",
    paddingBottom: 30,
    backgroundColor: "#eeeeee"
  },
  linguistAvatar: {
    marginBottom: 30
  },
  avatarContent: {
    marginLeft: 20
  },
  linguistInformation: {
    alignItems: "flex-start"
  },
  linguistName: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.primaryColor,
    marginLeft: 30,
    marginTop: 25
  },
  linguistAddress: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primaryColor,
    flexDirection: "column",
    alignItems: "flex-end"
  },
  starContainer: {
    width: "70%"
  },
  callContainer: {
    marginTop: 30
  },
  callInformation: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15
  },
  alignIcon: {
    alignItems: "center"
  },
  iconStyle: {
    marginLeft: 30
  },
  textLinguist: {
    fontSize: 18
  }
});
