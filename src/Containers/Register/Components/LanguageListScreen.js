import React, { Component } from "react";
import { ScrollView, View, Alert, Image, Text } from "react-native";
import { connect } from "react-redux";
import { Header } from "../../CustomerHome/Components/Header";
import ViewWrapper from "../../ViewWrapper/ViewWrapper";
import NativeLang from "../../../Components/SlideUpModal/Partials/NativeLang";
// Styles
import styles from "./Styles/LanguageListScreenStyles";

class LanguageListScreen extends Component {
  componentWillMount() {}

  render() {
    return (
      <ViewWrapper style={styles.wrapperContainer}>
        <View style={[styles.mainContainer]}>
          <NativeLang />
        </View>
      </ViewWrapper>
    );
  }
}

const mS = state => ({});

const mD = {};

export default connect(
  mS,
  mD
)(LanguageListScreen);
