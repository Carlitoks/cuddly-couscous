import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  containerInformation: {
    paddingTop: 30,
    justifyContent: "space-around",
    paddingBottom: 30,
    backgroundColor: "#eeeeee"
  },
  LinguistAvatar: {
    alignItems: "flex-end"
  },
  avatarContent: {
    marginRight: 50
  },
  LinguistInformation: {
    alignItems: "flex-start"
  },
  LinguistName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#888888",
    marginLeft: 30
  },
  LinguistAddress: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#888888",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  TextContainer: {
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 5
  },
  TextQuestions: {
    fontSize: 20,
    fontWeight: "bold"
  },
  StarContainer: {
    justifyContent: "center"
  },
  Stars: {
    justifyContent: "space-between",
    width: "70%"
  },
  ViewContainerThumbs: {
    flexDirection: "row",
    justifyContent: "center"
  },
  tabsThumbsIcons: {
    justifyContent: "center",
    width: width - 200,
    height: 50,
    backgroundColor: "transparent",
    borderColor: "transparent"
  },
  tabsIcons: {
    width: width,
    height: 50,
    backgroundColor: "transparent",
    borderColor: "transparent"
  },
  borderTab: {
    borderColor: "transparent"
  },
  buttonSubmit: {
    marginTop: 20,
    backgroundColor: "#3b98b7",
    width: Dimensions.get("window").width - 30,
    borderRadius: 10
  }
});