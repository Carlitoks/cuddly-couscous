import React, { Component } from "react";
import Svg, { G, Path, Polygon } from "react-native-svg";

const DollarSign = ({ width, height, viewBox, active }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox ? viewBox : "0 0 96.2 74.5"}
    >
      <G
        id="Pricing-Page"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <G
          id="Balance-+-Pricing-6c-Copy-3"
          transform="translate(-32.000000, -104.000000)"
        >
          <G id="Pricing-Block" transform="translate(20.000000, 81.000000)">
            <G id="Pricing-Icon" transform="translate(14.000000, 25.000000)">
              <G fill={"none"}>
                <Path
                  d="M10.5,-1 C16.8525251,-1 22,4.14747487 22,10.5 C22,16.8525251 16.8525251,22 10.5,22 C4.14747487,22 -1,16.8525251 -1,10.5 C-1,4.14747487 4.14747487,-1 10.5,-1 Z"
                  id="Shape"
                  stroke="#FFFFFF"
                  stroke-width="2"
                  fill-rule="nonzero"
                />
                <Path
                  d="M11.8984258,9.96094951 C12.3515496,10.1015742 12.7382674,10.343761 13.0585793,10.6875103 C13.3788912,11.0312596 13.5898282,11.4336021 13.6913903,11.8945387 C13.7929524,12.3554752 13.765609,12.8203177 13.6093592,13.2890666 C13.4218597,13.8046903 13.1015478,14.2148456 12.648424,14.5195324 C12.1953002,14.8242192 11.6874888,14.9843749 11.1249902,15 L11.1249902,16.1249973 C11.1249902,16.2343722 11.089834,16.3242156 11.0195217,16.3945279 C10.9492093,16.4648403 10.8593659,16.4999964 10.7499911,16.4999964 L9.99999285,16.4999964 C9.89061799,16.4999964 9.80077457,16.4648403 9.73046224,16.3945279 C9.66014991,16.3242156 9.62499374,16.2343722 9.62499374,16.1249973 L9.62499374,15 C8.87499553,15 8.19530965,14.7656256 7.5859361,14.2968767 C7.50781141,14.218752 7.46093652,14.1250022 7.44531144,14.0156273 C7.42968636,13.9062525 7.46874888,13.8046903 7.56249866,13.7109406 L8.35937176,12.9140675 C8.42187173,12.8671926 8.49609006,12.8359428 8.58202748,12.8203177 C8.66796489,12.8046926 8.74999595,12.8281301 8.82812064,12.89063 C9.06249508,13.0468798 9.32811933,13.1250045 9.62499374,13.1250045 L11.1953025,13.1250045 C11.3828021,13.1250045 11.5429578,13.0585985 11.6757701,12.9257862 C11.8085824,12.7929739 11.8749884,12.6250058 11.8749884,12.4218811 C11.8749884,12.2812565 11.8281135,12.1484442 11.7343637,12.0234446 C11.6406139,11.898445 11.5234267,11.8125076 11.3828021,11.7656327 L8.96874531,11.0625094 C8.43749645,10.9062596 7.99218502,10.6250103 7.63281099,10.2187614 C7.27343697,9.81251249 7.06249997,9.3437636 7,8.81251475 C6.96875019,8.31251606 7.06249997,7.84767318 7.28124933,7.41798683 C7.49999869,6.98830047 7.81249818,6.64455117 8.21874709,6.38673929 C8.62499601,6.1289274 9.07812016,6.00002146 9.57811885,6.00002146 L9.62499374,6.00002146 L9.62499374,4.87502414 C9.62499374,4.76564928 9.66014991,4.67580586 9.73046224,4.60549353 C9.80077457,4.5351812 9.89061799,4.50002503 9.99999285,4.50002503 L10.7499911,4.50002503 C10.8593659,4.50002503 10.9492093,4.5351812 11.0195217,4.60549353 C11.089834,4.67580586 11.1249902,4.76564928 11.1249902,4.87502414 L11.1249902,6.00002146 C11.8749884,6.00002146 12.5468619,6.2343959 13.1406104,6.70314478 C13.2343601,6.78126948 13.2890474,6.87501925 13.3046725,6.98439411 C13.3202976,7.09376897 13.281235,7.18751875 13.1874852,7.26564344 L12.3906121,8.08595398 C12.3281122,8.13282887 12.2538938,8.16407868 12.1679564,8.17970376 C12.082019,8.19532884 11.999988,8.17970376 11.9218633,8.13282887 C11.6874888,7.9609544 11.4218646,7.87501699 11.1249902,7.87501699 L9.55468141,7.87501699 C9.36718186,7.87501699 9.20702611,7.94142296 9.0742138,8.07423526 C8.9414015,8.20704756 8.87499553,8.37501568 8.87499553,8.57814031 C8.87499553,8.71876498 8.92187042,8.85157728 9.01562019,8.97657686 C9.10936997,9.10157644 9.22655719,9.18751386 9.36718186,9.23438875 L11.8984258,9.96094951 Z"
                  id="$"
                  fill="#FFFFFF"
                />
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default DollarSign;
