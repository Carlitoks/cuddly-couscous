import React, { Component } from "react";

import { Header } from "react-native-elements";
import { Col } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { View, ScrollView, WebView } from "react-native";

import I18n from "../I18n/I18n";
import styles from "./styles";
import { Colors } from "../Themes";
import GoBackButton from "../Components/GoBackButton/GoBackButton";
import ViewWrapper from "../Containers/ViewWrapper/ViewWrapper";
import TopViewIOS from "../Components/TopViewIOS/TopViewIOS";
export default class StaticView extends Component {
  render() {
    const navigation = this.props.navigation;
    const { uri, title } = this.props.navigation.state.params;

    return (
      <ViewWrapper style={{ flex: 1 }}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
          alwaysBounceVertical={false}
          contentContainerStyle={styles.contentScrollContainer}
        >
          <View style={styles.headerContainer}>
            {/* Header - Navigation */}
            <TopViewIOS />
            <Header
              outerContainerStyles={styles.outerContainerStyles}
              backgroundColor={Colors.transparent}
              leftComponent={
                <GoBackButton navigation={this.props.navigation} />
              }
              centerComponent={{
                text: title,
                style: styles.title
              }}
            />
          </View>

          <View style={{ height: "100%", backgroundColor: "#ff98ad" }}>
            <WebView source={{ uri: uri }} style={{ flex: 1 }} />
          </View>
        </ScrollView>
      </ViewWrapper>
    );
  }
}
