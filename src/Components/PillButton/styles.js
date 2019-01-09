import { StyleSheet, Dimensions, Platform } from "react-native";
import { Fonts, Colors } from "../../Themes";
import { Iphone5, iPhoneXModels } from "../../Util/Devices";

const buttonHeight = 41;

export default StyleSheet.create({
  containerBottom: {
    backgroundColor: Colors.transparent,
    width: "100%",
    marginVertical: 17
  },
  alignButtonRight: {
    alignItems: "flex-end"
  },
  alignButtonCenter: {
    alignItems: "center"
  },
  alignButtonLeft: {
    alignItems: "flex-start"
  },
  absolute: {
    position: "absolute",
    bottom: 0
  },
  text: {
    fontSize: Iphone5 ? 15 : iPhoneXModels ? 15 : 18,
    fontWeight: "500",
    fontFamily: Fonts.BaseFont,
    color: Colors.white
  },
  button: {
    ...Platform.select({
      android: {
        height: buttonHeight
      },
      ios: {
        height: Iphone5 ? 38 : iPhoneXModels ? 40 : buttonHeight + 8
      }
    }),
    borderRadius: 50,
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 0.8,
    borderColor: Colors.white
  }
});
