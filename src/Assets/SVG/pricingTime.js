import React, { Component } from "react";
import Svg, { G, Path } from "react-native-svg";

const PricingTime = ({ width, height, viewBox, color }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox ? viewBox : "0 0 96.2 74.5"}
      color={color}
    >
      <G
        id="Pricing-Page"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <G
          id="Balance-+-Pricing-6b-Copy"
          transform="translate(-32.000000, -196.000000)"
          stroke={color}
        >
          <G id="Account-Balance" transform="translate(34.000000, 176.000000)">
            <G id="Green-Time-Icon" transform="translate(0.000000, 22.000000)">
              <G>
                <Path
                  d="M10.5,-1 C16.8525251,-1 22,4.14747487 22,10.5 C22,16.8525251 16.8525251,22 10.5,22 C4.14747487,22 -1,16.8525251 -1,10.5 C-1,4.14747487 4.14747487,-1 10.5,-1 Z"
                  id="Shape"
                  stroke-width="2"
                  fill-rule="nonzero"
                />
                <Path
                  d="M12,11.3563218 C12,11.7103448 11.6951613,12 11.3225806,12 L6.67741935,12 C6.30483871,12 6,11.7103448 6,11.3563218 C6,11.0022989 6.30483871,10.7126437 6.67741935,10.7126437 L10.6451613,10.7126437 L10.6451613,4.64367816 C10.6451613,4.28965517 10.95,4 11.3225806,4 C11.6951613,4 12,4.28965517 12,4.64367816 L12,11.3563218 Z"
                  id="Path"
                  stroke-width="0.5"
                  fill={color}
                />
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default PricingTime;
