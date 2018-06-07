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
    marginBottom: 15,
    fontSize: 16,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center"
  },
  starContainer: {
    justifyContent: "center"
  },
  stars: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 0
  },
  viewContainerThumbs: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 0
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
  instabugText: {
    color: Colors.gradientColor.top,
    fontSize: 12,
    fontStyle: "italic",
    padding: 10,
    marginTop: 15,
    alignSelf: "center"
  },
  iconList: {
    marginTop: 30,
    marginBottom: 0
  }
});
