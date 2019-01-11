import React, { Component } from "react";
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  Rect,
  stopColor,
  offset
} from "react-native-svg";

const SilhouetteWavesBackground = ({ width, height, viewBox }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox ? viewBox : `0 0 ${width} ${height}`}
    >
      <Defs>
        <LinearGradient
          x1={"50%"}
          y1={"100%"}
          x2={"50%"}
          y2={"-3.08098592%"}
          id={"linearGradient-1"}
        >
          <Stop stopColor={"#7171E2"} offset={"0%"} />
          <Stop stopColor={"#401674"} offset={"100%"} />
        </LinearGradient>
        <LinearGradient
          x1={"49.9996513%"}
          y1={"165.036123%"}
          x2={"49.9996513%"}
          y2={"-2.34218617%"}
          id={"linearGradient-2"}
        >
          <Stop stopColor={"#7171E2"} offset={"0%"} />
          <Stop stopColor={"#706EDF"} offset={"2.218318%"} />
          <Stop stopColor={"#5F4EB6"} offset={"32.26%"} />
          <Stop stopColor={"#543698"} offset={"59.6%"} />
          <Stop stopColor={"#4D2786"} offset={"83.09%"} />
          <Stop stopColor={"#4A2280"} offset={"100%"} />
        </LinearGradient>
      </Defs>
      <G
        id={"Page-1"}
        stroke={"none"}
        strokeWidth={"1"}
        fill={"none"}
        fillRule={"evenodd"}
      >
        <G
          id={"Home-Screen---iPhoneX"}
          transform={"translate(0.000000, -105.000000)"}
        >
          <G
            id={"Silhouette-Waves-Gradient"}
            transform={"translate(0.000000, 105.000000)"}
          >
            <G id={"Silhouette-+-Waves-+-Mask"}>
              <Rect
                id={"Background-Gradient"}
                fill={"url(#linearGradient-1)"}
                x={"0"}
                y={"0"}
                width={width}
                height={height}
              />
              <Path
                d={`M${width},167.14254 L${width},242 L373,242 L0,242 L0,160 C31.4788412,160 54.7388391,198.175405 87.7330731,196.982423 C113.839158,196.035056 118.936388,170.77192 145.111355,170.280693 C171.906255,169.754377 182.892852,195.894705 214.475016,196.315757 C245.230601,196.73681 250.500035,179.719281 276.537239,181.438578 C298.854842,182.91226 303.952072,195.298214 328.956053,195.298214 C345.226141,195.273251 354.784539,177.452344 ${width},167.144991 C374.996796,167.144174 374.998398,167.143357 375,167.14254 Z`}
                id={"Combined-Shape"}
                fill={"url(#linearGradient-2)"}
                fillRule={"nonzero"}
                opacity={"0.65"}
              />
              <Path
                d={`M${width},191.861399 L${width},242 L0.0361828256,242 L-1.13686838e-13,198.428602 L0.0361828256,193.113145 C44.0996254,193.113145 60.0739112,159.035568 94.192,159.00003 C127.999296,158.964492 136.784798,190.092419 182.367669,192.722228 C215.622446,194.605739 237.377908,166.246453 279.369401,166.708446 C313.107322,167.080782 313.466655,186.849752 375,191.861399 Z`}
                id={"Combined-Shape"}
                fill={"#7171E2"}
                fillRule={"nonzero"}
                opacity={"0.35"}
              />
              <G transform={ width > 375 ? `translate(35.000000, 0.000000)` : `translate(0.000000, 0.000000)`}>
                <Path
                  d={`M${width},242.376069 C310.077394,242.376069 245.177376,242.376069 180.249098,242.376069 C172.672392,242.376069 165.06077,242.376069 157.484063,242.376069 C157.030159,233.228156 159.509174,224.91822 164.81636,217.481176 C168.936412,211.755002 174.208682,207.914275 180.214182,205.365429 C180.214182,205.330514 180.214182,205.330514 180.214182,205.330514 C180.493508,205.190851 180.807749,205.086104 181.087075,204.981357 C184.159656,203.759307 187.441732,202.886415 190.86347,202.257932 C195.193017,201.454871 199.62731,201.419956 203.921941,200.512147 C205.109075,200.267737 206.296209,199.988412 207.448427,199.709086 C214.466482,197.369735 221.414706,194.855804 228.362929,192.37679 C229.65481,191.783223 230.946691,191.189656 232.238572,190.561174 C232.308403,190.526258 232.378235,190.491342 232.448066,190.456426 C233.076549,190.072354 233.600284,189.339124 233.949441,188.64081 C234.752502,186.929941 235.834889,185.603144 237.12677,184.590589 C238.069493,183.822444 239.15188,183.228877 240.408845,182.914636 C241.142075,182.705142 241.91022,182.530563 242.748197,182.460732 C242.957691,182.425816 243.13227,182.425816 243.341764,182.3909 C243.900415,182.216322 244.389235,182.006828 244.808223,181.692586 C245.820778,180.714947 247.007912,179.38815 247.91572,177.782028 L248.020467,177.782028 C249.207601,175.687086 249.870999,173.347735 249.312348,170.414816 C235.974552,173.417566 223.928636,170.3799 212.650866,162.733363 C213.139685,162.454037 213.419011,162.279458 213.698336,162.139796 C217.050243,160.463842 218.062799,158.787889 217.329569,155.156656 C216.666171,151.944412 215.758363,148.732168 214.606145,145.659586 C212.61595,140.317485 211.568479,134.975383 213.314264,129.458703 C214.606145,125.408482 216.282098,121.497924 217.853305,117.412787 C215.094964,116.225653 214.082409,113.537145 213.803084,110.464563 C213.244432,104.389232 214.326819,98.5233946 216.35193,92.8321359 C217.992967,88.1883481 220.087909,83.7191388 221.589284,79.0404353 C223.719142,72.4762842 225.499842,65.8073859 227.280543,59.1384877 C228.328014,55.1580982 228.747002,51.0031301 230.073799,47.1274877 C232.727392,39.4460342 236.777613,32.4628947 242.608534,26.7018046 C250.220156,19.1949296 259.228406,14.8304674 270.15702,15.0050459 C275.394374,15.109793 280.631729,15.0050459 285.869083,15.0399616 C292.572897,15.0748773 298.578397,17.2745662 304.199825,20.7312203 C309.786336,24.1529587 314.360293,28.7618308 317.747115,34.278511 C320.330877,38.4683947 322.809892,42.8677726 324.276351,47.5464761 C326.825197,55.751665 328.431319,64.2361795 330.665924,72.5111999 C331.818142,76.770915 333.284601,80.925883 334.925639,85.0110196 C337.788726,92.1338219 340.581982,99.2566243 340.581982,107.077741 C340.581982,111.232709 340.686729,115.562255 336.077857,117.727028 C336.636508,118.774499 337.090412,119.717223 337.579232,120.625031 C342.083357,129.039714 343.445069,137.559145 339.325017,146.637226 C337.858557,149.884386 336.671424,153.445787 336.846002,157.216682 C336.950749,159.34654 337.893473,160.812999 339.778921,161.755723 C340.372487,162.069964 340.966054,162.384206 341.7342,162.803194 C336.147688,166.539174 330.351682,169.018188 324.136688,170.694142 C317.782031,172.405011 311.392458,171.078214 305.072717,170.729057 C304.409319,173.312819 305.142549,175.756918 306.294767,177.782028 C307.23749,179.423066 308.45954,180.784778 309.472095,181.762418 C309.856168,182.006828 310.275156,182.251238 310.763976,182.3909 C311.008386,182.425816 311.252796,182.425816 311.46229,182.460732 C312.405014,182.530563 313.312822,182.740057 314.150799,183.019383 C314.150799,183.054299 314.185714,183.054299 314.22063,183.054299 C314.290461,183.089214 314.325377,183.089214 314.395208,183.12413 C315.163354,183.403456 315.896583,183.787528 316.559982,184.241432 C318.096272,185.288903 319.318322,186.755363 320.261046,188.675726 C320.610203,189.37404 321.133938,190.107269 321.762421,190.491342 C321.867168,190.561174 322.006831,190.631005 322.111578,190.700836 C323.298711,191.294403 324.485845,191.853054 325.672979,192.37679 C332.72595,194.89072 339.778921,197.474482 346.901723,199.813833 C348.019025,200.093159 349.136328,200.337569 350.25363,200.581979 C354.513345,201.489787 358.982554,201.559618 363.312101,202.327764 C366.175188,202.816583 368.933528,203.514897 371.552205,204.457621 C372.355266,204.736947 373.158328,205.051188 373.961389,205.365429 C373.961389,205.365429 373.961389,205.400345 373.961389,205.400345 C374.310292,205.54757 374.656516,205.699105 375,205.855065 L375,242.376069 Z`}
                  id={"Combined-Shape"}
                  fill={"#291E46"}
                  fillRule={"nonzero"}
                />
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};

export default SilhouetteWavesBackground;