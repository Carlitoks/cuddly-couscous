import React, { Component } from 'react';
import { View } from 'react-native';
import Questions from './Partials/Questions';
import SilhouetteWavesBackground from '../../../Assets/SVG/SilhouetteWavesBackground';
import FreeMinutesWell from '../../Onboarding/Components/FreeMinutesWell';
// Styles
import styles from './Styles/AvatarSectionStyles';

export default class AvatarSection extends Component {
  renderSections = () => {
    const { firstName, home, pointerEvents, navigation } = this.props;

    return (
      <View style={[styles.columnView]}>
        <View style={styles.absolutePosition}>
          <SilhouetteWavesBackground />
        </View>
        <View style={styles.questionsContainer}>
          <Questions home={home} firstName={firstName} />
        </View>
        <FreeMinutesWell pointerEvents={pointerEvents} navigation={navigation} />
      </View>
    );
  };

  render() {
    return <View style={styles.avatarSectionContainer}>{this.renderSections()}</View>;
  }
}
