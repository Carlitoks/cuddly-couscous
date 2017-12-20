import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  Button: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    borderRadius: 0,
    paddingLeft: 0,
    marginLeft: "10%",
    paddingTop: 5,
    paddingBottom: 5
  },
  colorText: {
    color: "black",
    fontSize: 18,
    textAlign: "left",
    alignContent: "flex-start",
    width: "100%",
    marginLeft: 0,
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 10
  },
  center: {
    alignSelf: "center"
  },
  logo: {
    marginTop: 20,
    marginBottom: 10,
    width: 120,
    height: 120,
    borderRadius: 60
  },
  textName: {
    fontSize: 20,
    fontWeight: "300",
    alignSelf: "center"
  },
  textCountry: {
    fontSize: 15,
    alignSelf: "center",
    color: "#A9A9A9"
  },
  textStars: {
    fontSize: 18,
    alignSelf: "center",
    fontWeight: "bold",
    marginBottom: 15
  }
});

export default styles;
