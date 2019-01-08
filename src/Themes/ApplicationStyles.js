import Metrics from "./Metrics";
import Colors from "./Colors";
import { moderateScale } from "../Util/Scaling";
import { Iphone5, iPhoneXModels } from "../Util/Devices";
import metrics from "./Metrics";

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flexGrow: 1,
      backgroundColor: Colors.gradientColor.top
    },
    avatarSectionContainer: {
      maxHeight: metrics.height * 0.36
    },
    callSectionContainer: {
      zIndex: 1000000,
      paddingLeft: 25,
      paddingRight: 23,
      backgroundColor: "transparent",
      paddingBottom: 20
    },
    scrollViewFlex: {
      flexGrow: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 20
    },
    onboardingCallSectionContainer: {
      zIndex: 1000000,
      paddingLeft: 25,
      paddingRight: 23,
      backgroundColor: "transparent",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center"
    },
    rowView: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end"
    },
    columnView: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center"
    },
    backgroundImage: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.transparent
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    }
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  sectionTitle: {
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: "center",
    textAlign: "center"
  }
};

export default ApplicationStyles;
