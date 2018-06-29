import React, { Component } from "react";
import Svg, { G, LinearGradient, Path, Stop } from "react-native-svg";

/**
 * @description Standarized View with Header Component
 *
 * Props:
    width: Width of the svg,
    height: Height of the svg,
    style: style of the svg
 *
*/

const Waves = ({ width, height, viewBox, style }) => {
  return (
    <Svg width={width} height={height} viewBox={viewBox} style={style}>
      <G fillOpacity="0.85">
        <LinearGradient
          id="SVGID_1_"
          gradientUnits="userSpaceOnUse"
          x1="775"
          y1="31.4205"
          x2="-246.0705"
          y2="31.4205"
        >
          <Stop offset="0%" stopColor="#F39100" />
          <Stop offset="62.89%" stopColor="#E86305" />
          <Stop offset="100%" stopColor="#E24C07" />
        </LinearGradient>
        <Path
          fill="url(#SVGID_1_)"
          d="M0,0v47.2C66.3,46.8,83,4.5,124.3,4.5c45.4,0,58.6,12.9,99.1,15.4c47.2,2.9,67.5-17.7,123.3-17.1c57.4,0.7,77.3,43.9,125.9,43C520.1,45,529.4,3.2,576.7,1.7c59.9-2,100.2,63,157,61.2c5.9-0.2,11.3-1.1,16.2-2.5v-60C496.7,0.2,238.2,0.2,0,0z"
        />
      </G>

      <G fillOpacity="0.35">
        <LinearGradient
          id="SVGID_2_"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="34.7013"
          x2="750"
          y2="34.7013"
        >
          <Stop offset="0%" stopColor="#F39100" />
          <Stop offset="62.89%" stopColor="#E86305" />
          <Stop offset="100%" stopColor="#E24C07" />
        </LinearGradient>
        <Path
          fill="url(#SVGID_2_)"
          d="M0,0v20.1C26.8,10,54.5,4.5,82.8,5.4c69.8,2.2,90.6,47.3,160.6,47.9c76,0.7,100.3-51,160.6-47.9c82.5,4.2,99.3,64,160.6,64c61.8,0,80.8-61.5,160.6-64.6c9.1-0.4,17.3,0.5,25,2.2V0C500,0,250,0,0,0z"
        />
      </G>
    </Svg>
  );
};

export default Waves;
