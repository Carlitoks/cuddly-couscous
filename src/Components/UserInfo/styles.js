import { StyleSheet } from "react-native";
import { Colors } from "../../Themes";
export default (styles = StyleSheet.create({
  containerText: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  titleList: {
    marginLeft: 10
  },
  iconStart: {
    marginLeft: 20
  },
  userName: {
    marginLeft: 10,
    color: Colors.black
  },
  iconStyle: {
    marginLeft: 5,
    color: Colors.black
  }
}));
