import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { connect } from "react-redux";
import { SGWaves } from "../../../Assets/SVG";
import metrics from "../../../Themes/Metrics";
import { Images } from "../../../Themes";
import { clearOptions, submitRateCall } from "../../../Ducks/RateCallReducer";
import { changeStatus } from "../../../Ducks/ProfileLinguistReducer";
// Styles
import styles from "./Styles/AvatarSectionStyles";

class AvatarSection extends Component {
  selectImage = () => {
    const { avatarURL, linguist } = this.props;

    if (linguist && linguist.avatarURL) {
      return {
        uri: linguist.avatarURL,
      };
    } if (avatarURL) {
      return {
        uri: avatarURL,
      };
    }
    return Images.avatar;
  };

  handleSessionInfoName = () => {
    const {
      customerName, linguist, clearOptions, navigation,
    } = this.props;
    if (customerName) {
      return customerName.split("undefined")[0];
    } if (linguist) {
      if (linguist.lastInitial) {
        return `${linguist.firstName} ${
          linguist.lastInitial
        }`;
      }
      return linguist.firstName;
    }
    clearOptions();
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
          <SGWaves height={41} width={metrics.width} />
        </View>
      </View>
    );
  }
}

const mS = state => ({
  rating: state.rateCall.rating,
  thumbsUp: state.rateCall.thumbsUp,
  thumbsDown: state.rateCall.thumbsDown,
  sessionID: state.rateCall.sessionID,
  token: state.auth.token,
  customerName: state.rateCall.customerName,
  avatarURL: state.activeSessionReducer.avatarURL,
  linguistProfile: state.userProfile.linguistProfile,
  linguist: state.sessionInfo.linguist,
});
const mD = {
  submitRateCall,
  clearOptions,
  changeStatus,
};
export default connect(
  mS,
  mD,
)(AvatarSection);
