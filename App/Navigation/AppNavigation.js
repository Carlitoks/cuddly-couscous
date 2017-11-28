import { StackNavigator } from "react-navigation";
import LaunchScreen from "../Containers/LaunchScreen";
import Login from "../Containers/Login";

import styles from "./Styles/NavigationStyles";

// Manifest of possible screens
const AppNavigation = StackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    Login: { screen: Login }
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "LaunchScreen",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default AppNavigation;
