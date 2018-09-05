import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../Themes";
import { moderateScale, scale, verticalScale } from "../Util/Scaling";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    width: width
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "white",
    minHeight: height,
    height: "100%"
  },
  messageText: {
    fontFamily: Fonts.LightFont,
    fontSize: 16,
    textAlign: "center",
    marginVertical: "2.25%",
    marginTop: 10,
    marginBottom: 15,
    color: Colors.black
  },
  cardsTitle: {
    fontFamily: Fonts.LightFont,
    fontSize: 12,
    marginHorizontal: 16,
    marginVertical: 7,
    color: "#4A4A4A"
  },
  imageContainer: {
    height: 0.19 * height,
    width: 0.5 * width,
    alignSelf: "center",
    marginBottom: 0.037 * height
  },
  image: {
    resizeMode: "contain",
    flex:1,
    width: "100%",
    height: "100%"
  },
  button: {
    height: 54,
    marginBottom: 10
  },
  buttonIcon: {
    color: Colors.gradientColor.top
  },
  buttonText: {
    fontSize: 16,
    color: Colors.gradientColor.top
  },
  cardFieldContainer: {
    backgroundColor: "rgba(194, 194, 194, .4)",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 5,
    width
  },
  cardField: {
    width: width * 0.95,
    color: "#449aeb",
    backgroundColor: Colors.white,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5
  }
});
