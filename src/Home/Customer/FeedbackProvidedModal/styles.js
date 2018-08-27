import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../../Themes";
import { moderateScale } from "../../../Util/Scaling";
import { Iphone5 } from "../../../Util/Devices";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.translucentGray
  },
  modalWrapper: {
    backgroundColor: Colors.white,
    width: width * 0.91,
    borderRadius: 4,
    height: height * 0.5
  },
  modalTopButton: {
    position: "absolute",
    zIndex: 30,
    top: height * 0.19
  },
  modalButton: {
    width: width * 0.65,
    height: height * 0.08,
    marginTop: Iphone5 ? moderateScale(25) : 25,
    alignSelf: "center"
  },
  modalTitle: {
    marginTop: Iphone5 ? moderateScale(75) : 48,
    marginHorizontal: Iphone5 ? moderateScale(30) : 30,
    paddingBottom: Iphone5 ? moderateScale(20) : 20,
    marginBottom: Iphone5 ? moderateScale(5) : 5,
    color: Colors.gradientColor.top,
    fontFamily: Fonts.LightFont,
    fontWeight: "500",
    fontSize: Iphone5 ? moderateScale(22) : 22,
    textAlign: "center"
  },
  modalText: {
    fontFamily: Fonts.primaryFont,
    color: "#333",
    marginHorizontal: Iphone5 ? moderateScale(30) : 30,
    paddingBottom: Iphone5 ? moderateScale(30) : 30,
    textAlign: "center",
    fontSize: Iphone5 ? moderateScale(18) : 18,
    fontWeight: "500"
  }
});