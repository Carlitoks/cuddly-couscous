import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { SGWaves } from '../../../Assets/SVG';

// Styles
import styles from './Styles/AvatarSectionStyles';
import metrics from "../../../Themes/Metrics";

export default class AvatarSection extends Component {
  render() {
    return <View style={styles.mainAvatarSectionContainer}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}/>
        <Text style={styles.firstName}>Jen W.</Text>
      </View>
      <View style={styles.waves}>
        <SGWaves height={41} width={metrics.width} />
      </View>
    </View>;
  }
}
