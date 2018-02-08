import React, { Component } from "react";
import { AppState } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import { IMAGE_STORAGE_URL } from "../../Config/env";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";
import {
  getProfileAsync,
  clearView,
  updateView
} from "../../Ducks/UserProfileReducer";

import { logOutAsync } from "../../Ducks/AuthReducer";

import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button, Badge, Avatar } from "react-native-elements";
import StarRating from "react-native-star-rating";
import { isCurrentView } from "../../Util/Helpers";

import { Colors, Images } from "../../Themes";
import styles from "./styles";
import { HelpURI } from "../../Config/StaticViewsURIS";
import I18n from "../../I18n/I18n";

class MenuView extends Component {
  constructor(props) {
    super(props);
    state = { appState: AppState.currentState };
  }

  componentWillMount() {
    const { firstName, lastName } = this.props;

    if (!firstName && !lastName) {
      this.props.getProfileAsync(this.props.uuid, this.props.token);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.forceUpdate();
  }
  isACustomer = () => !this.props.linguistProfile;

  render() {
    const { navigation, avatarURL } = this.props;

    return (
      <ScrollView alwaysBounceVertical={false} >
        <TopViewIOS/> 
        <View>
          <Avatar
            containerStyle={{ alignSelf: "center", marginTop: 30 }}
            avatarStyle={styles.center}
            rounded
            xlarge
            key={this.props.avatarBase64}
            source={
              avatarURL
                ? {
                    uri: `${IMAGE_STORAGE_URL}${avatarURL}?${new Date().getUTCMilliseconds()}`
                  }
                : Images.avatar
            }
            activeOpacity={0.7}
          />
        </View>
        <View style={styles.starsContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.dispatch({ type: "UserProfileView" });
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.textName}>
                {this.props.firstName} {this.props.lastName}
              </Text>
              <Icon
                name="mode-edit"
                size={20}
                style={{ marginLeft: 5 }}
                color={Colors.selectedOptionMenu}
              />
            </View>
          </TouchableWithoutFeedback>
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
              starColor={Colors.optionMenu}
            />
            <Text style={styles.textStars}>{this.props.rate}</Text>
          </View>
        </View>

        {/* Home */}
        <Icon.Button
          name="home"
          size={25}
          backgroundColor={
            isCurrentView(navigation, "Home")
              ? Colors.selectedBackground
              : Colors.background
          }
          iconStyle={
            isCurrentView(navigation, "Home")
              ? styles.selectedOptionMenu
              : styles.optionMenu
          }
          onPress={() => {
            navigation.dispatch({ type: "Home" });
          }}
        >
          <Text style={styles.colorText}>{I18n.t("home")}</Text>
        </Icon.Button>

        {/* History */}
        <Icon.Button
          name="schedule"
          size={25}
          backgroundColor={
            isCurrentView(navigation, "CallHistory")
              ? Colors.selectedBackground
              : Colors.background
          }
          iconStyle={
            isCurrentView(navigation, "CallHistory")
              ? styles.selectedOptionMenu
              : styles.optionMenu
          }
          onPress={() => {
            navigation.dispatch({ type: "CallHistory" });
          }}
        >
          <Text style={styles.colorText}>{I18n.t("callHistory")}</Text>
        </Icon.Button>

        {/* Help */}
        {/* <Icon.Button
          name="help"
          size={25}
          backgroundColor={
            isCurrentView(navigation, "Help")
              ? Colors.selectedBackground
              : Colors.background
          }
          iconStyle={
            isCurrentView(navigation, "Help")
              ? styles.selectedOptionMenu
              : styles.optionMenu
          }
          onPress={() => {
            navigation.dispatch({
              type: "StaticView",
              params: {
                uri: HelpURI,
                title: I18n.t("help")
              }
            });
          }}
        >
          <Text style={styles.colorText}>{I18n.t("help")}</Text>
        </Icon.Button> */}

        {/* Logout */}
        <Icon.Button
          name="exit-to-app"
          size={25}
          backgroundColor={Colors.background}
          iconStyle={styles.optionMenu}
          onPress={() => {
            this.props.logOutAsync();
          }}
        >
          <Text style={styles.colorText}>{I18n.t("logOut")}</Text>
        </Icon.Button>

        {/* Become a linguist */}
        {this.isACustomer() && (
          <Icon.Button
            name="forum"
            size={25}
            backgroundColor={
              isCurrentView(navigation, "Help")
                ? Colors.selectedBackground
                : Colors.background
            }
            iconStyle={
              isCurrentView(navigation, "Help")
                ? styles.selectedOptionMenu
                : styles.optionMenu
            }
            onPress={() => {
              navigation.dispatch({ type: "SelectLanguageView" });
            }}
          >
            <Text style={styles.colorText} icon>
              {I18n.t("becomeLinguist")}
            </Text>
          </Icon.Button>
        )}
      </ScrollView>
    );
  }
}

const mS = state => ({
  firstName: state.userProfile.firstName,
  lastName: state.userProfile.lastName,
  location: state.userProfile.location,
  rate: state.userProfile.averageStarRating, 
  nativeLangCode: state.userProfile.nativeLangCode,
  linguistProfile: state.userProfile.linguistProfile,
  avatarURL: state.userProfile.avatarURL,
  avatarBase64: state.userProfile.avatarBase64,
  uuid: state.auth.uuid,
  token: state.auth.token
});

const mD = {
  clearView,
  updateView,
  getProfileAsync,
  logOutAsync
};

export default connect(mS, mD)(MenuView);
