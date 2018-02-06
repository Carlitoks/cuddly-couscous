import React, { Component } from "react";
import { connect } from "react-redux";

import { Text, View, ScrollView } from "react-native";
import { Header } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import GoBackButton from "../../Components/GoBackButton/GoBackButton";
import styles from "./styles";
import { Colors } from "../../Themes";

class AssistanceView extends Component {
  render() {
    return (
      <View style={this.props.large ? styles.headerContainerLarge : styles.headerContainer}>
        {/* Linear Gradient */}
        <LinearGradient
          colors={[
            Colors.gradientColor.top,
            Colors.gradientColor.middle,
            Colors.gradientColor.bottom
          ]}
          style={styles.linearGradient}
        />
        <View>
          {/* Header */}
          <TopViewIOS/> 
          <Header
            outerContainerStyles={styles.header}
            backgroundColor="transparent"
            leftComponent={<GoBackButton navigation={this.props.navigation} />}
          />
          {/* mainTitle */}
          <Text style={styles.mainTitle}>{this.props.mainTitle}</Text>

          {/* subtitle */}
          <Text style={styles.mainSubtitle}>{this.props.subtitle}</Text>
        </View>
      </View>
    );
  }
}
const mS = state => ({});

const mD = {};

export default connect(mS, mD)(AssistanceView);
