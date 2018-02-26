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
import TextButton from "../../Components/TextButton/TextButton";
import ThumbsButton from "../../Components/ThumbsButton/ThumbsButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

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
        uri: `${IMAGE_STORAGE_URL}${linguist.avatarURL}`
      };
    } else if (avatarURL) {
      return {
        uri: `${IMAGE_STORAGE_URL}${avatarURL}`
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
    console.log("sessionID", sessionID);
    this.props
      .submitRateCall(rateInformation, sessionID, this.props.token)
      .then(response => {
        this.props.navigation.dispatch({ type: "Home" });
        this.props.clearOptions();
        this.props.clearCallCustomerSettings();
        this.props.clearCallLinguistSettings();
        this.props.clearContactLinguist();
      })
      .catch(err => {
        console.log(err.response);
        this.props.navigation.dispatch({ type: "Home" });
      });
  };

  /// toogle Thumbs /////////////////////
  GoodIcons = [
    {
      Name: "ios-time",
      IconState: "iconClockFirstList",
      IconName: "clock",
      OffState: "iconClockSecondList",
      label: "Wait Time"
    },
    {
      Name: "ios-volume-up",
      IconState: "iconVolumeFirstList",
      IconName: "volume",
      OffState: "iconVolumeSecondList",
      label: "Audio Quality"
    },
    {
      Name: "ios-wifi",
      IconState: "iconWifiFirstList",
      IconName: "wifi",
      OffState: "iconWifiSecondList",
      label: "Connection Quality"
    },
    {
      Name: "ios-person",
      IconState: "iconPersonFirstList",
      IconName: "person",
      OffState: "iconPersonSecondList",
      label: "Professionalism"
    }
  ];

  BadIcons = [
    {
      Name: "ios-time",
      IconState: "iconClockSecondList",
      IconName: "clock",
      OffState: "iconClockFirstList",
      label: "Wait Time"
    },
    {
      Name: "ios-volume-up",
      IconState: "iconVolumeSecondList",
      IconName: "volume",
      OffState: "iconVolumeFirstList",
      label: "Audio Quality"
    },
    {
      Name: "ios-wifi",
      IconState: "iconWifiSecondList",
      IconName: "wifi",
      OffState: "iconWifiFirstList",
      label: "Connection Quality"
    },
    {
      Name: "ios-person",
      IconState: "iconPersonSecondList",
      IconName: "person",
      OffState: "iconPersonFirstList",
      label: "Professionalism"
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

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          alwaysBounceVertical={false}
        >
          {/* Linguist Information */}
          <TopViewIOS />
          <Grid style={styles.containerInformation}>
            <Col style={styles.linguistAvatar}>
              <Avatar
                large
                containerStyle={styles.avatarContent}
                rounded
                source={this.selectImage()}
              />
            </Col>
            <Col style={styles.linguistInformation}>
              <Text style={styles.linguistName}>
                {this.handleSessionInfoName()}
              </Text>
              <Text style={styles.linguistAddress}>
                <Icon name="ios-pin" size={20} />San Francisc
              </Text>
            </Col>
          </Grid>

          {/* Rate Linguist */}

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
                  emptyStarColor={"#cccccc"}
                  starColor={"#ffcb00"}
                />
              </View>
            </Row>
          </Grid>

          {/* Where you needs addressed*/}

          <Grid>
            <Row style={styles.textContainer}>
              <Text style={styles.textQuestions}>{I18n.t("needsAddress")}</Text>
            </Row>
            <View style={styles.viewContainerThumbs}>
              <View style={styles.thumbsUp}>
                <ThumbsButton
                  IconName="ios-thumbs-up"
                  StateIcon={this.props.thumbsUp}
                  onPress={() => this.buttonThumbs(0)}
                  title="Yes"
                  color="#36D896"
                />
              </View>
              <View style={styles.thumbsDown}>
                <ThumbsButton
                  IconName="ios-thumbs-down"
                  StateIcon={this.props.thumbsDown}
                  onPress={() => this.buttonThumbs(1)}
                  title="No"
                  color="red"
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
                        IconName={item.Name}
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
              <Text style={styles.textQuestions}>{I18n.t("couldBetter")}</Text>
            </Row>
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {WhatCouldBeBetterIcons.map((item, i) => (
                  <View key={i} style={styles.questionIcons}>
                    <TextButton
                      IconName={item.Name}
                      StateIcon={this.props[item.IconState]}
                      onPress={() => this.buttonsHandle(item, "negativeFlags")}
                      title={item.label}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
          </Grid>

          {/* Button Submit*/}

          <Grid>
            <Row>
              <Button
                buttonStyle={styles.buttonSubmit}
                onPress={this.submit}
                title="Submit"
                disabled={
                  !(
                    (this.props.thumbsUp || this.props.thumbsDown) &&
                    this.props.rating > 0
                  )
                }
              />
            </Row>
          </Grid>
        </ScrollView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  rating: state.rateCall.rating,
  thumbsUp: state.rateCall.thumbsUp,
  thumbsDown: state.rateCall.thumbsDown,
  iconClockFirstList: state.rateCall.iconClockFirstList,
  iconVolumeFirstList: state.rateCall.iconVolumeFirstList,
  iconWifiFirstList: state.rateCall.iconWifiFirstList,
  iconPersonFirstList: state.rateCall.iconPersonFirstList,
  iconClockSecondList: state.rateCall.iconClockSecondList,
  iconVolumeSecondList: state.rateCall.iconVolumeSecondList,
  iconWifiSecondList: state.rateCall.iconWifiSecondList,
  iconPersonSecondList: state.rateCall.iconPersonSecondList,
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
