import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateOptions,
  UpdateFlags,
  submitRateCall,
  clearOptions
} from "../../Ducks/RateCallReducer";

import Icon from "react-native-vector-icons/Ionicons";
import { Text, View, ScrollView, Image } from "react-native";
import { SearchBar, Button, Avatar, ButtonGroup } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";
import StarRating from "react-native-star-rating";

import EN from "../../I18n/en";
import { styles } from "./styles";
import { Images } from "../../Themes";

class RateCallView extends Component {
  ///// validate form /////

  componentWillUnmount() {
    this.props.clearOptions();
  }

  submit = () => {
    const { rating, thumbsUp, thumbsDown } = this.props;

    console.log(rating);

    let RateInformation;

    if (thumbsUp) {
      RateInformation = {
        ...RateInformation,
        resolved: true
      };
    } else {
      RateInformation = {
        ...RateInformation,
        resolved: false
      };
    }

    if (rating > 0) {
      RateInformation = {
        ...RateInformation,
        stars: rating
      };
    }

    this.props
      .submitRateCall(RateInformation, this.props.sessionId, this.props.token)
      .then(response => {
        this.props.navigation.dispatch({ type: "Home" });
      });
  };

  /// toogle Thumbs /////////////////////
  GoodIcons = [
    {
      Name: "ios-time",
      IconState: "iconClockFirstList",
      IconName: "clock",
      OffState: "iconClockSecondList"
    },
    {
      Name: "ios-volume-up",
      IconState: "iconVolumeFirstList",
      IconName: "volume",
      OffState: "iconVolumeSecondList"
    },
    {
      Name: "ios-wifi",
      IconState: "iconWifiFirstList",
      IconName: "wifi",
      OffState: "iconWifiSecondList"
    },
    {
      Name: "ios-person",
      IconState: "iconPersonFirstList",
      IconName: "person",
      OffState: "iconPersonSecondList"
    }
  ];

  BadIcons = [
    {
      Name: "ios-time",
      IconState: "iconClockSecondList",
      IconName: "clock",
      OffState: "iconClockFirstList"
    },
    {
      Name: "ios-volume-up",
      IconState: "iconVolumeSecondList",
      IconName: "volume",
      OffState: "iconVolumeFirstList"
    },
    {
      Name: "ios-wifi",
      IconState: "iconWifiSecondList",
      IconName: "wifi",
      OffState: "iconWifiFirstList"
    },
    {
      Name: "ios-person",
      IconState: "iconPersonSecondList",
      IconName: "person",
      OffState: "iconPersonFirstList"
    }
  ];


  buttonTHumbs(selectedIndex) {
    if (selectedIndex == 0) {
      this.TogglethumbsUp();
    } else {
      this.TogglethumbsDown();
    }
  }

  TogglethumbsUp = () => {
    this.props.updateOptions({
      thumbsUp: true,
      thumbsDown: false
    });
  };

  TogglethumbsDown = () => {
    this.props.updateOptions({
      thumbsDown: true,
      thumbsUp: false
    });
  };

  ButtonsHandle(selectedIndex, flag) {
    let icon;
    if (flag == "positiveFlags") {
      icon = this.GoodIcons[selectedIndex];
    } else {
      icon = this.BadIcons[selectedIndex];
    }
    this.GenericToggleFunction(
      icon.IconName,
      icon.IconState,
      this.props[icon.IconState],
      flag,
      icon.OffState
    );
  }
  //////////// Toogle Icons function  /////

  /*
 * @param {string} IconName - Name of the Icon.
 * @param {string} StateName - Name of the state
 * @param {object} IconState - object that content the current state 
 * @param {string} flagstore - The action asociated with the question that we are selecting at the moment
 * @param {string} OffState - string used to identify the state of the icon that we are going to turn off   
 */

  GenericToggleFunction = (IconName, StateName, IconState, flagsStore, OffState) => {
    const ObjectState = {};
    ObjectState[StateName] = !IconState;
    const ObjectOffState = {};
    ObjectOffState[OffState] = false;
    this.props.UpdateFlags(IconName, ObjectState, flagsStore, !IconState, ObjectOffState);
  };

  render() {
    const thumbsButtons = [
      <Icon
        style={
          this.props.thumbsUp ? { color: "#3b98b7" } : { color: "#cdcdcd" }
        }
        name="ios-thumbs-up"
        size={40}
      />,
      <Icon
        style={
          this.props.thumbsDown ? { color: "#3b98b7" } : { color: "#cdcdcd" }
        }
        name="ios-thumbs-down"
        size={40}
      />
    ];

    const WhatWasGoodIcons = this.GoodIcons.map(value => {
      return (
        <Icon
          style={
            this.props[value.IconState]
              ? { color: "#3b98b7" }
              : { color: "#cdcdcd" }
          }
          name={value.Name}
          size={35}
        />
      );
    });

    const WhatCouldBeBetterIcons = this.BadIcons.map(value => {
      return (
        <Icon
          style={
            this.props[value.IconState]
              ? { color: "#3b98b7" }
              : { color: "#cdcdcd" }
          }
          name={value.Name}
          size={35}
        />
      );
    });

    return (
      <View style={styles.scrollContainer}>
        <ScrollView automaticallyAdjustContentInsets={true}>
          {/* Linguist Information */}
          <Grid style={styles.containerInformation}>
            <Col style={styles.LinguistAvatar}>
              <Avatar
                large
                containerStyle={styles.avatarContent}
                rounded
                source={Images.avatar}
              />
            </Col>
            <Col style={styles.LinguistInformation}>
              <Text style={styles.LinguistName}>Zhang W.</Text>
              <View>
              <Text style={styles.LinguistAddress}>
                <Icon name="ios-pin" size={20} /> San Francisco
              </Text>
              </View>
            </Col>
          </Grid>

          {/* Rate Linguist */}

          <Grid>
            <Row style={styles.TextContainer}>
              <Text style={styles.TextQuestions}>{EN["RateLinguist"]}</Text>
            </Row>
            <Row style={styles.StarContainer}>
              <View style={styles.Stars}>
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
            <Row style={styles.TextContainer}>
              <Text style={styles.TextQuestions}>{EN["NeedsAddress"]}</Text>
            </Row>
            <View style={styles.ViewContainerThumbs}>
              <ButtonGroup
                buttons={thumbsButtons}
                containerStyle={styles.tabsThumbsIcons}
                innerBorderStyle={{ color: "white" }}
                onPress={i => this.buttonTHumbs(i)}
              />
            </View>
          </Grid>

          {/* What was good */}

          <Grid>
            <Row style={styles.TextContainer}>
              <Text style={styles.TextQuestions}>{EN["WasGood"]}</Text>
            </Row>
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <ButtonGroup
                  buttons={WhatWasGoodIcons}
                  containerStyle={styles.tabsIcons}
                  innerBorderStyle={{ color: "white" }}
                  onPress={i => this.ButtonsHandle(i, "positiveFlags")}
                />
              </ScrollView>
            </View>
          </Grid>

          {/* What could be better*/}

          <Grid>
            <Row style={styles.TextContainer}>
              <Text style={styles.TextQuestions}>{EN["CouldBetter"]}</Text>
            </Row>
            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <ButtonGroup
                  buttons={WhatCouldBeBetterIcons}
                  containerStyle={styles.tabsIcons}
                  innerBorderStyle={{ color: "white" }}
                  onPress={i => this.ButtonsHandle(i, "negativeFlags")}
                />
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
      </View>
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
  sessionId: state.callCustomerSettings.sessionId
});

const mD = {
  updateOptions,
  UpdateFlags,
  submitRateCall,
  clearOptions
};

export default connect(mS, mD)(RateCallView);
