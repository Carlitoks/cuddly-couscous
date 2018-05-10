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
const slideWidth = wp(70);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = 266;
export const itemMargin = 16;
export const itemHeight = 220;

const entryBorderRadius = 8;

export default StyleSheet.create({
  sliderInnerContainer: {
    width: itemWidth,
    height: itemHeight,
    marginBottom: 10
  },
  slideItemTextContainer: {
    fontFamily: Fonts.LightFont,
    marginBottom: 10,
    fontSize: 22,
    color: Colors.white
  },
  slideItemText: {
    marginTop: 7,
    marginBottom: 7,
    flex: 1,
    zIndex: 0,
    alignSelf: "center",
    color: Colors.white,
    fontFamily: Fonts.BoldFont,
    backgroundColor: Colors.transparent
  },
  carouselItemWrapper: {
    margin: itemMargin,
    height: itemHeight,
    width: itemWidth
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: "cover"
  },
  roundedCorners: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3
  }
});
