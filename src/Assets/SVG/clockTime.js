import React, { Component } from "react";
import Svg, { G, Path, Polyline, Polygon } from "react-native-svg";

const ClockTime = ({ width, height, viewBox, style, active = false }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox ? viewBox : "0 0 17 17"}
    >
      <G
        id="Onboarding-+-Home"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <G
          id="Home-Screen-v2---5mins"
          transform="translate(-38.000000, -260.000000)"
          fill="#FFFFFF"
          fill-rule="nonzero"
        >
          <G id="Information-Bar" transform="translate(21.000000, 251.000000)">
            <G id="Time" transform="translate(6.000000, 0.000000)">
              <G id="Time-Icon" transform="translate(11.000000, 9.000000)">
                <Path
                  d="M8.5,0 C3.80456731,0 0,3.80456731 0,8.5 C0,13.1954327 3.80456731,17 8.5,17 C13.1954327,17 17,13.1954327 17,8.5 C17,3.80456731 13.1954327,0 8.5,0 Z M9.07211538,9.23557692 C9.07211538,9.55024038 8.81466346,9.80769231 8.5,9.80769231 L4.57692308,9.80769231 C4.26225962,9.80769231 4.00480769,9.55024038 4.00480769,9.23557692 C4.00480769,8.92091346 4.26225962,8.66346154 4.57692308,8.66346154 L7.92788462,8.66346154 L7.92788462,3.26923077 C7.92788462,2.95456731 8.18533654,2.69711538 8.5,2.69711538 C8.81466346,2.69711538 9.07211538,2.95456731 9.07211538,3.26923077 L9.07211538,9.23557692 Z"
                  id="Shape"
                />
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default ClockTime;
