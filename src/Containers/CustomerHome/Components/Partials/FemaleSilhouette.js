import React, { Component } from "react";
import { View, Image } from 'react-native';
import styles from "./Styles/FemaleSilhouetteStyles";
import silhouette from "../../../../Assets/Images/femaleSilhouette.json";

const FemaleSilhouette = props => {
  return (
    <View style={styles.profileImageBackground}>
      <Image
        source={{
          uri: silhouette.image
        }}
        style={styles.avatarImage}
      />
    </View>
  );
};

export default FemaleSilhouette;
