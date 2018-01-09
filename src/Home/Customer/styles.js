import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  Button: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    borderRadius: 0,
    paddingLeft: 0,
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
  avatar: { alignSelf: "center" },
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
    backgroundColor: Colors.primaryLightFillColor,
    width: "90%",
    height: 80,
    borderRadius: 15
  },
  buttonQR: {
    width: "100%",
    height: 80,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    borderRadius: 0
  },
  buttonSchedule: {
    backgroundColor: Colors.primaryBackgroundColor,
    borderRadius: 20,
    width: "100%",
    height: 80
  },
  buttonFavorites: {
    marginBottom: 50,
    marginTop: 20,
    backgroundColor: Colors.primaryLightFillColor,
    borderRadius: 20,
    width: "100%",
    height: 80
  },
  buttonTextSecondary: {
    fontSize: 16,
    color: "gray",
    fontFamily: Fonts.primaryBaseFont,
    alignItems: "center"
  },
  buttonPollingText: {
    fontSize: 16,
    color: Colors.primaryAltFontColor,
    fontFamily: Fonts.primaryBaseFont,
    alignItems: "center"
  },
  buttonText: {
    fontSize: 16,
    color: Colors.primaryAltFontColor,
    fontFamily: Fonts.primaryBoldFont,
    alignItems: "center",
    fontWeight: "bold"
  },
  stars: {
    width: 100,
    marginTop: 8,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0)" 
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
    height: 80,
    backgroundColor: "rgba(255, 255, 255, 0)" 
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
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  callLinguistContainer: {
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 5,
    width:"100%"
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
  },
  badgeContainer: {
    backgroundColor: "white",
    height: 30,
    width: 42,
    zIndex: 0,
    alignSelf: "center",
    position: "absolute",
    margin: -20
  },
  badgeText: {
    fontSize: 12,
    color: "black",
    fontFamily: Fonts.primaryLightFont
  },
  title: {
    fontSize: 16,
    color: Colors.primaryColor,
    fontFamily: Fonts.primaryLightFont
  }
});
