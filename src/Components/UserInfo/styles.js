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
    marginRight: 5,
    marginTop: 2,
    color: Colors.black
  },
  iconStyle: {
    marginLeft: 5,
    color: Colors.black
  },
  containerStyle: {
    marginLeft: 10,
    flexDirection: "row",
    width: "200%"
  },
  stars: {
    position: "absolute",
    right: 11
  }
}));
