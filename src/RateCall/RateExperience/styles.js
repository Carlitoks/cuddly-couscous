import { StyleSheet, Dimensions } from "react-native";
import { Fonts, Colors } from "../../Themes";
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
  linguistAvatar: {
    alignItems: "flex-end"
  },
  avatarContent: {
    marginRight: 50
  },
  linguistInformation: {
    alignItems: "flex-start"
  },
  linguistName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#888888",
    marginLeft: 20
  },
  linguistAddress: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#888888",
    flexDirection: "column",
    alignItems: "flex-end",
    opacity: 0
  },
  textContainer: {
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 5
  },
  textQuestions: {
    fontSize: 15,
    fontWeight: "bold"
  },
  starContainer: {
    justifyContent: "center"
  },
  stars: {
    justifyContent: "space-between",
    width: "70%"
  },
  viewContainerThumbs: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "space-between"
  },
  viewContainerQuestion: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  buttonSubmit: {
    marginTop: 20,
    backgroundColor: "#3b98b7",
    width: width - 30,
    borderRadius: 10
  },
  thumbsUp: {
    paddingRight: 30
  },
  thumbsDown: {
    paddingLeft: 30
  },
  questionIcons: {
    paddingLeft: 20,
    paddingRight: 10
  },
  forgotPasswordText: {
    color: Colors.gradientColorButton.top,
    fontWeight: "bold",
    textDecorationLine: "underline",
    padding: 10,
    marginTop: 15,
    alignSelf: "center"
  }
});
