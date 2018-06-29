import { StyleSheet, Dimensions, Platform } from "react-native";
import { Colors, Images, Fonts } from "../../Themes";

const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

export const sliderWidth = viewportWidth;
export const itemWidth = viewportWidth;

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: viewportHeight,
    paddingHorizontal: 0
  },
  imageContainer: {
    flex: 1,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: Colors.gradientColor.top
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%"
  },
  titleContainer: {
    backgroundColor: Colors.transparent,
    width: "100%",
    position: "absolute",
    zIndex: 1,
    top: "38%",
    paddingHorizontal: 15,
    minHeight: 200,
    justifyContent: "flex-end"
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "400",
    color: "white",
    paddingHorizontal: 45,
    fontFamily: Fonts.BaseFont,
    lineHeight: 28,
    bottom: 0,
    textAlignVertical: "bottom"
  }
});
