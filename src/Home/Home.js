import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getProfileAsync,
  clearView,
  updateView
} from "../Ducks/UserProfileReducer";

import { View, Text, Image, ScrollView } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button, FormLabel, FormInput, Header } from "react-native-elements";
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/MaterialIcons";
import TopViewIOS from "../Components/TopViewIOS/TopViewIOS";
import ShowMenuButton from "../Components/ShowMenuButton/ShowMenuButton";
import { Sessions } from "../Api";
import { AsyncAcceptsInvite } from "../Ducks/CallLinguistSettings";

import styles from "./styles";
import { Colors } from "../Themes";
import EN from "../I18n/en";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { starCount: 4.3 };
  }

  componentWillMount() {
    this.props.getProfileAsync(this.props.uuid, this.props.token);
  }

  componentWillUnmount() {
    // this.props.clearView();
  }

  onPoolingPress = () => { 
    Sessions.GetInvitations(this.props.uuid, this.props.token)
      .then( response => {
        if(response.data.length > 0){
          // There's at least one call. Let's attend the first one
          const length = response.data.length;
          const invitationId = response.data[0].id;
          const accept = {"accept": true};
          const { token } = this.props;

          this.props.AsyncAcceptsInvite(invitationId, accept, token)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  navigate = this.props.navigation.navigate;

  render() {
    return (
      <View>
        <ScrollView>
          <Grid>
            <Col style={styles.containerPerfil}>
            <TopViewIOS/>
              <View>
                <View style={styles.IconView}>
                  {/* Header - Navigation */}
                  <Header
                    outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                    backgroundColor="transparent"
                    leftComponent={
                      <ShowMenuButton navigation={this.props.navigation} />
                    }
                  />
                </View>
              </View>
              <View>
                <Image
                  style={[styles.logo, styles.center]}
                  source={require("../Images/perfil.jpg")}
                />
                <Text style={styles.textName}>
                  {this.props.firstName} {this.props.lastName}
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
                    rating={this.props.rate}
                    starColor={Colors.primaryColor}
                  />
                </View>
                <Text style={styles.textStars}>{this.props.rate}</Text>
              </View>
              {/* Home */}
              <View>
                <Button
                  buttonStyle={[styles.button, styles.center]}
                  onPress={() =>
                    this.props.navigation.dispatch({ type: "ContactLinguist" })
                  }
                  textStyle={[styles.buttonText, styles.center]}
                  title={EN["callLinguist"]}
                  icon={{
                    name: "videocam",
                    size: 45,
                    color: Colors.primaryColor
                  }}
                />
              </View>
              <View style={styles.containerButtons}>
                <Button
                  buttonStyle={[styles.buttonQR, styles.center]}
                  onPress={() => console.log("Press")}
                  icon={{
                    name: "dashboard",
                    size: 30,
                    color: Colors.primaryColor
                  }}
                  textStyle={[styles.buttonTextSecondary, styles.center]}
                  title="Scan a QR Code"
                />
                <Button
                  buttonStyle={[styles.buttonSchedule, styles.center]}
                  onPress={() => console.log("Press")}
                  icon={{ name: "today", size: 30, color: Colors.primaryColor }}
                  title="Schedule a Linguist"
                  textStyle={[styles.buttonTextSecondary, styles.center]}
                />
                <Button
                  buttonStyle={[styles.buttonFavorites, styles.center]}
                  onPress={() =>
                    console.log("Press")
                  }
                  title="Favorites"
                  textStyle={[styles.buttonTextSecondary, styles.center]}
                  icon={{
                    name: "favorite",
                    size: 30,
                    color: Colors.primaryColor
                  }}
                  iconStyle={styles.icon}
                >
                  <View style={styles.callLinguistContainer}>
                    <Icon
                      style={styles.iconV}
                      name="favorite"
                      size={30}
                      color={"#9391f7"}
                      onPress={() =>
                        this.props.navigation.dispatch({
                          type: "LandingContainer"
                        })
                      }
                    />
                    <Text style={[styles.buttonTextSecondary, styles.center]}>
                      Favorites
                    </Text>
                    <View style={styles.box3} />
                  </View>
                </Button>
                <Button
                  buttonStyle={[styles.buttonFavorites, styles.center]}
                  onPress={this.onPoolingPress}
                  title="Polling"
                  textStyle={[styles.buttonTextSecondary, styles.center]}
                  icon={{
                    name: "favorite",
                    size: 30,
                    color: Colors.primaryColor
                  }}
                  iconStyle={styles.icon}
                >
                  <View style={styles.callLinguistContainer}>
                    <Icon
                      style={styles.iconV}
                      name="favorite"
                      size={30}
                      color={"#9391f7"}
                    />
                    <Text style={[styles.buttonTextSecondary, styles.center]}>
                      Polling
                    </Text>
                    <View style={styles.box3} />
                  </View>
                </Button>
              </View>
            </Col>
          </Grid>
        </ScrollView>
      </View>
    );
  }
}

const mS = state => ({
  firstName: state.userProfile.firstName,
  lastName: state.userProfile.lastName,
  nativeLangCode: state.userProfile.nativeLangCode,
  uuid: state.auth.uuid,
  token: state.auth.token,
  rate: state.userProfile.rate
});

const mD = {
  clearView,
  updateView,
  getProfileAsync,
  AsyncAcceptsInvite
};

export default connect(mS, mD)(Home);