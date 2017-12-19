import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getProfileAsync,
  clearView,
  updateView
} from "../../Ducks/HomeReducer";

import { View, Text, Button, Image, ScrollView } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { RkButton, RkTextInput, RkText } from "react-native-ui-kitten";
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./styles";
import EN from "../../I18n/en";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { starCount: 4.3 };
  }

  componentWillMount() {
    // this.props.getProfileAsync();
  }

  componentWillUnmount() {
    // this.props.clearView();
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
          <View style={styles.containerPerfil}>
            <View>
              <View style={styles.IconView}>
                <Icon
                  style={styles.icon}
                  name="menu"
                  size={30}
                  color={"#9391f7"}
                  onPress={() =>
                    this.props.navigation.dispatch({
                      type: "LandingContainer"
                    })
                  }
                />
              </View>
            </View>
            <View>
              <Image
                style={[styles.logo, styles.center]}
                source={require("../../Images/perfil.jpg")}
              />
              <RkText style={styles.textName}>
                {this.props.firstName} {this.props.lastName}
              </RkText>
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
                  rating={this.state.starCount}
                  starColor={"#9391f7"}
                />
              </View>
              <RkText style={styles.textStars}>4.3</RkText>
            </View>
            {/* Home */}
            <View>
              <RkButton
                style={[styles.button, styles.center]}
                onPress={() =>
                  this.props.navigation.dispatch({ type: "ContactLinguist" })
                }
              >
                <View style={styles.callLinguistContainer}>
                  <Icon
                    style={styles.iconV}
                    name="videocam"
                    size={45}
                    color={"#9391f7"}
                    onPress={() =>
                      this.props.navigation.dispatch({
                        type: "ContactLinguist"
                      })
                    }
                  />
                  <RkText style={[styles.buttonText, styles.center]}>
                    {EN["callLinguist"]}
                  </RkText>
                  <View style={styles.box3} />
                  <View />
                </View>
              </RkButton>
            </View>
            <View style={styles.containerButtons}>
              <RkButton
                style={[styles.buttonQR, styles.center]}
                onPress={() => navigate("LaunchScreen")}
              >
                <View style={styles.callLinguistContainer}>
                  <Icon
                    style={styles.iconV}
                    name="dashboard"
                    size={30}
                    color={"#9391f7"}
                    onPress={() =>
                      this.props.navigation.dispatch({
                        type: "LandingContainer"
                      })
                    }
                  />
                  <RkText
                    style={[
                      styles.buttonTextSecondary,
                      styles.center
                    ]}
                  >
                    Scan a QR Code
                  </RkText>
                  <View style={styles.box3} />
                </View>
              </RkButton>
              <RkButton
                style={[styles.buttonSchedule, styles.center]}
                onPress={() => navigate("LaunchScreen")}
              >
                <View style={styles.callLinguistContainer}>
                  <Icon
                    style={styles.iconV}
                    name="today"
                    size={30}
                    color={"#9391f7"}
                    onPress={() =>
                      this.props.navigation.dispatch({
                        type: "LandingContainer"
                      })
                    }
                  />
                  <RkText
                    style={[
                      styles.buttonTextSecondary,
                      styles.center
                    ]}
                  >
                    Schedule a Linguist
                  </RkText>
                  <View style={styles.box3} />
                </View>
              </RkButton>
              <RkButton
                style={[styles.buttonFavorites, styles.center]}
                onPress={() => navigate("LaunchScreen")}
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
                  <RkText
                    style={[
                      styles.buttonTextSecondary,
                      styles.center
                    ]}
                  >
                    Favorites
                  </RkText>
                  <View style={styles.box3} />
                </View>
              </RkButton>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mS = state => ({
  firstName: state.home.firstName,
  lastName: state.home.lastName,
  nativeLangCode: state.home.nativeLangCode
});

const mD = {
  clearView,
  updateView,
  getProfileAsync
};

export default connect(mS, mD)(Home);
