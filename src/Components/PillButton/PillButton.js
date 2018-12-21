import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { Colors } from "../../Themes";
import styles from "./styles";

import { upperFirst } from "lodash";

const colorMapper = {
  red: Colors.redButton,
  orange: 'orange',
  green: 'green'
};

const PillButton = ({
  onPress,
  title,
  relative,
  absolute,
  icon,
  buttonCustomStyle,
  containerCustomStyle,
  alignButton,
  color
}) => {
  return (
    <View
      style={[
        !!containerCustomStyle ? containerCustomStyle : null,
        !!absolute ? styles.absolute : null,
        alignButton && styles[`alignButton${upperFirst(alignButton)}`],
        styles.containerBottom
      ]}
    >
      <Button
        borderRadius={50}
        textStyle={[styles.text]}
        title={title}
        onPress={onPress}
        icon={
          !!icon
            ? {
                type: "ionicon",
                name: icon,
                size: 30,
                color: Colors.primaryColor,
                iconStyle: { opacity: 0.59 }
              }
            : null
        }
        backgroundColor={
          color
        }
        buttonStyle={[
          styles.button,
          !!buttonCustomStyle ? buttonCustomStyle : null
        ]}
      />
    </View>
  );
};

export default PillButton;
