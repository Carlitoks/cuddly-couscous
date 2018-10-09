import React, { Component } from "react";
import { Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import Svg, { G, Path, Polygon } from "react-native-svg";
import {moderateScale} from "../../Util/Scaling";
import {Colors} from "../../Themes";

const Checkmark = ({ width, height, viewBox, active, color }) => {
  if(Platform.OS === 'android'){
    return <Icon
      name="check"
      type="materialicons"
      size={moderateScale(30)}
      color={ color }
    />
  }
  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox ? viewBox : "0 0 16 13"}
    >
    <G id="Entire-Flow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <G id="Temporary-Confirm-+-Connect-Copy-3" transform="translate(-92.000000, -387.000000)" fill={color}>
            <G id="Group-5" transform="translate(20.000000, 369.000000)">
                <G id="Audio-Video">
                    <G id="Checkmark" transform="translate(72.000000, 18.000000)" fill={color}>
                        <Polygon id="White-Checkmark" points="1.84615385 5.53846154 0 7.38461538 4.92307692 12.3076923 16 1.84615385 14.1538462 0 4.92307692 8.61538462"></Polygon>
                    </G>
                </G>
            </G>
        </G>
    </G>
    </Svg>
  );
};

export default Checkmark;
