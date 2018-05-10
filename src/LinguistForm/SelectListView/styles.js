import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale, scale, verticalScale } from "../../Util/Scaling";

const width = Dimensions.get("window").width - 20;

export default StyleSheet.create({
  scrollContainer:{
    height: "100%"
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  headerContainer: {
    marginBottom: -20,
    height: 180
  },
  header: {
    borderBottomWidth: 0,
    height: 60
  },
  goBackButton: {
    color: "#FFF",
    flexDirection: "row",
    alignSelf: "flex-start"
  },
  mainTitle: {
    fontFamily: Fonts.LightFont,
    fontSize: 24,
    textAlign: "center",
    marginTop: moderateScale(20),
    marginBottom: moderateScale(20),
    alignSelf: "center",
    color: "white",
    fontSize: 20,
    backgroundColor: Colors.transparent 
  },
  containerSearch: {
    backgroundColor: Colors.transparent,
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  inputSearch: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    color: "#FFFFFF"
  },
  list: {
    marginTop: -10
  },
  listItem: {
    height: 25
  }
});
