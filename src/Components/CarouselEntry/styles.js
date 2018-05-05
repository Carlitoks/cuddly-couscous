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
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

export default StyleSheet.create({
  sliderInnerContainer: {
    width: itemWidth,
    height: itemWidth,
    marginBottom: 10
  },
  slideItemTextContainer: {
    marginLeft: 12,
    fontSize: 20,
    color: Colors.white
  },
  slideItemText: {
    marginTop: 7,
    marginBottom: 7,
    flex: 1,
    zIndex: 0,
    alignSelf: "center",
    color: Colors.white,
    fontFamily: Fonts.primaryBoldFont,
    backgroundColor: Colors.transparent
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
  }
});
