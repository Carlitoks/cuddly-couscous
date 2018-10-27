import React, { Component } from "react";
import Svg, { G, Path, Polygon } from "react-native-svg";

const RoundCheckMark = ({ width, height, viewBox, color }) => {
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
          id="Balance-+-Pricing-6a-Copy"
          transform="translate(-32.000000, -287.000000)"
        >
          <G id="Payment" transform="translate(34.000000, 273.000000)">
            <G
              id="Payment-Method-Icon"
              transform="translate(0.000000, 16.000000)"
            >
              <G fill={"none"}>
                <Path
                  stroke={color}
                  stroke-width="2"
                  d="M10.5,-1 C16.8525251,-1 22,4.14747487 22,10.5 C22,16.8525251 16.8525251,22 10.5,22 C4.14747487,22 -1,16.8525251 -1,10.5 C-1,4.14747487 4.14747487,-1 10.5,-1 Z"
                />
                <Path
                  d="M9.3984294,14.8242192 L6.13671842,11.5820394 C6.04557271,11.4908937 6,11.3737065 6,11.2304777 C6,11.087249 6.04557271,10.9700618 6.13671842,10.8789161 L6.85937295,10.1757928 C6.95051867,10.0716264 7.06445059,10.0195431 7.20116901,10.0195431 C7.33788744,10.0195431 7.45832996,10.0716264 7.56249627,10.1757928 L9.74999106,12.3632875 L14.4374799,7.67579871 C14.5416462,7.57163239 14.6620887,7.51954908 14.7988071,7.51954908 C14.9355256,7.51954908 15.0494575,7.57163239 15.1406032,7.67579871 L15.8632577,8.37892204 C15.9544034,8.47006775 15.9999762,8.58725497 15.9999762,8.7304837 C15.9999762,8.87371242 15.9544034,8.99089964 15.8632577,9.08204536 L10.1015527,14.8242192 C10.010407,14.9283855 9.89321979,14.9804688 9.74999106,14.9804688 C9.60676233,14.9804688 9.48957511,14.9283855 9.3984294,14.8242192 Z"
                  id=""
                  fill={color}
                  mask="url(#mask-2)"
                />
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default RoundCheckMark;
