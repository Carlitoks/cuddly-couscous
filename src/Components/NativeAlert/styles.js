import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 9999,
    backgroundColor: Colors.translucentGray,
    height,
    width,

    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    backgroundColor: Colors.white,
    width: 0.72 * width,
    borderRadius: 13,
    overflow: "hidden"
  },
  head: {
    marginTop: 27,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: Colors.gray2,
    paddingHorizontal: 8
  },
  headTitle: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: Fonts.primaryFont,
    fontWeight: "500",
    color: Colors.black,
    marginBottom: 10
  },
  headSubtitle: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: Fonts.primaryFont,
    color: Colors.black,
    marginBottom: 10
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: Colors.gray2
  },
  listItemText: {
    width: "100%",
    textAlign: "center",
    fontSize: 17,
    color: Colors.lightBlue
  },
  twoButtonsListWrapper: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row"
  },
  twoButtonsListItem: {
    borderRightWidth: 1,
    borderColor: Colors.gray2,
    width: "50%"
  },
  listWrapper: {}
});
