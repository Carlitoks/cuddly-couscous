import React from "react";
import { string, bool } from "prop-types";

import { View, Text, TouchableOpacity } from "react-native";
import { TranslationArrows } from "../../SVG";
import { moderateScale } from "../../Util/Scaling";

import { styles } from "./styles";

const LanguageSelection = ({ firstLanguage, secondLanguage, header }) => {
  let nativeLanguage = "English";

  if(firstLanguage !== "English" && firstLanguage !== "Chinese (Mandarin)") {
    if(secondLanguage === "English") {
      nativeLanguage = "Chinese (Mandarin)"
    } else if (secondLanguage ===  "Chinese (Mandarin)") {
      nativeLanguage = "English"
    }
  } else {
    nativeLanguage = firstLanguage
  }

  return (
    <View style={styles.flexColumn}>
      <View
        style={[
          styles.languagesContainer,
          header ? styles.titleContainer : null
        ]}
      >
        <Text
          style={[
            header ? styles.titleCall : styles.regularText,
            styles.largeText
          ]}
        >
          {nativeLanguage}
        </Text>
        <View style={styles.centerIcon}>
          <TranslationArrows
            width={moderateScale(18)}
            height={moderateScale(18)}
            white={header}
          />
        </View>
        <Text
          style={[
            header ? styles.titleCall : styles.regularText,
            styles.largeText,
            header ? null : styles.orangeTitle
          ]}
        >
          {secondLanguage}
        </Text>
      </View>
    </View>
  );
};

export default LanguageSelection;

LanguageSelection.propTypes = {
  firstLanguage: string.isRequired,
  secondLanguage: string,
  header: bool
};
