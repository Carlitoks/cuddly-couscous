import React, { Component } from "react";
import { View, Text, Button, Image, ScrollView } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { RkButton, RkTextInput, RkText } from "react-native-ui-kitten";
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/MaterialIcons";
import Profile from "./../../Profile";
import EN from "../../I18n/en";
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { starCount: 4.3 };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  navigate = this.props.navigation.navigate;
  styles = StyleSheet.create({
    Button: {
      width: "90%",
      backgroundColor: "#FFFFFF",
      borderBottomWidth: 1,
      borderBottomColor: "#D3D3D3",
      borderRadius: 0,
      paddingLeft: 0,
      marginLeft: "10%",
      paddingTop: 25,
      paddingBottom: 25
    },
    colorText: {
      color: "#000000",
      fontSize: 18,
      textAlign: "left",
      alignContent: "flex-start",
      width: "100%",
      marginLeft: 0,
      paddingLeft: 0,
      paddingTop: 12,
      paddingBottom: 12
    },
    center: {
      alignSelf: "center"
    },
    logo: {
      marginTop: 20,
      marginBottom: 10,
      width: 120,
      height: 120,
      borderRadius: 60
    },
    textName: {
      fontSize: 22,
      fontWeight: "300",
      alignSelf: "center",
      color: "#ffffff"
    },
    textCountry: {
      fontSize: 15,
      alignSelf: "center",
      color: "#A9A9A9"
    },
    textStars: {
      fontSize: 22,
      paddingLeft: 8,
      lineHeight: 33,
      alignSelf: "center",
      fontWeight: "400",
      marginBottom: 15,
      color: "#9391f7"
    },
    button: {
      backgroundColor: "#ffffff",
      borderRadius: 15,
      width: "90%",
      height: 80,
      marginBottom: 20
    },
    buttonQR: {
      backgroundColor: "#e5e5ff",
      borderRadius: 15,
      marginTop: 20,
      width: "90%",
      height: 80
    },
    buttonSchedule: {
      backgroundColor: "#e5e5ff",
      borderRadius: 15,
      width: "90%",
      height: 80
    },
    buttonFavorites: {
      backgroundColor: "#e5e5ff",
      borderRadius: 15,
      width: "90%",
      height: 80
    },
    buttonTextSecondary: {
      fontSize: 17,
      color: "#8f97e8",
      fontWeight: "500"
    },
    buttonText: {
      fontSize: 18,
      color: "#8f97e8",
      fontWeight: "500",
      display: "flex",
      alignItems: "center"
    },
    stars: {
      width: 150,
      marginBottom: 30
    },
    containerButtons: {
      backgroundColor: "#ffffff",
      bottom: 0,
      width: "100%",
      minHeight: 300
    },
    containerPerfil: {
      backgroundColor: "#c1c0f9"
    },
    starsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "baseline",
      width: "100%",
      height: 80
    },
    iconView: {
      flex: 1,
      alignItems: "flex-start",
      height: 100,
      alignItems: "baseline"
    },
    icon: {
      paddingTop: 10,
      paddingLeft: 10
    },
    callLinguistContainer: {
      display: "flex",
      flexDirection: "row"
    },
    box3: {
      flex: 1
    },
    iconV: {
      display: "flex",
      flex: 1,
      alignItems: "center",
      paddingLeft: 20
    }
  });
  render() {
    return (
      <View>
        <ScrollView>
          <View style={this.styles.containerPerfil}>
            <View>
              <View style={this.styles.IconView}>
                <Icon
                  style={this.styles.icon}
                  name="menu"
                  size={30}
                  color={"#9391f7"}
                  onPress={() =>
                    this.props.navigation.dispatch({
                      type: "LandingContainer"
                    })}
                />
              </View>
            </View>
            <View>
              <Image
                style={[this.styles.logo, this.styles.center]}
                source={require("../../Images/perfil.jpg")}
              />
              <RkText style={this.styles.textName}>Adele G.</RkText>
            </View>
            <View style={this.styles.starsContainer}>
              <View style={[this.styles.stars, this.styles.center]}>
                <StarRating
                  emptyStar={"ios-star-outline"}
                  fullStar={"ios-star"}
                  halfStar={"ios-star-half"}
                  iconSet={"Ionicons"}
                  disabled={true}
                  maxStars={5}
                  starSize={22}
                  rating={this.state.starCount}
                  starColor={"#9391f7"}
                />
              </View>
              <RkText style={this.styles.textStars}>4.3</RkText>
            </View>
            {/* Home */}
            <View>
              <RkButton
                style={[this.styles.button, this.styles.center]}
                onPress={() =>
                  this.props.navigation.dispatch({ type: "ContactLinguist" })}
              >
                <View style={this.styles.callLinguistContainer}>
                  <Icon
                    style={this.styles.iconV}
                    name="videocam"
                    size={45}
                    color={"#9391f7"}
                    onPress={() =>
                      this.props.navigation.dispatch({
                        type: "ContactLinguist"
                      })}
                  />
                  <RkText style={[this.styles.buttonText, this.styles.center]}>
                    {EN["callLinguist"]}
                  </RkText>
                  <View style={this.styles.box3} />
                  <View />
                </View>
              </RkButton>
            </View>
            <View style={this.styles.containerButtons}>
              <RkButton
                style={[this.styles.buttonQR, this.styles.center]}
                onPress={() => navigate("LaunchScreen")}
              >
                <View style={this.styles.callLinguistContainer}>
                  <Icon
                    style={this.styles.iconV}
                    name="dashboard"
                    size={30}
                    color={"#9391f7"}
                    onPress={() =>
                      this.props.navigation.dispatch({
                        type: "LandingContainer"
                      })}
                  />
                  <RkText
                    style={[
                      this.styles.buttonTextSecondary,
                      this.styles.center
                    ]}
                  >
                    Scan a QR Code
                  </RkText>
                  <View style={this.styles.box3} />
                </View>
              </RkButton>
              <RkButton
                style={[this.styles.buttonSchedule, this.styles.center]}
                onPress={() => navigate("LaunchScreen")}
              >
                <View style={this.styles.callLinguistContainer}>
                  <Icon
                    style={this.styles.iconV}
                    name="today"
                    size={30}
                    color={"#9391f7"}
                    onPress={() =>
                      this.props.navigation.dispatch({
                        type: "LandingContainer"
                      })}
                  />
                  <RkText
                    style={[
                      this.styles.buttonTextSecondary,
                      this.styles.center
                    ]}
                  >
                    Schedule a Linguist
                  </RkText>
                  <View style={this.styles.box3} />
                </View>
              </RkButton>
              <RkButton
                style={[this.styles.buttonFavorites, this.styles.center]}
                onPress={() => navigate("LaunchScreen")}
              >
                <View style={this.styles.callLinguistContainer}>
                  <Icon
                    style={this.styles.iconV}
                    name="favorite"
                    size={30}
                    color={"#9391f7"}
                    onPress={() =>
                      this.props.navigation.dispatch({
                        type: "LandingContainer"
                      })}
                  />
                  <RkText
                    style={[
                      this.styles.buttonTextSecondary,
                      this.styles.center
                    ]}
                  >
                    Favorites
                  </RkText>
                  <View style={this.styles.box3} />
                </View>
              </RkButton>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Home;
