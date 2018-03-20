import React, { Component } from "react";

import { Header } from "react-native-elements";
import { Col } from "react-native-easy-grid";
import LinearGradient from "react-native-linear-gradient";
import { Text, View, ScrollView } from "react-native";

import I18n from "../../I18n/I18n";
import styles from "./styles";
import GoBackButton from "../GoBackButton/GoBackButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../HeaderView/HeaderView";

export default class TextView extends Component {
  render() {
    const navigation = this.props.navigation;
    const { uri, title } = this.props.navigation.state.params;

    return (
      <ViewWrapper style={{ flex: 1 }}>
        <HeaderView
          headerLeftComponent={
            <GoBackButton navigation={this.props.navigation} />
          }
          title={this.props.navigation.state.params.title}
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            style={styles.scrollContainer}
            contentContainerStyle={styles.contentScrollContainer}
          >
            {this.props.navigation.state.params.texts.map(text => (
              <Text key={text} style={styles.text}>
                {text}
              </Text>
            ))}
          </ScrollView>
        </HeaderView>
      </ViewWrapper>
    );
  }
}
