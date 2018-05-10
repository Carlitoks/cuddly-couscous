import React, { Component } from "react";
import Svg, { G, Polygon } from "react-native-svg";

const Chevron = ({ width, height, viewBox, color }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox ? viewBox : "0 0 8 13"}
    >
    <G id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0.557886096">
        <G id="Right-Arrow-Indicator-Icon" fill="#7171E2">
            <Polygon points="0 1.5 1.5 0 8 6.5 1.5 13 0 11.5 5 6.5"></Polygon>
        </G>
    </G>
    </Svg>
  );
};

export default Chevron;
