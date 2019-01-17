import { StyleSheet } from 'react-native';
import { Iphone5 } from '../../../../../Util/Devices';

export default StyleSheet.create({
  wavesContainer: {
    position: 'absolute',
    zIndex: 0,
    opacity: 0.35,
    bottom: Iphone5 ? -8 : -5
  }
});
