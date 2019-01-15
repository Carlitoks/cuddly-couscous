import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Metrics, Colors } from '../../../Themes';
import FemaleSilhouette from './Partials/FemaleSilhouette';
import SGWaves from './Partials/Waves';
import Questions from './Partials/Questions';

// Styles
import styles from './Styles/AvatarSectionStyles';
import { moderateScale } from '../../../Util/Scaling';
import { Iphone5 } from '../../../Util/Devices';
import SilhouetteWavesBackground from '../../../Assets/SVG/SilhouetteWavesBackground';
import metrics from '../../../Themes/Metrics';
import FreeMinutesWell from '../../Onboarding/Components/FreeMinutesWell';

export default class AvatarSection extends Component {
  renderSections = () => {
    const { firstName, home, pointerEvents, navigation } = this.props;

    return (
      <View style={[styles.columnView]}>
        <View style={{ position: 'absolute', height: metrics.height * 0.3 }}>
          <SilhouetteWavesBackground />
        </View>
        <View
          style={{
            zIndex: 100,
            paddingLeft: 20,
            marginTop: 40
          }}
        >
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
