import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../Themes";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  center: {
    alignSelf: "center"
  },
  logo: {
    marginTop: 20,
    marginBottom: 10,
    width: 120,
    height: 120,
    borderRadius: 60
  },
  textName: {
    fontSize: 22,
    fontWeight: "300",
    alignSelf: "center",
    color: "#ffffff"
  },
  textStars: {
    fontSize: 22,
    paddingLeft: 8,
    lineHeight: 33,
    alignSelf: "center",
    fontWeight: "400",
    marginBottom: 15,
    color: Colors.primaryColor
  },
  calls: {
    width: "50%"
  },
  button: {
    backgroundColor: "#a6a6ff",
    borderRadius: 10,
    height: 100,
    marginBottom: 20
  },
  amount: {
    width: "50%"
  },
  TitleText: {
    fontSize: 17,
    color: Colors.fontColor,
    display: "flex",
    alignItems: "center"
  },
  callNumber: {
    fontSize: 30,
    color: Colors.fontColor,
    display: "flex",
    alignItems: "center"
  },
  stars: {
    width: 150,
    marginBottom: 30
  },
  containerButtons: {
    backgroundColor: "#ffffff",
    bottom: 0,
    width: "100%",
    minHeight: 300
  },
  containerPerfil: {
    backgroundColor: Colors.primaryFillColor
  },
  starsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    width: "100%",
    height: 80
  },
  status: {
    marginLeft: 20,
  },

  StatusText: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.primaryColor
  },
  switch: {
    width: "100%",
    paddingRight: 65
  },
  badgeText: {
    color: Colors.badgeColor,
    fontSize: 20
  }

});
