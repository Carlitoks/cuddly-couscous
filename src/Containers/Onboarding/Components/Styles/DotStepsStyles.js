import { StyleSheet } from "react-native";
import { moderateScaleViewports } from "../../../../Util/Scaling";

export default StyleSheet.create({
  callButtonContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  currentStep: {
    backgroundColor: "rgba(57, 19, 103, 0.3)",
    borderRadius: 50,
    height: moderateScaleViewports(7),
    marginLeft: moderateScaleViewports(5),
    width: moderateScaleViewports(7),
  },
  otherStep: {
    backgroundColor: "rgba(57, 19, 103, 0.2)",
    borderRadius: 50,
    height: moderateScaleViewports(7),
    marginLeft: moderateScaleViewports(5),
    width: moderateScaleViewports(7),
  },
});
