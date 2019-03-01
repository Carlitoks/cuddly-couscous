import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";

import { connect } from "react-redux";

import I18n from "../../I18n/I18n";
import HeaderView from "../../Components/HeaderView/HeaderView";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import BottomButton from "../../Components/BottomButton/BottomButton";
import { submitRateCall, clearOptions } from "../../Ducks/RateCallReducer";
import { styles } from "./styles";
import RateExperienceStars from "./RateExperienceStars";
import RateExperienceThumbs from "./RateExperienceThumbs";
import WhatWasGood from "./WhatWasGood";
import WhatCouldBeBetter from "./WhatCouldBeBetter";
import { Images } from "../../Themes";
import SoundManager, {playSound} from "../../Util/SoundManager";
import {
  changeStatus
} from "../../Ducks/ProfileLinguistReducer";
import Sound from "react-native-sound";
import {SOUNDS} from "../../Util/Constants";

class RateView extends Component {
  componentWillMount() {
    playSound(SOUNDS.END_CALL);
    this.props.changeStatus(true);
  }
  
  submit = () => {
    const { rating, thumbsUp, thumbsDown, sessionID } = this.props;

    let rateInformation;

    if (thumbsUp) {
      rateInformation = {
        ...rateInformation,
        resolved: true
      };
    } else {
      rateInformation = {
        ...rateInformation,
        resolved: false
      };
    }

    if (rating > 0) {
      rateInformation = {
        ...rateInformation,
        stars: rating
      };
    }
    if (sessionID) {
      this.props
        .submitRateCall(rateInformation, sessionID, this.props.token)
        .then(response => {
          this.props.clearOptions();
          this.props.navigation.dispatch({ type: "Home" });
        })
        .catch(err => {
          console.log(err);
          this.props.clearOptions();
          this.props.navigation.dispatch({ type: "Home" });
        });
    } else {
      this.props.clearOptions();
      this.props.navigation.dispatch({ type: "Home" });
    }
  };
  handleSessionInfoName() {
    if (this.props.customerName) {
      return this.props.customerName.split('undefined')[0];
    } else if (this.props.linguist) {
      return `${this.props.linguist.firstName} ${
        this.props.linguist.lastInitial
      }`;
    } else {
      this.props.clearOptions();
      this.props.navigation.dispatch({ type: "Home" });
    }
  }
  selectImage = () => {
    const { avatarURL, linguist } = this.props;

    if (linguist && linguist.avatarURL) {
      return {
        uri: this.props.linguist.avatarURL
      };
    } else if (avatarURL) {
      return {
        uri: this.props.avatarURL
      };
    } else {
      return Images.avatar;
    }
  };
  render() {
    return (
      <ViewWrapper style={styles.scrollContainer}>
        <HeaderView
          avatarSource={this.selectImage()}
          avatarHeight={96}
          avatarTitle={this.handleSessionInfoName()}
          height={200}
          rate
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            alwaysBounceVertical={false}
          >
            <RateExperienceStars />
            <RateExperienceThumbs />
            <WhatWasGood />
            <WhatCouldBeBetter />
          </ScrollView>
          <Text style={styles.instabugText}>{I18n.t("reportProblem")}</Text>
        </HeaderView>
        <BottomButton
          title={I18n.t("session.rating.submit")}
          onPress={() => {
            this.submit();
          }}
          disabled={
            !(
              (this.props.thumbsUp || this.props.thumbsDown) &&
              this.props.rating > 0
            )
          }
          fill={
            (this.props.thumbsUp || this.props.thumbsDown) &&
            this.props.rating > 0
          }
        />
      </ViewWrapper>
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
  linguist: state.sessionInfo.linguist
});
const mD = {
  submitRateCall,
  clearOptions,
  changeStatus
};
export default connect(
  mS,
  mD
)(RateView);
