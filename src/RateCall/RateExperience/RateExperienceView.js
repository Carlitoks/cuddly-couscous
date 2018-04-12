import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateOptions,
  UpdateFlags,
  submitRateCall,
  clearOptions
} from "../../Ducks/RateCallReducer";
import { clearSettings as clearCallCustomerSettings } from "../../Ducks/CallCustomerSettings";
import { clearSettings as clearCallLinguistSettings } from "../../Ducks/CallLinguistSettings";
import { clearSettings as clearContactLinguist } from "../../Ducks/ContactLinguistReducer";

import Icon from "react-native-vector-icons/Ionicons";
import { Text, View, ScrollView, Image } from "react-native";
import {
  SearchBar,
  Button,
  Avatar,
  ButtonGroup,
  Card,
  Title
} from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import StarRating from "react-native-star-rating";
import I18n from "../../I18n/I18n";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import { styles } from "./styles";
import { Images } from "../../Themes";
import BottomButton from "../../Components/BottomButton/BottomButton";
import TextButton from "../../Components/TextButton/TextButton";
import ThumbsButton from "../../Components/ThumbsButton/ThumbsButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
import HeaderView from "../../Components/HeaderView/HeaderView";

import Colors from "../../Themes/Colors";
import { IMAGE_STORAGE_URL } from "../../Config/env";

class RateCallView extends Component {
  ///// validate form /////
  handleSessionInfoName() {
    if (this.props.customerName) {
      return this.props.customerName;
    } else if (this.props.linguist) {
      return `${this.props.linguist.firstName} ${
        this.props.linguist.lastInitial
      }`;
    } else return `Zhang W.`;
  }
  componentWillUnmount() {}

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
          this.props.clearCallCustomerSettings();
          this.props.clearCallLinguistSettings();
          this.props.clearContactLinguist();
          this.props.navigation.dispatch({ type: "Home" });
        })
        .catch(err => {
          console.log("Rate Fail");
          this.props.clearOptions();
          this.props.clearCallCustomerSettings();
          this.props.clearCallLinguistSettings();
          this.props.clearContactLinguist();
          this.props.navigation.dispatch({ type: "Home" });
        });
    } else {
      this.props.clearOptions();
      this.props.clearCallCustomerSettings();
      this.props.clearCallLinguistSettings();
      this.props.clearContactLinguist();
      this.props.navigation.dispatch({ type: "Home" });
    }
  };

  /// toogle Thumbs /////////////////////
  GoodIcons = [
    {
      Name: "ios-time",
      IconState: "iconWaitTimeFirstList",
      IconName: "waitTime",
      OffState: "iconWaitTimeSecondList",
      label: "Wait Time"
    },
    {
      Name: "ios-body",
      IconState: "iconProfessionalismFirstList",
      IconName: "professionalism",
      OffState: "iconProfessionalismSecondList",
      label: "Professionalism"
    },
    {
      Name: "ios-happy",
      IconState: "iconFriendlinessFirstList",
      IconName: "friendliness",
      OffState: "iconFriendlinessSecondList",
      label: "Friendliness"
    },
    {
      Name: "ios-person",
      IconState: "iconLanguageAbilityFirstList",
      IconName: "language",
      OffState: "iconLanguageAbilitySecondList",
      label: "Language Ability"
    },
    {
      Name: "ios-microphone",
      IconState: "iconUnderstandFirstList",
      IconName: "easyUnderstand",
      OffState: "iconUnderstandSecondList",
      label: "Easy to Understand"
    },
    {
      Name: "ios-volume-up",
      IconState: "iconAudioQualityFirstList",
      IconName: "audio",
      OffState: "iconAudioQualityFirstList",
      label: "Audio Quality"
    }
  ];

  BadIcons = [
    {
      Name: "ios-time",
      IconState: "iconWaitTimeSecondList",
      IconName: "waitTime",
      OffState: "iconWaitTimeFirstList",
      label: "Wait Time"
    },
    {
      Name: "ios-body",
      IconState: "iconProfessionalismSecondList",
      IconName: "professionalism",
      OffState: "iconProfessionalismFirstList",
      label: "Professionalism"
    },
    {
      Name: "ios-happy",
      IconState: "iconFriendlinessSecondList",
      IconName: "friendliness",
      OffState: "iconFriendlinessFirstList",
      label: "Friendliness"
    },
    {
      Name: "ios-person",
      IconState: "iconLanguageAbilitySecondList",
      IconName: "language",
      OffState: "iconLanguageAbilityFirstList",
      label: "Language Ability"
    },
    {
      Name: "ios-microphone",
      IconState: "iconUnderstandSecondList",
      IconName: "easyUnderstand",
      OffState: "iconUnderstandFirstList",
      label: "Hard to Understand"
    },
    {
      Name: "ios-wifi",
      IconState: "iconConnectionSecondList",
      IconName: "connection",
      OffState: "iconConnectionFirstList",
      label: "Connection"
    },
    {
      Name: "ios-musical-note",
      IconState: "iconBackgroundNoiseSecondList",
      IconName: "noise",
      OffState: "iconBackgroundNoiseFirstList",
      label: "Background Noise"
    },
    {
      Name: "ios-recording",
      IconState: "iconVoiceClaritySecondList",
      IconName: "voiceClarity",
      OffState: "iconVoiceClarityFirstList",
      label: "Voice Clarity"
    },
    {
      Name: "ios-outlet",
      IconState: "iconDistractionsSecondList",
      IconName: "distractions",
      OffState: "iconDistractionsFirstList",
      label: "Distractions"
    }
  ];

  buttonThumbs(selectedIndex) {
    if (selectedIndex == 0) {
      this.togglethumbsUp();
    } else {
      this.togglethumbsDown();
    }
  }

  togglethumbsUp = () => {
    this.props.updateOptions({
      thumbsUp: true,
      thumbsDown: false
    });
  };

  togglethumbsDown = () => {
    this.props.updateOptions({
      thumbsDown: true,
      thumbsUp: false
    });
  };

  buttonsHandle = (icon, flag) => {
    this.genericToggleFunction(
      icon.IconName,
      icon.IconState,
      this.props[icon.IconState],
      flag,
      icon.OffState
    );
  };
  //////////// Toogle Icons function  /////

  /*
 * @param {string} IconName - Name of the Icon.
 * @param {string} StateName - Name of the state
 * @param {object} IconState - object that content the current state
 * @param {string} flagstore - The action asociated with the question that we are selecting at the moment
 * @param {string} OffState - string used to identify the state of the icon that we are going to turn off
 */

  genericToggleFunction = (
    IconName,
    StateName,
    IconState,
    flagsStore,
    OffState
  ) => {
    const ObjectState = {};
    ObjectState[StateName] = !IconState;
    const ObjectOffState = {};
    ObjectOffState[OffState] = false;
    this.props.UpdateFlags(
      IconName,
      ObjectState,
      flagsStore,
      !IconState,
      ObjectOffState
    );
  };

  render() {
    const WhatWasGoodIcons = this.GoodIcons;

    const WhatCouldBeBetterIcons = this.BadIcons;
    const { customerName } = this.props;
    return (
      <ViewWrapper style={[styles.scrollContainer]}>
        {/* Linguist Information */}
        <HeaderView
          avatarSource={this.selectImage()}
          avatarHeight={100}
          avatarTitle={this.handleSessionInfoName()}
        >
          <ScrollView
            automaticallyAdjustContentInsets={true}
            alwaysBounceVertical={false}
          >
            <Grid>
              <Row style={styles.textContainer}>
                <Text style={styles.textQuestions}>
                  {I18n.t("rateYour")}{" "}
                  {this.props.linguistProfile
                    ? I18n.t("customer")
                    : I18n.t("linguist")}
                </Text>
              </Row>
              <Row style={styles.starContainer}>
                <View style={styles.stars}>
                  <StarRating
                    emptyStar={"ios-star"}
                    fullStar={"ios-star"}
                    halfStar={"ios-star-half"}
                    iconSet={"Ionicons"}
                    disabled={false}
                    rating={this.props.rating}
                    selectedStar={rating =>
                      this.props.updateOptions({ rating: rating })
                    }
                    maxStars={5}
                    starSize={45}
                    emptyStarColor={Colors.emptyStarColor}
                    fullStarColor={Colors.gradientColorButton.top}
                    starColor={Colors.gradientColorButton.top}
                  />
                </View>
              </Row>
            </Grid>

            {/* Where you needs addressed*/}

            <Grid>
              <Row style={styles.textContainer}>
                <Text style={styles.textQuestions}>
                  {I18n.t("needsAddress")}
                </Text>
              </Row>
              <View style={styles.viewContainerThumbs}>
                <View style={styles.thumbsUp}>
                  <ThumbsButton
                    IconName="ios-thumbs-up"
                    StateIcon={this.props.thumbsUp}
                    onPress={() => this.buttonThumbs(0)}
                    color={Colors.gradientColorButton.middle}
                  />
                </View>
                <View style={styles.thumbsDown}>
                  <ThumbsButton
                    IconName="ios-thumbs-down"
                    StateIcon={this.props.thumbsDown}
                    onPress={() => this.buttonThumbs(1)}
                    color={Colors.gradientColorButton.middle}
                  />
                </View>
              </View>
            </Grid>

            {/* What was good */}

            <Grid>
              <Row style={styles.textContainer}>
                <Text style={styles.textQuestions}>{I18n.t("wasGood")}</Text>
              </Row>
              <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.viewContainerQuestion}>
                    {WhatWasGoodIcons.map((item, i) => (
                      <View key={i} style={styles.questionIcons}>
                        <TextButton
                          IconName={item.IconName}
                          StateIcon={this.props[item.IconState]}
                          onPress={() =>
                            this.buttonsHandle(item, "positiveFlags")
                          }
                          title={item.label}
                        />
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </Grid>

            {/* What could be better*/}

            <Grid>
              <Row style={styles.textContainer}>
                <Text style={styles.textQuestions}>
                  {I18n.t("couldBetter")}
                </Text>
              </Row>
              <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {WhatCouldBeBetterIcons.map((item, i) => (
                    <View key={i} style={styles.questionIcons}>
                      <TextButton
                        IconName={item.IconName}
                        StateIcon={this.props[item.IconState]}
                        onPress={() =>
                          this.buttonsHandle(item, "negativeFlags")
                        }
                        title={item.label}
                      />
                    </View>
                  ))}
                </ScrollView>
              </View>
            </Grid>
            {/* Report a problem */}
            <Text style={styles.forgotPasswordText}>
              {I18n.t("reportProblem")}
            </Text>
            <View style={{ marginBottom: 10 }} />
          </ScrollView>
        </HeaderView>
        {/* Rate Linguist */}

        {/* Button Submit*/}
        <BottomButton
          title="Submit"
          onPress={() => {
            this.submit();
          }}
          disabled={
            !(
              (this.props.thumbsUp || this.props.thumbsDown) &&
              this.props.rating > 0
            )
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

  iconWaitTimeFirstList: state.rateCall.iconWaitTimeFirstList,
  iconProfessionalismFirstList: state.rateCall.iconProfessionalismFirstList,
  iconFriendlinessFirstList: state.rateCall.iconFriendlinessFirstList,
  iconLanguageAbilityFirstList: state.rateCall.iconLanguageAbilityFirstList,
  iconUnderstandFirstList: state.rateCall.iconUnderstandFirstList,
  iconAudioQualityFirstList: state.rateCall.iconAudioQualityFirstList,

  iconWaitTimeSecondList: state.rateCall.iconWaitTimeSecondList,
  iconProfessionalismSecondList: state.rateCall.iconProfessionalismSecondList,
  iconFriendlinessSecondList: state.rateCall.iconFriendlinessSecondList,
  iconLanguageAbilitySecondList: state.rateCall.iconLanguageAbilitySecondList,
  iconUnderstandSecondList: state.rateCall.iconUnderstandSecondList,
  iconConnectionSecondList: state.rateCall.iconConnectionSecondList,
  iconBackgroundNoiseSecondList: state.rateCall.iconBackgroundNoiseSecondList,
  iconVoiceClaritySecondList: state.rateCall.iconVoiceClaritySecondList,
  iconDistractionsSecondList: state.rateCall.iconDistractionsSecondList,

  token: state.auth.token,
  sessionID: state.tokbox.sessionID,
  customerName: state.callLinguistSettings.customerName,
  avatarURL: state.callLinguistSettings.avatarURL,
  linguistProfile: state.userProfile.linguistProfile,
  linguist: state.sessionInfo.linguist
});

const mD = {
  updateOptions,
  UpdateFlags,
  submitRateCall,
  clearOptions,
  clearCallCustomerSettings,
  clearCallLinguistSettings,
  clearContactLinguist
};

export default connect(mS, mD)(RateCallView);
