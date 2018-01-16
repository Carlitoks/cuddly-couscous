import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  topView:{
    width:"100%",
    ...Platform.select({
      ios: {
        height: '4%'
      }
    }),
  },
  topViewLarge:{
    width:"100%",
    ...Platform.select({
      ios: {
        height: '9%'
      }
    }),
  }
});
