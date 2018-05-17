import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./style";
import { Images } from "../../Themes";

export default class FullScreenSwipeEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const {
      data: { title, illustration }
    } = this.props;

    return (
      <View style={styles.slideInnerContainer}>
        <View style={[styles.imageContainer]}>
          <Image source={Images[illustration]} style={styles.image} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    );
  }
}
