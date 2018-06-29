import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../../Themes";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: "rgba(51,51,51,.64)",
    height,
    width,

    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  disconnectedModalContainer: {
    backgroundColor: "rgba(255,255,255,0.82)",
    width: 0.72 * width,
    borderRadius: 13,
    paddingBottom: 15
  },
  disconnectedModalHead: {
    marginTop: 27,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: Colors.gray2,
    paddingHorizontal: 8
  },
  disconnectedModalHeadText: {
    textAlign: "center",
    fontSize: 17,
    color: Colors.black,
    marginBottom: 10
  },

  disconnectedModalListItem: {
    textAlign: "center",
    color: "rgba(0,122,255,1)"
  }
});
