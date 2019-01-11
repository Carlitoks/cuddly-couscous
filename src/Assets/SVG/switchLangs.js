import React, { Component } from "react";
import { Platform } from "react-native";
import Svg, { G, Path } from "react-native-svg";
import { Iphone5, iPhoneXModels } from "../../Util/Devices";

const android = Platform.OS === "android";
const SwitchLangs = ({ width, height, viewBox, style, active = false }) => {
  return (
    <Svg
      width={width}
      height={Iphone5 ? 52 : iPhoneXModels ? 60 : android ? height : 58}
      style={style}
      viewBox={viewBox ? viewBox : "0 0 22 73"}
    >
      <G
        id="Onboarding-+-Home"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <G
          id="Home-Screen-v2---Hotel"
          transform="translate(-332.000000, -378.000000)"
        >
          <G id="Selectors" transform="translate(25.000000, 336.000000)">
            <G
              id="Switch-Languages"
              transform="translate(306.000000, 42.000000)"
            >
              <G transform="translate(1.000000, 1.000000)">
                <G
                  id="Switch-Languages-Lines"
                  stroke="#A296CE"
                  stroke-dasharray="1,4"
                  stroke-linecap="round"
                >
                  <Path
                    d="M0,48.5 L13,48.5 C14.1045695,48.5 15,49.3954305 15,50.5 L15,71"
                    id="Line-2-Copy"
                    transform="translate(7.500000, 59.750000) scale(1, -1) translate(-7.500000, -59.750000) "
                  />
                  <Path
                    d="M0,0 L13,0 C14.1045695,-2.02906125e-16 15,0.8954305 15,2 L15,22.5"
                    id="Line-2-Copy"
                  />
                </G>
                <G
                  id="Translation-Symbol-Copy"
                  transform="translate(14.200000, 36.000000) rotate(-270.000000) translate(-14.200000, -36.000000) translate(7.000000, 27.000000)"
                  fill="#A296CE"
                >
                  <Path
                    d="M0.969230744,12.7265625 C0.969230744,12.4921863 1.05576834,12.375 1.22884612,12.375 L9.27692283,12.375 L9.27692283,9.5625 L13.4307689,13.78125 L9.27692283,18 L9.27692283,15.1875 L1.22884612,15.1875 C1.05576834,15.1875 0.969230744,15.0703137 0.969230744,14.8359375 L0.969230744,12.7265625 Z M13.4307689,6.3984375 C13.4307689,6.63281367 13.3442313,6.75 13.1711535,6.75 L5.12307679,6.75 L5.12307679,9.5625 L0.969230744,5.34375 L5.12307679,1.125 L5.12307679,3.9375 L13.1711535,3.9375 C13.3442313,3.9375 13.4307689,4.05468633 13.4307689,4.2890625 L13.4307689,6.3984375 Z"
                    id="White-Translation-Arrows-Icon"
                  />
                </G>
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default SwitchLangs;
