import { StackNavigator } from "react-navigation";
import LaunchScreen from "../Containers/LaunchScreen";
import Login from "../Containers/Login";
import { ForgotPasswordView } from "../Containers/ForgotPasswordView/ForgotPasswordView";
import CustomerAccount from "../Containers/CustomerAccountView/CustomerAccount";
import SelectRole from "../Containers/SelectRole";

import styles from "./Styles/NavigationStyles";
import { CallHistory } from "../Containers/CallHistory/CallHistory";

// Manifest of possible screens
const AppNavigation = StackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    Login: { screen: Login },
    ForgotPassword: { screen: ForgotPasswordView },
    CustomerAccount: { screen: CustomerAccount },
    Login: { screen: Login },
    SelectRole: { screen: SelectRole },
    CallHistory: { screen: CallHistory }
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "SelectRole",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default AppNavigation;
