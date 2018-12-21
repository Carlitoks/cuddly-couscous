import React, { Component } from "react";
import Svg, { G, Path } from "react-native-svg";

const TranslationSwap = ({ width, height, viewBox }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox ? viewBox : "0 0 107 25"}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G
        id="Confirm-+-Connect"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
        opacity="0.483928571"
      >
        <G
          id="Simple-Version-With-Questions-Hotel"
          transform="translate(-334.000000, -438.000000)"
          fill="#FFFFFF"
        >
          <G id="Selectors" transform="translate(25.000000, 336.000000)">
            <G id="Group-3" transform="translate(303.000000, 44.000000)">
              <G
                id="White-Translation-Icon"
                transform="translate(15.000000, 65.200000) rotate(-270.000000) translate(-15.000000, -65.200000) translate(7.800000, 56.200000)"
              >
                <Path
                  d="M0.942307692,12.7265625 C0.942307692,12.4921863 1.02644147,12.375 1.19471154,12.375 L9.01923077,12.375 L9.01923077,9.5625 L13.0576923,13.78125 L9.01923077,18 L9.01923077,15.1875 L1.19471154,15.1875 C1.02644147,15.1875 0.942307692,15.0703137 0.942307692,14.8359375 L0.942307692,12.7265625 Z M13.0576923,6.3984375 C13.0576923,6.63281367 12.9735585,6.75 12.8052885,6.75 L4.98076923,6.75 L4.98076923,9.5625 L0.942307692,5.34375 L4.98076923,1.125 L4.98076923,3.9375 L12.8052885,3.9375 C12.9735585,3.9375 13.0576923,4.05468633 13.0576923,4.2890625 L13.0576923,6.3984375 Z"
                  id="White-Translation-Arrows-Icon"
                />
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default TranslationSwap;
