import React, { Component } from "react";
import {
  ScrollView,
  Text,
  Image,
  View,
  Button,
  StyleSheet
} from "react-native";

import TokBoxTest from "../Components/TokBoxTest";

// Styles
import styles from "./Styles/LaunchScreenStyles";

export default class LaunchScreen extends Component {
  render() {
    return <TokBoxTest />;
  }
}
