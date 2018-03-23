import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../Themes";

export default (styles = StyleSheet.create({
  containerList: {
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  listItem: {
    borderBottomWidth: 0
  },
  renderSeparator: {
    height: 1,
    width: "86%",
    backgroundColor: "#CED0CE",
    marginLeft: "14%"
  },
  colorStyle: {
    color: Colors.black
  },
  textColor: {
    marginTop: 6,
    color: Colors.black
  }
}));
