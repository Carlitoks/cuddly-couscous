import React, { Component } from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

const Friendliness = ({ width, height, viewBox, active }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox ? viewBox : "0 0 67.8 74.5"}>
      <G id="Layer_1">
        <G>
          <G>
            <Circle
              fill={active ? "#FDE9CC" : "#E6E6E6"}
              cx="33.9"
              cy="37.2"
              r="31"
            />
            <Path
              fill={active ? "#FB6A28" : "#B3B3B3"}
              d="M33.9,69.8C16,69.8,1.4,55.2,1.4,37.2S16,4.8,33.9,4.8c17.9,0,32.5,14.6,32.5,32.5S51.8,69.8,33.9,69.8zM33.9,7.8C17.6,7.8,4.4,21,4.4,37.2s13.2,29.5,29.5,29.5c16.3,0,29.5-13.2,29.5-29.5S50.1,7.8,33.9,7.8z"
            />
          </G>
          <G>
            <G>
              <Path
                fill={active ? "#FDE9CC" : "#E6E6E6"}
                d="M52.9,41c-1.7,8.9-9.6,15.7-19,15.7c-9.3,0-17.1-6.6-18.9-15.3"
              />
              <Path
                fill={active ? "#FB6A28" : "#B3B3B3"}
                d="M33.8,58.1c-9.8,0-18.4-6.9-20.4-16.5c-0.2-0.8,0.3-1.6,1.2-1.8c0.8-0.2,1.6,0.3,1.8,1.2c1.8,8.2,9.1,14.1,17.5,14.1c8.5,0,15.9-6.1,17.5-14.5c0.2-0.8,0.9-1.3,1.8-1.2c0.8,0.2,1.3,0.9,1.2,1.8C52.4,51,43.8,58.1,33.8,58.1z"
              />
            </G>
          </G>
          <G>
            <G>
              <Path
                fill={active ? "#FB6A28" : "#B3B3B3"}
                d="M24.1,29.6H21c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5h3.1c0.8,0,1.5,0.7,1.5,1.5S25,29.6,24.1,29.6z"
              />
            </G>
            <G>
              <Path
                fill={active ? "#FB6A28" : "#B3B3B3"}
                d="M46.7,29.6h-3.1c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5h3.1c0.8,0,1.5,0.7,1.5,1.5S47.6,29.6,46.7,29.6z"
              />
            </G>
          </G>
        </G>
      </G>
      <G id="Layer_2" />
    </Svg>
  );
};

export default Friendliness;
