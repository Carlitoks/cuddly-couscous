import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getProfileAsync,
  clearView,
  updateView
} from "../../Ducks/UserProfileReducer";

import { View, Text, Image, ScrollView } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button, FormLabel, FormInput, Header,  Badge,
  Rating,
  Avatar } from "react-native-elements";
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import ShowMenuButton from "../../Components/ShowMenuButton/ShowMenuButton";
import SettingsButton from "../../Components/SettingsButton/SettingsButton";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import styles from "./styles";
import { Colors } from "../../Themes";
import EN from "../../I18n/en";
import Images from "../../Themes/Images";
import ViewWrapper from "../../Containers/ViewWrapper/ViewWrapper";
class HomeCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = { starCount: 4.3 };
  }

  componentWillMount() {
    const { firstName, lastName } = this.props;

    if (!firstName && !lastName) {
      this.props.getProfileAsync(this.props.uuid, this.props.token);
    }
  }

  componentWillUnmount() {
    // this.props.clearView();
  }


  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  

  render() {
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
                <TopViewIOS/> 
                <Header
                  outerContainerStyles={{ borderBottomWidth: 0, height: 60 }}
                  backgroundColor="transparent"
                  leftComponent={
                    <ShowMenuButton navigation={this.props.navigation} />
                  }
                  centerComponent={{
                    text: `${this.props.firstName} ${this.props.lastName}`,
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
                    value={this.props.rate}
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
                      rating={this.props.rate}
                      starColor={Colors.primaryColor}
                    />
                  </View>
                  <Text style={styles.textStars} />
                </View>

                {/* Home */}
              </Col>
              <Col>
                <View style={styles.containerButtons}>
                    <Button
                      borderRadius={15}
                      containerViewStyle={styles.callLinguistContainer}
                      buttonStyle={styles.button}
                      onPress={() =>
                        this.props.navigation.dispatch({
                          type: "ContactLinguist"
                        })
                      }
                      textStyle={[styles.buttonText, styles.center]}
                      title={EN["callLinguist"]}
                      icon={{
                        name: "videocam",
                        size: 35,
                        color: Colors.primaryAltFontColor
                      }}
                    />
                  <Button
                    buttonStyle={[styles.buttonQR, styles.center]}
                    onPress={() => this.props.navigation.dispatch({ type: "ScanScreenView" })} 
                    icon={{
                      name: "dashboard",
                      size: 30,
                      color: "gray"
                    }}
                    textStyle={[styles.buttonTextSecondary, styles.center]}
                    title="Scan a QR Code"
                  />
                  <Button
                    buttonStyle={[styles.buttonQR, styles.center]}
                    onPress={() =>  this.props.navigation.dispatch({ type: "Home" })}
                    icon={{
                      name: "today",
                      size: 30,
                      color: "gray"
                    }}
                    title="Schedule a Linguist"
                    textStyle={[styles.buttonTextSecondary, styles.center]}
                  />
                  <Button
                    buttonStyle={[styles.buttonQR, styles.center]}
                    onPress={() =>
                      this.props.navigation.dispatch({ type: "Home" })
                    }
                    title="Favorites"
                    textStyle={[styles.buttonTextSecondary, styles.center]}
                    icon={{
                      name: "favorite",
                      size: 30,
                      color: "gray"
                    }}
                    iconStyle={styles.icon}
                  >
                    <View style={styles.callLinguistContainer}>
                      <Icon
                        style={styles.iconV}
                        name="favorite"
                        size={30}
                        color={"#9391f7"}
                        onPress={() =>  this.props.navigation.dispatch({ type: "Home" })}
                      />
                      <Text style={[styles.buttonTextSecondary, styles.center]}>
                        Favorites
                      </Text>
                      <View style={styles.box3} />
                    </View>
                  </Button>
                </View>
              </Col>
            </Col>
          </Grid>
        </ScrollView>
      </ViewWrapper>
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
};

export default connect(mS, mD)(HomeCustomer);
