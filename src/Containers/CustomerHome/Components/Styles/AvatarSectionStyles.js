import { StyleSheet } from "react-native";
import { Metrics, ApplicationStyles, Fonts, Colors } from "../../../../Themes";
import { moderateScale } from '../../../../Util/Scaling';
import { marginTop } from './../../../../Components/ReconnectOptions/styles';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: "contain"
  },
  centered: {
    alignItems: "center"
  },
  linearGradient: {
    flex: 1
  },
  wavesSection: {
    position: "absolute",
    bottom: 0
  }
});
