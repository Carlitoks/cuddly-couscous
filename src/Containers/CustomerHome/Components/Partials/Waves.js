import React, { Component } from "react";
import { View } from 'react-native';
import styles from "./Styles/WavesStyles";
import Metrics from './../../../../Themes/Metrics';
import SGWavesSVG from './../../../../Assets/SVG/SGWaves';
const SGWaves = props => {
  return (
    <View style={styles.wavesContainer}>
      <SGWavesSVG height={51} width={Metrics.width} />
    </View>
  );
};

export default SGWaves;
