import { StyleSheet, Dimensions, Platform } from "react-native";
import { Colors } from "../../Themes";
import Fonts from "../../Themes/Fonts";
const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

function wp(percentage) {
  const value = percentage * viewportWidth / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(40);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: itemWidth,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18 // needed for shadow
  },
  orangeBackground: {
    backgroundColor: Colors.carouselImagesGradient.bottom
  },
  slideItemTextContainer: {
    width: "98.7%",
    zIndex: 0,
    alignSelf: "center",
    position: "absolute",
    bottom: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  slideItemText: {
    marginTop: 7,
    marginBottom: 7,
    flex: 1,
    zIndex: 0,
    alignSelf: "center",
    color: Colors.white,
    fontFamily: Fonts.primaryBoldFont,
    backgroundColor: "transparent"
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  roundedCorners: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  sliderItemGradient: {
    left: 7,
    bottom: 18,
    height: "40%"
  },
  linearGradient: {
    position: "absolute",
    width: "97%",
    height: "40%",
    alignSelf: "center",
    bottom: 18,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderWidth: 0
  },
  icon: {
    // marginTop: 15
    // position: "absolute",
    // top: 5,
    // right: 0
  }
});
