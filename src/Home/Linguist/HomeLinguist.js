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

import styles from "./styles";
import { Colors, Images } from "../../Themes";
import EN from "../../I18n/en";

class HomeLinguist extends Component {
  navigate = this.props.navigation.navigate;

  render() {
    const { Amount, NumberOfCalls, status, Username, rating } = this.props;
    const languagues = this.props.GetOptions();

    return (
      <View style={styles.scrollContainer}>
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
                  outerContainerStyles={{
                    borderBottomWidth: 0,
                    height: 60
                  }}
                  backgroundColor="transparent"
                  leftComponent={
                    <ShowMenuButton navigation={this.props.navigation} />
                  }
                  centerComponent={{
                    text: Username,
                    style: styles.title
                  }}
                  rightComponent={
                    <SettingsButton navigation={this.props.navigation} />
                  }
                />
                <View>
                  <Avatar
                    containerStyle={{
                      alignSelf: "center"
                    }}
                    avatarStyle={styles.avatar}
                    rounded
                    xlarge
                    source={Images.avatarCall}
                    activeOpacity={0.7}
                  />
                  <Badge
                    value={rating}
                    textStyle={styles.badgeText}
                    containerStyle={styles.badgeContainer}
                  />
                </View>
                <View style={styles.starsContainer}>
                  <View style={[styles.stars, styles.center]}>
                    <StarRating
                      emptyStarColor="gray"
                      emptyStar={"ios-star-outline"}
                      fullStar={"ios-star"}
                      halfStar={"ios-star-half"}
                      iconSet={"Ionicons"}
                      disabled={true}
                      maxStars={5}
                      starSize={18}
                      rating={rating}
                      starColor={Colors.primaryColor}
                    />
                  </View>
                </View>
                <Row style={styles.statusContainer}>
                  <Text style={styles.StatusText}>
                    {EN["Status"]} {status}
                  </Text>
                  <View style={styles.switchContainer}>
                    <Switch
                      onValueChange={available =>
                        this.props.updateSettings({ available: available })
                      }
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
                    wrapperStyle={{
                      flex: 1,
                      alignContent: "space-around"
                    }}
                    containerStyle={styles.button}
                  >
                    <Row>
                      <View style={styles.calls}>
                        <Text style={[styles.TitleText, styles.center]}>
                          {EN["Calls"]}
                        </Text>
                        <Text style={[styles.callNumber, styles.center]}>
                          {NumberOfCalls}
                        </Text>
                      </View>
                      <View style={styles.amount}>
                        <Text style={[styles.TitleText, styles.center]}>
                          {EN["Amount"]}
                        </Text>
                        <Text style={[styles.callNumber, styles.center]}>
                          ${Amount}
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
                  containerStyle={{
                    paddingBottom: 20,
                    paddingTop: 20
                  }}
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
      </View>
    );
  }
}

const mS = state => ({
  available: state.profileLinguist.available,
  rating: state.profileLinguist.rating,
  NumberOfCalls: state.profileLinguist.NumberOfCalls,
  Amount: state.profileLinguist.Amount,
  status: state.profileLinguist.status,
  Username: state.profileLinguist.Username
});

const mD = {
  updateSettings,
  GetOptions
};

export default connect(mS, mD)(HomeLinguist);