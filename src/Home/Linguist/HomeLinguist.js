import React, { Component } from "react";
import { connect } from "react-redux";

import { updateSettings, GetOptions } from "../../Ducks/ProfileLinguistReducer";

import { View, Text, Image, ScrollView, Switch } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  Button,
  FormLabel,
  FormInput,
  Header,
  Card,
  List,
  ListItem,
  Avatar,
  Badge
} from "react-native-elements";
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";

import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";

import { Sessions } from "../../Api";
import { getInvitations } from "../../Ducks/CallLinguistSettings";

import styles from "./styles";
import { Colors, Images } from "../../Themes";
import EN from "../../I18n/en";
import { IMAGE_STORAGE_URL } from "../../Config/env";

class Home extends Component {
  navigate = this.props.navigation.navigate;

  componentWillMount() {
    this.props.updateSettings({
      polling: true
    });

    if (this.props.available) {
      setTimeout(() => {
        this.props.getInvitations();
      }, 10000);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.available) {
      setTimeout(() => {
        this.props.getInvitations();
      }, 10000);
    }
  }

  render() {
    const {
      amount,
      numberOfCalls,
      status,
      firstName,
      lastName,
      avatarURL,
      available,
      rate
    } = this.props;
    const languagues = this.props.GetOptions();

    return (
      <ViewWrapper style={styles.scrollContainer}>
        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={styles.scrollContainer}
        >
          <Grid>
            <Col>
              <Col>
                {/* Linear Gradient */}
                <LinearGradient
                  colors={[
                    Colors.gradientColor.top,
                    Colors.gradientColor.middle,
                    Colors.gradientColor.bottom
                  ]}
                  style={styles.linearGradient}
                />
                {/* Header - Navigation */}
                <Header
                  outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                  backgroundColor="transparent"
                  leftComponent={
                    <ShowMenuButton navigation={this.props.navigation} />
                  }
                  centerComponent={{
                    text: firstName + " " + lastName,
                    style: styles.title
                  }}
                  rightComponent={
                    <SettingsButton navigation={this.props.navigation} />
                  }
                />
                <View>
                  <Avatar
                    containerStyle={{ alignSelf: "center" }}
                    avatarStyle={styles.avatar}
                    rounded
                    xlarge
                    source={
                      avatarURL ? (
                        {
                          uri: `${IMAGE_STORAGE_URL}${avatarURL}?${new Date()
                            .getMilliseconds}`
                        }
                      ) : (
                        Images.avatar
                      )
                    }
                    activeOpacity={0.7}
                  />
                  <Badge
                    value={rate}
                    textStyle={styles.badgeText}
                    containerStyle={styles.badgeContainer}
                  />
                </View>
                <View style={styles.starsContainer}>
                  <View style={[styles.stars, styles.center]}>
                    <StarRating
                      emptyStarratingColor="gray"
                      emptyStar={"ios-star-outline"}
                      fullStar={"ios-star"}
                      halfStar={"ios-star-half"}
                      iconSet={"Ionicons"}
                      disabled={true}
                      maxStars={5}
                      starSize={18}
                      rating={rate}
                      starColor={Colors.primaryColor}
                    />
                  </View>
                </View>
                <Row style={styles.statusContainer}>
                  <Text style={styles.StatusText}>
                    {EN["Status"]} {available ? EN["online"] : EN["offline"]}
                  </Text>
                  <View style={styles.switchContainer}>
                    <Switch
                      onValueChange={available =>
                        this.props.updateSettings({ available: available })}
                      style={styles.switch}
                      value={this.props.available}
                      onTintColor={Colors.onTintColor}
                      thumbTintColor={Colors.thumbTintColor}
                      tintColor={Colors.tintColor}
                    />
                  </View>
                </Row>
              </Col>
              <Row>
                <Col>
                  <Card
                    style={{ alignContent: "space-betwen" }}
                    wrapperStyle={{ flex: 1, alignContent: "space-around" }}
                    containerStyle={styles.button}
                  >
                    <Row>
                      <View style={styles.calls}>
                        <Text style={[styles.TitleText, styles.center]}>
                          {EN["Calls"]}
                        </Text>
                        <Text style={[styles.callNumber, styles.center]}>
                          {numberOfCalls}
                        </Text>
                      </View>
                      <View style={styles.amount}>
                        <Text style={[styles.TitleText, styles.center]}>
                          {EN["Amount"]}
                        </Text>
                        <Text style={[styles.callNumber, styles.center]}>
                          ${amount}
                        </Text>
                      </View>
                    </Row>
                  </Card>
                </Col>
              </Row>

              <List containerStyle={{ borderTopWidth: 0 }}>
                <ListItem
                  title={EN["sessionInQueue"]}
                  hideChevron
                  containerStyle={{ paddingBottom: 20, paddingTop: 20 }}
                  titleStyle={{ color: "#b7b7b7", fontSize: 20 }}
                />
                {languagues.map((item, i) => (
                  <ListItem
                    key={i}
                    title={item.language}
                    leftIcon={{ name: "swap-horiz" }}
                    titleStyle={{ fontSize: 20 }}
                    badge={{
                      value: item.translates,
                      textStyle: styles.badgeText,
                      containerStyle: { backgroundColor: "transparent" }
                    }}
                  />
                ))}
              </List>
            </Col>
          </Grid>
        </ScrollView>
      </ViewWrapper>
    );
  }
}

const mS = state => ({
  available: state.profileLinguist.available,
  numberOfCalls: state.profileLinguist.NumberOfCalls,
  amount: state.profileLinguist.Amount,
  status: state.profileLinguist.status,
  uuid: state.auth.uuid,
  token: state.auth.token,
  firstName: state.userProfile.firstName,
  lastName: state.userProfile.lastName,
  avatarURL: state.userProfile.avatarURL,
  linguistProfile: state.userProfile.linguistProfile,
  rate: state.userProfile.averageStarRating
});

const mD = {
  updateSettings,
  GetOptions,
  getInvitations
};

export default connect(mS, mD)(Home);