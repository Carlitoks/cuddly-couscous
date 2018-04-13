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
      <G fillOpacity="0.6">
        <LinearGradient
          id="SVGID_1_"
          gradientUnits="userSpaceOnUse"
          x1="587.8459"
          y1="205.1573"
          x2="587.8459"
          y2="9.1573"
        >
          <Stop offset="0" stopColor="#7171E2" />
          <Stop offset="2.218318e-02" stopColor="#706EDF" />
          <Stop offset="0.3226" stopColorr="#5F4EB6" />
          <Stop offset="0.596" stopColor="#543698" />
          <Stop offset="0.8309" stopColor="#4D2786" />
          <Stop offset="1" stopColor="#4A2280" />
        </LinearGradient>
        <Path
          d="M1175.7,129V11.9c-0.1,0-0.2,0-0.4,0c-91,0-155.4,108.8-251.2,105.4c-75.8-2.7-90.6-74.7-166.6-76.1c-77.8-1.5-109.7,73-201.4,74.2c-89.3,1.2-104.6-47.3-180.2-42.4c-64.8,4.2-79.6,39.5-152.2,39.5C157.3,112.4,129.4,12.1,0,11.9V129H1175.7z"
          fill="url(#SVGID_1_)"
        />
      </G>

      <G fillOpacity="0.35">
        <Path
          d="M1175.7,129v-17.6C1048.1,111.4,1003.3,0.1,904.5,0c-97.9-0.1-124.8,102.9-256.8,110.3c-96.3,5.3-159.3-74.5-280.9-73.2c-111.9,1.2-97,74-366.7,74v18H1175.7z"
          fill="#7171E2"
        />
      </G>
    </Svg>
  );
};

export default Waves;
