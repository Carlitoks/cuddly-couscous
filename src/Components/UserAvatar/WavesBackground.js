import React from "react";
import { Dimensions, View } from "react-native";
import Waves from "../../Assets/SVG/waves";
import styles from "./styles";

const WavesBackground = ({
NoWaves,
NoBackground,
isScrollable,
children,
  contentContainerStyle
                         }) => {
  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.outerView,
          NoBackground ? null : styles.outerViewBackground,
          contentContainerStyle
        ]}
      >

        {/* SVG White Waves */}
        <View
          style={{ position: "absolute", bottom: 0, alignSelf: "flex-end" }}
        >
          {!NoWaves && (
            <Waves
              width={width}
              height={(width * 129) / 1175.7}
              viewBox={"0 0 1175.7 129"}
            />
          )}
        </View>
        {children}
      </View>
    </View>
  )
};

export default WavesBackground;
