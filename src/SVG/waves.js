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
      <G fillOpacity="0.28">
        <LinearGradient
          id="SVGID_1_"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="46.8121"
          x2="750"
          y2="46.8121"
        >
          <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <Stop offset="100%" stopColor="#FFFFFF" />
        </LinearGradient>
        <Path
          d="M735.3,13c-56.8-2-97.1,68-157,65.9c-47.4-1.7-56.6-46.7-104.2-47.6c-48.7-0.9-68.6,45.6-125.9,46.4c-55.8,0.7-76-21.5-123.3-18.4c-40.5,2.6-53.7,16.6-99.1,16.6c-41.6,0-58.2-50.1-125.3-50.1c-0.2,0-0.3,0-0.5,0v54.9c238.2-0.2,496.6-0.2,750-0.3V15.3C745.5,14,740.6,13.2,735.3,13z"
          fill="url(#SVGID_1_)"
        />
      </G>

      <G fillOpacity="0.23">
        <LinearGradient
          id="SVGID_2_"
          gradientUnits="userSpaceOnUse"
          x1="-73.1614"
          y1="39.1927"
          x2="637.803"
          y2="46.6923"
        >
          <Stop offset="0%" stopColor="#FFFFFF" />
          <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.5" />
        </LinearGradient>
        <Path
          d="M726.5,75.2c-79.7-3.4-98.8-69.6-160.6-69.7c-61.2,0-78,64.4-160.6,68.9c-60.2,3.3-84.5-46.6-160.6-45.8c-70,0.7-90.7,43.4-160.6,45.8c-28.8,1-57-5.2-84.3-16.4v22.2c250.3,0,500.7,0,751,0v-7.4C743.4,74.7,735.4,75.6,726.5,75.2z"
          fill="url(#SVGID_2_)"
        />
      </G>
    </Svg>
  );
};

export default Waves;
