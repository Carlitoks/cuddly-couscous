import React from "react";
import { View, Image, Text } from "react-native";
import I18n from "../../../I18n/I18n";
const addCard = require("../../../Assets/Images/addcard.png");

//styles
import styles from "./Styles/NoCardImageStyles";

const NoCardImage = props => {
  return (
    <View style={styles.flexEndCenter}>
      <View style={styles.imageContainer}>
        <Image style={styles.imagePosition} source={addCard} />
        <Text style={styles.noCardText}>{I18n.t("payments.noCardNotice")}</Text>
      </View>
    </View>
  );
};

export default NoCardImage;
