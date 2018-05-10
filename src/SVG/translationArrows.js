import React, { Component } from "react";
import Svg, { G, Path, Mask, Use } from "react-native-svg";

const whiteArros = () => (
  <G
    id="Symbols"
    stroke="none"
    stroke-width="1"
    fill="none"
    fill-rule="evenodd"
  >
    <G
      id="Bars/Navigation/Languages-Copy"
      transform="translate(-137.000000, -78.000000)"
      fill="#FFFFFF"
    >
      <G
        id="White-Translation-Icon"
        transform="translate(137.000000, 78.000000)"
      >
        <Path
          d="M0.875,8.484375 C0.875,8.32812422 0.953124219,8.25 1.109375,8.25 L8.375,8.25 L8.375,6.375 L12.125,9.1875 L8.375,12 L8.375,10.125 L1.109375,10.125 C0.953124219,10.125 0.875,10.0468758 0.875,9.890625 L0.875,8.484375 Z M12.125,4.265625 C12.125,4.42187578 12.0468758,4.5 11.890625,4.5 L4.625,4.5 L4.625,6.375 L0.875,3.5625 L4.625,0.75 L4.625,2.625 L11.890625,2.625 C12.0468758,2.625 12.125,2.70312422 12.125,2.859375 L12.125,4.265625 Z"
          id=""
        />
      </G>
    </G>
  </G>
);

const blackArrows = () => (
  <G
    id="Entire-Flow"
    stroke="none"
    stroke-width="1"
    fill="none"
    fill-rule="evenodd"
  >
    <G
      id="Temporary-Confirm-+-Connect-Copy-3"
      transform="translate(-84.000000, -231.000000)"
      fill="#333333"
    >
      <G id="Translation-Symbol" transform="translate(84.000000, 229.000000)">
        <Path
          d="M0.25,11.78125 C0.25,11.5937491 0.343749063,11.5 0.53125,11.5 L9.25,11.5 L9.25,9.25 L13.75,12.625 L9.25,16 L9.25,13.75 L0.53125,13.75 C0.343749063,13.75 0.25,13.6562509 0.25,13.46875 L0.25,11.78125 Z M13.75,6.71875 C13.75,6.90625094 13.6562509,7 13.46875,7 L4.75,7 L4.75,9.25 L0.25,5.875 L4.75,2.5 L4.75,4.75 L13.46875,4.75 C13.6562509,4.75 13.75,4.84374906 13.75,5.03125 L13.75,6.71875 Z"
          id="Black-Translation-Arrows-Icon"
        />
      </G>
    </G>
  </G>
);

const TranslationArrows = ({ width, height, viewBox, white }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox ? viewBox : "0 0 14 14"}
    >
      {white ? (
        <G
          id="Symbols"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <G
            id="Bars/Navigation/Languages-Copy"
            transform="translate(-137.000000, -78.000000)"
            fill="#FFFFFF"
          >
            <G
              id="White-Translation-Icon"
              transform="translate(137.000000, 78.000000)"
            >
              <Path
                d="M0.875,8.484375 C0.875,8.32812422 0.953124219,8.25 1.109375,8.25 L8.375,8.25 L8.375,6.375 L12.125,9.1875 L8.375,12 L8.375,10.125 L1.109375,10.125 C0.953124219,10.125 0.875,10.0468758 0.875,9.890625 L0.875,8.484375 Z M12.125,4.265625 C12.125,4.42187578 12.0468758,4.5 11.890625,4.5 L4.625,4.5 L4.625,6.375 L0.875,3.5625 L4.625,0.75 L4.625,2.625 L11.890625,2.625 C12.0468758,2.625 12.125,2.70312422 12.125,2.859375 L12.125,4.265625 Z"
                id=""
              />
            </G>
          </G>
        </G>
      ) : (
        <G
          id="Entire-Flow"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <G
            id="Temporary-Confirm-+-Connect-Copy-3"
            transform="translate(-84.000000, -231.000000)"
            fill="#333333"
          >
            <G
              id="Translation-Symbol"
              transform="translate(84.000000, 229.000000)"
            >
              <Path
                d="M0.25,11.78125 C0.25,11.5937491 0.343749063,11.5 0.53125,11.5 L9.25,11.5 L9.25,9.25 L13.75,12.625 L9.25,16 L9.25,13.75 L0.53125,13.75 C0.343749063,13.75 0.25,13.6562509 0.25,13.46875 L0.25,11.78125 Z M13.75,6.71875 C13.75,6.90625094 13.6562509,7 13.46875,7 L4.75,7 L4.75,9.25 L0.25,5.875 L4.75,2.5 L4.75,4.75 L13.46875,4.75 C13.6562509,4.75 13.75,4.84374906 13.75,5.03125 L13.75,6.71875 Z"
                id="Black-Translation-Arrows-Icon"
              />
            </G>
          </G>
        </G>
      )}
    </Svg>
  );
};

export default TranslationArrows;
