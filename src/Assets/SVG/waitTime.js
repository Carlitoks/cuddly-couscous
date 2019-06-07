import React, { Component } from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

const WaitTime = ({ width, height, viewBox, active }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox ? viewBox : "0 0 69.2 74.5"}>
      <G id="Layer_1">
        <G>
          <G>
            <G>
              <Circle
                fill={active ? "#FDE9CC" : "#E6E6E6"}
                cx="34.6"
                cy="40.8"
                r="31"
              />
              <Path
                fill={active ? "#FB6A28" : "#B3B3B3"}
                d="M34.6,73.2c-17.9,0-32.5-14.6-32.5-32.5S16.7,8.2,34.6,8.2s32.5,14.6,32.5,32.5S52.5,73.2,34.6,73.2z
    					 M34.6,11.2c-16.3,0-29.5,13.2-29.5,29.5s13.2,29.5,29.5,29.5S64.1,57,64.1,40.8S50.9,11.2,34.6,11.2z"
              />
            </G>
          </G>
          <Path
            fill={active ? "#FB6A28" : "#B3B3B3"}
            d="M52.4,42.7H33.2V16.8c0-0.8,0.7-1.5,1.5-1.5s1.5,0.7,1.5,1.5v22.9h16.1c0.8,0,1.5,0.7,1.5,1.5
    			S53.2,42.7,52.4,42.7z"
          />
          <Path
            fill={active ? "#FB6A28" : "#B3B3B3"}
            d="M47,4.2H24.3c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5H47c0.8,0,1.5,0.7,1.5,1.5S47.8,4.2,47,4.2z"
          />
        </G>
      </G>
      <G id="Layer_2" />
    </Svg>
  );
};
export default WaitTime;
