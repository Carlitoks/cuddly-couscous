import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  topView:{
    width:"100%",
    ...Platform.select({
      ios: {
        height: '2%'
      }
    }),
  },
  topViewLarge:{
    width:"100%",
    ...Platform.select({
      ios: {
        height: '4%'
      }
    }),
  }
});
