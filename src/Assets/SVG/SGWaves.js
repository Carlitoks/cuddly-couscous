import React, { Component } from "react";
import Svg, { G, Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { Metrics } from "../../Themes";
import metrics from "../../Themes/Metrics";

const renderDefs = () => (
  <Defs>
    <LinearGradient
      x1="49.9996513%"
      y1="165.036123%"
      x2="49.9996513%"
      y2="-2.34218617%"
      id="linearGradient-1"
    >
      <Stop stop-color="#7171E2" offset="0%" />
      <Stop stop-color="#706EDF" offset="2.218318%" />
      <Stop stop-color="#5F4EB6" offset="32.26%" />
      <Stop stop-color="#543698" offset="59.6%" />
      <Stop stop-color="#4D2786" offset="83.09%" />
      <Stop stop-color="#4A2280" offset="100%" />
    </LinearGradient>
  </Defs>
);

const renderGraphs = (width,height) => (
  <G
    id="Confirm-+-Connect"
    stroke="none"
    stroke-width="1"
    fill="none"
    fill-rule="evenodd"
  >
    <G
      id="Simple-Version-With-Questions-Airline"
      transform={ metrics.width > 375 ? "translate(2.000000, -223.000000)" : "translate(0.000000, -223.000000)"}
      fill-rule="nonzero"
    >
      <G id="Silhouette-Top" transform="translate(-15.000000, 19.000000)">
        <G
          id="SG_waves-5"
          transform="translate(203.000000, 222.000000) scale(-1, 1) translate(-203.000000, -222.000000) translate(0.000000, 199.000000)"
        >
          <G id="purple_wave-05" transform="translate(0.000000, 5.476190)">
            <G
              id="Group"
              opacity="0.6"
              transform="translate(0.000000, 0.071324)"
              fill="url(#linearGradient-1)"
            >
              <Path
                d={`M${width},40.4524869 L${width},-1.77635684e-14 C374.521159,-1.77635684e-14 351.261161,38.175406 318.266927,36.9824246 C292.160842,36.035057 287.063612,10.7719206 260.888645,10.280693 C234.093745,9.75437765 223.107148,35.8947062 191.524984,36.3157585 C160.769399,36.7368108 155.499965,19.7192814 129.462761,21.4385782 C107.145158,22.9122612 102.047928,35.2982155 77.0439471,35.2982155 C54.1752923,35.2631278 44.5663244,0.0701753787 0,-1.77635684e-14 L0,40.4524869 L406,40.4524869 Z`}
                id="Shape"
                opacity="0.65"
              />
            </G>
            <Path
              d={`M${width},39.4285703 L${width},34.113114 C361.900375,34.113114 345.926089,0.0355379519 311.808,-8.71006602e-13 C278.000704,-0.0355379519 269.215202,31.0923881 223.632331,33.7221965 C190.377554,35.605708 168.622092,7.24642234 126.630599,7.70841571 C87.9887552,8.13487114 93.1340945,34.0065002 0,34.0065002 L0,40.4033315 L405.963817,40.4033315 L406,39.4285703 Z`}
              id="Shape"
              fill="#7171E2"
              opacity="0.35"
            />
          </G>
        </G>
      </G>
    </G>
  </G>
);
const SGWaves = ({ width, height, viewBox }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox ? viewBox : `0 0 375 41`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      {renderDefs()}
      {renderGraphs(width,height)}
    </Svg>
  );
};

export default SGWaves;
