import React, { Component } from "react";
import { connect } from "react-redux";

import {
  updateSettings,
  GetOptions
} from "../Ducks/ProfileLinguistReducer";

import { View, Text, Image, ScrollView, Switch } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button, FormLabel, FormInput, Header, Card, List, ListItem } from "react-native-elements";
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/MaterialIcons";

import ShowMenuButton from "../Components/ShowMenuButton/ShowMenuButton";
import SettingsButton from "../Components/SettingsButton/SettingsButton";

import styles from "./styles";
import { Colors } from "../Themes";
import { Images } from "../Themes";
import EN from "../I18n/en";

class HomeLinguist extends Component {


  navigate = this.props.navigation.navigate;

  render() {

    const { Amount, NumberOfCalls, status, Username } = this.props;
    //const languagues = [];
    console.log(this.props.GetOptions());
    const languagues = this.props.GetOptions();

    return (
      <View style={styles.containerPerfil}>
        <ScrollView>
          <Grid>
            <Col>
              <View>
                <View style={styles.IconView}>
                  {/* Header - Navigation */}
                  <Header
                    outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                    backgroundColor="transparent"
                    leftComponent={
                      <ShowMenuButton navigation={this.props.navigation} />
                    }
                    rightComponent={
                      <SettingsButton navigation={this.props.navigation} />
                    }
                  />
                </View>
              </View>
              <View>
                <Image
                  style={[styles.logo, styles.center]}
                  source={Images.avatar}
                />
                <Text style={styles.textName}>
                  {Username}
                </Text>
              </View>
              <View style={styles.starsContainer}>
                <View style={[styles.stars, styles.center]}>
                  <StarRating
                    emptyStar={"ios-star-outline"}
                    fullStar={"ios-star"}
                    halfStar={"ios-star-half"}
                    iconSet={"Ionicons"}
                    disabled={true}
                    maxStars={5}
                    starSize={22}
                    rating={this.props.rating}
                    starColor={Colors.primaryColor}
                  />
                </View>
                <Text style={styles.textStars}>{this.props.rating}</Text>
              </View>
              {/* Home */}
            </Col>
          </Grid>
          <Grid>
            <Col style={styles.status}>
              <Text style={styles.StatusText}>
                {EN["Status"]} {status}
              </Text>
            </Col>
            <Col>
              <View style={styles.switch}>
                <Switch
                  onValueChange={available =>
                    this.props.updateSettings({ available: available })
                  }
                  style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
                  value={this.props.available}
                  onTintColor={Colors.onTintColor}
                  thumbTintColor={Colors.thumbTintColor}
                  tintColor={Colors.tintColor}
                />
              </View>
            </Col>
          </Grid>
          <Grid style={{ marginTop: 20 }}>
            <Col style={styles.calls}>
              <Card
                containerStyle={styles.button}
              >
                <Text style={[styles.TitleText, styles.center]}>
                  {EN["Calls"]}
                </Text>
                <Text style={[styles.callNumber, styles.center]}>
                  {NumberOfCalls}
                </Text>
              </Card>
            </Col>
            <Col style={styles.amount}>
              <Card
                containerStyle={styles.button}
              >
                <Text style={[styles.TitleText, styles.center]}>
                  {EN["Amount"]}
                </Text>
                <Text style={[styles.callNumber, styles.center]}>
                  ${Amount}
                </Text>
              </Card>
            </Col>
          </Grid>

          <List>
            <ListItem
              title={EN["LanguagePairs"]}
              hideChevron
              containerStyle={{ paddingBottom: 20, paddingTop: 20 }}
              titleStyle={{ color: "#b7b7b7", fontSize: 20 }}
            />
            {
              languagues.map((item, i) => (
                <ListItem
                  key={i}
                  title={item.language}
                  leftIcon={{ name: "transform" }}
                  titleStyle={{ fontSize: 20 }}
                  badge={{ value: item.translates, textStyle: styles.badgeText, containerStyle: { backgroundColor: "transparent" } }}
                />
              ))
            }
          </List>
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
