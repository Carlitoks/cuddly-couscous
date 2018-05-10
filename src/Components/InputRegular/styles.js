import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale } from "../../Util/Scaling";

const width = Dimensions.get("window").width - 20;

export default StyleSheet.create({
  container: {
    borderBottomWidth: 0,
    paddingTop: 0,
    flex: 1,
    height: 42
  },
  multilineContainer: {
    minHeight: 44,
    height: null,
    paddingLeft: 25
  },
  secondary: {
    borderTopWidth: 0,
    marginTop: 0
  },
  formInput: {
    color: Colors.black,
    fontFamily: Fonts.BaseFont,
    paddingTop: 5,
    margin: 0,
    fontSize: 16,
    overflow: "visible"
  },
  formInputMultiline: {
    color: Colors.black,
    fontFamily: Fonts.BaseFont,
    paddingTop: 12,
    margin: 0,
    fontSize: 16,
    overflow: "visible"
  },
  viewBorder: {
    marginTop: moderateScale(45),
    width: "100%",
    alignSelf: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.bordersLightGrey,
    flex: 1
  }
});
