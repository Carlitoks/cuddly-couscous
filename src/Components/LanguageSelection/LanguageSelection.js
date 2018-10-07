import React from "react";
import { string, bool } from "prop-types";

import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Icon } from 'react-native-elements';
import { TranslationArrows } from "../../Assets/SVG";
import { moderateScale } from "../../Util/Scaling";
import { Colors } from '../../Themes';

import { styles } from "./styles";

const LanguageSelection = ({ firstLanguage, secondLanguage, header }) => {
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
          {firstLanguage}
        </Text>
        <View style={styles.centerIcon}>
          { Platform.OS === 'android' ?
            <Icon
              style={styles.Icon}
              name="swap"
              type="entypo"
              size={moderateScale(20)}
              color={ header ? Colors.primaryColor : Colors.black }/> :
            <TranslationArrows
            width={moderateScale(18)}
            height={moderateScale(18)}
            white={header}
          /> }
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
