import React from "react";
import { Image, Text, View } from "react-native";
import styles from "./style";
import { Images } from "../Themes";

const PaymentsTitle = ({ messageText }) => (
  <View>
    <Text style={styles.messageText}>{messageText}</Text>

    <View style={styles.imageContainer}>
      <Image style={styles.image} source={Images.cardFormFront} />
    </View>
  </View>
);

export default PaymentsTitle;
