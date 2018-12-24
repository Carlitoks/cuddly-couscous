import { StyleSheet, Platform } from 'react-native'
import { Metrics, ApplicationStyles, Fonts, Colors } from '../../../../Themes'

const iOS = Platform.OS === "ios";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  titleTextStyle: {
    color: "#fff",
    fontFamily: Fonts.BaseFont,
    fontSize: 18,
  },
  containerMenu: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    height: 50,
    width: 50
  },
  IconMenu: {
    color: Colors.primaryColor,
    padding: 0
  },
  buttonQR: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: 50,
    height: 50,
    marginRight: 15
  },
  headerInner: {
    padding: 5,
    margin: 0,
    paddingBottom: 0,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: '#401674',
  },
  headerOuter: {
    marginTop: iOS ? 30 : 20,
    padding: 0,
    borderBottomWidth: 0,
    height: 45
  },
})