import { StyleSheet, Dimensions } from "react-native";
import { moderateScale, scale, verticalScale } from "../Util/Scaling";
import { Colors, Fonts } from "../Themes";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  scrollContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: Colors.white
  },
  listItemContainer: {
    minHeight: 60,
    justifyContent: "center"
  },
  listContainer: {
    borderTopWidth: 0,
    marginTop: moderateScale(10),
    height: moderateScale(400)
  },
  listItemContainer: {
    minHeight: 60,
    justifyContent: "center"
  },
  summaryContainer: {
    top: -8,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  titleStyle: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: Colors.listLabelColor
  },
  logout: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: Colors.redError
  },
  listSubtitle: {
    fontSize: moderateScale(19),
    fontWeight: "normal"
  }
});