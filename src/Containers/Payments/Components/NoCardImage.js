import React from "react";
import { View, Image, Text } from "react-native";

const addCard = require("../../../Assets/Images/addcard.png");

//styles
import styles from './Styles/NoCardImageStyles';

const NoCardImage = props => {
  return (
    <View style={styles.flexEndCenter}>
      <Image style={styles.imagePosition} source={addCard} />
      <Text style={styles.noCardText}>You don’t have any cards yet.</Text>
    </View>
  );
};

export default NoCardImage;
