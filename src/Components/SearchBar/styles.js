import { StyleSheet, Dimensions } from "react-native";
import { Colors, Fonts } from "../../Themes";
import { moderateScale } from "../../Util/Scaling";

const width = Dimensions.get("window").width - 20;

export default StyleSheet.create({
  container: {
    height: 56,
    justifyContent: "center"
  },
  inputContainer: {
    flex: 1,
    height: "100%",
    width: "95%",
    margin: 5,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: Colors.searchBarGrey,
    borderRadius: 50,
    borderColor: Colors.greyBackground,
    justifyContent: "center",
    alignSelf: "center"
  },
  input: {
    flex: 1,
    marginLeft: 30
  },
  iconSearchContainer: {
    position: "absolute",
    justifyContent: "center",
    top: 11,
    marginLeft: 10
  },
  iconCloseContainer: {
    position: "absolute",
    justifyContent: "center",
    top: 11,
    right: 0,
    marginRight: 10
  }
});
