import React from 'react';
import { View, Image } from 'react-native';
import styles from './Styles/FemaleSilhouetteStyles';
import silhouette from '../../../../Assets/Images/femaleSilhouette.json';

const renderStyles = props =>
  props.home ? styles.profileImageBackground : styles.profileImageBackgroundOnboarding;
const FemaleSilhouette = props => (
  <View style={renderStyles(props)}>
    <Image
      source={{
        uri: silhouette.image
      }}
      style={styles.avatarImage}
    />
  </View>
);

export default FemaleSilhouette;
