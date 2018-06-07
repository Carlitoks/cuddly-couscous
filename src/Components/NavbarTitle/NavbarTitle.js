import React, { Component } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FormInput } from "react-native-elements";
import { TouchableOpacity, Keyboard, View, Text } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import I18n from "../../I18n/I18n";
import styles from "./styles";
import { moderateScale, verticalScale, scale } from "../../Util/Scaling";

const NavbarTitle = ({ title, subtitle, type, leftIcon, scale }) => {
  return (
    <View>
      {type == "Basic" && (
        <Text style={!!leftIcon ? styles.titleWithLeft : styles.titleStyle}>
          {title}
        </Text>
      )}
      {type == "Complete" && <Text style={styles.titleComplete}>{title}</Text>}
      {type == "Double" && (
        <View>
          <Text style={[styles.titleStyle]}>{title}</Text>
          <Text style={[styles.titleStyle]}>{subtitle}</Text>
        </View>
      )}
    </View>
  );
};

export default NavbarTitle;
