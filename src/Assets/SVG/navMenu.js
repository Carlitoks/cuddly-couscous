import React, { Component } from "react";
import Svg, { G, Path } from "react-native-svg";

const NavMenu = ({ width, height, viewBox }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox ? viewBox : "0 0 19 16"}>
        <G id="Symbols" stroke="none" strokeWidth={1} fill="none" fill-rule="evenodd" strokeLinecap="round">
            <G id="Bars/Navigation/Short-QR-Copy" transform="translate(-13.000000, -34.000000)" stroke="#FFFFFF">
                <G id="LeftNavIcon" transform="translate(15.000000, 35.000000)">
                    <G id="White-Left-Nav-Icon">
                        <Path d="M0,1 L15,1" id="Line" strokeWidth={2}></Path>
                        <Path d="M0,13 L15,13" id="Line-Copy-2" strokeWidth={2}></Path>
                        <Path d="M0,7 L10,7" id="Line-Copy" strokeWidth={2}></Path>
                    </G>
                </G>
            </G>
        </G>
    </Svg>
  );
};

export default NavMenu;
