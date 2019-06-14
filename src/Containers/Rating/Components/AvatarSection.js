import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { Waves } from "../../../Assets/SVG";
import metrics from "../../../Themes/Metrics";
import { Images } from "../../../Themes";
// Styles
import styles from "./Styles/AvatarSectionStyles";

class AvatarSection extends Component {
  selectImage = () => {
    const { avatarURL } = this.props;
    if (avatarURL) {
      return {
        uri: avatarURL,
      };
    }
    return Images.avatar;
  };

  handleSessionInfoName = () => {
    const {
      customerName, navigation,
    } = this.props;
    if (customerName) {
      return customerName;
    }
    navigation.dispatch({ type: "Home" });
    return <React.Fragment />;
  };

  render() {
    return (
      <View style={styles.mainAvatarSectionContainer}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={this.selectImage()} />
          <Text style={styles.firstName}>{this.handleSessionInfoName()}</Text>
        </View>
        <View style={styles.waves}>
          <Waves
            width={metrics.width}
            height={(metrics.width * 129) / 1175.7}
            viewBox="0 0 1175.7 129"
          />
        </View>
      </View>
    );
  }
}


export default (AvatarSection);
