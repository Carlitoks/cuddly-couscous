import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Themes";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  Button: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    borderRadius: 0,
    paddingLeft: 0,
    marginLeft: "10%",
    paddingTop: 25,
    paddingBottom: 25
  },
  colorText: {
    color: "#000000",
    fontSize: 18,
    textAlign: "left",
    alignContent: "flex-start",
    width: "100%",
    marginLeft: 0,
    paddingLeft: 0,
    paddingTop: 12,
    paddingBottom: 12
  },
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
  textCountry: {
    fontSize: 15,
    alignSelf: "center",
    color: "#A9A9A9"
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
  button: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: "90%",
    height: 80,
    marginBottom: 20
  },
  buttonQR: {
    backgroundColor: Colors.primaryBackgroundColor,
    borderRadius: 20,
    marginTop: 20,
    width: "90%",
    height: 80
  },
  buttonSchedule: {
    backgroundColor: Colors.primaryBackgroundColor,
    borderRadius: 20,
    width: "90%",
    height: 80
  },
  buttonFavorites: {
    backgroundColor: Colors.primaryBackgroundColor,
    borderRadius: 20,
    width: "90%",
    height: 80,
    marginBottom: 100
  },
  buttonTextSecondary: {
    fontSize: 17,
    color: Colors.primaryColor,
    fontWeight: "500"
  },
  buttonText: {
    fontSize: 17,
    color: Colors.primaryColor,
    fontWeight: "500",
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
  iconView: {
    flex: 1,
    alignItems: "flex-start",
    height: 100,
    alignItems: "baseline"
  },
  icon: {
    paddingTop: 10,
    paddingLeft: 10
  },
  callLinguistContainer: {
    display: "flex",
    flexDirection: "row"
  },
  box3: {
    flex: 1
  },
  iconV: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    paddingLeft: 20
  },
  icon: {
    color: "#9391f7"
  }
});
