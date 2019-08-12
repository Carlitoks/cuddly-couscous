import { StyleSheet, Dimensions } from "react-native";
import { Fonts, Colors } from "../../Themes";
import { verticalScale } from "../../Util/Scaling";
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  Button: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    borderRadius: 0,
    paddingLeft: 0,
    marginLeft: "10%",
    paddingTop: 5,
    paddingBottom: 5
  },
  colorText: {
    color: "black",
    fontSize: 18,
    textAlign: "left",
    width: "100%",
    marginLeft: 0,
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 30,
    paddingRight: 30
  },
  center: {
    alignSelf: "center"
  },
  badgeContainer: {
    backgroundColor: Colors.optionMenu,
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
    fontFamily: Fonts.LightFont
  },
  starsContainer: {
    marginTop: 10,
    width: width,
    alignSelf: "center",
    alignItems: "center",
    height: 80
  },
  stars: {
    width: 100,
    marginTop: 8,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  textStars: {
    fontSize: 22,
    paddingLeft: 8,
    lineHeight: 33,
    alignSelf: "center",
    fontWeight: "400",
    marginBottom: 5,
    color: Colors.selectedOptionMenu
  },
  logo: {
    marginTop: 20,
    marginBottom: 10,
    width: 120,
    height: 120,
    borderRadius: 60
  },
  textName: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: "300",
    alignSelf: "center",
    color: Colors.black
  },
  textEditProfile: {
    marginBottom: 10,
    fontSize: 15,
    alignSelf: "center",
    color: Colors.gray
  },
  textCountry: {
    fontSize: 15,
    alignSelf: "center",
    color: "#A9A9A9"
  },
  textStars: {
    fontSize: 15,
    alignSelf: "center",
    fontWeight: "bold",
    marginBottom: 15
  },
  optionMenu: {
    color: Colors.lightGrey,
    marginLeft: 20
  },
  selectedOptionMenu: {
    color: "#6B8FE0",
    marginLeft: 20
  },
  scroll: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginBottom: 50,
    paddingRight: 5,
  },
  container: {
    flex: 1
  },
  version: {
    alignSelf: "center",
    marginBottom: 20
  },
  containerVersion: {
    width: "100%",
    bottom: 0,
    backgroundColor: "white",
    position: "absolute"
  },
  textVersion: {
    color: Colors.gray,
    marginTop: 20
  }
});

export default styles;
