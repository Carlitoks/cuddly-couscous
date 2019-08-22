import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "../../Themes";
import { moderateScale } from "../../Util/Scaling";

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  linearGradient: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  containerInformation: {
    paddingTop: 30,
    justifyContent: "space-around",
    paddingBottom: 30,
    backgroundColor: "#eeeeee"
  },
  linguistAvatar: {
    marginBottom: 30
  },
  avatarContent: {
    marginLeft: 20
  },
  linguistInformation: {
    alignItems: "flex-start"
  },
  linguistName: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.primaryColor,
    marginLeft: 30,
    marginTop: 25
  },
  linguistAddress: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primaryColor,
    flexDirection: "column",
    alignItems: "flex-end"
  },
  starContainer: {
    width: "70%"
  },
  summaryContainer: {
    top: -8,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  listItemContainer: {
    minHeight: 60,
    justifyContent: "center"
  },
  titleStyle: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: "#444444",
    marginBottom:moderateScale(10)
  },
  listSubtitle: {
    fontSize: moderateScale(20),
    color: Colors.gray,
    fontWeight: "normal"
  },
  languagesContainer: {
    marginLeft: 10
  },
  languagesText: {
    fontSize: moderateScale(20),
    color: Colors.gray,
    fontWeight: "normal"
  },
  listRightTitleContainer: {
    flex: 0.3
  },
  listRightTitle: {
    fontSize: moderateScale(22),
    color: Colors.primaryListRightItem
  }
});
