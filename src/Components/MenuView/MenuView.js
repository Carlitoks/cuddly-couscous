import React, { Component } from "react";
import { AppState, Linking } from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Instabug from "instabug-reactnative";
import TopViewIOS from "../../Components/TopViewIOS/TopViewIOS";

import {
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import { Button, Badge, Avatar } from "react-native-elements";
import StarRating from "react-native-star-rating";
import { isCurrentView } from "../../Util/Helpers";
import LocaleLanguage from "./../../Util/Devices";
import DeviceInfo from "react-native-device-info";
import { Colors, Images } from "../../Themes";
import styles from "./styles";
import { HelpURI } from "../../Config/StaticViewsURIS";
import I18n from "../../I18n/I18n";

class MenuView extends Component {
  constructor(props) {
    super(props);
    state = { appState: AppState.currentState };
  }

  componentWillReceiveProps(nextProps) {
    this.forceUpdate();
  }

  componentWillUnmount() {
    Instabug.setAttachmentTypesEnabled(true, true, true, true, true);
  }
  isACustomer = () => !this.props.linguistProfile;

  checkCurrentPage = (navigation, currentViewName) => {
    isCurrentView(navigation, currentViewName)
      ? this.props.navigation.dispatch({ type: "DrawerClose" })
      : navigation.dispatch({ type: currentViewName });
  };

  render() {
    const { navigation, user } = this.props;
    const Version = DeviceInfo.getVersion();
    return (
      <View style={styles.container}>
        <ScrollView alwaysBounceVertical={false} style={styles.scroll}>
          <TopViewIOS />
          <TouchableOpacity
            onPress={() => {
              this.checkCurrentPage(navigation, "UserProfileView");
            }}
          >
            {!!user && (
            <View>
              <Avatar
                containerStyle={{ alignSelf: "center", marginTop: 30 }}
                avatarStyle={styles.center}
                rounded
                xlarge
                source={
                  this.props.avatarURL
                    ? { uri: this.props.avatarURL }
                    : Images.avatar
                }
                activeOpacity={0.7}
              />
              <Text style={styles.textName}>
                {user.firstName} {user.lastName}
              </Text>
              <Text style={styles.textEditProfile}>
                {I18n.t("editProfile")}
              </Text>
            </View>
          )}
          </TouchableOpacity>

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
            onPress={() => this.checkCurrentPage(navigation, "Home")}
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
            onPress={() => this.checkCurrentPage(navigation, "CallHistory")}
          >
            <Text style={styles.colorText}>{I18n.t("callHistory")}</Text>
          </Icon.Button>

          {this.isACustomer() && (
            <Icon.Button
              name="receipt"
              size={25}
              backgroundColor={
                isCurrentView(navigation, "PromoCodeView")
                  ? Colors.selectedBackground
                  : Colors.background
              }
              iconStyle={
                isCurrentView(navigation, "PromoCodeView")
                  ? styles.selectedOptionMenu
                  : styles.optionMenu
              }
              onPress={() => this.checkCurrentPage(navigation, "PromoCodeView")}
            >
              <Text style={styles.colorText}>{I18n.t("promoCodeTitle")}</Text>
            </Icon.Button>
          )}

          {this.isACustomer() && (
            <MaterialCIcons.Button
              name="qrcode"
              size={25}
              backgroundColor={
                isCurrentView(navigation, "ScanScreenView")
                  ? Colors.selectedBackground
                  : Colors.background
              }
              iconStyle={
                isCurrentView(navigation, "ScanScreenView")
                  ? styles.selectedOptionMenu
                  : styles.optionMenu
              }
              onPress={() => this.checkCurrentPage(navigation, "ScanScreenView")}
            >
              <Text style={styles.colorText}>{I18n.t("scanQRCode")}</Text>
            </MaterialCIcons.Button>
          )}

          {this.isACustomer() && (
            <MaterialCIcons.Button
              name="credit-card"
              size={25}
              backgroundColor={
                isCurrentView(navigation, "PaymentsView")
                  ? Colors.selectedBackground
                  : Colors.background
              }
              iconStyle={
                isCurrentView(navigation, "PaymentsView")
                  ? styles.selectedOptionMenu
                  : styles.optionMenu
              }
              onPress={() => this.checkCurrentPage(navigation, "PaymentDetailScreen")}
            >
              <Text style={styles.colorText}>{I18n.t("paymentDetails")}</Text>
            </MaterialCIcons.Button>
          )}

          {/* Report a problem  */}
          <Icon.Button
            name="report-problem"
            size={25}
            backgroundColor={Colors.background}
            iconStyle={styles.optionMenu}
            onPress={() => {
              Instabug.setAttachmentTypesEnabled(false, true, true, true, true);
              Instabug.invoke();
            }}
          >
            <Text style={styles.colorText}>{I18n.t("reportProblemMenu")}</Text>
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
              onPress={() => Linking.openURL("https://jeenie.com")}
            >
              <Text style={styles.colorText} icon>
                {I18n.t("becomeLinguist")}
              </Text>
            </Icon.Button>
          )}
          {/* Settings */}
          <Icon.Button
            name="settings"
            size={25}
            backgroundColor={Colors.background}
            iconStyle={styles.optionMenu}
            onPress={() => {
              this.checkCurrentPage(navigation, "SettingsView");
            }}
          >
            <Text style={styles.colorText}>{I18n.t("settings")}</Text>
          </Icon.Button>
        </ScrollView>
        <View style={styles.containerVersion}>
          <View style={styles.version}>
            <Text style={styles.textVersion}>
              {I18n.t("version")} {Version}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const mS = state => ({
  user: state.account.user,
  linguistProfile: state.account.linguistProfile,
  avatarURL: state.account.userAvatarURL,
});

const mD = {
};

export default connect(
  mS,
  mD
)(MenuView);
